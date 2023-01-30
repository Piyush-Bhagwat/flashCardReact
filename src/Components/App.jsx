import React, { useEffect, useState } from "react";
import CardCollection, {setRetriving} from "./Cards/CardCollection";
import LogIn from "./LogIn";
import Header from "./header";
import { signInWithGoogle } from "../firebase-config";

var userDetail = {
    name: "",
    UID: "",
    email: "",
    imgURL: "",
};

export default function App() {
    const [isLogedIn, setLogIn] = useState(false);

    const googleLogin = () => {
        signInWithGoogle()
            .then((res) => {
                const name = res.user.displayName;
                const email = res.user.email;
                const UID = res.user.uid;
                const URL = res.user.photoURL;
                console.log(`logged In user: ${name} UID: ${UID}`);

                localStorage.setItem("name", name);
                localStorage.setItem("UID", UID);
                localStorage.setItem("email", email);
                localStorage.setItem("img", URL);

                console.log("signing");


                readLogin();

                window.location.reload(false);
            })
            .catch((err) => console.log(err));
    };

    function readLogin() {
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        const UID = localStorage.getItem("UID");
        const imgURL = localStorage.getItem("img");
        if (name) {
            userDetail = {
                name,
                email,
                UID,
                imgURL,
            };
            console.log(`Signed in: ${name}`, userDetail);
            setLogIn(true);
        }
    }

    const logOut = () =>{
        localStorage.clear();
        setRetriving(true);
        setLogIn(false);
    }

    useEffect(() => {
        readLogin();
    }, []);

    return (
        <div className="body">
            <Header isLoged={isLogedIn} src={userDetail.imgURL} out={logOut} google={googleLogin} />

            {isLogedIn ? <CardCollection user={userDetail}/>: <h1 style={{textAlign: "center"}}>Log In to continue</h1>}

            <p className="copyright">
                Made by{" "}
                <a href="https://github.com/Piyush-Bhagwat" target="_blank">
                    abNormal
                </a>
            </p>
        </div>
    );
}
