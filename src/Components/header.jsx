import React from "react";
import LogIn from "./LogIn";

export default function Header({ isLoged, google, src, out}) {
    return (
        <div className="header">
            {!isLoged && <LogIn log={google} />}
            <h1>Flash Cards</h1>

            <div className="userPic">
                {isLoged ? (
                    <img onClick={out} src={src} alt="Profile Pic" />
                ) : (
                    <i className="fa-solid fa-user"></i>
                )}
            </div>
        </div>
    );
}
