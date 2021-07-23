(function () {

    // api

    function getStreetLevelCrimes(lat, lng, date) {

        return fetch(`https://data.police.uk/api/crimes-street/all-crime?date=${date}&lat=${lat}&lng=${lng}`)
            .then(response => response.json())

    }

    function getCrimesAtLocation(lat, lng, date) {

        return fetch(`https://data.police.uk/api/crimes-at-location?date=${date}&lat=${lat}&lng=${lng}`)
            .then(response => response.json())

    }

    function show(crimes) {

        let table = document.querySelector("#results");
        let tbody = document.querySelector("tbody");

        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        let template = document.querySelector('template');

        for (var category in crimes) {

            let clone = template.content.cloneNode(true);
            let td = clone.querySelectorAll("td");

            td[0].textContent = category;
            td[1].textContent = crimes[category].length;

            tbody.appendChild(clone);

        }

        table.hidden = false;

    }

    function group(xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }

    function search() {

        let lat = document.getElementById("lat").value;
        let lng = document.getElementById("lng").value;
        let date = document.getElementById("date").value;

        getStreetLevelCrimes(lat, lng, date)
            .then(data => group(data,"category"))
            .then(data => show(data));

    }

    function geolocate() {

        navigator.geolocation.getCurrentPosition(function (position) {

            document.getElementById("lat").value = position.coords.latitude.toFixed(5);
            document.getElementById("lng").value = position.coords.longitude.toFixed(5);

        });

    }

    document.getElementById("search").addEventListener("click", function (e) {
        search();
    })

    document.getElementById("geolocate").addEventListener("click", function () {
        geolocate();
    })

})();