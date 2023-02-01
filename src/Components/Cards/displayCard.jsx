import React from "react";

export default function DisplayCard({ content, tag, id, onDelete, onEdit }) {
    return (
        <div className="card">
            <p className="content">{content}</p>

            <div className="tagBtn">
                {tag !== "" ? <p className="tag">{tag}</p> : <div></div>}

                <div className="controls">
                    <button className="delBtn" onClick={() => onEdit(id)}>
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button className="delBtn" onClick={() => onDelete(id)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
