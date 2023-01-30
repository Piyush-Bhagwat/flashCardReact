import React from "react";
import CardCollection from "./Cards/CardCollection";
import Header from "./header";


export default function App() {
    

    return (
        <div className="body">
            <Header />
            <CardCollection />
            <p className="copyright">
                Made by{" "}
                <a href="https://github.com/Piyush-Bhagwat" target="_blank">
                    abNormal
                </a>
            </p>
        </div>
    );
}
