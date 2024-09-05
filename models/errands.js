import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const Errand = model("Errand", new Schema({
    description: String,
    status: Boolean
}, { timestamps: true }));

export default Errand;