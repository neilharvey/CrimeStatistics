(function () {
    
    function getCrimesAtLocation(lat, lng, date) {

        return fetch(`https://data.police.uk/api/crimes-at-location?date=${date}&lat=${lat}&lng=${lng}`)
            .then(response => response.json())

    }

    function show(crimes) {

        let tbody = document.querySelector("tbody");

        while(tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        let template = document.querySelector('template');

        for(var i = 0; i < crimes.length; i++) {

            let clone = template.content.cloneNode(true);
            let td = clone.querySelectorAll("td");
            console.log(crimes[i]);
            td[0].textContent = crimes[i].category;
            td[1].textContent = crimes[i].outcome_status.category;
            td[2].textContent = crimes[i].outcome_status.date;

            tbody.appendChild(clone);

        }

    }

    function search() {

        var lat = document.getElementById("lat").value;
        var lng = document.getElementById("lng").value;
        var date = document.getElementById("date").value;

        getCrimesAtLocation(lat, lng, date)
            .then(data => show(data));

    }

    document.getElementById("search").addEventListener("click", function() {
        search();
    })

  })();