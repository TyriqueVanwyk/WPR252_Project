
var fetchWeather = "/weather";

//Select the form input
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

//Select the weather icon
const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

const humidity = document.querySelector('.humidity');

const windSpeed = document.querySelector('.windSpeed');

//Create array of months
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

//Get the date
dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    //We will display loading while we retreive the data
    locationElement.textContent = "Loading...";

    //Make texts empty
    tempElement.textContent = "";
    weatherCondition.textContent = "";

    //Get the location by using the form input
    const locationApi = fetchWeather + "?address=" + search.value;

    //Retreive the data using location
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                console.log()
                //If it is raining or foggy we will display the icon
                if(data.description === "rain" || data.description === "fog") {
                    weatherIcon.className = "wi wi-day-" + data.description
                } else {
                    weatherIcon.className = "wi wi-day-cloudy"
                }
                //Use the data to show the city name
                locationElement.textContent = data.cityName;
                
                //Use the data to show the temperature
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
                
                //Use the data  to show the Humidity
                humidity.textContent = "Humidity:" + data.humidity +"%";

                //Use the data to show wind speed
                windSpeed.textContent = "Wind:" + data.windSpeed + "m/s";

                //Use the data to show description (Clear Sky, Raining) etc
                weatherCondition.textContent = data.description.toUpperCase();
            }
        }) 
    });
})