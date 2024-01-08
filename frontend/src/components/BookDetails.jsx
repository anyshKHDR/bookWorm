import React from "react";

const BookDetails = (props)=>{
    return(
        <div>
            <div className="title hlt"><h3>{props.title}</h3></div>
            <div className="author hlt"><h5>{props.author} </h5></div>
            <div className="publisher hlt"><h6><span className="by">{props.publisher !== "" ? "Published by " + props.publisher:"Unknow Publisher"}</span></h6></div>
        </div>
    )
}

export default BookDetails;