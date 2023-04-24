import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now()

    }
});
const Users = mongoose.model('Users',usersSchema);
export default Users;