const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Initialize the app
const app = express()

const router = require('./routers/plays.router')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// CORS Handler
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    next()
})

// Routes wich should handle requests
app.use('/plays', router)

// Middleware error handler
app.use((req, res, next) => {
    const error = new Error('Nothing found here!')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: { message: error.message }
    })
})

module.exports = app