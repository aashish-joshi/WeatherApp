var myStorage = window.localStorage;
var d = new Date();
var fullYear = d.getFullYear();
var date = d.getDate();
var month = d.getMonth() + 1;
var day = d.getDay();
var currDate = document.getElementById("currDate");
var weekdays = new Array(7);
weekdays[0] = "Sunday";
weekdays[1] = "Monday";
weekdays[2] = "Tuesday";
weekdays[3] = "Wednesday";
weekdays[4] = "Thursday";
weekdays[5] = "Friday";
weekdays[6] = "Saturday";
// Freeze the day array so that no changes are possible
Object.freeze(weekdays);
var monthName = new Array(12);
monthName[1] = "Januray";
monthName[2] = "February";
monthName[3] = "March";
monthName[4] = "April";
monthName[5] = "May";
monthName[6] = "June";
monthName[7] = "July";
monthName[8] = "August";
monthName[9] = "September";
monthName[10] = "October";
monthName[11] = "November";
monthName[12] = "December";
Object.freeze(monthName);
// store the DOM elements to be accessed
var iconImg = document.getElementById('weather-icon');
var loc = document.querySelector('#location');
var tempC = document.querySelector('.c');
var tempF = document.querySelector('.f');
var desc = document.querySelector('.desc');
var sunriseDOM = document.querySelector('.sunrise');
var sunsetDOM = document.querySelector('.sunset');
var modal = document.getElementById("myModal");
var modalClose = document.getElementsByClassName("close");
// SET THE CURRENT DATE AND DAY
if (date < 10) {
    currDate.innerHTML = "".concat(monthName[month], ", 0").concat(date);
}
else {
    currDate.innerHTML = "".concat(monthName[month], ", ").concat(date);
}
document.getElementById("currDay").innerHTML = "".concat(weekdays[day]);
function saveApiKey() {
    var apiKeyElem = document.getElementById("apiKey");
    var key = apiKeyElem.value;
    if (key) {
        myStorage.setItem('api', key);
        console.log("key saved");
        console.log("reloading page");
        window.location.reload();
    }
    else {
        alert("Please enter the API key.");
        console.log("key not entered");
    }
}
function closeModal() {
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}
function getUserLocation(apiKey) {
    window.addEventListener('load', function () {
        var lon;
        var lat;
        // access the user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                // console.log(position["coords"]);
                lon = position.coords.longitude;
                lat = position.coords.latitude;
                var base = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(lat, "&lon=").concat(lon, "&appid=").concat(apiKey, "&units=metric");
                // console.log(base);
                fetch(base)
                    .then(function (response) {
                    return response.json();
                })
                    .then(function (data) {
                    var temp = data.main.temp;
                    var place = data.name;
                    var _a = data.weather[0], description = _a.description, icon = _a.icon;
                    var _b = data.sys, sunrise = _b.sunrise, sunset = _b.sunset;
                    // console.log(sunrise, temp);
                    // convert temperature to F
                    var tempCDOM = Math.round(temp);
                    var tempFDOM = Math.round((temp * 9) / 5 + 32);
                    // convert time to UTC
                    var sunriseUTC = new Date(sunrise * 1000);
                    var sunsetUTC = new Date(sunset * 1000);
                    // set the weather icon URL
                    var iconUrl = "https://openweathermap.org/img/wn/".concat(icon, "@2x.png");
                    // Change the DOM elements
                    iconImg.src = iconUrl;
                    loc.textContent = "".concat(place);
                    tempC.textContent = "".concat(tempCDOM, " \u00B0C");
                    tempF.textContent = "".concat(tempFDOM, " \u00B0F");
                    desc.textContent = "".concat(description);
                    sunriseDOM.textContent = "".concat(sunriseUTC.toLocaleTimeString());
                    sunsetDOM.textContent = "".concat(sunsetUTC.toLocaleTimeString());
                });
            });
        }
    });
}
if (!myStorage.getItem('api')) {
    // show a modal to user to get the api key
    modal.style.display = 'block';
}
else {
    // console.log(myStorage.getItem('api'));
    getUserLocation(myStorage.getItem('api'));
}
// Show/Hide the responsive nav bar
function respNavBar() {
    var navbar = document.getElementById("navbar");
    var navBarButton = document.getElementById("navbar-button");
    if (navbar.className.indexOf("w3-show") == -1) {
        navbar.className += " w3-show";
        navBarButton.innerHTML = '&times;';
    }
    else {
        navbar.className = navbar.className.replace(" w3-show", "");
        navBarButton.innerHTML = '&#9776;';
    }
}
function testClicker() {
    alert('You clicked on something');
}
