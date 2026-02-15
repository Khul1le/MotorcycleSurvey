// --- app.js ---
import * as DOM from './domHandler.js';
import * as VALIDATION from './validation.js';
import { collectSection2Data, collectSection3Data } from './validation.js';
import { SurveyState, updateProgressBar } from './stateManager.js';

const state = new SurveyState();
let currentParticipantType = '';
let elements = {};

// ✅ Make these available everywhere in this module
const SUBMIT_ENDPOINT = "https://gzoveseqnqcnkezskdvi.supabase.co/functions/v1/submit-survey";

function getDeviceId() {
  const key = "survey_device_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = (crypto.randomUUID && crypto.randomUUID()) || (Date.now() + "-" + Math.random().toString(16).slice(2));
    localStorage.setItem(key, id);
  }
  return id;
}

// Optional but recommended: normalize ZA phones before sending to server
function normalizeZaPhone(input) {
  const raw = String(input || "").trim();
  let s = raw.replace(/[^\d+]/g, "");
  if (s.startsWith("00")) s = "+" + s.slice(2);
  if (s.startsWith("0")) {
    const digits = s.replace(/\D/g, "");
    if (digits.length === 10) return "+27" + digits.slice(1);
  }
  if (/^27\d{9,10}$/.test(s)) return "+" + s;
  if (/^\+27\d{9,10}$/.test(s)) return s;
  return s;
}

// Prevent adding duplicate listeners if something re-inits
let liveValidationListenersAdded = false;

const roleQuestionMap = {
  driver: ['driverQuestions'],
  owner: ['ownerQuestions'],
  mechanic: ['mechanicQuestions'],

  driver_owner: ['driverQuestions', 'ownerQuestions'],
  mechanic_owner: ['mechanicQuestions', 'ownerQuestions'],
  driver_mechanic: ['driverQuestions', 'mechanicQuestions'],

  // "other" = all three (as per your label)
  other: ['driverQuestions', 'ownerQuestions', 'mechanicQuestions'],
};

document.addEventListener('DOMContentLoaded', () => {
    try {
        elements = DOM.initializeElements();
        setupInitialListeners();

        // Add live validation listeners once (this is the key fix)
        setupLiveValidationListeners();

        const savedState = state.loadState();
        if (savedState && savedState.participantType) {
            currentParticipantType = savedState.participantType;
            const radio = document.querySelector(
                `input[name="participantType"][value="${currentParticipantType}"]`
            );
            if (radio) {
                radio.checked = true;
                DOM.toggleNextButton1(currentParticipantType, elements.nextButton1);
            }
        }

        updateProgressBar('section1');
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

function setupInitialListeners() {
    // Section 1: Role selection
    const participantTypeRadios = document.querySelectorAll('input[name="participantType"]');
    participantTypeRadios.forEach((radio) => {
        radio.addEventListener('change', () => {
            currentParticipantType = radio.value;
            DOM.toggleNextButton1(currentParticipantType, elements.nextButton1);
            state.setParticipantType(currentParticipantType);
            state.saveState();

            // Re-validate section 2 immediately whenever role changes
            VALIDATION.validateSection2(currentParticipantType, elements, state);
        });
    });

    // Existing listeners you already had
    DOM.setupDynamicListeners(elements, () =>
        VALIDATION.validateSection2(currentParticipantType, elements, state)
    );
    DOM.populateAllBestBikeSelects(elements, () =>
        VALIDATION.validateSection2(currentParticipantType, elements, state)
    );
    DOM.setupAllOtherSpecifyListeners(elements, () =>
        VALIDATION.validateSection2(currentParticipantType, elements, state)
    );

    DOM.setupOtherRadioText('mostImportantFactor', elements.factorOtherRadio, elements.factorOtherSpecify, () =>
    VALIDATION.validateSection3(elements, state)
    );

    DOM.setupOtherRadioText('growthChallenge', elements.growthOtherRadio, elements.growthOtherSpecify, () =>
    VALIDATION.validateSection3(elements, state)
    );

    if (elements.closeModalButton) {
        elements.closeModalButton.addEventListener('click', () => {
            DOM.closeSuccessModal();
            state.clearState();
            // Reset back to first page
            window.location.reload();
        }); 
    }

    // Close modal by clicking on the dark backdrop
    if (elements.successModal) {
        elements.successModal.addEventListener('click', (e) => {
            if (e.target === elements.successModal) {
                DOM.closeSuccessModal();
            }
        });
    }

    if (elements.nextButton1) {
            elements.nextButton1.addEventListener('click', () => {
            if (!VALIDATION.validateSection1()) return;

            DOM.showSection(elements.section2);
            DOM.hideSection(elements.section1);
            DOM.showQuestionsForRole(currentParticipantType, roleQuestionMap);
            DOM.renumberSection2Questions();
            DOM.resetGeoAreas(elements);

            // Make sure Next button in section 2 gets updated on entry
            VALIDATION.validateSection2(currentParticipantType, elements, state);

            updateProgressBar('section2');
        });
    }

    /*elements.backButton2.addEventListener('click', () => {
        DOM.showSection(elements.section1);
        DOM.hideSection(elements.section2);
        DOM.hideAllQuestions(roleQuestionMap);
        updateProgressBar('section1');
    });*/

    /*elements.nextButton2.addEventListener('click', () => {
        if (!VALIDATION.validateSection2(currentParticipantType, elements, state)) return;

        DOM.showSection(elements.section3);
        DOM.hideSection(elements.section2);

        // Ensure submit button state is correct when entering section 3
        VALIDATION.validateSection3(elements, state);

        updateProgressBar('section3');
    });*/

        if (elements.backButton3) {
        elements.backButton3.addEventListener('click', () => {
            DOM.showSection(elements.section2);
            DOM.hideSection(elements.section3);
            updateProgressBar('section2');
            VALIDATION.validateSection2(currentParticipantType, elements, state);
        });
        }

        if (elements.submitButtonFinal) {
            elements.submitButtonFinal.addEventListener('click', async (e) => {
            e.preventDefault();
            if (!VALIDATION.validateSection3(elements, state)) return;

            const confirmed = confirm(
                "Are you sure you want to submit your responses? You will not be able to edit them."
            );
            if (!confirmed) return;

            // Build payload
            const section2 = VALIDATION.collectSection2Data(currentParticipantType, elements);
            const section3 = VALIDATION.collectSection3Data(elements);

            // Normalize phone
            const phoneNorm = normalizeZaPhone(section3.phoneNumber);

            // Remove raw phone from section3 JSON (cleaner + safer)
            delete section3.phoneNumber;

            const payload = {
                phone: phoneNorm,
                participantType: currentParticipantType,
                section2,
                section3,
                device_id: getDeviceId(),
                duration_seconds: Math.round((Date.now() - startedAt) / 1000),
            };


            try {
                // UI: disable submit while sending
                elements.submitButtonFinal.disabled = true;

                console.log("Submitting to:", SUBMIT_ENDPOINT);
                console.log("Payload:", payload);

                const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6b3Zlc2VxbnFjbmtlenNrZHZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwODQ1MjksImV4cCI6MjA4NjY2MDUyOX0.wiq-QDDTnLHhsKkp-DUjgFkjRFv9QCgh6gP4m2dHTI0"; // same as you use in Supabase client

                const res = await fetch(SUBMIT_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                    "apikey": SUPABASE_ANON_KEY,
                },
                body: JSON.stringify(payload),
                });

                if (res.status === 409) {
                alert("This phone number has already submitted the survey. Thank you!");
                elements.submitButtonFinal.disabled = false;
                return;
                }

                if (!res.ok) {
                const msg = await res.text();
                console.error("Submit failed:", res.status, msg);
                alert("Submission failed (" + res.status + ").\n\n" + msg);
                elements.submitButtonFinal.disabled = false;
                return;
                }

                // Success
                state.markAsSubmitted(); // optional device-level “extra”
                DOM.showSuccessModal();
            } catch (err) {
                console.error(err);
                alert("Network error. Please try again.");
                elements.submitButtonFinal.disabled = false;
            }
            });
        }
}

/**
 * ✅ KEY FIX:
 * The issue was: clicking Section 2 “line items” (radio/checkbox) wasn’t triggering validateSection2,
 * so nextButton2 never updated.
 *
 * This adds event listeners to ALL inputs/selects/textareas in Section 2 (and Section 3),
 * and each change/input re-runs validation using the CURRENT role.
 */
function setupLiveValidationListeners() {
    if (liveValidationListenersAdded) return;
    liveValidationListenersAdded = true;

    // Section 2: validate on every relevant change
    const section2Targets = document.querySelectorAll('#section2 input, #section2 select, #section2 textarea');
    section2Targets.forEach((el) => {
        // skip “reason” textareas if you don't want them required to enable Next
        if (el.id && el.id.includes('_reason')) return;

        el.addEventListener('change', () => {
            VALIDATION.validateSection2(currentParticipantType, elements, state);
        });

        // for typing into text inputs / textareas (e.g., "Other, specify")
        if (el.tagName === 'TEXTAREA' || el.type === 'text') {
            el.addEventListener('input', () => {
                VALIDATION.validateSection2(currentParticipantType, elements, state);
            });
        }
    });

    // Section 3: validate to enable/disable Submit
    const section3Targets = document.querySelectorAll('#section3 input, #section3 select, #section3 textarea');
    section3Targets.forEach((el) => {
        el.addEventListener('change', () => VALIDATION.validateSection3(elements, state));
        if (el.tagName === "TEXTAREA" || ["text", "tel", "email", "number"].includes(el.type)) {
        el.addEventListener("input", () => VALIDATION.validateSection3(elements, state));
        }
    });

    // ✅ Makes BOTH Section 2 button sets work (top + sticky)
    document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-nav]");
    if (!btn) return;

    const action = btn.getAttribute("data-nav");

    if (action === "back2") {
        DOM.showSection(elements.section1);
        DOM.hideSection(elements.section2);
        DOM.hideAllQuestions(roleQuestionMap);
        updateProgressBar("section1");
        return;
  }

  if (action === "next2") {
    if (btn.disabled) return;
    if (!VALIDATION.validateSection2(currentParticipantType, elements, state)) return;

    DOM.showSection(elements.section3);
    DOM.hideSection(elements.section2);
    DOM.renumberSection3Questions();

    // ✅ scroll to top of the page (or section)
    window.scrollTo({ top: 0, behavior: "smooth" });
    // OR: elements.section3.scrollIntoView({ behavior: "smooth", block: "start" });

    VALIDATION.validateSection3(elements, state);
    updateProgressBar("section3");
    return;
  }
});

}