import * as ApiClient from './api-client.js';

let categories = undefined;

export async function search() {

    let results = document.getElementById("results");
    results.hidden = false; 

    let lat = document.getElementById("lat").value;
    let lng = document.getElementById("lng").value;
    let date = document.getElementById("date").value;

    if(!categories) {
        categories = await ApiClient.getCrimeCategories(date);
    }

    showSpinner('crimes');
    ApiClient.getStreetLevelCrimes(lat, lng, date)
        .then(crimes => merge(crimes, categories))
        .then(crimes => group(crimes, crime => crime.category))
        .then(map => showPieChart('crimes', map));

    showSpinner('outcomes');
    ApiClient.getStreetLevelOutcomes(lat, lng, date)
        .then(outcomes => group(outcomes, outcome => outcome.category.name))
        .then(map => showPieChart('outcomes', map));
}

function showSpinner(id) {

    let spinner = document.getElementById("spinner");
    let clone = spinner.content.cloneNode(true);

    let target = document.getElementById(id);
    target.replaceChildren(clone);

}

function merge(crimes, categories) {

    let map = new Map();
    for (let i = 0; i < categories.length; i++) {
        map.set(categories[i].url, categories[i].name);
    }

    for (let i = 0; i < crimes.length; i++) {
        crimes[i].category = map.get(crimes[i].category);
    }

    return crimes;
}

export function group(data, keySelector) {

    let map = new Map();
    for (let i = 0; i < data.length; i++) {
        let key = keySelector(data[i]);
        let total = map.get(key) || 0;
        total++;
        map.set(key, total);
    }

    return map;
}

function showPieChart(id, map) {

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Category');
        data.addColumn('number', 'Total');

        map.forEach(function (value, key) {
            data.addRow([key, value]);
        });

        let chart = new google.visualization.PieChart(document.getElementById(id));
        let options = {
            fontName: "system-ui",
            sliceVisibilityThreshold: .03,
            pieSliceText: "value",
            chartArea: { left: '10%', top: 0, width: '80%', height: '100%' },
            legend: { position: 'right', alignment: 'center' }

        };

        chart.draw(data, options);
    }
}