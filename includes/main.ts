let myStorage = window.localStorage;
const d = new Date();
const fullYear = d.getFullYear();
const date = d.getDate();
const month = d.getMonth() + 1;
const day = d.getDay();
const currDate = document.getElementById("currDate");

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

const monthName = new Array(12);
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
const iconImg = document.getElementById('weather-icon')! as HTMLImageElement;
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');
const modal = document.getElementById("myModal");
const modalClose = document.getElementsByClassName("close");

// SET THE CURRENT DATE AND DAY
if(date < 10){
    currDate.innerHTML = `${monthName[month]}, 0${date}`;
}else{
    currDate.innerHTML = `${monthName[month]}, ${date}`;
}

document.getElementById("currDay").innerHTML = `${weekdays[day]}`


function saveApiKey(){
    const apiKeyElem = document.getElementById("apiKey")! as HTMLInputElement;
    const key = apiKeyElem.value;
    if(key){
        myStorage.setItem('api' , key);
        console.log("key saved");
        console.log("reloading page");
        window.location.reload();
    }else{
        alert("Please enter the API key.");
        console.log("key not entered");
    }
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
        let lon: number;
        let lat: number;
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
                        const sunriseUTC = new Date(sunrise * 1000);
                        const sunsetUTC = new Date(sunset * 1000);

                        // set the weather icon URL
                        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                        // Change the DOM elements
                        iconImg.src = iconUrl;
                        loc.textContent = `${place}`;
                        tempC.textContent = `${tempCDOM} °C`;
                        tempF.textContent = `${tempFDOM} °F`;
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


// Show/Hide the responsive nav bar
function respNavBar() {
    let navbar = document.getElementById("navbar");
    let navBarButton = document.getElementById("navbar-button");

    if (navbar.className.indexOf("w3-show") == -1) {
      navbar.className += " w3-show";
      navBarButton.innerHTML = '&times;';
    } else { 
      navbar.className = navbar.className.replace(" w3-show", "");
      navBarButton.innerHTML = '&#9776;';
    }
  }

function testClicker(){
    alert('You clicked on something');
}