const path = require('path')
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast')

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000

hbs.registerPartials(partialsPath)

app.set('views', viewPath)

app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')

app.get('', (req, res) => res.render('index', {
    title: 'Weather',
    author: 'Om Dubey',
    version: '1.0.0' 
}))

app.get('/about', (req, res) => res.render('about', {
    title: 'About me',
    author: 'Om Dubey',
    version: '1.0.0'
}))

app.get('/help', (req, res) => res.render('help', {
    helpText: 'This is help message',
    title: 'Help',
    author: 'Om Dubey',
    version: '1.0.0' 
}))

app.get('/weather', (req, res) => {
    if(!req.query.adress)
    return res.send({
        error: 'You must provide the adress!'
    })
    forecast(req.query.adress, (error, {location, current, forecast} = {}) => {
        if(error) return res.send({error})
        res.send({
            forecast: `It is currently ${current.temp_c}°C outside in ${req.query.adress}.<br>There is ${forecast.forecastday[0].day.daily_chance_of_rain}% chance of rain today.<br>Minimum Temperature ${forecast.forecastday[0].day.mintemp_c}°C<br>Today's Maximum Temperature: ${forecast.forecastday[0].day.maxtemp_c}°C.`,
            location: `${location.name}, ${location.region}, ${location.country}`,
        })
    })
})

app.get('/help/*', (req, res) => res.render('404_help'))

app.get('*', (req, res) => res.render('404'))


// app.get('/weather', (req, res) => res.send({location: 'Dhanbad', forecast: 'curr temp= 20°C'}))// ascii for deg is 0176
app.listen(port, () => {
    console.log('Node server is up and running on port '+port);
})