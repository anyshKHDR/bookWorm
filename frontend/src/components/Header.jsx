import React from "react";
import headPic from "../pictures/headPic.jpeg"

function Header() {
    return(
        <header>
            <div className="imgDiv">
                <img className="headPic" src={headPic} />
            </div>
                <h1>book Worms</h1>
        </header>
    );
}

export default Header;