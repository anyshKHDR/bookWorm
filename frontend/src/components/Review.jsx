import axios from "axios";
import React, { useState } from "react"

const Review = ({_id})=>{

    const [review, setReview] = useState({
        review: "",
    })

    const handleChange = (event)=>{
       setReview({
        review : event.target.value,
        _id:_id
       }) 
    }

    const handleReview = async (event)=>{
        event.preventDefault();

        try{
            await axios.post("http://localhost:3001/reviews", review);
            setReview("")

        }catch(err){
            console.error(err);
        }
        
    }

    return(    
        <div>
            <form onSubmit={handleReview}>
                <textarea className="formContent" name="review" id="" cols="" rows="3" style={{height:"auto"}} placeholder="write a review" onChange={handleChange} autoComplete="off" required></textarea>
                <button type="submit">submit</button>
            </form>
        </div>
    )
};

export default Review;