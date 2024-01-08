import React from "react";

const CurrentRating = ({rating})=>{

    const avgRating = ()=>{
        // console.log(rating);
        const ratingArray = rating;
        const initialValue = 0;
        const sumWithInitial = ratingArray.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
        const avg = ( sumWithInitial/rating.length );
        const roundedAvg = Math.round(avg * 10) /10;
        return roundedAvg;
    };

    return(
        <div className="rating hlt" id="rating" style={{display:"inline-block", marginBottom:"0px"}}>
            {rating.length > 0 ?
                <p>
                    rating: &nbsp;{avgRating()}/10 &nbsp;({rating.length})
                </p>
            :<p style={{color:"#abb2d9"}}>No ratings</p>
            }
        </div>
    )
}

export default CurrentRating;