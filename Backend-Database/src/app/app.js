import express from "express";
import noteModel from "../model/notes.model.js";

// To run the instance of express
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/api/notes", async (req, res)=>{
    // req.body contains the data sent by the client in the request body. 
    // It is an object that contains key-value pairs of data submitted in the request.
    const {title, description} = req.body;
    // noteModel.create() method is used to create a new note in the database.
    const note = await noteModel.create({
        title,
        description,
    })

    return res.status(201).json({
        message: "Note created successfully",
        data: {
            note
        }
    })
})

app.get("/api/notes", async (req, res)=>{
    // Return array of objects(notes) or empty array if no notes are found.
    // where as the findOne() method returns a single object(note) or null if no note is found.
    const notes = await noteModel.find();
    res.status(200).json({
        message: "Notes fetched successfully",
        data: {
            notes
        }
    })
})

app.patch("/api/notes/:id", async (req, res)=>{
    const {id} = req.params; // req.params contains the route parameters sent by the client in the request URL.
    // destructuring the description from the request body 
    // to update the note with the given id.
    const { description} = req.body;
    const note = await noteModel.findByIdAndUpdate(id, {
        description,
    },{new: true}); // new: true option returns the updated document instead of the original document.
    return res.status(200).json({
        message: "Note updated successfully",
        data: {
            note
        }
    })

})

app.delete("/api/notes/:id", async (req, res)=>{
    // req.params contains the route parameters sent by the client in the request URL.
    const {id} = req.params;
    const note = await noteModel.findByIdAndDelete(id);
    if(!note){
        return res.status(404).json({
            message: "Note not found"
        })
    }
    return res.status(200).json({
        message: "Note deleted successfully",
        data: {
            note
        }
    })
})

export default app;