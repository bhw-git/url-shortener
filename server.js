import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import shortid from "shortid";
import Url from "./models/Url.js";

dotenv.config();
const app = express();
const port = 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.log(err));

// Home Page
app.get("/", (req, res) => {
    res.render("index.ejs", {shortUrl: null});
});

// Shorten URL - Handle form submission
app.post("/shorten", async(req, res) => {
    const {longUrl} = req.body;
    const base = "http://localhost:3000";
    const urlCode = shortid.generate();

    try {
        let url = await Url.findOne({longUrl});
        let shortUrl = `${base}/${urlCode}`;

        if(url) {
            // console.log("shortUrl inside if()",shortUrl);
            return res.render("index.ejs",{shortUrl: url.shortUrl}); 
        }
        // console.log("shortUrl outside if()",shortUrl);
        url = new Url({urlCode, longUrl, shortUrl});
        await url.save();
        res.render("index.ejs",{shortUrl: url.shortUrl});

    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
});

//To fetch & redirect shortened link to actual link using urlCode
app.get("/:code", async(req, res) => {
    try {
        const url = await Url.findOne({urlCode: req.params.code });
        console.log("/:code", url);
        if(url){
            return res.redirect(url.longUrl);
        } else {
            res.status(404).json("URL not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
});

app.listen(port , () => console.log(`Server is running on port ${port}`))