import * as ApiClient from './api-client.js';
import { group } from './util.js'

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

async function search() {

    let lat = document.getElementById("lat").value;
    let lng = document.getElementById("lng").value;
    let date = document.getElementById("date").value;

    let categories = await ApiClient.getCrimeCategories(date);
    categories = group(categories, "url");

    let crimes = await ApiClient.getStreetLevelCrimes(lat, lng, date);
    crimes = group(crimes, "category");

    show(crimes, categories);
}

document.getElementById("search").addEventListener("click", function (e) {
    let form = document.getElementById("search-form");
    if (form.reportValidity()) {
        search();
    }
});

document.getElementById("geolocate").addEventListener("click", function () {

    navigator.geolocation.getCurrentPosition(function (position) {

        document.getElementById("lat").value = position.coords.latitude.toFixed(5);
        document.getElementById("lng").value = position.coords.longitude.toFixed(5);
        document.getElementById("location").value = "My Location";

    });

});

document.getElementById("location").addEventListener("focus", function() {
    this.value = "";
})

async function setLastUpdated() {

    let lastUpdated = await ApiClient.getLastUpdated();
    let lastUpdatedMonth = lastUpdated.date.substring(0, 7);

    document.getElementById("date").value = lastUpdatedMonth;
    document.getElementById("date").max = lastUpdatedMonth;
}

setLastUpdated();