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
        document.getElementById("lat").value = place.geometry.location.lat();
        document.getElementById("lng").value = place.geometry.location.lng();
        
      });
}

initAutocomplete();