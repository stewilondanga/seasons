var months = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December"
];

var days = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday"
];

var d = new Date();
var date = document.getElementById('date');
var date_day = document.getElementById('day');
var date_month = document.getElementById('month-year');

date_day.innerHTML = days[d.getDay()];
date.innerHTML = d.getDate();
date_month.innerHTML = months[d.getMonth()] + " " + d.getFullYear();

// Prepare location info object.
var locationInfo = {
  geo: null,
  country: null,
  state: null,
  city: null,
  postalCode: null,
  street: null,
  streetNumber: null,
  reset: function() {
    this.geo = null;
    this.country = null;
    this.state = null;
    this.city = null;
    this.postalCode = null;
    this.street = null;
    this.streetNumber = null;
  }
};

googleAutocomplete = {
  autocompleteField: function(fieldId) {
    (autocomplete = new google.maps.places.Autocomplete(
      document.getElementById(fieldId)
    )),
      { types: ["geocode"] };
    google.maps.event.addListener(autocomplete, "place_changed", function() {
      // Segment results into usable parts.
      var place = autocomplete.getPlace(),
        address = place.address_components,
        lat = place.geometry.location.lat(),
        lng = place.geometry.location.lng();

      // Reset location object.
      locationInfo.reset();

      // Save the individual address components.
      locationInfo.geo = [lat, lng];
      for (var i = 0; i < address.length; i++) {
        var component = address[i].types[0];
        switch (component) {
          case "country":
            locationInfo.country = address[i]["long_name"];
            break;
          case "administrative_area_level_1":
            locationInfo.state = address[i]["long_name"];
            break;
          case "locality":
            locationInfo.city = address[i]["long_name"];
            break;
          case "postal_code":
            locationInfo.postalCode = address[i]["long_name"];
            break;
          case "route":
            locationInfo.street = address[i]["long_name"];
            break;
          case "street_number":
            locationInfo.streetNumber = address[i]["long_name"];
            break;
          default:
            break;
        }
      }

      // Preview map.
      var src =
          "https://maps.googleapis.com/maps/api/staticmap?center=" +
          lat +
          "," +
          lng +
          "&zoom=14&size=480x125&maptype=roadmap&sensor=false",
        img = document.createElement("img");

      img.src = src;
      img.className = "absolute pin-t pin-l z-20";
      document.getElementById("js-preview-map").appendChild(img);

      // Preview JSON output.
      document.getElementById("js-preview-json").innerHTML = JSON.stringify(
        locationInfo,
        null,
        4
      );
    });
  }
};

// Attach listener to address input field.
googleAutocomplete.autocompleteField("address");
