import * as ApiClient from './api-client.js';
import {search} from './search.js'

function trySearch() {

    let form = document.getElementById("search-form");
    if(form.checkValidity()) {
        search();
    }

}

function setCoords(name, lat, lng) {

    document.getElementById("location").value = name;
    document.getElementById("lat").value = lat;
    document.getElementById("lng").value = lng;

    trySearch();
}

async function setLastUpdated() {

    let lastUpdated = await ApiClient.getLastUpdated();
    let lastUpdatedMonth = lastUpdated.date.substring(0, 7);

    document.getElementById("date").value = lastUpdatedMonth;
    document.getElementById("date").max = lastUpdatedMonth;
}

function initAutocomplete() {

    const input = document.getElementById("location");

    const options = {
        componentRestrictions: { country: "gb" },
        fields: ["geometry", "name"],
        strictBounds: false,
        types: ['(regions)']
      };

      const autocomplete = new google.maps.places.Autocomplete(input, options);

      autocomplete.addListener("place_changed", () => {

        const place = autocomplete.getPlace();
        const location = place.geometry.location;
        setCoords(place.name, location.lat(), location.lng());

    });
}

function geolocate() {

    navigator.geolocation.getCurrentPosition(function (position) {
        setCoords("My Location", position.coords.latitude, position.coords.longitude);
    });

}

document.getElementById("geolocate").addEventListener("click", geolocate);
document.getElementById("date").addEventListener("change", trySearch);
document.getElementById("location").addEventListener("focus", function() {
    this.value = "";
})

setLastUpdated();
initAutocomplete();