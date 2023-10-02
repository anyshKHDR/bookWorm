import React, { useState } from "react";
import BookForm from "./BookForm";
import Submitted from "./Submitted";

const AddButton = (props)=>{

    const [popup, setPopup] = useState(false);

    const [confirmSubmit, setConfirmSubmit] = useState(false);

    const handlePopup = ()=>{
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
                    rerender = {props.rerender}
                /> 
            :
                confirmSubmit &&
                <Submitted 
                />
            }
        </div>
    )   
};

export default AddButton;