import express from "express";
// import { PORT, mongDBURL} from "./config.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(express.json());

app.get('/favicon.ico', (req, res) => {
    res.status(204)
});

// -------------------------------------------

// connecting to mongodb and creates the DB if it's not exist
mongoose.connect("mongodb://127.0.0.1:27017/booksDB");

// creating new schema
const userSchema = new mongoose.Schema({
    user: [String],
    rating: [Number],
    review: [String]
})

// creating model
const User = mongoose.model("User", userSchema);

// creating new schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publisher: String,
    //schema as a data type
    users: [userSchema]
});

// creating model - the "Book" inside the function "model" will be the name of the collection 
// but the first letter is dropped to lower case and adds "s" at the end to make the collection name plural
const Book = mongoose.model("Book", bookSchema);

// creating a document using the model "Books"
const book = new Book({
    title:"Legends Of Khasak",
    author:"O.V. Vijayan",
    publisher:"Penguin Books India",
    users:new User({
        user:"vroxoschi",
        rating:8.2,
        review:"The Malayalam debut novel by O.V Vijayan (Indian writer) has translated to the English version.\n The story was smooth but the Malayalam version was more suitainable and sensible than the English one. I had also heard the Malayalam audio version on YouTube."
    })
});
const book2 = new Book({
    title:"My Story",
    author:"Kamala Das",
    publisher:"Harper Collins",
    users:new User({
        user:"Mrisio",
        rating:7.5,
        review:" The book is the memoirs of one of the best poets of India in the second half of the twentieth century. The book is quite emotional and has a poetic quality."
    })
});
const book3 = new Book({
    title:"War and Peace",
    author:"Leo Tolstoy",
    publisher:"The Russian Messenger",
    users:new User({
        user:"Thivokri",
        rating:8.3,
        review:"The Malayalam debut novel by O.V Vijayan (Indian writer) has translated to the English version.\n The story was smooth but the Malayalam version was more suitainable and sensible than the English one. I had also heard the Malayalam audio version on YouTube."
    })
});
// Book.insertMany([book, book2, book3])

// ===========================================

app.get("/", async(req,res) =>{
    var avlBooks =await Book.find();
    res.send(avlBooks);
})

app.post("/submit", async (req,res)=>{
    console.log(req.body);
    const data = req.body;

    try{
        const newBook = new Book({
            title: data.title,
            author :data.author,
            publisher : data.publisher,
            users :new User ({
                user : data.user?data.user:"Anonymous User",
                rating: data.rating,
                review: data.review
            })
        })
        await newBook.save();
    }catch (error){
        consol.error(error);
    }
    res.redirect("/");
});

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
});

app.post("/reviews", async (req,res) =>{
    const {_id, review} = req.body;
    try{
        await Book.findByIdAndUpdate(_id, {$push: {"users.0.review":review}})
    }catch(err){
        console.log(err)
    }
})

app.listen(port, ()=> {
    console.log(`App is listening to port ${port}`);
});