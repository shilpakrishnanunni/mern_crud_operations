import mongoose from "mongoose";

const checkConnection = async() => {
    try {
        mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.CLUSTER}`, {
            }
        );
        const db = mongoose.connection;

        db.on('connected', () => {
            console.log(`Mongoose connected to database: ${db.name} at ${db.host}:${db.port}`)
        });

        db.on('error', (err) => {
            console.log(`Mongoose connection error: ${err}`);
        });

        db.on('disconnected', () => {
            console.log('Mongoose disconnected from the database');
        });

    } catch (error) {
        let errorMessage = "Default error message";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error(`Error connecting to the database: ${errorMessage}`);
    }
};

export default checkConnection;
