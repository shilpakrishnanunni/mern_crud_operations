import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DB_URL;
const dbAuthString = process.env.DB_STRING;
const dbName = process.env.DB_NAME;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`${url}${dbName}${dbAuthString}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
};


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected successfully");
});

export default db;

