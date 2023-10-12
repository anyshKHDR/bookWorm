import React from "react";
import { useState } from "react";
import axios from "axios";

const AddRating = ({ _id, newRating,rerender }) =>{

    const [userRating, setUserRating] = useState({
        rating: "",
        _id:""
    });

    const handleChange = (event)=>{
        setUserRating({
           rating:event.target.value,
            _id:_id
        });
    };

    const handleRating = async (event)=>{ 
        event.preventDefault();
        newRating(); 
        try{
            await axios.post("http://localhost:3001/rating", userRating);
            rerender();
            setUserRating("");
        }catch(error){
            console.error(error);
        }
    }

    return(   
        <div>
            <form action="" onSubmit={handleRating}>
                <input type="number" name="userRating" min={1} max={10} step={"0.1"} onChange={handleChange} placeholder="Entrer your rating out of 10" required/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddRating;