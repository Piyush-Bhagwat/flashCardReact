import React, { useState } from "react";

export default function DisplayCard({ content, tag, id, onDelete, onEdit }) {
    var editedNote = {};

    const [isEditable, setEditable] = useState(false);
    const [editValue, setEditValue] = useState({ content, tag, key: id });

    const handleEdit = () => {
        setEditable(true);
        console.log("Editable:", true);
    };

    const readEdit = (e) => {
        let edit = {
            content: document.querySelector("#editTextArea").value,
            tag: document.querySelector("#editInput").value,
            key: id,
        };
        setEditValue(edit);
    };

    const handleSave = () => {
        setEditable(false);
        onEdit(editValue);
    }

    document.addEventListener("keypress", (e) =>{
        if(e.key === "Enter"){
            handleSave();
        }
    })

    return (
        <div className="card">
            {isEditable ? (
                <textarea
                    name=""
                    maxLength={200}
                    className="content"
                    onChange={readEdit}
                    value={editValue.content}
                    id="editTextArea"
                ></textarea>
            ) : (
                <p className="content" contentEditable={isEditable}>
                    {content}
                </p>
            )}

            <div className="tagBtn">
                {isEditable ? (
                    <input
                        onChange={readEdit}
                        className="tag"
                        type="text"
                        id="editInput"
                        value={editValue.tag}
                    />
                ) : tag !== "" ? (
                    <p contentEditable={isEditable} className="tag">
                        {tag}
                    </p>
                ) : (
                    <div></div>
                )}

                <div className="controls">
                    {isEditable ? (
                        <button onClick={handleSave}>
                            <i className="fa-solid fa-floppy-disk"></i>
                        </button>
                    ) : (
                        <button onClick={handleEdit}>
                            <i className="fa-solid fa-pencil"></i>
                        </button>
                    )}
                    <button onClick={() => onDelete(id)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
