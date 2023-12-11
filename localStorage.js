// Function to save user preferences in local storage
function saveUserPreferences(preferences) {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

// Function to retrieve user preferences from local storage
function getUserPreferences() {
    const preferencesString = localStorage.getItem('userPreferences');
    return preferencesString ? JSON.parse(preferencesString) : {};
}
