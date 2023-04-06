const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express();
const port = process.env.PORT || 3000;

app.get('/',(req,res) => {
    res.send('hello world')
})


app.listen(3000,()=> {
    console.log('App is listening on port 3000.')
})

