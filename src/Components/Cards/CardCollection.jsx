import React, { useEffect, useState } from "react";
import CardForm from "./cardForm";
import DisplayCard from "./displayCard";
import { storage } from "../../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

var isRetreving = true;

export function setRetriving(val){
    isRetreving= val;
}

export default function CardCollection({user}) {
    const [notes, setNotes] = useState(null);

    const downloadData = async () => {
        isRetreving = true;
        getDownloadURL(ref(storage, `userNotes/${user.UID}.txt`)).then(
            (url) => {
                fetch(url)
                    .then((x) => x.text())
                    .then((y) => {
                        if (y) setNotes(JSON.parse(y));
                        isRetreving = false;
                        console.log("Retrived Data");
                    });
            }
        );
    };

    const uploadData = async () => {
        const dataRef = ref(storage, `userNotes/${user.UID}.txt`);
        const dataJSON = JSON.stringify(notes);
        const file = new Blob([dataJSON], { type: "application/json" });

        uploadBytes(dataRef, file).then(
            console.log("uploaded Data to FireBase")
        );
    };

    const addCard = (nc) => {
        isRetreving = false;
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
        if (!isRetreving) {
            localStorage.setItem("notes", JSON.stringify(notes));
            uploadData();
        }
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
