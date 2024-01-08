import React from "react";

const EditButton = (updateForm, showUpdateForm)=>{
    return(
        <button style={{ float:"right"}} onClick={updateForm}>{!showUpdateForm?"Edit the book":"Cancel"} </button>
    )
}

export default EditButton;