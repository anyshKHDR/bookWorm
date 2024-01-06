import React from "react";
import headPic from "../pictures/headPic.png"

function Header() {
    return(
        <header>
            <div className="headerDiv">
                <div className="imgDiv">
                    <img className="headPic" src={headPic} />
                </div>
                    <h1 className="pageTitle">book Worms</h1>
            </div>
        </header>
    );
}

export default Header;