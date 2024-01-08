import React from "react";
import bookImage from "../pictures/bookx.png"

const BookImage = (props) =>{
   return( 
        <div className="col-sm-4 col1" id="defaultImg">
                <img src={props.image?props.image:bookImage}
                    style={{height:"80%", width:"100%"}}
                />
        </div>
    )
}

export default BookImage;