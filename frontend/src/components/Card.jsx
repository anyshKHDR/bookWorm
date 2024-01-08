import React,{useState} from "react";
import AddReview from "./AddReview";
import AddRating from "./AddRating";
import CurrentRating from "./CurrentRating";
import CurrentReviews from "./CurrentReviews";
import UpdateBook from "./UpdateBook";
import BookImage from "./BookImage";
import Submitter from "./Submitter";
import BookDetails from "./BookDetails";
import EditButton from "./EditButton";

function Card(props){

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAddAReview, SetShowAddAReview] = useState(false);

    const updateForm = ()=> setShowUpdateForm(!showUpdateForm);
    const newReview = ()=> SetShowAddAReview(!showAddAReview);

    return(
        <div className="container cards">
            <div className="row">

                <BookImage image={props.image} />

                <div className="col-sm-8 col2">
                    <BookDetails 
                        title={props.title} 
                        author={props.author} 
                        publisher={props.publisher} 
                    />

                    <CurrentRating rating={props.rating}/>

                    <AddRating 
                        _id = {props._id} 
                        rerender = {props.rerender}
                    />

                    <Submitter submitter = {props.submitter} />

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

                    <EditButton 
                        updateForm = {updateForm}
                        showUpdateForm = {showUpdateForm}
                    />

                </div>
            </div>
        </div>
    );
}

export default Card;