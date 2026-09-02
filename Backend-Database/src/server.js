import app from "./app/app.js";
import { connectDB } from "./config/db.js";

import dns from "node:dns";
dns.setServers(['1.1.1.1','8.8.8.8']);

await connectDB();

app.listen(3000, ()=>{
    console.log("Server running on  Port 3000");
})