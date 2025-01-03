import 'dotenv/config';
import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import checkConnection from './db';
import mountRoutes from './routes';
import { errorHandler } from './middlewares/errorHandler';

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

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
})
.on("error", (error) => {
    console.error("ERROR ON STARTUP:", error);
});
