import 'dotenv/config';
import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import checkConnection from './db.ts';
import mountRoutes from './routes.ts';

const app: Express = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(morgan('tiny'));

await checkConnection();

const PORT = process.env.PORT;

mountRoutes(app);

app.get('/', (req: Request, res: Response)=>{
    res.status(200).send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
})
.on("error", (error) => {
    console.error("ERROR ON STARTUP:", error);
});
