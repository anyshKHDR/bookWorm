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
        <div className="rating hlt" id="rating">
            {rating.length > 0 ?
                <p>
                    rating: &nbsp;{avgRating()}/10 &nbsp;&nbsp;&nbsp;({rating.length})
                </p>
            :"No ratings" 
            }
        </div>
    )
}

export default CurrentRating;