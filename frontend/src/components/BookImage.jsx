import React from "react";
import bookImage from "../pictures/bookx.png"

const BookImage = (props) =>{
   return( 
        <div className="col-sm-4 col1" id="defaultImg">
                <img src={props.image?props.image:bookImage} alt=""
                    style={{height:"99%", width:"99%"}}
                />
        </div>
    )
}

export default BookImage;