// const express = require('express');
// const bodyParser = require('body-parser');
// const routes = require('./src/routes')
// const mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');
// const Sequelize = require('sequelize');
// const { Errand } = require('./models')
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Errand } from './models.js';
import express from 'express';
import mongoose from 'mongoose';
dotenv.config();
// require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const dbAuthString = process.env.DB_STRING;

// MongoClient.connect(`${url}${dbAuthString}`, (err, database) => {
//     if (err) return console.log(err);
//     db = database.db(dbName);
//     app.listen(port, () => {
//         console.log('App is listening on port 3000.');
//     });
// });

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`${url}${dbName}${dbAuthString}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    // const errandOne = new Errand({ errand_name: 'testerrand', details: 'testdetails' });
    // await errandOne.save();
    // console.log('kkkkkk',errandOne.errand_name);
    // console.log('gggggggggg',errandOne.errandstatement());
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected successfully");
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json());
app.use(express.static('public'));

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});

// routes(app);

// app.get('/', (req, res) => {
//     // res.send('hello world');
//     res.sendFile(__dirname + '/index.html');
// });


app.post('/errands', async (req, res) => {
    try {
        const errand = new Errand(req.body);
        await errand.save();
        console.log('Document inserted with _id: ', errand._id);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send('error inserting entry into database');
    };
});

app.get('/', async (req, res) => {
    try {
        const errands = await Errand.find({});
        res.render('index.ejs', { errands: errands })
    } catch (err) {
        console.log(err);
    };
});

app.put('/errands', async (req, res) => {
    try {
        await Errand.updateOne({ errand_name: req.body.old_errand_name }, { details: req.body.details })
            .then(result => {
                console.log('updated entry:', result)
                return res.send(result)
            })
            .catch(error => {
                console.log('updateOne Error: ', error)
            })
        // .finally(() => {
        //     db.close()
        // })
    } catch (err) {
        console.log('app.put Error: ', err);
    };
});

app.delete('/errands', async (req, res) => {
    try {
        await Errand.findOneAndDelete({ errand_name: req.body.errand_name })
        .then(result => {
            console.log('deleted entry',result)
            return res.send(result)
        })
    } catch (err) {
        console.log(err);
    };
});

// app.listen(3000, () => {
//     console.log('App is listening on port 3000.');
// });

