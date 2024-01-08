import React from "react";

const EditButton = (props)=>{
    return(
        <button style={{ float:"right"}} onClick={props.updateForm}>{!props.showUpdateForm?"Edit the book":"Cancel"} </button>
    )
}

export default EditButton;