import AddReview from "./AddReview";
import AddRating from "./AddRating";
import CurrentRating from "./CurrentRating";
import React,{useState} from "react";
import CurrentReviews from "./CurrentReviews";
import bookImage from "../pictures/headPic.jpeg"
import UpdateBook from "./UpdateBook";

function Card(props){

    const [showAddAReview, SetShowAddAReview] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

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
                    <div className="publisher hlt"><h6><span className="by">published by {props.publisher}</span></h6></div>

                    <CurrentRating rating={props.rating}/>

                    <AddRating 
                        _id = {props._id} 
                        rerender = {props.rerender}
                    />

                    <div className="hlt">
                        <p className="user" style={{color:"grey"}}>Submitted by:&nbsp; {props.user[0]}</p>
                    </div>
                    
                    <CurrentReviews 
                        showAddAReview = {showAddAReview}
                        user = {props.user}
                        review = {props.review}
                    />

                    {showAddAReview &&
                        <AddReview 
                            _id = {props._id} 
                            newReview = {newReview} 
                            rerender = {props.rerender}
                        />
                    }
                    <button onClick={newReview}>{!showAddAReview?"Add A review" : "Cancel"} </button>

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
                    <button style={{ float:"right"}} onClick={updateForm}>{!showUpdateForm?"Edit":"Cancel"} </button>

                </div>
            </div>
        </div>
    );
}

export default Card;