require('dotenv').config()
const express = require('express');
const app = express();
const port = 4000;

app.get("/", (req,res)=>{
    res.send("Hello Rex!");
})

app.listen(process.env.PORT, ()=>{
    console.log(`app is listening on port ${process.env.PORT}`);
})