const request = require('request')
const {readFile} = require('fs')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoiaHVzc2F5bmFiZHNhbWFkIiwiYSI6ImNsMHJ4OWxsMDA2NjYzanMwdGFmc3oxcjAifQ.zSMXTLpnYvDycsn2cFTpDQ&limit=1'
    request({url: url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location, Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
   }
 
   
   const weatherForecast = (lat, lon, callback) => {
       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8d6eba1509438fb9d8296443af3d6f6f`
       request({url, json: true}, (error, {body} = {}) => {
           if(error) {
               callback('Unable to connect to location service!', undefined)
           } else if(body.message === "wrong longitude") {
               callback(body.message, undefined)
           } else if (body.message === "wrong latitude") {
               callback(body.message, undefined)
           } else {
               callback(undefined, `The temperature is ${body.main.temp} and it is ${body.weather[0].description}. The high is ${body.main.temp_max}, and the low is ${body.main.temp_min}`)
           }
       }) 
   }



   module.exports = {
       weatherForecast, geocode
   }
   
