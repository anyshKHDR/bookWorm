import React, { useState } from "react";
import axios from "axios";

const BookForm = (props)=> {

    const [data, setData] = useState({
        title:"",
        author:"",
        publisher:"",
        rating:"",
        review:"",
        user:""
    })

    const handleChange = (event)=>{
        const {name, value} = event.target;

        setData({
            ...data,
            [name]: value,
        });
    };

// ----------------------------------------------------------------
    const handleCancel = ()=> {
        document.body.classList.remove("scrollLock");
        props.closePopup();
    };


    const handleSubmit = async (event) => {
       event.preventDefault(); 
       try {
        // handleClose();
        props.onSubmit();
        await axios.post("http://localhost:3001/submit", data);
       }catch(error) {
        console.error(error);
       }
    };
// ===================================================================

    return(
        <div className="container">
            <div className="row">
                <div id="light" className="white_content">
                    <form style={{display:"block"}} action="" onSubmit={handleSubmit}>
                        <div className="container cards">
                            <div className="row">
                                <div className="col-sm-4 col1"></div>
                                <div className="col-sm-8 col2">
                                    <input className="formTitle" name="title" type="text" placeholder="Book Name" onChange={handleChange} required />
                                    <input className="formContent" name="author" type="text" placeholder="Author" onChange={handleChange} required/> 
                                    <input className="formContent" name="publisher" type="text" placeholder="publisher" onChange={handleChange} /> 
                                    <input className="formContent" name="rating" type="number" min={1} max={10} placeholder="Your rating" onChange={handleChange}/> 
                                    <textarea className="formContent" name="review" id="" cols="" rows="3" style={{height:"auto"}} placeholder="write a review" onChange={handleChange}></textarea>
                                    <input className="formContent" name="user" type="text" min={1} max={10} placeholder="Your name (optional)" onChange={handleChange}/> 
                                    <button className="btn btn-warning" style={{margin:"10px 0px 0px 15px", float:"left", border:"none"}} onClick={handleCancel}>Cancel</button>                    
                                    <button className="btn btn-success" type="submit" style={{margin:"10px 25px 0px 0px", float:"right"}} >Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div id="fade" className="black_overlay"></div>
                {document.body.classList.add("scrollLock")}
            </div>
        </div>
    )
}

export default BookForm;