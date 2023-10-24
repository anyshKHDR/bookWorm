import React, { useState } from "react";
import axios from "axios";
import uploadLogo from "../pictures/upload_logo.png"

const BookForm = (props)=> {

    const [currentImg, setCurrentImg] = useState(uploadLogo);

    const [data, setData] = useState({
        title:"",
        author:"",
        publisher:"",
        rating:"",
        review:"",
        user:"",
        image:""
    })

    const handleChange = (event)=>{
        const {name, value} = event.target;
        // console.log(event.target.value);

        setData({
            ...data,
            [name]: value,
        });
    };

// ----------------------------------------------------------------

    const convertToBase64 = (file)=>{
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = ()=>{
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) =>{
                reject(error)
            };
        })
    }
    
    const handleImage = async(event)=>{
        const file = event.target.files[0];
        // console.log();
        try{
            const base64 = await convertToBase64(file);
            setCurrentImg(base64);
            setData({
                ...data,
                image: base64,
            })
            console.log(base64);
            const imgFormatStrng = base64.substr(11,4);
            const imgFormat = imgFormatStrng.split(";")
            console.log(imgFormat[0]);
        }catch(error){
            console.error(error);
        }
    };
    
    const handleCancel = ()=> {
        document.body.classList.remove("scrollLock");
        props.closePopup();
    };

    const handleSubmit = async (event) => {
       event.preventDefault(); 
       try {
        await axios.post("http://localhost:3001/submit", data);
        props.rerender();
        props.onSubmit();
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

                                <div className="col-sm-4 col1">
                                    <label className="uploadBookImg" htmlFor="bookImg">
                                        <img className="uploadLogo" src={currentImg} alt="uplaod" 
                                            // style={{height:"100%", width:"100%"}}
                                        />
                                    </label>
                                    <input type="file" name="image" id="bookImg" accept=".jpeg, .jpg, .png" onChange={handleImage}/>
                                </div>

                                <div className="col-sm-8 col2">
                                    <input className="formTitle" name="title" type="text" placeholder="Book Name" onChange={handleChange} required autoComplete="off"/>
                                    <input className="formContent" name="author" type="text" placeholder="Author" onChange={handleChange} required autoComplete="off"/> 
                                    <input className="formContent" name="publisher" type="text" placeholder="publisher" onChange={handleChange} autoComplete="off"/> 
                                    <input className="formContent" name="rating" type="number" step={0.1} min={1} max={10} placeholder="Your rating out of 10" onChange={handleChange} autoComplete="off"/> 
                                    <textarea className="formContent" name="review" id="" cols="" rows="3" style={{height:"auto"}} placeholder="write a review" onChange={handleChange} autoComplete="off"></textarea>
                                    <input className="formContent" name="user" type="text" placeholder="Your name (optional)" onChange={handleChange} autoComplete="off"/> 
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