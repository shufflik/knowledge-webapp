import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NoteCard.css';

const NoteCard = ({note}) => {
    const truncatedText = note.title.length > 10 ? note.title.substring(0, 10) + '...' : note.title;
    const truncatedDescription = note.description.length > 10 ? note.description.substring(0, 10) + '...' : note.description;

    const handleFavoriteClick = () => {
        console.log(`Added ${note.title} to favorites`);
    };

    return (
        <Card className="mb-3 card-size">
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-end mb-2 favorite-icon-container">
                    <div className="badge">
                        <span>{note.theme_name}</span>
                    </div>
                    <div className="favorite-icon" onClick={handleFavoriteClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                             fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                            <path
                                d="M2.866 14.85c-.078.444.36.791.746.593l3.39-1.797a.5.5 0 0 1 .475 0l3.39 1.797c.386.198.824-.149.746-.592l-.65-3.75a.5.5 0 0 1 .145-.474l2.727-2.654c.329-.32.158-.888-.283-.95l-3.768-.548a.5.5 0 0 1-.375-.272L8 2.223 6.651 5.206a.5.5 0 0 1-.375.272l-3.768.548c-.441.062-.612.63-.282.95l2.727 2.654a.5.5 0 0 1 .145.474l-.65 3.75zm4.905-2.767a1 1 0 0 0-.925 0l-3.39 1.797a.5.5 0 0 1-.746-.593l.65-3.75a1 1 0 0 0-.291-.948L.44 6.478a.5.5 0 0 1 .283-.95l3.768-.548a1 1 0 0 0 .754-.55L8 1.223l1.755 3.507a1 1 0 0 0 .754.55l3.768.548a.5.5 0 0 1 .283.95l-2.727 2.654a1 1 0 0 0-.291.948l.65 3.75a.5.5 0 0 1-.746.593l-3.39-1.797z"/>
                        </svg>
                    </div>
                </div>
                <Card.Title>{truncatedText}</Card.Title>
                <Card.Text>{truncatedDescription}</Card.Text>
            </Card.Body>
            {/*<Card.Footer>*/}
            {/*    <small className="text-muted">#hello</small>*/}
            {/*</Card.Footer>*/}
        </Card>
    );
};

export default NoteCard;
