import React, { useState } from "react";

const Submitted = ()=>{

    const [closeSubmit, setCloseSubmit] = useState(false);
    
    const handleAnimationEnd = (()=> {
        document.body.classList.remove("scrollLock");
        setCloseSubmit(true);
    })
    return(
        <div className="confirmationDiv" style={{display:closeSubmit&&"none"}} onAnimationEnd={handleAnimationEnd}>
            <h1>Submitted</h1>
        </div>
    )
}

export default Submitted;