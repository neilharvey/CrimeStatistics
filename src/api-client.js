const baseUrl = "https://data.police.uk/api"

export function getLastUpdated() {
    return getJson(`crime-last-updated`);
}

export function getCrimeCategories(date) {
    return getJson(`crime-categories?date=${date}`);
}

export function getStreetLevelCrimes(lat, lng, date) {
    return getJson(`crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${date}`);
} 

function getJson(relativeUrl) {
    return fetch(`${baseUrl}/${relativeUrl}`)
        .then(response => response.json())
}