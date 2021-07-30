import * as ApiClient from './api-client.js';

 export async function search() {

    let lat = document.getElementById("lat").value;
    let lng = document.getElementById("lng").value;
    let date = document.getElementById("date").value;

    let categories = await ApiClient.getCrimeCategories(date);
    categories = group(categories, "url");

    let crimes = await ApiClient.getStreetLevelCrimes(lat, lng, date);
    crimes = group(crimes, "category");

    show(crimes, categories);
}

export function group(data, key) {
    return data.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}

function show(crimes, categories) {

    let table = document.querySelector("#results");
    let tbody = document.querySelector("tbody");

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    let template = document.querySelector('template');

    for (var category in crimes) {

        let clone = template.content.cloneNode(true);
        let td = clone.querySelectorAll("td");

        td[0].textContent = categories[category][0].name;
        td[1].textContent = crimes[category].length;

        tbody.appendChild(clone);

    }

    table.hidden = false;
    table.parentElement.parentElement.hidden = false;
}