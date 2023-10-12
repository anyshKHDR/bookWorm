// import React, { useState } from "react";

// const CurrentReviews = ({showAddAReview,user,review})=>{

//     const [showMore, setShowMore] = useState(new Array(review.length).fill(false));

//     const handleClick = (index)=>{
//         const currentState = [...showMore];
//         currentState[index] = !showMore[index];
//         setShowMore(currentState);
//     }

//     return (
//          review.forEach((data)=>{

//     })
//     )
//  }
// export default CurrentReviews;





import React, { useState } from "react";

const CurrentReviews = ({showAddAReview,user,review})=>{

    const [showMore, setShowMore] = useState(new Array(review.length).fill(false));

    const handleClick = (index)=>{
        const currentState = [...showMore];
        currentState[index] = !showMore[index];
        setShowMore(currentState);
    }
    console.log(review);
    
    return(
        !showAddAReview&& 
         
        <div className="review hlt">
            {user.map((theUser, index)=>(
                <div>
                    {review[index]!== "" &&
                        <p className="user">{theUser}</p>
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
}

export default CurrentReviews;