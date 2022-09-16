const request = require('request');
const apikey = `aa71f9d4be8b4972b40100908221609`

const forecast = (location, callback) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${encodeURIComponent(location)}&aqi=no`;
    request({ url, json: true }, (error, { body }={}) => {
        if(error)
        callback('Not able to connect to weather API');
        else if(body.error)
        callback(`Unable to access location. <br>Message:${body.error.message}`);
        else callback(undefined, body);
    })
}

module.exports= forecast;