import React from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NoteCard.css';

const NoteNotSavedCard = ({note}) => {
    const truncatedText = note.title.length > 10 ? note.title.substring(0, 10) + '...' : note.title;
    const truncatedDescription = note.description.length > 10 ? note.description.substring(0, 10) + '...' : note.description;

    return (
        <Card className="mb-3 card-size">
            <Card.Body className="d-flex flex-column">
                    <Card.Title>{truncatedText}</Card.Title>
                    <Card.Text>{truncatedDescription}</Card.Text>
                <Button variant="primary" className="mr-2">Save</Button>
                {/*<Button variant="primary">Setting</Button>*/}
            </Card.Body>
        </Card>
    );
};

export default NoteNotSavedCard;
