import React from "react";

const Submitter = (props) =>{
    return(
        <div className="hlt">
            <p className="user" style={{color:"grey", margin:"15px 15px 15px 0px"}}>
                {props.submitter !== "Anonymous Submission" ? "Submitted by : " + props.submitter: props.submitter}
            </p>
        </div>
    )
}

export default Submitter;