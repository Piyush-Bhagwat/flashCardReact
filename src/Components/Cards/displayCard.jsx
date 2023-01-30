import React from "react";

export default function DisplayCard({ content, tag, id, onDelete }) {
    return (
        <div className="card">
            <p className="content">{content}</p>

            
            <div className="tagBtn">
                {(tag!=="")? <p className="tag">{tag}</p>: <div></div>}
                <button className="delBtn" onClick={()=> onDelete(id)}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    );
}
