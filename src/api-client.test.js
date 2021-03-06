import * as ApiClient from './api-client.js';
import { enableFetchMocks } from 'jest-fetch-mock'

enableFetchMocks();

beforeEach(() => {
    fetch.resetMocks();
})

test('gets latest update', async () => {

    const expected = { "date": "2011-09-01" }
    fetch.mockOnce(JSON.stringify(expected));

    const latestUpdate = await ApiClient.getLastUpdated();
    
    expect(fetch.mock.calls[0][0]).toEqual("https://data.police.uk/api/crime-last-updated");
    expect(latestUpdate).toEqual(expected);

});

test('gets crime categories', async () => {

    const expected = [
        {
            "url": "all-crime",
            "name": "All crime and ASB"
        },
        {
            "url": "burglary",
            "name": "Burglary"
        },
        {
            "url": "anti-social-behaviour",
            "name": "Anti-social behaviour"
        }
    ]

    fetch.mockOnce(JSON.stringify(expected));

    const categories = await ApiClient.getCrimeCategories("2011-08");

    expect(fetch.mock.calls[0][0]).toEqual("https://data.police.uk/api/crime-categories?date=2011-08");
    expect(categories).toEqual(expected);

});

test('gets street level crimes', async () => {

    const expected = [
        {
            "category": "anti-social-behaviour",
            "location_type": "Force",
            "location": {
                "latitude": "52.640961",
                "street": {
                    "id": 884343,
                    "name": "On or near Wharf Street North"
                },
                "longitude": "-1.126371"
            },
            "context": "",
            "outcome_status": null,
            "persistent_id": "",
            "id": 54164419,
            "location_subtype": "",
            "month": "2017-01"
        },
        {
            "category": "anti-social-behaviour",
            "location_type": "Force",
            "location": {
                "latitude": "52.633888",
                "street": {
                    "id": 883425,
                    "name": "On or near Peacock Lane"
                },
                "longitude": "-1.138924"
            },
            "context": "",
            "outcome_status": null,
            "persistent_id": "",
            "id": 54165316,
            "location_subtype": "",
            "month": "2017-01"
        }
    ]

    fetch.mockOnce(JSON.stringify(expected));

    const categories = await ApiClient.getStreetLevelCrimes(52.629729, -1.131592, "2017-01");

    expect(fetch.mock.calls[0][0]).toEqual("https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2017-01");
    expect(categories).toEqual(expected);
});

test('gets street level crimes', async () => {

    const expected = [
        {
            "category": {
                "code": "unable-to-prosecute",
                "name": "Unable to prosecute suspect"
            },
            "date": "2017-01",
            "person_id": null,
            "crime": {
                "category": "theft-from-the-person",
                "location_type": "Force",
                "location": {
                    "latitude": "52.634474",
                    "street": {
                        "id": 883498,
                        "name": "On or near Kate Street"
                    },
                    "longitude": "-1.149197"
                },
                "context": "",
                "persistent_id": "a5a98275facee535b959b236130f5ec05205869fb3d0804c9b14296fcd0bce46",
                "id": 53566126,
                "location_subtype": "ROAD",
                "month": "2016-12"
            }
        }
    ]

    fetch.mockOnce(JSON.stringify(expected));

    const categories = await ApiClient.getStreetLevelOutcomes(52.629729, -1.131592, "2017-01");

    expect(fetch.mock.calls[0][0]).toEqual("https://data.police.uk/api/outcomes-at-location?date=2017-01&lat=52.629729&lng=-1.131592");
    expect(categories).toEqual(expected);
});