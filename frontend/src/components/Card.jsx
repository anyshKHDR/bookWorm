import AddReview from "./AddReview";
import AddRating from "./AddRating";
import CurrentRating from "./CurrentRating";
import React,{useState} from "react";
import CurrentReviews from "./CurrentReviews";
import bookImage from "../pictures/headPic.jpeg"
import UpdateBook from "./UpdateBook";

function Card(props){

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAddAReview, SetShowAddAReview] = useState(false);

    const newReview = ()=> SetShowAddAReview(!showAddAReview);
    const updateForm = ()=> setShowUpdateForm(!showUpdateForm);

    return(
        <div className="container cards">
            <div className="row">
                <div className="col-sm-4 col1">
                    <img src={props.image?props.image:bookImage} alt="" 
                        style={{height:"100%", width:"100%"}}
                    />
                </div>

                <div className="col-sm-8 col2">
                    <div className="title hlt"><h3>{props.title}</h3></div>
                    <div className="author hlt"><h5>{props.author} </h5></div>
                    <div className="publisher hlt"><h6><span className="by">{props.publisher !== "" ? "Published by " + props.publisher:"Unknow Publisher"}</span></h6></div>

                    <CurrentRating rating={props.rating}/>

                    <AddRating 
                        _id = {props._id} 
                        rerender = {props.rerender}
                    />

                    <div className="hlt">
                        <p className="user" style={{color:"grey", margin:"15px 15px 15px 0px"}}>
                            {props.submitter !== "Anonymous Submission" ? "Submitted by : " + props.submitter: props.submitter}
                        </p>
                    </div>
                    
                    <CurrentReviews 
                        showAddAReview = {showAddAReview}
                        user = {props.user}
                        review = {props.review}
                    />

                    <AddReview 
                        _id = {props._id} 
                        showAddAReview = {showAddAReview}
                        newReview = {newReview} 
                        rerender = {props.rerender}
                    />

                    {showUpdateForm && 
                        <UpdateBook 
                            _id = {props._id} 
                            title = {props.title}
                            author = {props.author}
                            publisher = {props.publisher}
                            image = {props.image}
                            updateForm = {updateForm}
                            rerender = {props.rerender}
                        />
                    }
                    <button style={{ float:"right"}} onClick={updateForm}>{!showUpdateForm?"Edit the book":"Cancel"} </button>

                </div>
            </div>
        </div>
    );
}

export default Card;