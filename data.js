// --- data.js ---

// Comprehensive data structure for South African provinces and their geographical areas
export const regionsData = {
    "Eastern Cape": {
        "Central": ["Gqeberha", "Ibhayi", "Despatch"],
        "East": ["Jeffreys Bay", "Humansdorp", "St Francis Bay"],
        "North": ["Makhanda", "Alicedale", "Riebeek East"],
        "South": ["East London", "King William's Town", "Mdantsane"],
        "West": ["Port Alfred", "Kariega", "Bathurst"]
    },
    "Free State": {
        "Central": ["Bloemfontein", "Heidedal", "Universitas"],
        "East": ["Smithfield", "Philippolis", "Trompsburg"],
        "North": ["Welkom", "Virginia", "Odendaalsrus"],
        "South": ["Bethulie", "Gariepdam", "Zastron"],
        "West": ["Parys", "Kroonstad", "Sasolburg"]
    },
    "Gauteng": {
        "Central": ["Johannesburg CBD", "Braamfontein", "Newtown"],
        "East": ["Bedfordview", "Boksburg", "Kempton Park"],
        "West": ["Roodepoort", "Soweto", "Krugersdorp"],
        "North": ["Sandton", "Fourways", "Pretoria"],
        "South": ["Alberton", "Vereeniging", "Midvaal"]
    },
    "KwaZulu-Natal": {
        "Central": ["Durban", "Umhlanga", "Montclair"],
        "East": ["Amanzimtoti", "Umkomaas", "Scottburgh"],
        "North": ["Pietermaritzburg", "Richmond", "Greytown"],
        "South": ["Port Shepstone", "Margate", "Hibberdene"],
        "West": ["Howick", "Mooi River", "Estcourt"]
    },
    "Limpopo": {
        "Central": ["Polokwane", "Seshego", "Fauna Park"],
        "East": ["Tzaneen", "Letsitele", "Haenertsburg"],
        "North": ["Musina", "Beitbridge border town", "Alldays"],
        "South": ["Burgersfort", "Mashishing (Lydenburg)", "Steelpoort"],
        "West": ["Thabazimbi", "Lephalale", "Modimolle"]
    },
    "Mpumalanga": {
        "Central": ["Mbombela (Nelspruit)", "Riverside", "Riverside Park"],
        "East": ["White River", "Hazyview", "Bushbuckridge"],
        "North": ["Mkhondo (Piet Retief)", "Ermelo", "Piet Retief"],
        "South": ["Barberton", "Sabie", "Graskop"],
        "West": ["Middelburg", "Witbank (eMalahleni)", "Hendrina"]
    },
    "Northern Cape": {
        "Central": ["Kimberley", "Beaconsfield", "Galeshewe"],
        "East": ["Colesberg", "Norvalspont", "Venterstad"],
        "North": ["Kuruman", "Danielskuil", "Kathu"],
        "South": ["Upington", "Kakamas", "Keimoes"],
        "West": ["Springbok", "Hondeklip Bay", "Nieuwoudtville"]
    },
    "North West": {
        "Central": ["Klerksdorp", "Mafikeng", "Jouberton"],
        "East": ["Potchefstroom", "Orkney", "Stilfontein"],
        "North": ["Brits", "Rustenburg", "Sun City"],
        "South": ["Ventersdorp", "Wolmaransstad", "Schweizer-Reneke"],
        "West": ["Vryburg", "Itsoseng", "Ramatlabama"]
    },
    "Western Cape": {
        "Central": ["Cape Town CBD", "Woodstock", "Gardens"],
        "East": ["Bellville", "Goodwood", "Brackenfell"],
        "South": ["Somerset West", "Stellenbosch", "Strand"],
        "West": ["Milnerton", "Tableview", "Melkbosstrand"],
        "North": ["Paarl", "Wellington", "Stellenbosch outskirts"]
    }
};

// Motorcycle models available in South Africa
export const motorcycleModels = [
    "Big Boy Velocity",
    "Honda Ace",
    "Eco150",
    "Suzuki Scooter",
    "Honda Scooter",
    "Yamaha",
    "Bajaj Pulsar",
    "KTM Duke",
    "Kawasaki Ninja",
    "TVS Apache",
    "Royal Enfield",
    "Other"
];

// Experience levels
export const experienceLevels = [
    { value: "1_year_less", label: "1 year or less (New to the business)" },
    { value: "1_3_years", label: "1 to 3 years (Knows the business well)" },
    { value: "3_years_plus", label: "3 years+ (Very Experienced)" }
];

// Income apps
export const incomeApps = [
    { value: "uber_eats", label: "Uber Eats" },
    { value: "mr_d", label: "Mr. D" },
    { value: "zulzi", label: "Zulzi" },
    { value: "picup", label: "Picup" },
    { value: "bolt_food", label: "Bolt Food" },
    { value: "checkers", label: "Checkers 60" },
    { value: "picnpay", label: "Pic 'n Pay" },
    { value: "woolworths", label: "Woolworths" },
    { value: "other_delivery", label: "Another delivery application" }
];

// Motorcycle types
export const bikeTypes = [
    { value: "manual", label: "Manual" },
    { value: "automatic", label: "Automatic" }
];

// Rental frequency options
export const rentalFrequencies = [
    { value: "Every week", label: "Every week" },
    { value: "Every two weeks", label: "Every two weeks" },
    { value: "Every month", label: "Every month" },
    { value: "Every 3 months", label: "Every 3 months" },
    { value: "Every 6 months", label: "Every 6 months" },
    { value: "6 months+", label: "6 months+" }
];

// Cash up consistency options
export const cashUpOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" }
];

// Rent-to-buy options
export const rentToBuyOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" }
];

// Number of bikes options
export const numberOfBikesOptions = [
    { value: "1-2", label: "1 - 2 motorcycles" },
    { value: "3-5", label: "3 - 5 motorcycles" },
    { value: "6-10", label: "6 - 10 motorcycles" },
    { value: "10+", label: "10+ motorcycles" }
];

// Rental option types
export const rentalOptionTypes = [
    { value: "rent_only", label: "Rent Only" },
    { value: "rent_to_buy", label: "Rent-to-Buy" },
    { value: "both", label: "Both" }
];

// Rental price ranges
export const rentalPriceRanges = [
    { value: "<R500", label: "Less than R500" },
    { value: "R500-R550", label: "R500 - R550" },
    { value: "R550-R600", label: "R550 - R600" },
    { value: "R600-R650", label: "R600 - R650" },
    { value: "R650-R700", label: "R650 - R700" },
    { value: "R700+", label: "R700+" }
];

// Rental duration options
export const rentalDurationOptions = [
    { value: "<1_month", label: "Less than 1 month" },
    { value: "1_3_months", label: "1 - 3 months" },
    { value: "3_6_months", label: "3 - 6 months" },
    { value: "6_12_months", label: "6 - 12 months" },
    { value: "12_months_plus", label: "12 months+" }
];

// Longest rental period options
export const longestRentalOptions = [
    { value: "0_3_months", label: "0 - 3 months" },
    { value: "3_6_months", label: "3 - 6 months" },
    { value: "6_12_months", label: "6 - 12 months" },
    { value: "12_24_months", label: "12 - 24 months" },
    { value: "24_months_plus", label: "24+ months" }
];

// Documentation requirements
export const documentationOptions = [
    { value: "None", label: "None" },
    { value: "Passport/Asylum/ID", label: "Passport/Asylum/ID" },
    { value: "Proof Of Address", label: "Proof Of Address" },
    { value: "Trafic Register", label: "Traffic Register" },
    { value: "All Of Above", label: "All Of Above" },
    { value: "Other", label: "Other (please specify)" }
];

// Fix frequency options
export const fixFrequencyOptions = [
    { value: "1-3", label: "1 - 3 times" },
    { value: "3-6", label: "3 - 6 times" },
    { value: "6-10", label: "6 - 10 times" },
    { value: "10+", label: "10+ times" }
];

// Main issues options
export const mainIssuesOptions = [
    { value: "minor", label: "Minor issues (e.g., oil change, gear lever adjustment, new brake cable)" },
    { value: "medium", label: "Medium issues (e.g., sprocket/chain replacement, carburetor cleaning, clutch adjustment)" },
    { value: "major", label: "Major issues (e.g., engine tappets, crankshaft repair, full engine overhaul)" },
    { value: "other", label: "Other (please specify)" }
];

// Monthly income ranges
export const monthlyIncomeRanges = [
    { value: "<R2000", label: "Less than R2000" },
    { value: "R2000-R4000", label: "R2000 - R4000" },
    { value: "R4000-R8000", label: "R4000 - R8000" },
    { value: "R8000-R15000", label: "R8000 - R15000" },
    { value: "R15000-R25000", label: "R15000 - R25000" },
    { value: "R25000+", label: "R25000+" }
];

// Monthly expense ranges
export const monthlyExpenseRanges = [
    { value: "<R1000", label: "Less than R1000" },
    { value: "R1000-R3000", label: "R1000 - R3000" },
    { value: "R3000-R6000", label: "R3000 - R6000" },
    { value: "R6000-R12000", label: "R6000 - R12000" },
    { value: "R12000-R20000", label: "R12000 - R20000" },
    { value: "R20000+", label: "R20000+" }
];

// Business risk ratings
export const businessRiskRatings = [
    { value: "0/10", label: "Risk-Free (0/10)" },
    { value: "1-3/10", label: "Small Risk (1-3/10)" },
    { value: "4-6/10", label: "Neutral Risk (4-6/10)" },
    { value: "7-9/10", label: "Risky (7-9/10)" },
    { value: "9+/10", label: "Very Risky (9+/10)" }
];

// Biggest issues in business
export const biggestIssuesOptions = [
    { value: "Crime High - Theft", label: "Crime High - High chance of motorcycle theft" },
    { value: "Unreliable Drivers - No Cash Up", label: "Not easy to find reliable drivers - don't cash up money" },
    { value: "Unreliable Drivers - Crashing", label: "Not easy to find reliable drivers - always crashing bike" },
    { value: "Not Enough Money Generated", label: "Not enough money is generated" },
    { value: "Too Many Motorcycle Issues - Expensive Fixing", label: "Too many issues with motorcycles - makes fixing expensive" },
    { value: "Unreliable Mechanics", label: "Unreliable mechanics" },
    { value: "Too Many Bikes on the Road", label: "Too many bikes on the road (competition)" },
    { value: "Other", label: "Other (please specify)" }
];

// Recommend business options
export const recommendBusinessOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" }
];

// Nationality options
export const nationalityOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" }
];

// Role to question section mapping
export const roleQuestionMapping = {
    'driver': 'driverQuestions',
    'owner': 'ownerQuestions',
    'mechanic': 'mechanicQuestions',
    'driver_owner': 'driverOwnerQuestions',
    'mechanic_owner': 'mechanicOwnerQuestions',
    'driver_mechanic': 'driverMechanicQuestions',
    'other': 'driverQuestions'
};

// Element ID mapping for consistent access
export const elementIds = {
    // Sections
    sections: {
        section1: 'section1',
        section2: 'section2',
        section3: 'section3'
    },
    
    // Buttons
    buttons: {
        nextButton1: 'nextButton1',
        nextButton2: 'nextButton2',
        backButton2: 'backButton2',
        backButton3: 'backButton3',
        submitButtonFinal: 'submitButtonFinal'
    },
    
    // Content areas
    content: {
        section2Content: 'section2Content',
        section3Content: 'section3Content'
    },
    
    // Role sections
    roleSections: {
        driver: 'driverQuestions',
        owner: 'ownerQuestions',
        mechanic: 'mechanicQuestions',
        driver_owner: 'driverOwnerQuestions',
        mechanic_owner: 'mechanicOwnerQuestions',
        driver_mechanic: 'driverMechanicQuestions'
    }
};

// Default form values for reset
export const defaultFormValues = {
    select: "",
    radio: null,
    checkbox: [],
    text: ""
};

// Validation messages
export const validationMessages = {
    required: "This field is required",
    selectProvince: "Please select your province",
    selectArea: "Please select your geographical area",
    selectModel: "Please select a motorcycle model",
    selectExperience: "Please select your experience level",
    selectAtLeastOne: "Please select at least one option",
    enterText: "Please enter text for 'Other' option"
};

// Helper function to get all provinces
export function getAllProvinces() {
    return Object.keys(regionsData);
}

// Helper function to get areas for a province
export function getAreasForProvince(province) {
    return regionsData[province] ? Object.keys(regionsData[province]) : [];
}

// Helper function to get towns for area
export function getTownsForArea(province, area) {
    return regionsData[province] && regionsData[province][area] 
        ? regionsData[province][area] 
        : [];
}

// Helper to create option elements
export function createOptions(data, defaultValue = "") {
    return data.map(item => {
        if (typeof item === 'string') {
            return `<option value="${item}" ${item === defaultValue ? 'selected' : ''}>${item}</option>`;
        } else {
            return `<option value="${item.value}" ${item.value === defaultValue ? 'selected' : ''}>${item.label}</option>`;
        }
    }).join('');
}

// Helper to create radio/checkbox elements
export function createChoiceElements(data, type, name, checkedValues = []) {
    return data.map((item, index) => {
        const id = `${name}_${item.value}_${index}`;
        const isChecked = checkedValues.includes(item.value);
        
        return `
            <label for="${id}" class="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-all duration-200 border border-gray-200">
                <input type="${type}" id="${id}" name="${name}" value="${item.value}" 
                    class="${type === 'radio' ? 'form-radio' : 'form-checkbox'} h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    ${isChecked ? 'checked' : ''}>
                <span class="ml-3 text-base text-gray-700">${item.label}</span>
            </label>
        `;
    }).join('');
}