import mongoose from "mongoose";

// format of the data to be stored in the database.
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 3
    },

    description: {
        type:String,
        required: true,
    }
})
// To perform CRUD operations on the notes collection in the database, we need to create a model for it.
// here notes - file created in the database, noteSchema - format of the data to be stored in the database.
const noteModel = mongoose.model("notes", noteSchema);

export default noteModel;