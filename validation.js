// --- validation.js ---

/**
 * Validates Section 1 (Participant Type Selection)
 */
export function validateSection1() {
    const selected = document.querySelector('input[name="participantType"]:checked');
    return selected !== null && selected.value !== "";
}

/**
 * Helper function to check if a radio group has a selected value.
 */
function isRadioGroupChecked(name) {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    return radio !== null && radio.value !== "";
}

/**
 * Helper function to check if at least one checkbox in a group is checked.
 */
function isCheckboxGroupChecked(name) {
    return document.querySelectorAll(`input[name="${name}"]:checked`).length > 0;
}

/**
 * Helper function to check if a select element has a selected value.
 */
function isSelectSelected(selectElement) {
    return selectElement && selectElement.value !== "" && 
           selectElement.value.toLowerCase() !== "select your province" && 
           selectElement.value.toLowerCase() !== "select an area" && 
           selectElement.value.toLowerCase() !== "select a motorcycle model";
}

/**
 * Helper function to check if an 'Other' text input is required and filled.
 */
function isOtherTextInputValid(checkboxElement, textInputElement) {
    if (checkboxElement && checkboxElement.checked) {
        return textInputElement && textInputElement.value.trim() !== '';
    }
    return true;
}

/**
 * Validates the currently visible section 2.
 */
export function validateSection2(currentParticipantType, elements, state) {
    const role = currentParticipantType;

    // Only validate what's visible / relevant
    if (!role) return false;

    // Helper checks
    const checkedRadio = (name) => {
        const el = document.querySelector(`input[name="${name}"]:checked`);
        return !!(el && el.value !== "");
    };

    const checkedAnyCheckbox = (name) => {
        return document.querySelectorAll(`input[name="${name}"]:checked`).length > 0;
    };

    const selected = (el) => {
        return !!(el && el.value && el.value.trim() !== "");
    };

    const showSection2Error = (msg) => {
        // Optional error div (add it if you want)
        const err = document.getElementById("section2Error");
        if (!err) return;
        if (msg) {
            err.textContent = msg;
            err.classList.remove("hidden");
        } else {
            err.textContent = "";
            err.classList.add("hidden");
        }
    };

    let checks = [];

    // ✅ DRIVER VALIDATION (the one you're testing)
    if (role === "driver" || role === "other") {
        checks = [
            { label: "Province", ok: () => selected(elements.provinceDriver) },
            { label: "Geographical area", ok: () => selected(elements.geoAreaDriver) },
            { label: "Experience level", ok: () => checkedRadio("experienceLevelDriver") },
            { label: "Income app(s) (pick at least one)", ok: () => checkedAnyCheckbox("incomeAppsDriver") },
            { label: "Manual or Automatic", ok: () => checkedRadio("bikeTypePreferenceDriver") },
            { label: "Current bike model", ok: () => checkedRadio("currentBikeModelDriver") },

            // If "Other bike model" selected, require text
            {
                label: "Other bike model (specify)",
                ok: () => {
                    const otherRadio = document.querySelector(`#model_other_bike_driver`);
                    if (otherRadio && otherRadio.checked) {
                        return !!(elements.otherBikeSpecifyDriver && elements.otherBikeSpecifyDriver.value.trim());
                    }
                    return true;
                }
            },

            { label: "Bike change frequency", ok: () => checkedRadio("bikeChangeFrequency") },
            { label: "Cash up consistently", ok: () => checkedRadio("cashUpConsistently") },
            { label: "Rent-to-buy option", ok: () => checkedRadio("rentToBuyOption") },

            // Best bike select
            { label: "Best bike for business (select)", ok: () => selected(elements.bestBikeSelectDriver) },

            // If Best bike = Other, require text
            {
                label: "Best bike for business (Other - specify)",
                ok: () => {
                    if (elements.bestBikeSelectDriver && elements.bestBikeSelectDriver.value === "Other") {
                        return !!(elements.otherBestBikeSpecifyDriver && elements.otherBestBikeSpecifyDriver.value.trim());
                    }
                    return true;
                }
            }
        ];
    }

    // If you want to extend for other roles later, you can add else-if blocks here.

    // Run checks and find first missing
    let isValid = true;
    let firstMissing = "";

    for (const c of checks) {
        if (!c.ok()) {
            isValid = false;
            firstMissing = c.label;
            break;
        }
    }

    // ✅ Toggle the actual button
    if (elements && elements.nextButton2) {
        elements.nextButton2.disabled = !isValid;
        if (isValid) {
            elements.nextButton2.classList.remove("opacity-50", "cursor-not-allowed");
            elements.nextButton2.classList.add("hover:scale-105");
        } else {
            elements.nextButton2.classList.add("opacity-50", "cursor-not-allowed");
            elements.nextButton2.classList.remove("hover:scale-105");
        }
    }

    // ✅ Show helpful message (optional)
    if (!isValid) showSection2Error(`Missing: ${firstMissing}`);
    else showSection2Error("");

    // Save validity state
    if (state) state.updateValidation("section2", isValid);

    return isValid;
}

export function validateSection3(elements, state) {
    let isValid = true;
    if (!isRadioGroupChecked('nationality')) isValid = false;
    if (!isRadioGroupChecked('monthlyIncome')) isValid = false;
    if (!isRadioGroupChecked('monthlyExpense')) isValid = false;
    if (!isRadioGroupChecked('businessRisk')) isValid = false;
    if (!isRadioGroupChecked('recommendBusiness')) isValid = false;

    const biggestIssuesChecked = isCheckboxGroupChecked('biggestIssues');
    const isOtherValid = isOtherTextInputValid(elements.issueOtherCheckboxFinal, elements.otherIssueSpecifyFinal);
    if (!biggestIssuesChecked && !isOtherValid) isValid = false;
    
    if (elements.submitButtonFinal) {
        elements.submitButtonFinal.disabled = !isValid;
        if (isValid) {
            elements.submitButtonFinal.classList.remove('opacity-50', 'cursor-not-allowed');
            elements.submitButtonFinal.classList.add('hover:scale-105');
        } else {
            elements.submitButtonFinal.classList.add('opacity-50', 'cursor-not-allowed');
            elements.submitButtonFinal.classList.remove('hover:scale-105');
        }
    }
    if (state) state.updateValidation('section3', isValid);
    return isValid;
}

export function setupSection2ValidationListeners(elements, currentParticipantType, state) {
    const validationTargets = document.querySelectorAll('#section2 input, #section2 select, #section2 textarea');
    validationTargets.forEach(input => {
        if (!input.id.includes('_reason')) {
            input.addEventListener('change', () => validateSection2(currentParticipantType, elements, state));
            if (input.type === 'text' || input.tagName === 'TEXTAREA') {
                input.addEventListener('input', () => validateSection2(currentParticipantType, elements, state));
            }
        }
    });
}

export function setupSection3ValidationListeners(elements, state) {
    document.querySelectorAll('#section3 input, #section3 select').forEach(input => {
        if (input.id !== 'otherIssueSpecifyFinal') {
            input.addEventListener('change', () => validateSection3(elements, state));
        }
    });
    if (elements.otherIssueSpecifyFinal) {
        elements.otherIssueSpecifyFinal.addEventListener('input', () => validateSection3(elements, state));
    }
}

export function collectSection2Data(currentParticipantType, elements) {
    const data = {};
    const getRadioValue = (name) => document.querySelector(`input[name="${name}"]:checked`)?.value;
    const getCheckedValues = (name) => Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);

    data.participantType = currentParticipantType;
    // ... (rest of data collection remains same as your snippet)
    return data;
}

export function collectSection3Data(elements) {
    const data = {};
    const getRadioValue = (name) => document.querySelector(`input[name="${name}"]:checked`)?.value;
    const getCheckedValues = (name) => Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);

    data.nationality = getRadioValue('nationality');
    data.monthlyIncome = getRadioValue('monthlyIncome');
    data.monthlyExpense = getRadioValue('monthlyExpense');
    data.businessRisk = getRadioValue('businessRisk');
    data.biggestIssues = getCheckedValues('biggestIssues');
    data.otherIssueSpecifyFinal = elements.otherIssueSpecifyFinal?.value;
    data.recommendBusiness = getRadioValue('recommendBusiness');

    return data;
}