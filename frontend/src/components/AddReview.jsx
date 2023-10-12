import axios from "axios";
import React, { useState } from "react"

const AddReview = ({_id, newReview, rerender})=>{

    const [review, setReview] = useState({
        review: "",
        user:"Anonumous user"
    })

    const handleChange = (event)=>{
        const {name, value} = event.target;
        setReview( prevData =>{
            return{
                ...prevData,
                [name]: value,
                _id:_id
            }
       }) 
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        newReview();
        try{
            await axios.post("http://localhost:3001/reviews", review);
            rerender();
            setReview("")
        }catch(err){
            console.error(err);
        }
    }

    return(    
        <div>
            <form onSubmit={handleSubmit}>

                <input 
                    className="rvwUser"
                    type="text" 
                    name="user"
                    placeholder="Your name(optional)"
                    onChange={handleChange} 
                />

                <textarea 
                    className="formContent" 
                    name="review" 
                    cols="" 
                    rows="3" 
                    style={{height:"auto"}} 
                    placeholder="write a review" 
                    onChange={handleChange} 
                    autoComplete="off" 
                    required>
                </textarea>
                <button type="submit">submit</button>
            </form>
        </div>
    )
};

export default AddReview;