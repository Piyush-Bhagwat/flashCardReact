import React, { useEffect, useState } from "react";
import CardForm from "./cardForm";
import DisplayCard from "./displayCard";
import { storage } from "../../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function CardCollection() {
    const [notes, setNotes] = useState(null);

    const downloadData = async () => {
        getDownloadURL(ref(storage, "userNotes/piyush-data.txt")).then(
            (url) => {
                fetch(url)
                    .then((x) => x.text())
                    .then((y) => {
                        console.log("Retrived Data");
                        if (y) setNotes(JSON.parse(y));
                    });
            }
        );
    };

    const uploadData = async () => {
        const dataRef = ref(storage, "userNotes/piyush-data.txt");
        const dataJSON = JSON.stringify(notes);
        const file = new Blob([dataJSON], { type: "application/json" });

        uploadBytes(dataRef, file).then(
            console.log("uploaded Data to FireBase")
        );
    };

    const addCard = async (nc) => {
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

    //Saving Data
    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("notes", JSON.stringify(notes));
            uploadData();
        }, 600);
    }, [notes]);

    //Retriving Data
    useEffect(() => {
        downloadData();
    }, []);

    return (
        <div className="cardCollection">
            <CardForm newCard={addCard} />

            {notes != null && notes.map((d, i) => createCards(d, i))}
        </div>
    );
}
