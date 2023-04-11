const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient

const app = express();
const port = process.env.PORT || 3000;

MongoClient.connect('', (err, database) => {
    if (err) return console.log(err)
    app.listen(port, () => {
        console.log('App is listening on port 3000.')
    })
})

app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    // res.send('hello world')
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
    let val = req.body
    console.log('dfjhvgbsrf', val)
})

app.listen(3000, () => {
    console.log('App is listening on port 3000.')
})

