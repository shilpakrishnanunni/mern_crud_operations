import 'dotenv/config';
import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan('tiny'));

const PORT = process.env.PORT;

app.get('/', (req, res)=>{
    res.status(200).send("Hello World");
});


app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
})
.on("error", (error) => {
    console.error("ERROR ON STARTUP:", error);
});
