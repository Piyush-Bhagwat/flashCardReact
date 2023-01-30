import React, { useEffect, useState } from "react";
import CardForm from "./cardForm";
import DisplayCard from "./displayCard";


export default function CardCollection() {
    const [notes, setNotes] = useState(null);

    const addCard = (nc) => {
        if (nc.content !== "") {
            setNotes((prevState) => {
                if (prevState === null) {
                    return [nc];
                } else return [nc, ...prevState];
            });
            console.log("Card Saved: ", nc);
        }
    };

    const deleteNote = (id) => {
        console.log("Deleting " + id);
        const filteredNotes = notes.filter((note) => note.key !== id);  
        if (filteredNotes.length === 0) {
            setNotes(null);
        } else {
            setNotes(filteredNotes);
        }
    };

    function createCards(d) {
        if (d === "") {
            return;
        } else
            return (
                <DisplayCard
                    key={d.key}
                    id={d.key}
                    content={d.content}
                    tag={d.tag}
                    onDelete={deleteNote}
                />
            );
    }

    //Retriving Data
    useEffect(() => {
        const retrivedData = JSON.parse(localStorage.getItem("notes"));
        if (retrivedData) setNotes(retrivedData);
        console.log("Retrived Data: ", retrivedData);
    }, []);

    //Saving Data
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
        console.log("Saved Data: ", notes);
    }, [notes]);
    
    return (
        <div className="cardCollection">
            <CardForm newCard={addCard} />

            {notes != null && notes.map((d, i) => createCards(d, i))}
        </div>
    );
}
