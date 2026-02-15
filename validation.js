// --- validation.js ---

/**
 * Validates Section 1 (Participant Type Selection)
 */
export function validateSection1() {
    const selected = document.querySelector('input[name="participantType"]:checked');
    return selected !== null && selected.value !== "";
}

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
function isValidZaPhone(normalized) {
  return /^\+27\d{9,10}$/.test(normalized);
}


function isHidden(el) {
  return !el || !!el.closest('.hidden-section');
}

function requireSelect(selectEl) {
  if (isHidden(selectEl)) return true;           // hidden = not required
  const v = (selectEl.value || '').trim();
  return v !== "" && v !== "Docs";               // your owner docs select uses "Docs"
}

function requireRadioGroup(name) {
  const radios = Array.from(document.querySelectorAll(`input[name="${name}"]`));
  if (radios.length === 0) return true;          // no such group = don't block
  const anyVisible = radios.some(r => !isHidden(r));
  if (!anyVisible) return true;                  // hidden group = not required
  return !!document.querySelector(`input[name="${name}"]:checked`);
}

function requireCheckboxGroup(name) {
  const boxes = Array.from(document.querySelectorAll(`input[name="${name}"]`));
  if (boxes.length === 0) return true;
  const anyVisible = boxes.some(b => !isHidden(b));
  if (!anyVisible) return true;
  return document.querySelectorAll(`input[name="${name}"]:checked`).length > 0;
}

function requireOtherTextIfRadioChecked(radioId, textEl) {
  const r = document.getElementById(radioId);
  if (!r) return true;
  if (isHidden(r)) return true;
  if (r.checked) return !!(textEl && textEl.value.trim());
  return true;
}

function requireOtherTextIfCheckboxChecked(checkboxId, textId) {
  const cb = document.getElementById(checkboxId);
  const txt = document.getElementById(textId);
  if (!cb) return true;
  if (isHidden(cb)) return true;
  if (cb.checked) return !!(txt && txt.value.trim());
  return true;
}

function requireOtherTextIfSelectOther(selectEl, textEl) {
  if (isHidden(selectEl)) return true;
  if ((selectEl.value || '') === "Other") return !!(textEl && textEl.value.trim());
  return true;
}

function validateDriverCore(elements) {
  return (
    requireSelect(elements.provinceDriver) &&
    requireSelect(elements.geoAreaDriver) &&
    requireRadioGroup("experienceLevelDriver") &&
    requireCheckboxGroup("incomeAppsDriver") &&
    requireRadioGroup("bikeTypePreferenceDriver") &&
    requireRadioGroup("currentBikeModelDriver") &&
    requireOtherTextIfRadioChecked("model_other_bike_driver", elements.otherBikeSpecifyDriver) &&
    requireSelect(elements.bestBikeSelectDriver) &&
    requireOtherTextIfSelectOther(elements.bestBikeSelectDriver, elements.otherBestBikeSpecifyDriver)
  );
}

function validateOwnerCore(elements) {
  return (
    requireSelect(elements.provinceOwner) &&
    requireSelect(elements.geoAreaOwner) &&
    requireRadioGroup("experienceLevelOwner") &&
    requireCheckboxGroup("incomeAppsOwner") &&
    requireOtherTextIfCheckboxChecked("app_owner_other", "otherAppSpecifyOwner") &&
    requireRadioGroup("numBikesRented") &&
    requireRadioGroup("rentalOptionType") &&
    requireRadioGroup("rentalPrice") &&
    requireRadioGroup("avgRentalDuration") &&
    requireRadioGroup("longestRentalPeriod") &&
    requireSelect(elements.documentationOfDriversSelect) &&
    requireOtherTextIfSelectOther(elements.documentationOfDriversSelect, elements.otherDocumentationSpecifyDO) &&
    requireSelect(elements.bestBikeSelectOwner) &&
    requireOtherTextIfSelectOther(elements.bestBikeSelectOwner, elements.otherBestBikeSpecifyOwner)
    // Owner reasons optional -> DO NOT validate them ✅
  );
}

function validateMechanicCore(elements) {
  // mechanic best bike select id differs; use whatever exists
  const bestBikeSelect =
    document.getElementById("best_bike_for_business_mechanic_dm_select") ||
    document.getElementById("best_bike_for_business_mechanic_select");

  const bestBikeOther =
    document.getElementById("otherBestBikeSpecifyMechanicDM") ||
    document.getElementById("otherBestBikeSpecifyMechanic");

  return (
    requireSelect(elements.provinceMechanic) &&
    requireSelect(elements.geoAreaMechanic) &&
    requireRadioGroup("experienceLevelMechanic") &&
    requireRadioGroup("fixFrequency") &&
    requireCheckboxGroup("mainIssues") &&
    requireOtherTextIfCheckboxChecked("issue_other", "otherIssueSpecify") &&
    requireRadioGroup("mostFixedBikeModel") &&
    requireOtherTextIfRadioChecked("model_other_bike_mechanic", document.getElementById("otherFixedBikeSpecify")) &&
    // if best bike select exists/visible, require it:
    (bestBikeSelect ? requireSelect(bestBikeSelect) : true) &&
    (bestBikeSelect ? requireOtherTextIfSelectOther(bestBikeSelect, bestBikeOther) : true)
  );
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
  // Always use the latest role (not a stale value)
  const role = state?.getParticipantType?.() || currentParticipantType;
  if (!role) return false;

  let isValid = false;

  switch (role) {
    case "driver":
      isValid = validateDriverCore(elements);
      break;

    case "owner":
      isValid = validateOwnerCore(elements);
      break;

    case "mechanic":
      isValid = validateMechanicCore(elements);
      break;

    case "driver_owner":
      isValid = validateDriverCore(elements) && validateOwnerCore(elements);
      break;

    case "driver_mechanic":
      isValid = validateDriverCore(elements) && validateMechanicCore(elements);
      break;

    case "mechanic_owner":
      isValid = validateMechanicCore(elements) && validateOwnerCore(elements);
      break;

    case "other":
      isValid =
        validateDriverCore(elements) &&
        validateOwnerCore(elements) &&
        validateMechanicCore(elements);
      break;
  }

  // Toggle BOTH Next buttons (top + sticky)
  document.querySelectorAll('[data-nav="next2"]').forEach((btn) => {
    btn.disabled = !isValid;
    btn.classList.toggle("opacity-50", !isValid);
    btn.classList.toggle("cursor-not-allowed", !isValid);
  });

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
    
    // NEW required Section 3 questions
    if (!isCheckboxGroupChecked('bestEarningPlatforms')) isValid = false;
    if (!isOtherTextInputValid(elements.bestPlatformOtherCheckbox, elements.bestPlatformOtherSpecify)) isValid = false;

    if (!isRadioGroupChecked('bestRentalModel')) isValid = false;

    if (!isCheckboxGroupChecked('findOpportunities')) isValid = false;
    if (!isOtherTextInputValid(elements.findOtherCheckbox, elements.findOtherSpecify)) isValid = false;

    if (!isRadioGroupChecked('mostImportantFactor')) isValid = false;
    if (!isOtherTextInputValid(elements.factorOtherRadio, elements.factorOtherSpecify)) isValid = false;

    if (!isRadioGroupChecked('growthChallenge')) isValid = false;
    if (!isOtherTextInputValid(elements.growthOtherRadio, elements.growthOtherSpecify)) isValid = false;

    if (!isRadioGroupChecked('businessChangeLastYear')) isValid = false;

    if (!isRadioGroupChecked('investMore')) isValid = false;

    // Phone required (do this BEFORE enabling submit)
    const phoneRaw = elements.phoneNumber?.value || "";
    const phoneNorm = normalizeZaPhone(phoneRaw);
    const phoneOk = isValidZaPhone(phoneNorm);

    if (!phoneOk) isValid = false;

    if (elements.phoneError) {
      if (!phoneOk) {
        elements.phoneError.textContent = "Please enter a valid South African phone number (e.g. 0812345678).";
        elements.phoneError.classList.remove("hidden");
      } else {
        elements.phoneError.textContent = "";
        elements.phoneError.classList.add("hidden");
      }
    }

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
            input.addEventListener('change', () => validateSection2(state.getParticipantType(), elements, state));
            if (input.type === 'text' || input.tagName === 'TEXTAREA') {
               input.addEventListener('input', () => validateSection2(state.getParticipantType(), elements, state));
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

    if (elements.phoneNumber) {
      elements.phoneNumber.addEventListener('input', () => validateSection3(elements, state));
    }

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

    data.bestEarningPlatforms = getCheckedValues('bestEarningPlatforms');
    data.bestPlatformOtherSpecify = elements.bestPlatformOtherSpecify?.value;

    data.bestRentalModel = getRadioValue('bestRentalModel');

    data.findOpportunities = getCheckedValues('findOpportunities');
    data.findOtherSpecify = elements.findOtherSpecify?.value;

    data.mostImportantFactor = getRadioValue('mostImportantFactor');
    data.factorOtherSpecify = elements.factorOtherSpecify?.value;

    data.growthChallenge = getRadioValue('growthChallenge');
    data.growthOtherSpecify = elements.growthOtherSpecify?.value;

    data.businessChangeLastYear = getRadioValue('businessChangeLastYear');

    data.investMore = getRadioValue('investMore');

    data.phoneNumber = elements.phoneNumber?.value;

    return data;
}