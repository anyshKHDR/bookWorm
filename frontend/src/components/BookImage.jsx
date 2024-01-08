import React from "react";
import bookImage from "../pictures/headPic.jpeg"

const BookImage = (props) =>{
   return( 
        <div className="col-sm-4 col1">
            <img src={props.image?props.image:bookImage} alt="Book Image" 
                style={{height:"100%", width:"100%"}}
            />
        </div>
    )
}

export default BookImage;