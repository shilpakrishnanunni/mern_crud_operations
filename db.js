import mongoose from "mongoose";


const checkConnection = () => {
mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.eyhty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
};

export default checkConnection;