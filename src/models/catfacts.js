import mongoose from 'mongoose';

const catfactSchema = new mongoose.Schema({
    fact: {
        type:String,
        required:true
    }
});
export const CatFact = mongoose.model('CatFact',catfactSchema);