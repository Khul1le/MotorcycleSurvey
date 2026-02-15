// --- stateManager.js ---

export class SurveyState {
    constructor() {
        this.state = {
            participantType: '',
            section2Data: {},
            section3Data: {},
            validation: {
                section1: false,
                section2: false,
                section3: false
            }
        };
    }

    hasSubmittedBefore() {
        return localStorage.getItem("survey_submitted") === "true";
    }

    markAsSubmitted() {
        localStorage.setItem("survey_submitted", "true");
    }

    getParticipantType() {
        return this.state.participantType;
    }

    setParticipantType(type) {
        this.state.participantType = type;
        this.state.validation.section1 = !!type;
    }

    setSection2Data(data) {
        this.state.section2Data = data;
    }

    getSection2Data() {
        return this.state.section2Data;
    }

    setSection3Data(data) {
        this.state.section3Data = data;
    }

    updateValidation(section, isValid) {
        this.state.validation[section] = isValid;
    }

    saveState() {
        localStorage.setItem('survey_state', JSON.stringify(this.state));
    }

    loadState() {
        const saved = localStorage.getItem('survey_state');
        if (saved) {
            this.state = JSON.parse(saved);
            return this.state;
        }
        return null;
    }

    clearState() {
        localStorage.removeItem('survey_state');
        this.state = new SurveyState().state;
    }
}

export function updateProgressBar(section) {
    const progressBar = document.getElementById('progressBar');
    const steps = {
        'section1': { width: '0%', step: 1 },
        'section2': { width: '50%', step: 2 },
        'section3': { width: '100%', step: 3 }
    };

    const current = steps[section];
    if (progressBar) progressBar.style.width = current.width;

    document.querySelectorAll('.step').forEach((el, index) => {
        const stepNum = index + 1;
        el.classList.remove('active', 'completed');
        if (stepNum === current.step) el.classList.add('active');
        if (stepNum < current.step) el.classList.add('completed');
    });
}