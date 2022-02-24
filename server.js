// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads!')
})

// BREADS
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// 404 Page
app.get('*', (req, res) => {
    res.send('404')
})

// DATABASE
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB Connected'))
.catch(e => console.log(e))

// LISTEN
app.listen(PORT, () => {
    console.log('nomming at port', PORT)
})