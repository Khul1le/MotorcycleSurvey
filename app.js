// --- app.js ---
import * as DOM from './domHandler.js';
import * as VALIDATION from './validation.js';
import { collectSection2Data, collectSection3Data } from './validation.js';
import { SurveyState, updateProgressBar } from './stateManager.js';

const state = new SurveyState();
let currentParticipantType = '';
let elements = {};

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

                const record = {
                submittedAt: new Date().toISOString(),
                participantType: currentParticipantType,
                section2: VALIDATION.collectSection2Data(currentParticipantType, elements),
                section3: VALIDATION.collectSection3Data(elements),
                };

                const existing = JSON.parse(localStorage.getItem("survey_records") || "[]");
                existing.push(record);
                localStorage.setItem("survey_records", JSON.stringify(existing));

                DOM.showSuccessModal();
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
        if (el.tagName === 'TEXTAREA' || el.type === 'text') {
            el.addEventListener('input', () => VALIDATION.validateSection3(elements, state));
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

    VALIDATION.validateSection3(elements, state);
    updateProgressBar("section3");
    return;
  }
});

}