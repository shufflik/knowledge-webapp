import React from 'react';
import './NoteCard.css';

const NoteCard = ({note}) => {
    return (
        // <div className="card" style={{ maxWidth: '15rem' }}>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.content}</p>
                <a href={note.link.href} className="btn btn-primary">Open</a>
                <a className="btn btn-primary">Setting</a>
            </div>
        </div>
    );
};

export default NoteCard;
