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

export function getStreetLevelOutcomes(lat, lng, date) {
    return getJson(`outcomes-at-location?date=${date}&lat=${lat}&lng=${lng}`);
}

function getJson(relativeUrl) {
    let url = `${baseUrl}/${relativeUrl}`;
    return fetch(url)
        .then(response => response.json())
}