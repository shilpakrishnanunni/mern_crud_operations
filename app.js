import 'dotenv/config';
import express from "express";
import morgan from "morgan";
import checkConnection from './db.js';
import Contact from './models/contacts.js';

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan('tiny'));

await checkConnection();

const PORT = process.env.PORT;

app.get('/', (req, res)=>{
    res.status(200).send("Hello World");
});

app.post('/add-contact', async(req, res) => {
    const { name, email } = req.body;
    console.log(name,email)
    const contact = await Contact.create({
        name: name,
        email: email
    });
    console.log(contact)
    return res.json({success: true});
});

app.get("/get-contact", async(req, res) => {
    const id = req.query.id;
    const contact = await Contact.findById(id).exec();
    console.log(contact);
    return res.json({data: contact});
});

app.get("/get-all-contacts", async(req, res) => {
    const contact = await Contact.find({}).exec();
    console.log(contact);
    return res.json({data: contact});
});

app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
})
.on("error", (error) => {
    console.error("ERROR ON STARTUP:", error);
});
