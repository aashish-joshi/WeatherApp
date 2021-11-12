const d = new Date();
const fullYear = d.getFullYear();
const date = d.getDate();
const month = d.getMonth() + 1;
const day = d.getDay();

const weekdays = new Array(7);
weekdays[0] = "Sunday";
weekdays[1] = "Monday";
weekdays[2] = "Tuesday";
weekdays[3] = "Wednesday";
weekdays[4] = "Thursday";
weekdays[5] = "Friday";
weekdays[6] = "Saturday";

Object.freeze(weekdays);

document.getElementById("year").innerHTML = fullYear;
document.getElementById("currDate").innerHTML = `${fullYear}-${month}-${date}`;
document.getElementById("currDay").innerHTML = `${weekdays[day]}`

const api = 'e32ebe9ec27254648312c9c0b2a745ec';

// store the DOM elements to be accessed
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

function getUserLocation(){
    window.addEventListener('load', () => {
        let lon;
        let lat;
        // access the user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                // console.log(position["coords"]);
                lon = position.coords.longitude;
                lat = position.coords.latitude;
                const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`;
                // console.log(base);
                fetch(base)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        const { temp } = data.main;
                        const place = data.name;
                        const { description, icon } = data.weather[0];
                        const { sunrise, sunset } = data.sys;
                        // console.log(sunrise, temp);
                        
                        // convert temperature to F
                        const tempCDOM = Math.round(temp);
                        const tempFDOM = Math.round((temp * 9) / 5 + 32);
                        
                        // convert time to UTC
                        sunriseUTC = new Date(sunrise * 1000);
                        sunsetUTC = new Date(sunset * 1000);

                        // set the weather icon URL
                        iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                        // Change the DOM elements
                        iconImg.src = iconUrl;
                        loc.textContent = `${place}`;
                        tempC.textContent = `${tempCDOM} C`;
                        tempF.textContent = `${tempFDOM} F`;
                        desc.textContent = `${description}`;
                        sunriseDOM.textContent = `${sunriseUTC.toLocaleTimeString()}`;
                        sunsetDOM.textContent = `${sunsetUTC.toLocaleTimeString()}`;
                    });
            });
        }
    });
}

getUserLocation();