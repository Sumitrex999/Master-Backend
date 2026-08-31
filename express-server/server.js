import express from "express";

// To run the instance of express
const app = express();

// program the server to send the response (if req comes to "/" - endpoint);
app.get("/", function(req, res){
    return res.send("hello KODR")
});

app.get("/about", function(req, res){
    return res.send("About KODR")
});

app.get("/home", function(req, res){
    return res.send("KODR Home")
});


// server start as a process 
// to fullfill user req on that port on the server machine (where multiple process are running in the bg)
// IP address to reach the server machine on the internet , where many ports(to run different process) are situated in a machine/server machine
app.listen(3000);


// To communicate between client and server we use the Rest API.
// To communicate between two applications we use API (rules & protocol).

// Create a project three times:
// 1.tutorial, 2.without tutorial, 3.add new feature or update exiting one                                            
