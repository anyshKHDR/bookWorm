import axios from "axios";
import React, { useState } from "react"

const AddReview = ({_id, newReview, showAddAReview, rerender})=>{

    const [review, setReview] = useState({
        review: "",
        user:"AnonymousUser"
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
            console.log(review);
            await axios.post("http://localhost:3001/reviews", review);
            rerender();
            setReview("")
        }catch(err){
            console.error(err);
        }
    }

    return(    
        <div>
            {showAddAReview &&
                <div>
                    <form onSubmit={handleSubmit} style={{display:"inline-block"}}>

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
                        <button type="submit">Submit</button>
                        <button onClick={newReview}>Cancel</button>
                    </form>
                </div>
            }
            {!showAddAReview &&
                <button onClick={newReview} style={{marginLeft:"10px"}}>Add A review</button>
            }
        </div>
    )
};

export default AddReview;