import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import shortid from "shortid";
import Url from "./models/Url.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = 3000;

mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/public/index.html");
});

app.post("/shorten", async(req, res) => {
    const {longUrl} = req.body;
    console.log("longUrl",longUrl);
    const base = "http://localhost:3000";
    const urlCode = shortid.generate();

    try {
        let url = await Url.findOne({longUrl});
        console.log("url",url);
        if(url) {
            console.log("urlCode",urlCode);
            return res.json(url); 
        }
        console.log("urlCode",urlCode);
        const shortUrl = `${base}/${urlCode}`;
        url = new Url({urlCode, longUrl, shortUrl});
        await url.save();
        res.json(url);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
});

app.get("/:code", async(req, res) => {
    try {
        const url = await Url.findOne({urlCode: req.params.code });
        console.log("/:code", url);
        if(url){
            console.log(url.longUrl);
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json("No URL Found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
});

app.listen(port , () => console.log(`Server is running on port ${port}`))