import { useState,useEffect } from "react";
import React from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import Card from "./Card";
import AddButton from "./AddButton";


const App = ()=>{

    const [listOfBooks, setListofBooks] = useState([]);

    const fetchData =()=>{
        axios.get("http://localhost:3001/")
        .then((response) =>{
            setListofBooks(response.data);
        })
        .catch((err) =>{
            console.error(err)
        } );
    };

    useEffect(() => {
        fetchData();
    },[]);

    return(
        <div style={{overflow:"hidden"}}>
            <Header />
            <AddButton rerender = {fetchData}/> 

            {listOfBooks.map((bookList,index) =>{
                
                // destructuring
                const {users: [{user,rating,review}]} = bookList;
                // const {users: [{rating}]} = bookList;
                // const {users: [{review}]} = bookList;

                return(
                    <Card 
                        key= {index}
                        _id = {bookList._id}
                        title = {bookList.title}
                        author = {bookList.author}
                        publisher = {bookList.publisher}
                        image = {bookList.bookImg}
                        rating = {rating}
                        totatRatings = {rating.length}
                        review = {review}
                        user = {user}
                        rerender = {fetchData}
                    />  
                )
            })}
            <Footer />
        </div>
    );
};

export default App;