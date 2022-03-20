const path = require('path')
const express = require('express')
const {weatherForecast, geocode, readfile} = require('./utils/geocode')
const hbs = require('hbs')

const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Set up static Directory
app.use(express.static(publicDirectoryPath))
  
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hussayn Abd-samad'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Hussayn Abd-samad'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Hussayn Abd-samad'
    })
}) 
 app.get('/products', (req,res) => {
    console.log(req.query.search)
    if(!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    } else {
       res.send({
           products: [req.query.search ]
       })
    }

    
  })

app.get('/weather',(req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'You must provide an address'
        })
    } else { 
        geocode(req.query.address, (error, data = {}) => {
            if(error) {
                res.send({
                    error: error
                })
    
            } else {
                const {location, latitude, longitude} = data
                weatherForecast(latitude, longitude, (err, dat) => {
                    if(err) {
                        res.send({
                            error: error
                        })
                    } else {
                        res.send({
                            forecast: `${dat}`,
                            location: location,
                            address: req.query.address
                        })
                    }
                   
                })
            }
        })
        
    }

})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hussayn Abd-samad',

        errorMessage: ' Help Article not found'
    })
    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Hussayn Abd-samad',
        errorMessage: '  Page not found'
    })
})
 
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})