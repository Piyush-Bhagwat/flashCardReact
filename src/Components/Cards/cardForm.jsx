import React from "react";
import { v4 as uuid } from "uuid";

export default function CardForm({ newCard }) {
    function handleSubmit() {
        const nc = {
            content: document.querySelector(".inputCard textarea").value,
            tag: document.querySelector(".inputCard input").value,
            key: uuid(),
        };
        document.querySelector(".inputCard textarea").value = "";
        document.querySelector(".inputCard input").value = ""; 
        newCard(nc);
    }

    document.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    });

    return (
        <div className="inputCard card">
            <textarea
                maxLength={200}
                name="content"
                placeholder="Start Typing..."
                className="content"
            ></textarea>
            <div className="tagBtn">
                <input type="text" placeholder="Add Tag..." className="tag" />
                <button className="saveBtn" onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
}
