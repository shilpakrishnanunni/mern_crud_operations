import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
    amount: {
        type:Number,
        required:true
    },
    type: {
        type:String
    },
    date: {
        type: Date,
        default: Date.now()

    }
});
const Income = mongoose.model('Income',incomeSchema);
export default Income;