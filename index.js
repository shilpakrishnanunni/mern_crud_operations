// const express = require('express');
// const bodyParser = require('body-parser');
// const routes = require('./src/routes')
// const mongoose = require('mongoose');
// const { Errand } = require('./models')
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import db from './src/config/database.js'
import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes/index.js';
import { Errand } from './src/models/errands.js';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
dotenv.config();

const app = express();

const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine('hbs', engine(
    {
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
        extname: 'hbs',
        defaultLayout: 'planB'
    }
))
app.set('view engine', 'hbs');
app.set('views', './views')
app.use(cors())
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json());
app.use(express.static('views'));

app.options('*', cors());
routes(app);
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

// app.post('/income/insert', (req,res) => {
//     console.log(req.body)
//     return res.redirect('/')
// })

app.get('/', async (req, res) => {
    // res.send('hello world');
    // const errands = await Errand.find({}).lean();
    res.render('home', { layout: 'main'});
    // res.render('home', { layout: 'main', variable: errands, listExists: true, catfact:fact.fact });
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
