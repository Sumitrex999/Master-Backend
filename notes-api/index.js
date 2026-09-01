import express from "express";

const app = express();
app.use(express.json());

const notes = []; 

app.post("/notes", (req,res)=>{
    notes.push(req.body);

    res.status(201).json({
        message:"Note created Successfully",
        notes:notes
    })
})

app.get("/notes", (req,res)=>{
    res.status(200).json({
        message:"notes fetched successfully",
        notes:notes
    })
})

app.put("/notes/:index", (req,res) =>{
    const index = Number(req.params.index);
    notes[index] = req.body;
    res.status(200).json({
        message:"Note replaced successfully",
        notes: notes
    })
})

app.patch("/notes/:index",(req,res)=>{
    const index = Number(req.params.index);
    const description = req.body.description;

    notes[index].description = description

    res.status(200).json({
        message:"note updated successfully",
        notes:notes
    })
})

app.delete("/notes/:index", (req,res)=>{
    const index = Number(req.params.index)

    notes.splice(index,1);

    res.status(200).json({
        message:"note deleted successfully"
    })
})







app.listen(3000, () => {
    console.log("server is running on the Port 3000");
});
