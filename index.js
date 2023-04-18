// const express = require('express');
// const bodyParser = require('body-parser');
// const routes = require('./src/routes')
// const mongoose = require('mongoose');
// const { Errand } = require('./models')
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Errand } from './src/models/models.js';
import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const dbAuthString = process.env.DB_STRING;
const dbName = process.env.DB_NAME;
const port = process.env.PORT || 3000;
const url = process.env.DB_URL;

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

app.engine('hbs', engine(
    {
        layoutsDir: __dirname + '/src/views/layouts',
        partialsDir: __dirname + '/src/views/partials',
        extname: 'hbs',
        defaultLayout: 'planB'
    }
))
app.set('view engine', 'hbs');
app.set('views', './src/views')
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json());
app.use(express.static('src/public'));

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

// routes(app);

app.get('/', async (req, res) => {
    // res.send('hello world');
    const errands = await Errand.find({}).lean()
    // res.render('home', { layout: 'main',variable: 'so posh' });
    res.render('home', { layout: 'main', variable: errands, listExists: true });
});


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
                console.log('deleted entry', result)
                return res.send(result)
            })
    } catch (err) {
        console.log(err);
    };
});

// app.listen(3000, () => {
//     console.log('App is listening on port 3000.');
// });
