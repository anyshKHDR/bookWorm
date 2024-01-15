import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";

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

export {book, book2, book3};
// Book.insertMany([book, book2, book3])