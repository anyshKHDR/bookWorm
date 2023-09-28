import React from "react";
import AddNew from "./AddButton";
function Card(props){
        // {console.log(props)}
    return(
        <div className="container cards">
            <div className="row">
                <div className="col-sm-4 col1"></div>
                <div className="col-sm-8 col2">
                    <div className="title hlt"><h3>{props.title}</h3></div>
                    <div className="author hlt"><h5>{props.author} </h5></div>
                    <div className="publisher hlt"><h6><span className="by">published by {props.publisher}</span></h6></div>
                    <div className="rating hlt"><p>rating: &nbsp;{props.rating}/10</p></div>
                    <div className="review hlt">
                        <p className="user">UserName</p>
                        <p className="rvw">{props.review} </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;