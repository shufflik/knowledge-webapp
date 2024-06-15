import React from 'react';
import { Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NoteCard.css';

const NoteNotSavedCard = ({note}) => {
    const truncatedText = note.title.length > 10 ? note.title.substring(0, 10) + '...' : note.title;
    const truncatedDescription = note.description.length > 10 ? note.description.substring(0, 10) + '...' : note.description;

    return (
        <Card className="mb-3">
            <Card.Body>
                <OverlayTrigger placement="top"
                                overlay={<Tooltip id={`tooltip-${note.id}`}>{note.title}</Tooltip>}>
                    <Card.Title>{truncatedText}</Card.Title>
                </OverlayTrigger>
                <OverlayTrigger placement="top"
                                overlay={<Tooltip id={`tooltip-${note.id}`}>{note.description}</Tooltip>}>
                    <Card.Text>{truncatedDescription}</Card.Text>
                </OverlayTrigger>
                <Button variant="primary" className="mr-2">Save</Button>
                {/*<Button variant="primary">Setting</Button>*/}
            </Card.Body>
        </Card>
    );
};

export default NoteNotSavedCard;
