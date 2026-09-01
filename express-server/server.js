import express from "express";

// To run the instance of express
const app = express();

// middleware in express so that the express can read the incoming data(by default express can't read the incoming data , otherwise req.body will always be undefined)
app.use(express.json())

let notes = [];


// program the server to send the response (if req comes to "/" - endpoint);
app.get("/", function(req, res){
    return res.json({
        message:"API is alive", //used for success or fail infomation
        data:"hello Kodr"
    })
});



app.post("/api/notes", function(req, res){

    const note = {
        title: req.body.title,
        description: req.body.description
    }

    notes.push(note)

     res.status(201).json({
        message:"Note created Successfully", //used for success or fail infomation
        note
    })
})

app.get("/api/notes", function(req,res){
    res.status(200).json({
        message:"Note fetched Successfully", //used for success or fail infomation
        notes
    })
})

app.delete("/api/notes/:id", function(req,res){
    const id = Number(req.params.id);
    notes = notes.filter((_,index)=> index !== id);
    res.sendStatus(204);

})

app.patch("/api/notes/:id", function(req,res){
    let {title, description} = req.body;
    const id = Number(req.params.id);
    notes = notes.map((note,index)=> index === id? {...note, title, description }:note);
     res.status(200).json({
        message: "Note updated successfully",
        notes
    });
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
