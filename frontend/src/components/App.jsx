import { useState,useEffect } from "react";
import React from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import Card from "./Card";
import AddNew from "./AddButton";


const App = ()=>{

    const [listOfBooks, setListofBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/")
        .then((response) =>{
            setListofBooks(response.data);
        })
        .catch((err) =>{
            console.error(err)
    } );
    },[]);


    return(
        <div>
            <Header />
            <AddNew /> 
            {listOfBooks.map((bookList,index) =>{
                
                // destructuring
                const {users: [{user}]} = bookList;
                const {users: [{rating}]} = bookList;
                const {users: [{review}]} = bookList;

                return(
                    <Card 
                        key= {index}
                        title = {bookList.title}
                        author = {bookList.author}
                        publisher = {bookList.publisher}
                        rating = {rating}
                        review = {review}
                        user = {user}
                    />  
                )
            })}
            <Card />  

            
            <Footer />
        </div>
    );
};

export default App;