const express = require('express')
const favicon = require('serve-favicon')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('./src/db/sequelize')

const app = express()
const port = 3000

app
    .use(favicon(__dirname+'/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

db.initDb()

// routes
require('./src/routes/findAllBooks')(app)

app.use(({res}) => {
    const message = 'Unable to find the ressource asked ! Try another url.'
    res.status(404).json({message})
})

app.listen(port, () => {
    console.log(`\nMy API is running on : http://localhost:${port}`)
})
