import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { Book } from "./models/bookModel.js";
import { User } from "./models/userModel.js";
import { book,book2,book3 } from "./defaultData/defaultDocuments.js";

const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.urlencoded({limit:'3mb', extended:true}));
app.use(bodyParser.json({ limit:'3mb'}));

app.get('/favicon.ico', (req, res) => {
    res.status(204)
});

// connecting to mongodb and creates the DB if it's not exist
mongoose.connect("mongodb://127.0.0.1:27017/booksDB");

// Default documents for testing
// Book.insertMany([book, book2, book3])

// GET request
app.get("/", async(req,res) =>{
    var avlBooks =await Book.find();
    res.send(avlBooks);
})

// POST request - Book
app.post("/submit", async (req,res)=>{
    const data = req.body;
    // console.log(data);

    try{
        const newBook = new Book({
            title: data.title,
            author :data.author,
            publisher : data.publisher,
            bookImg: data.image,
            submitter:data.user.length !=0 ?data.user:"Anonymous Submission",
            users :new User ({
                // conditionally including - note the ternary operator
                review: data.review.length !=0 ? data.review : {},
                user : data.review.length !=0 ? (data.user?data.user:"Anonymous User"): {},
                rating: data.rating?data.rating:{}
            })
        })
        await newBook.save();
    }catch (error){
        consol.error(error);
    }
    res.redirect("/");
});

// POST request - Rating
app.post("/rating", async (req,res)=>{
    const {rating,_id} = req.body;

    try{
        await Book.updateOne(
            { _id: _id },
            { $push: { "users.0.rating": rating } }
        ); 
    }catch(error){
        console.log(error)
    }
    res.redirect("/");
});

// POST request - Review
app.post("/reviews", async (req,res) =>{
    const {_id, review,user} = req.body;

    try{
        await Book.findByIdAndUpdate(_id, {$push: {"users.0.user":user}})
        await Book.findByIdAndUpdate(_id, {$push: {"users.0.review":review}})
    }catch(err){
        console.log(err)
    }
    res.redirect("/");
})

// PATCH request - Book
app.patch("/edit/:_id", async (req,res) =>{

    const _id = req.params._id;
    const updateData = req.body;

    try{
        await Book.findByIdAndUpdate(_id, updateData);
    }catch(error){
        console.error(error);
    }
    res.redirect("/");
})

// DELETE request - Book
app.delete("/delete/:_id", async (req,res) =>{
    const _id = req.params._id;
    
    try{
        await Book.findByIdAndDelete(_id);
    }catch(err){
        console.error(err);
    }
    res.redirect("/");
})

app.listen(port, ()=> {
    console.log(`App is listening to port ${port}`);
});