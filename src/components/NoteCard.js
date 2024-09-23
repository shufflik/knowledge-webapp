import React from 'react';
import {Card, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/NoteCard.css';
import {Textfit} from "react-textfit";

const NoteCard = ({note}) => {
    return (
        <Card className="mb-1 card-size card-animated">
            <Card.Body className="custom-card-body d-flex align-items-center justify-content-center text-center">
                <Textfit mode="multi" max={30} style={{width: '100%', maxHeight: '100%', fontFamily: "Arial", fontWeight: "bold"}}>
                    {note.title}
                </Textfit>

                {note?.is_favorite ? (
                    <Image
                        src={`${process.env.PUBLIC_URL}/bookmark.png`}
                        className="favorite-icon"
                    />
                ) : null}
            </Card.Body>
        </Card>
    );
};

export default NoteCard;
