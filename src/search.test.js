import { group } from './util.js'

test('groups an empty array to an empty object', () => {

    const data = [];

    const grouped = group(data, "category");

    expect(grouped).toEqual({});

});

test('groups objects by key', () => {

    const crimes = [
        { "category": "anti-social-behaviour", "id": 1 },
        { "category": "burglary", "id": 2 },
        { "category": "burglary", "id": 3 },
        { "category": "vehicle-crime", "id": 4 },
        { "category": "vehicle-crime", "id": 5 },
        { "category": "vehicle-crime", "id": 6 }
    ]

    const grouped = group(crimes, "category");

    var keys = Object.keys(grouped);
    expect(keys).toEqual(["anti-social-behaviour", "burglary", "vehicle-crime"]);
    expect(grouped["anti-social-behaviour"]).toContain(crimes[0]);
    expect(grouped["burglary"]).toContain(crimes[1]);
    expect(grouped["burglary"]).toContain(crimes[2]);
    expect(grouped["vehicle-crime"]).toContain(crimes[3]);
    expect(grouped["vehicle-crime"]).toContain(crimes[4]);
    expect(grouped["vehicle-crime"]).toContain(crimes[5]);
});