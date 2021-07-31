import { group } from './search'

test('groups objects by key', () => {

    const crimes = [
        { "category": "anti-social-behaviour", "id": 1 },
        { "category": "burglary", "id": 2 },
        { "category": "burglary", "id": 3 },
        { "category": "vehicle-crime", "id": 4 },
        { "category": "vehicle-crime", "id": 5 },
        { "category": "vehicle-crime", "id": 6 }
    ]

    const grouped = group(crimes, crime => crime.category);

    var keys = Array.from(grouped.keys());;
    expect(keys).toEqual(["anti-social-behaviour", "burglary", "vehicle-crime"]);
    expect(grouped.get("anti-social-behaviour")).toEqual(1);
    expect(grouped.get("burglary")).toEqual(2);
    expect(grouped.get("vehicle-crime")).toEqual(3);
});