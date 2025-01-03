import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const User = model("User", new Schema({
    email: String,
    status: Boolean
}, { timestamps: true }));

export default User;