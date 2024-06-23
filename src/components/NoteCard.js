import React from 'react';
import {Card, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NoteCard.css';

const NoteCard = ({note}) => {
    const truncatedText = note.title.length > 17 ? note.title.substring(0, 17) + '..' : note.title;
    const truncatedDescription = note.description.length > 25 ? note.description.substring(0, 25) + '..' : note.description;

    return (
        <Card className="mb-3 card-size">
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-end mb-2 favorite-icon-container">
                    <div className="badge">
                        <span>{note.theme_name}</span>
                    </div>
                    <div className="favorite-icon">
                        <Image
                            src={`${process.env.PUBLIC_URL}/${note.is_favorite ? 'star-enable.png' : 'star-disable.png'}`}
                            style={{width: '19px', height: '19px'}}/>
                    </div>
                </div>
                <Card.Title>{truncatedText}</Card.Title>
                <Card.Text>{truncatedDescription}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default NoteCard;
