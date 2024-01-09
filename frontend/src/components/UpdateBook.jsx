import React, { useState } from "react";
import axios from "axios";
import uploadLogo from "../pictures/chooseImg.png";

const UpdateBook = (props)=>{

    const [currentImg, setCurrentImg] = useState(props.image?props.image:uploadLogo);

// altering data
    const [data, setData] = useState({
        title: props.title,
        author: props.author,
        publisher: props.publisher,
        user:"",
        bookImg: props.image,
    })

// Original data
    const originalData = {
        title: props.title,
        author: props.author,
        publisher: props.publisher,
        user:"",
        bookImg: props.image
    }

// close form
    const handleClose = ()=> {
        props.updateForm();
    };

// base64 conversion
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

// image handling
    const handleImage = async(event)=>{
        const file = event.target.files[0];
        try{
            const base64 = await convertToBase64(file);
            setCurrentImg(base64);
            setData({
                ...data,
                bookImg: base64,
            })
            console.log(base64);
            const imgFormatStrng = base64.substr(11,4);
            const imgFormat = imgFormatStrng.split(";")
            console.log(imgFormat[0]);
        }catch(error){
            console.error(error);
        }
    };
    
// Change handling
    const handleChange = (event)=>{
        const {name, value} = event.target;

        setData({
            ...data,
            [name]: value,
        });
    };

// Submit handling
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try {
            // new object to save changed propertied
            const changedData = {};

            const _id = props._id;

            // crateing new object only for changed properties
            for(const key in data) {
                if(data[key] !== originalData[key]){
                    changedData[key] = data[key];
                }
            }

            // send data only if anyting chnaged in the newly created object above
            if ( Object.keys(changedData).length > 0){
                handleClose();
                await axios.patch(`http://localhost:3001/edit/${_id}`, changedData);
            }

        }catch(error){
            console.error(error);
        }finally{
            props.rerender();
        }
    }

    return(
        <div style={{display:"inline", overflow:"hidden"}}>
            <div id="updateBgDiv">
                <div id="updateFormDiv">
                <form action="" onSubmit={handleSubmit}>
                    <div id="updateImg">
                        <label className="uploadBookImg" htmlFor="bookImg">
                            <img 
                                className="uploadLogo" 
                                src={currentImg} alt="uplaod"
                            />
                        </label>

                        <input type="file" name="image" id="bookImg" 
                            accept=".jpeg, .jpg, .png" onChange={handleImage}
                        />
                    </div>

                    <div id="updateDetails">
                        <input
                            className="formTitle" name="title" type="text" 
                            placeholder="Book Name" onChange={handleChange} 
                            required autoComplete="off" value={data.title}
                        />

                        <input
                            className="formContent" name="author" type="text" 
                            placeholder="Author" onChange={handleChange} 
                            required autoComplete="off" value={data.author}
                        /> 

                        <input className="formContent" name="publisher" type="text" 
                            placeholder="publisher" onChange={handleChange} autoComplete="off"
                            value={data.publisher}
                        /> 

                        <input 
                            className="formContent" name="user" type="text" 
                            placeholder="Editor name (optional)" onChange={handleChange} 
                            autoComplete="off" 
                        /> 

                        <button className="btn btn-warning" type="button" onClick={handleClose}
                            style={{margin:"10px 0px 0px 15px", float:"left", border:"none"}}>Cancel
                        </button>                    

                        <button className="btn btn-success" type="submit" 
                            style={{margin:"10px 25px 0px 0px", float:"right"}}>Submit
                        </button>

                    </div>
                </form>
                </div>
            </div> 
        </div>
    )
}

export default UpdateBook;