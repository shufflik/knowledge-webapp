import React from 'react';
import {Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/NoteCard.css';
import {Textfit} from "react-textfit";

const ThemeCard = ({theme}) => {
    return (
        <Card className="mb-1 card-size card-animated">
            <Card.Body className="custom-card-body">
                <Card.Title style={{ margin: 0 }}>
                    <Textfit mode="multi" max={30} style={{width: '100%', maxHeight: '100%', fontFamily: "Arial"}}>
                        {theme.name}
                    </Textfit>
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default ThemeCard;
