// --- domHandler.js ---
import { regionsData, motorcycleModels } from './data.js';

const elements = {};

export function initializeElements() {
    // Main sections
    elements.section1 = document.getElementById('section1');
    elements.section2 = document.getElementById('section2');
    elements.section3 = document.getElementById('section3');
    
    // Buttons
    elements.nextButton1 = document.getElementById('nextButton1');
    elements.nextButton2 = document.getElementById('nextButton2');
    elements.backButton2 = document.getElementById('backButton2');
    elements.backButton3 = document.getElementById('backButton3');
    elements.submitButtonFinal = document.getElementById('submitButtonFinal');
    
    // Question sections (they exist in HTML)
    elements.driverQuestions = document.getElementById('driverQuestions');
    elements.ownerQuestions = document.getElementById('ownerQuestions');
    elements.mechanicQuestions = document.getElementById('mechanicQuestions');
    elements.driverOwnerQuestions = document.getElementById('driverOwnerQuestions');
    elements.mechanicOwnerQuestions = document.getElementById('mechanicOwnerQuestions');
    elements.driverMechanicQuestions = document.getElementById('driverMechanicQuestions');
    
    // Driver elements
    elements.appOtherCheckboxDriver = document.getElementById('app_other_driver');
    elements.otherAppSpecifyDriver = document.getElementById('otherAppSpecifyDriver');
    elements.bikeOtherRadioDriver = document.getElementById('model_other_bike_driver');
    elements.otherBikeSpecifyDriver = document.getElementById('otherBikeSpecifyDriver');
    elements.provinceDriver = document.getElementById('province_driver');
    elements.geoAreaDriver = document.getElementById('geo_area_driver');
    elements.bestBikeSelectDriver = document.getElementById('best_bike_for_business_driver_select');
    elements.otherBestBikeSpecifyDriver = document.getElementById('otherBestBikeSpecifyDriver');
    
    // Owner elements
    elements.appOtherCheckboxOwner = document.getElementById('app_owner_other');
    elements.otherAppSpecifyOwner = document.getElementById('otherAppSpecifyOwner');
    elements.provinceOwner = document.getElementById('province_owner');
    elements.geoAreaOwner = document.getElementById('geo_area_owner');
    elements.bestBikeSelectOwner = document.getElementById('best_bike_for_business_owner_select');
    elements.otherBestBikeSpecifyOwner = document.getElementById('otherBestBikeSpecifyOwner');
    elements.documentationOfDriversSelect = document.getElementById('Documentation_Of_Drivers');
    elements.otherDocumentationSpecifyDO = document.getElementById('otherBestBikeSpecifyOwnerDO'); 
    
    // Mechanic elements
    elements.issueOtherCheckboxMechanic = document.getElementById('issue_other');
    elements.otherIssueSpecifyMechanic = document.getElementById('otherIssueSpecify');
    elements.bikeOtherRadioMechanic = document.getElementById('model_other_bike_mechanic');
    elements.otherFixedBikeSpecify = document.getElementById('otherFixedBikeSpecify');
    elements.provinceMechanic = document.getElementById('province_mechanic');
    elements.geoAreaMechanic = document.getElementById('geo_area_mechanic');
    elements.bestBikeSelectMechanic = document.getElementById('best_bike_for_business_mechanic_select');
    elements.otherBestBikeSpecifyMechanic = document.getElementById('otherBestBikeSpecifyMechanic');
    
    // Driver-Owner elements
    elements.provinceDriverOwner = document.getElementById('province_driver_owner');
    elements.geoAreaDriverOwner = document.getElementById('geo_area_driver_owner');
    elements.bestBikeSelectDriverDO = document.getElementById('best_bike_for_business_driver_do_select');
    elements.otherBestBikeSpecifyDriverDO = document.getElementById('otherBestBikeSpecifyDriverDO');
    elements.bestBikeSelectOwnerDO = document.getElementById('best_bike_for_business_owner_do_select');
    elements.otherBestBikeSpecifyOwnerDO = document.getElementById('otherBestBikeSpecifyOwnerDO');
    
    // Mechanic-Owner elements
    elements.provinceMechanicOwner = document.getElementById('province_mechanic_owner');
    elements.geoAreaMechanicOwner = document.getElementById('geo_area_mechanic_owner');
    elements.issueOtherCheckboxMO = document.getElementById('issue_other_mo');
    elements.otherIssueSpecifyMO = document.getElementById('otherIssueSpecifyMO');
    elements.bikeOtherRadioMO = document.getElementById('model_other_bike_mo');
    elements.otherFixedBikeSpecifyMO = document.getElementById('otherFixedBikeSpecifyMO');
    elements.bestBikeSelectMechanicMO = document.getElementById('best_bike_for_business_mechanic_mo_select');
    elements.otherBestBikeSpecifyMechanicMO = document.getElementById('otherBestBikeSpecifyMechanicMO');
    elements.bestBikeSelectOwnerMO = document.getElementById('best_bike_for_business_owner_mo_select');
    elements.otherBestBikeSpecifyOwnerMO = document.getElementById('otherBestBikeSpecifyOwnerMO');
    
    // Driver-Mechanic elements
    elements.provinceDriverMechanic = document.getElementById('province_driver_mechanic');
    elements.geoAreaDriverMechanic = document.getElementById('geo_area_driver_mechanic');
    elements.issueOtherCheckboxDM = document.getElementById('issue_other_dm');
    elements.otherIssueSpecifyDM = document.getElementById('otherIssueSpecifyDM');
    elements.bikeOtherRadioDM = document.getElementById('model_other_bike_dm');
    elements.otherFixedBikeSpecifyDM = document.getElementById('otherFixedBikeSpecifyDM');
    elements.bestBikeSelectDriverDM = document.getElementById('best_bike_for_business_driver_dm_select');
    elements.otherBestBikeSpecifyDriverDM = document.getElementById('otherBestBikeSpecifyDriverDM');
    elements.bestBikeSelectMechanicDM = document.getElementById('best_bike_for_business_mechanic_dm_select');
    elements.otherBestBikeSpecifyMechanicDM = document.getElementById('otherBestBikeSpecifyMechanicDM');
    
    // Final section elements
    elements.issueOtherCheckboxFinal = document.getElementById('issue_other_specify');
    elements.otherIssueSpecifyFinal = document.getElementById('otherIssueSpecifyFinal');
    
    return elements;
}

export function showSection(element) {
    if (element) element.classList.remove('hidden-section');
}

export function hideSection(element) {
    if (element) element.classList.add('hidden-section');
}

export function toggleNextButton1(participantType, nextButton1) {
    const isSelected = participantType !== '';
    if (nextButton1) {
        nextButton1.disabled = !isSelected;
        if (isSelected) {
            nextButton1.classList.remove('opacity-50', 'cursor-not-allowed');
            nextButton1.classList.add('hover:scale-105');
        } else {
            nextButton1.classList.add('opacity-50', 'cursor-not-allowed');
            nextButton1.classList.remove('hover:scale-105');
        }
    }
}

export function hideAllQuestions(roleQuestionMap) {
  // Flatten roleQuestionMap values (strings or arrays) into one list of IDs
  const allIds = new Set();
  Object.values(roleQuestionMap).forEach((val) => {
    if (Array.isArray(val)) val.forEach((id) => allIds.add(id));
    else allIds.add(val);
  });

  allIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) hideSection(el);
  });
}

export function showQuestionsForRole(role, roleQuestionMap) {
  hideAllQuestions(roleQuestionMap);

  const ids = roleQuestionMap[role];
  if (!ids) return;

  const list = Array.isArray(ids) ? ids : [ids];
  list.forEach((id) => {
    const el = document.getElementById(id);
    if (el) showSection(el);
  });

  // After showing, hide duplicate questions for combo roles
  applyComboRoleHiding(role);
}

function populateGeoAreas(provinceSelect, geoAreaSelect, validationCallback) {
    if (!provinceSelect || !geoAreaSelect) return;
    const selectedProvince = provinceSelect.value;
    geoAreaSelect.innerHTML = '<option value="">Select an Area</option>';
    if (selectedProvince && regionsData[selectedProvince]) {
        const areas = regionsData[selectedProvince];
        for (const area in areas) {
            const towns = areas[area].join(", ");
            const option = document.createElement('option');
            option.value = `${selectedProvince.replace(/\s/g, '_')}_${area.replace(/\s/g, '_')}`;
            option.textContent = `${area} (e.g., ${towns})`;
            geoAreaSelect.appendChild(option);
        }
        geoAreaSelect.disabled = false;
    } else {
        geoAreaSelect.disabled = true;
    }
    if (validationCallback) validationCallback();
}

export function resetGeoAreas(elements) {
    const fields = [
        [elements.provinceDriver, elements.geoAreaDriver],
        [elements.provinceOwner, elements.geoAreaOwner],
        [elements.provinceMechanic, elements.geoAreaMechanic],
        [elements.provinceDriverOwner, elements.geoAreaDriverOwner],
        [elements.provinceMechanicOwner, elements.geoAreaMechanicOwner],
        [elements.provinceDriverMechanic, elements.geoAreaDriverMechanic]
    ];
    fields.forEach(([p, g]) => {
        if (p) p.value = '';
        if (g) { g.innerHTML = '<option value="">Select an Area</option>'; g.disabled = true; }
    });
}

export function setupDynamicListeners(elements, validationCallback) {
    const fields = [
        [elements.provinceDriver, elements.geoAreaDriver],
        [elements.provinceOwner, elements.geoAreaOwner],
        [elements.provinceMechanic, elements.geoAreaMechanic],
        [elements.provinceDriverOwner, elements.geoAreaDriverOwner],
        [elements.provinceMechanicOwner, elements.geoAreaMechanicOwner],
        [elements.provinceDriverMechanic, elements.geoAreaDriverMechanic]
    ];
    fields.forEach(([p, g]) => {
        if (p) p.addEventListener('change', () => populateGeoAreas(p, g, validationCallback));
        if (g) g.addEventListener('change', validationCallback);
    });
}

function populateBestBikeSelect(selectElement) {
    if (!selectElement) return;
    selectElement.innerHTML = '<option value="">Select a Motorcycle Model</option>';
    motorcycleModels.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        selectElement.appendChild(option);
    });
}

function setupBestBikeSelectListener(select, otherInput, callback) {
    if (!select || !otherInput) return;
    select.addEventListener('change', () => {
        const isOther = select.value === 'Other';
        otherInput.disabled = !isOther;
        if (isOther) otherInput.focus(); else otherInput.value = '';
        if (callback) callback();
    });
}

export function populateAllBestBikeSelects(elements, callback) {
    const fields = [
        [elements.bestBikeSelectDriver, elements.otherBestBikeSpecifyDriver],
        [elements.bestBikeSelectOwner, elements.otherBestBikeSpecifyOwner],
        [elements.bestBikeSelectMechanic, elements.otherBestBikeSpecifyMechanic],
        [elements.bestBikeSelectDriverDO, elements.otherBestBikeSpecifyDriverDO],
        [elements.bestBikeSelectOwnerDO, elements.otherBestBikeSpecifyOwnerDO],
        [elements.bestBikeSelectMechanicMO, elements.otherBestBikeSpecifyMechanicMO],
        [elements.bestBikeSelectOwnerMO, elements.otherBestBikeSpecifyOwnerMO],
        [elements.bestBikeSelectDriverDM, elements.otherBestBikeSpecifyDriverDM],
        [elements.bestBikeSelectMechanicDM, elements.otherBestBikeSpecifyMechanicDM],
        [elements.documentationOfDriversSelect, elements.otherDocumentationSpecifyDO]
    ];
    fields.forEach(([s, o]) => {
        if (s && s.id.includes('best_bike_for_business')) populateBestBikeSelect(s);
        setupBestBikeSelectListener(s, o, callback);
    });
}

export function setupAllOtherSpecifyListeners(elements, callback) {
    const fields = [
        [elements.appOtherCheckboxDriver, elements.otherAppSpecifyDriver],
        [elements.bikeOtherRadioDriver, elements.otherBikeSpecifyDriver],
        [elements.appOtherCheckboxOwner, elements.otherAppSpecifyOwner],
        [elements.issueOtherCheckboxMechanic, elements.otherIssueSpecifyMechanic],
        [elements.bikeOtherRadioMechanic, elements.otherFixedBikeSpecify],
        [elements.issueOtherCheckboxMO, elements.otherIssueSpecifyMO],
        [elements.bikeOtherRadioMO, elements.otherFixedBikeSpecifyMO],
        [elements.issueOtherCheckboxDM, elements.otherIssueSpecifyDM],
        [elements.bikeOtherRadioDM, elements.otherFixedBikeSpecifyDM],
        [elements.issueOtherCheckboxFinal, elements.otherIssueSpecifyFinal]
    ];
    fields.forEach(([trigger, controlled]) => {
        if (trigger && controlled) {
            trigger.addEventListener('change', (e) => {
                controlled.disabled = !e.target.checked;
                if (e.target.checked) controlled.focus(); else controlled.value = '';
                if (callback) callback();
            });
        }
    });
}

export function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('hidden-section');
        modal.classList.add('fade-in');
    }
}

export function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden-section');
    }
}

export function showSectionError(sectionId, message) {
    const errorDiv = document.getElementById(`${sectionId}Error`);
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        
        // Scroll to error
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

export function clearSectionError(sectionId) {
    const errorDiv = document.getElementById(`${sectionId}Error`);
    if (errorDiv) {
        errorDiv.classList.add('hidden');
        errorDiv.textContent = '';
    }
}

export function clearAllErrors() {
    clearSectionError('section1');
    clearSectionError('section2');
    clearSectionError('section3');
}

function getQuestionWrapperByControlId(controlId) {
  const el = document.getElementById(controlId);
  if (!el) return null;

  // Only allow hiding/showing a "question block":
  // a div that is a DIRECT child of .space-y-8
  const wrapper = el.closest('.space-y-8 > div');
  return wrapper || null;
}

function hideQuestionByControlId(controlId) {
  const wrapper = getQuestionWrapperByControlId(controlId);
  if (!wrapper) return;
  wrapper.classList.add('hidden-section');
}

function showQuestionByControlId(controlId) {
  const wrapper = getQuestionWrapperByControlId(controlId);
  if (!wrapper) return;
  wrapper.classList.remove('hidden-section');
}


export function applyComboRoleHiding(role) {

    const comboRoles = [
    "driver_owner",
    "mechanic_owner",
    "driver_mechanic",
    "other"
    ];

    const title = document.getElementById("section2Title");

    if (comboRoles.includes(role)) {
        if (title) title.textContent = "Required Questions";
        setRoleHeadingsVisibility(false);
    } else {
        if (title) title.textContent = "Additional Questions";
        setRoleHeadingsVisibility(true);
    }

  // First: reset (make sure everything visible again)
  [
    // owner common
    "province_owner", "geo_area_owner", "exp_new_owner", "app_owner_uber_eats",
    // owner best bike
    "best_bike_for_business_owner_select",

    // mechanic common
    "province_mechanic", "geo_area_mechanic", "exp_new_mechanic",
    // mechanic best bike (if you have it in mechanic section)
    "best_bike_for_business_mechanic_select",
  ].forEach(showQuestionByControlId);

  if (role === "driver_owner") {
    // Hide owner's duplicates (driver will supply shared)
    ["province_owner", "geo_area_owner", "exp_new_owner", "app_owner_uber_eats", "best_bike_for_business_owner_select"]
      .forEach(hideQuestionByControlId);
  }

  if (role === "mechanic_owner") {
    // Hide owner's duplicates (mechanic will supply shared)
    ["province_owner", "geo_area_owner", "exp_new_owner", "app_owner_uber_eats", "best_bike_for_business_owner_select"]
      .forEach(hideQuestionByControlId);
  }

  if (role === "driver_mechanic") {
    // Hide mechanic duplicates (driver supplies shared)
    ["province_mechanic", "geo_area_mechanic", "exp_new_mechanic", "best_bike_for_business_mechanic_select"]
      .forEach(hideQuestionByControlId);
  }

  if (role === "other") {
    // All three: share from driver, so hide owner + mechanic duplicates
    ["province_owner", "geo_area_owner", "exp_new_owner", "app_owner_uber_eats", "best_bike_for_business_owner_select"]
      .forEach(hideQuestionByControlId);

    ["province_mechanic", "geo_area_mechanic", "exp_new_mechanic", "best_bike_for_business_mechanic_select"]
      .forEach(hideQuestionByControlId);
  }

  renumberSection2Questions();
}

function setRoleHeadingsVisibility(show) {
  const headings = document.querySelectorAll(
    '#driverQuestions > h3, #ownerQuestions > h3, #mechanicQuestions > h3'
  );

  headings.forEach(h => {
    if (show) {
      h.classList.remove('hidden-section');
    } else {
      h.classList.add('hidden-section');
    }
  });
}

export function renumberSection2Questions() {
  // We only renumber "question cards" which are direct children of .space-y-8
  const blocks = document.querySelectorAll(
    '#driverQuestions .space-y-8 > div, ' +
    '#ownerQuestions .space-y-8 > div, ' +
    '#mechanicQuestions .space-y-8 > div'
  );

  // Keep only the blocks that are visible
  const visibleBlocks = Array.from(blocks).filter(
    (b) => !b.classList.contains('hidden-section')
  );

  let n = 1;

  visibleBlocks.forEach((block) => {
    // Grab ALL labels inside the block and pick the "question prompt" label.
    // The prompt label is the one that starts with "number. " (e.g., "10. ...")
    const labels = Array.from(block.querySelectorAll('label'));

    const promptLabel = labels.find((lbl) =>
      /^\s*\d+\.\s+/.test(lbl.textContent || "")
    );

    if (!promptLabel) return;

    // Replace only the leading number part (e.g., "10. " -> "1. ")
    promptLabel.textContent = promptLabel.textContent.replace(
      /^\s*\d+\.\s+/,
      `${n}. `
    );

    n += 1;
  });
}