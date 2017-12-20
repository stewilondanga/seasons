// Grab the latitude & longitude
$.getJSON("https://freegeoip.net/json/", function(ipAPI) {
  var latitude = ipAPI.latitude;
  var longitude = ipAPI.longitude;
  var city = ipAPI.city.replace(/(\s)/gi, "+"); // Replace spaces
  var region = ipAPI.region_code;

  // Grab a local map as background based on user's IP
  var imageURL =
    "https://maps.googleapis.com/maps/api/staticmap?center=" +
    city +
    "&zoom=10&size=640x640&scale=2&format=jpeg&key=" + gmapsKey;
  $("html").css("background-image", "url(" + imageURL + ")");

  // Feed the latitude and longitude to the OpenWeatherMap API
  $.getJSON(
    "https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&APPID=" + owKey,
    function(ow) {
      var location = city + ", " + region,
        status = ow.weather[0].main,
        windMeters = ow.wind.speed,
        windMiles = ow.wind.speed * Math.round(2.23694),
        tempF = Math.round(
          ((ow.main.temp - 273.15) * 1.8 + 32) * 10 / 10
        ).toFixed(0),
        tempC = Math.round(ow.main.temp - 273.15),
        iconSource = ow.weather[0].icon,
        icons = {
          // ow.weather[0].icon to wi
          // Daytime conditions
          "01d": "wi-day-sunny",
          "02d": "wi-day-sunny-overcast",
          "03d": "wi-day-cloudy",
          "04d": "wi-cloudy",
          "09d": "wi-day-sprinkle",
          "10d": "wi-day-rain",
          "11d": "wi-day-thunderstorm",
          "13d": "wi-day-snow",
          "50d": "wi-day-fog",

          // Nightime conditions
          "01n": "wi-stars",
          "02n": "wi-night-partly-cloudy",
          "03n": "wi-night-cloudy",
          "04n": "wi-cloudy",
          "09n": "wi-night-sprinkle",
          "10n": "wi-night-rain",
          "11n": "wi-night-thunderstorm",
          "13n": "wi-night-snow",
          "50n": "wi-night-fog"
        },
        iconName = iconSource.split(" ").map(function(code) {
          var results = [];
          results.push(icons[code]);
          return results.join("");
        }),
        icon = iconName[0],
        extremeSource = ow.weather[0].id.toString(),
        extremes = {
          // ow.weather[0].id to wi
          // Extreme weather conditions
          "900": "wi-tornado",
          "901": "wi-hurricane",
          "902": "wi-hurricane",
          "903": "wi-snowflake-cold",
          "904": "wi-hot",
          "905": "wi-windy",
          "906": "wi-hail",

          // Beaufort wind scale
          "951": "wi-beafort-1",
          "952": "wi-beafort-2",
          "953": "wi-beafort-3",
          "954": "wi-beafort-4",
          "955": "wi-beafort-5",
          "956": "wi-beafort-6",
          "957": "wi-beafort-7",
          "958": "wi-beafort-8",
          "959": "wi-beafort-9",
          "960": "wi-beafort-10",
          "961": "wi-beafort-11",
          "962": "wi-beafort-12"
        },
        extremeName = extremeSource.split(" ").map(function(code) {
          var results = [];
          results.push(extremes[code]);
          return results.join("");
        }),
        extreme = extremeName[0];

      var windIcon = "wi-wind towards-" + ow.wind.deg + "-deg";

    $('.sr-only').empty().append("Current conditions in " + city + ": " + status + ", wind at " + windMiles + " MPH (" + windMeters + " m/s)");
      // #quick-view
      $("#loading").hide();
      $("#tempF > span")
        .empty()
        .append(tempF);
      $("#tempC > span")
        .empty()
        .append(tempC);
      $("#weather-icons > i:first-child").addClass(icon);
      $("#weather-icons > i:last-child").addClass(extreme);

      // #grid
      $("#location")
        .empty()
        .append(location);
      $("#status")
        .empty()
        .append(status);
      // #wind
      $(".compass > i")
        .empty()
        .addClass(windIcon);
      $("#miles")
        .empty()
        .append(windMiles + " MPH");
      $("#meters")
        .empty()
        .append(windMeters + " m/s");
    }
  );

  function error() {
    $("#main").append("Unable to retrieve your location");
  }
});

$("button").click(function() {
  $("#tempF").toggleClass("show hide");
  $("#tempC").toggleClass("show hide");
  $("#miles").toggleClass("show hide");
  $("#meters").toggleClass("show hide");
});


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
