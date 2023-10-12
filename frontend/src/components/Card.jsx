import AddReview from "./AddReview";
import AddRating from "./AddRating";
import CurrentRating from "./CurrentRating";
import { useState } from "react";
import CurrentReviews from "./CurrentReviews";

function Card(props){

    const [showAddAReview, SetShowAddAReview] = useState(false);
    const [showAddRating, SetShowAddRating] = useState(false);

    const newReview = ()=> SetShowAddAReview(!showAddAReview);
    const newRating = ()=> SetShowAddRating(!showAddRating);

    return(
        <div className="container cards">
            <div className="row">
                <div className="col-sm-4 col1"></div>
                <div className="col-sm-8 col2">
                    <div className="title hlt"><h3>{props.title}</h3></div>
                    <div className="author hlt"><h5>{props.author} </h5></div>
                    <div className="publisher hlt"><h6><span className="by">published by {props.publisher}</span></h6></div>

                    <CurrentRating rating={props.rating}/>

                    {showAddRating && 
                        <AddRating 
                            newRating = {newRating} 
                            _id = {props._id} 
                            rerender = {props.rerender}
                        />
                    }
                    <button onClick={newRating}>{!showAddRating? "Rate this Book" : "Cancel" }</button>

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

                </div>
            </div>
        </div>
    );
}

export default Card;