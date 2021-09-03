//import request
const request = require('request');

//Import config file for constants
const constants = require('../config');

const weatherData = (zip, callback) => {
    //Generate the url for getting data from the api
    //api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(zip) + ',ZA&appid=' + constants.openWeatherMap.SECRET_KEY;
    request({url, json:true}, (error, {body})=> {
        if(error) {
            callback("Can't fetch data from open weather map api ", undefined)
        } else if(!body.main || !body.main.temp || !body.name || !body.weather) {
            //If we can't find the city we show a message
            callback("Unable to find required data, try another location", undefined);
        } else {
            //Retrieve the data in the callback
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}

module.exports = weatherData;