import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.urlencoded({limit:'3mb', extended:true}));
app.use(bodyParser.json({ limit:'3mb'}));
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
    bookImg:String,
    submitter:String,
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
    bookImg:"",
    submitter:"vroxoschi",
    users:new User({
        user:"vroxoschi",
        rating:[ 8 ],
        review:"The Malayalam debut novel by O.V Vijayan (Indian writer) has translated to the English version.\n The story was smooth but the Malayalam version was more suitainable and sensible than the English one. I had also heard the Malayalam audio version on YouTube."
    })
});
const book2 = new Book({
    title:"My Story",
    author:"Kamala Das",
    publisher:"Harper Collins",
    bookImg:"",
    submitter:"Mrisio",
    users:new User({
        user:"Mrisio",
        rating:[ 7 ],
        review:" The book is the memoirs of one of the best poets of India in the second half of the twentieth century. The book is quite emotional and has a poetic quality."
    })
});
const book3 = new Book({
    title:"War and Peace",
    author:"Leo Tolstoy",
    publisher:"The Russian Messenger",
    bookImg:"",
    submitter:"Thivokri",
    users:new User({
        user:"Thivokri",
        rating:[8],
        review:"The holidays always remind me of this book and the snow falling out my window onto the trees is the perfect backdrop for thinking about everything that goes on in Tolstoy's big epic. When I finished this book I found myself missing the characters as one would a friend. It's been a decade now and they haven't called, so maybe I should pick this up and visit them again. A pretty much perfect book, Tolstoy brings his narrative to life from so many angles and opinions that you feel like you've been there, lived with this characters and, in turn, become part of the the epic yourself."
    })
});
Book.insertMany([book, book2, book3])

// ===========================================

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