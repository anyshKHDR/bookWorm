import React from "react";
import { useState } from "react";
import axios from "axios";

const AddRating = ({ _id,rerender}) =>{

    const [userRating, setUserRating] = useState({
        rating: "",
        _id:""
    });
    const [showAddRating, SetShowAddRating] = useState(false);
    const newRating = ()=> SetShowAddRating(!showAddRating);

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
        <div style={{display:"inline-block", marginLeft:"20px"}}>
            {showAddRating && 
            <div >
                <form action="" onSubmit={handleRating} style={{display:"inline-block"}}>
                    <input type="number" name="userRating" min={1} max={10} step={"0.1"} onChange={handleChange} placeholder="Entrer your rating out of 10" id="ratingBox" required/>
                    <button type="submit" className="rSbmt">Submit</button>
                </form>

                <button onClick={newRating} className="rCncl"> Cancel </button>
            </div>
            }
            {!showAddRating &&  
                <button onClick={newRating}>Rate this Book</button>
            }
        </div>
    )
}

export default AddRating;