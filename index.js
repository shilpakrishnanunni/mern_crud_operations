const express = require('express')
const bodyParser = require('body-parser')
// const routes = require('./src/routes')
// const mongoose = require('mongoose')
const { MongoClient } = require('mongodb')
// const Sequelize = require('sequelize');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
const url = process.env.DB_URL
const db_name = process.env.DB_NAME

MongoClient.connect(url, (err, database) => {
    if (err) return console.log(err)
    db = database.db(db_name)
    app.listen(port, () => {
        console.log('App is listening on port 3000.')
    })
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true })) // for form data
app.use(express.json())
app.use(express.static('public'))

// routes(app)

// app.get('/', (req, res) => {
//     // res.send('hello world')
//     res.sendFile(__dirname + '/index.html')
// })


app.post('/errands', async (req, res) => {
    try {
        const errandsCollection = db.collection('errands')
        const result = await errandsCollection.insertOne(req.body)
        console.log('Document inserted with _id: ', result.insertedId);
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.status(500).send('error inserting entry into database')
    }
})

app.get('/', (req, res) => {
    try {
        const errandsCollection = db.collection('errands')
        let cursor = errandsCollection.find().toArray((err, result) => {
            if (err) return console.log(err)
            res.render('index.ejs', { errands: result })
        })
    } catch (err) {
        console.log(err)
    }
})

app.put('/errands', (req, res) => {
    try {
        const errandsCollection = db.collection('errands')
        errandsCollection.findOneAndUpdate({ errand_name: "Bilbo Baggins" }, {
            $set: {
                errand_name: req.body.errand_name,
                details: req.body.details
            }
        }, {
            sort: { _id: -1 },
            upsert: true
        }, (err, result) => {
            if (err) return res.send(err)
            res.send(result)
        })
    } catch (err) {
        console.log(err)
    }
})

// app.listen(3000, () => {
//     console.log('App is listening on port 3000.')
// })

