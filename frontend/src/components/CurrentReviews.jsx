import React, { useState } from "react";

const CurrentReviews = ({showAddAReview,user,review})=>{

    console.log(user)
    const [showMore, setShowMore] = useState(new Array(review.length).fill(false));

    const handleClick = (index)=>{
        const currentState = [...showMore];
        currentState[index] = !showMore[index];
        setShowMore(currentState);
    }
    // console.log(review);
    
    return(
        !showAddAReview&& (
            <div className="review hlt" id="rvwBox">
                {user.map((theUser, index)=>(
                    <div id="rvws">
                        {review[index]!== "" &&
                            <p 
                                className="user"
                                style={{fontWeight:"500",color:"#9895a4"}}
                            >
                                {theUser}
                            </p>
                        }

                        {review.map((reviewText, reviewIndex) => (
                            (reviewIndex===index)&& (
                                <p
                                    key={reviewIndex}
                                    className="rvw" 
                                    onClick={()=>handleClick(reviewIndex)} 
                                    style={{whiteSpace:showMore[reviewIndex]&&"normal"}} 
                                >
                                    {reviewText}
                                </p>
                            )
                        ))}
                    </div>
                ))}
            </div>
        )
    )
}

export default CurrentReviews;