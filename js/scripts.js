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
