import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    urlCode: String, 
    longUrl: String, 
    shortUrl: String,
    expiresAt: {
        type : Date, 
        default: null
    },
    createdAt: {
        type : String, 
        default: Date.now 
    }
});

export default mongoose.model("Url", urlSchema);