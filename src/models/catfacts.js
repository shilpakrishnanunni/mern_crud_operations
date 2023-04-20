import mongoose from 'mongoose';

const catfactSchema = new mongoose.Schema({
    fact: {
        type:String,
        required:true
    }
});
const CatFact = mongoose.model('CatFact',catfactSchema);
export default CatFact;