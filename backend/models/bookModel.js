import mongoose from "mongoose";
import {userSchema} from "./userModel.js";

// creating new schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publisher: String,
    bookImg:String,
    submitter:String,
    //schema as a data type
    users: [userSchema]
});

// creating model - the "Book" inside the function "model" will be the name of the collection 
// but the first letter is dropped to lower case and adds "s" at the end to make the collection name plural
const Book = mongoose.model("Book", bookSchema);

export {bookSchema, Book};