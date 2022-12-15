const request = require('request');
const apikey = `99ebd7160dcb4588a2d72033221512`

const forecast = (location, callback) => {
    const queryString = location.adress ? `q=${encodeURIComponent(location.adress)}&aqi=no` : `q=${location.latitude},${location.longitude}&aqi=no`
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&${queryString}`;
    request({ url, json: true }, (error, { body }={}) => {
        if(error)
        callback('Not able to connect to weather API');
        else if(body.error)
        callback(`Unable to access location. <br>Message:${body.error.message}`);
        else callback(undefined, body);
    })
}

module.exports= forecast;