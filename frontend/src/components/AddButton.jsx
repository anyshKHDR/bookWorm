import React, { useState } from "react";
import BookForm from "./BookForm";
import Submitted from "./Submitted";

const AddNew = ()=>{

    const [popup, setPopup] = useState(false);

    const [confirmSubmit, setConfirmSubmit] = useState(false);

    const handlePopup = ()=>{
        // setPopup(!popup);
        setPopup(true);
    };

    const closePopup = ()=>{
        setPopup(false);
        setConfirmSubmit(false);
    };

    const onSubmit = ()=>{
        setConfirmSubmit(true);
        setPopup(false);
    }

    return( 
        <div className="addButton">
            <button type="button" onClick={handlePopup}>Add a book</button>
            {popup?
                <BookForm 
                    closePopup = {closePopup}
                    onSubmit = {onSubmit}
                /> 
            :
                confirmSubmit &&
                <Submitted 
                />
            }
        </div>
    )   
};

export default AddNew;