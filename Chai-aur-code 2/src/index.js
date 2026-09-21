import mongoose from "mongoose";
import "dotenv/config";
import {DB_NAME} from "./constants.js"

import dns from "node:dns"
dns.setServers(["1.1.1.1","8.8.8.8"]);

import express from "express"
const app = express();

(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // for some reason if the app crashes we pass an check on it
        app.on("Error", (error)=>{
            console.log("Error:",error);
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("Error:",error)
        throw error
    }
})()