import React from "react";
import { useState } from "react";
import axios from "axios";

const Rating = (props) =>{

    const [userRating, setUserRating] = useState({
        rating: "",
        _id:""
    });

    const handleChange = (event)=>{
        setUserRating({
           rating:event.target.value,
            _id:props._id
        });
    };

    
    const handleRating = async (event)=>{ 
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/rating", userRating);
            setUserRating("");
        }catch(error){
            console.error(error);
        }
    }

    return(   
        <div>
            <form action="" onSubmit={handleRating}>
                <input type="number" name="userRating" onChange={handleChange} placeholder="Entrer your rating out of 10" required/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Rating;