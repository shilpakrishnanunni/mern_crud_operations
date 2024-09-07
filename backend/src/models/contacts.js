import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const Contact = model("Contact", new Schema({
    name: String,
    email: String,
}));

export default Contact;