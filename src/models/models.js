// const mongoose = require('mongoose')
import mongoose from 'mongoose';

const errandSchema = new mongoose.Schema({
    errand_name: {
        type: String,
        required: true
    },
    details: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
errandSchema.methods.errandstatement = function errandstatement() {
    const errandDeets = this.errand_name
        ? "Today\'s errand is: " + this.errand_name
        : "No errands today";
    console.log('inside', errandDeets);
    return errandDeets
};
export const Errand = mongoose.model('Errand', errandSchema);

const catfactSchema = new mongoose.Schema({
    fact: {
        type:String,
        required:true
    }
});
export const CatFact = mongoose.model('CatFact',catfactSchema);
// module.exports = { Errand };

