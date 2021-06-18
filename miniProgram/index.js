const { myLogger, authRoute }  = require('./route')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(myLogger)
authRoute(app)
app.listen(3000)
console.log("service start")
