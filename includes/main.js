let myStorage = window.localStorage;
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
// Freeze the day array so that no changes are possible
Object.freeze(weekdays);

// store the DOM elements to be accessed
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');
const modal = document.getElementById("myModal");
const modalClose = document.getElementsByClassName("close");

document.getElementById("year").innerHTML = fullYear;
document.getElementById("currDate").innerHTML = `${fullYear}-${month}-${date}`;
document.getElementById("currDay").innerHTML = `${weekdays[day]}`

function saveApiKey(){
    key = document.getElementById("apiKey").value;
    myStorage.setItem('api' , key);
    console.log("page reloaded");
    window.location.reload(true);
}

function closeModal(){
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

function getUserLocation(apiKey){
    window.addEventListener('load', () => {
        let lon;
        let lat;
        // access the user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                // console.log(position["coords"]);
                lon = position.coords.longitude;
                lat = position.coords.latitude;
                const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
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


if(!myStorage.getItem('api')){
    // show a modal to user to get the api key
    modal.style.display = 'block';
}else{
    // console.log(myStorage.getItem('api'));
    getUserLocation(myStorage.getItem('api'));   
}