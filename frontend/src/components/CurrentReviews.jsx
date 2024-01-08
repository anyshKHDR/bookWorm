import React, { useState } from "react";

const CurrentReviews = ({ showAddAReview, user, review }) => {
    const [showMore, setShowMore] = useState(new Array(review.length).fill(false));

    const handleClick = (index) => {
        setShowMore(showMore.map((item, idx) => idx === index ? !item : item));
    }
    if (!showAddAReview && review.length === 0) {
        return(
            <div className="review hlt" id="rvwBox" style={{color:"#abb2d9"}}>
                No Reviews
            </div>
        )
    }

    return (
        !showAddAReview && (
            <div className="review hlt" id="rvwBox">
                {user.map((theUser, index) => (
                    <div key={index} id="rvws">
                        {review[index] !== "" && (

                            //shorthand for <React.Fragment> - for grouping multiple elements without adding an extra node to the DOM
                            <> 
                                <p className="user" style={{ fontWeight: "500", color: "#9895a4" }}>
                                    {theUser}
                                </p>
                                <p
                                    className="rvw"
                                    onClick={() => handleClick(index)}
                                    style={{ whiteSpace: showMore[index] ? "normal" : "nowrap" }}
                                >
                                    {review[index]}
                                </p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        )
    );
};

export default CurrentReviews;