const express = require('express')
const path = require('path')
const cors = require('cors')
const fileupload = require("express-fileupload");
const app = express()

// require('dotenv').config({path:path.resolve(__dirname, '../config/dev.env') })
require('dotenv').config({path:path.resolve(__dirname, '../config/prod.env') })
require('./db/mongoose')
const matchingRoutes = require('./routes/item')
 
app.use(fileupload());

// enabling cors
app.use(cors())

// setting path for serving static files
app.use(express.static('public'))

app.use(express.json({limit: '50mb'}))

app.get('/',(req,res)=>{
    res.send('Working...')
})

app.use('/item',matchingRoutes)

app.use((err,req,res,next) => {
    res.status(500).json({message: err.message})
})

module.exports = app 