import React, {useState} from 'react';
import {Button, Card, Col, Form, Image, Offcanvas, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NoteCard.css';
import TextareaAutosize from "react-textarea-autosize";
import {useNavigate} from "react-router-dom";

const NoteCard = ({note}) => {
    const truncatedText = note.title.length > 17 ? note.title.substring(0, 17) + '..' : note.title;
    const truncatedDescription = note.description.length > 25 ? note.description.substring(0, 25) + '..' : note.description;

    const [showFullInfo, setShowFullInfo] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const navigate = useNavigate();

    const handleFavoriteClick = () => {
        console.log(`Added ${note.title} to favorites`);
    };

    const handleFullInfoClose = () => {
        setShowFullInfo(false);
        setTimeout(() => {
            setCurrentNote(null);
        }, 300);
    }
    const handleFullInfoShow = (note) => {
        setCurrentNote(note);
        setShowFullInfo(true);
    }

    const handleChangeNote = () => {
        navigate('/add', {state: {note: currentNote}});
    };

    return (
        <Card className="mb-3 card-size">
            <Card.Body className="d-flex flex-column" onClick={() => handleFullInfoShow(note)}>
                <div className="d-flex justify-content-end mb-2 favorite-icon-container">
                    <div className="badge">
                        <span>{note.theme_name}</span>
                    </div>
                    <div className="favorite-icon" onClick={handleFavoriteClick}>
                        <Image src={`${process.env.PUBLIC_URL}/${note.is_favorite ? 'star-enable.png' : 'star-disable.png'}`}
                                   style={{width: '19px', height: '19px'}}/>
                    </div>
                </div>
                <Card.Title>{truncatedText}</Card.Title>
                <Card.Text>{truncatedDescription}</Card.Text>
            </Card.Body>
            <Offcanvas show={showFullInfo} onHide={handleFullInfoClose} placement="start"
                       style={{width: "100%", color: '#e8e8e8', backgroundColor: '#262626'}}>
                <Offcanvas.Header closeButton className="custom-offcanvas-header">
                    <div className="row justify-content-center">
                        <div className="image-container">
                            <Image src={`${process.env.PUBLIC_URL}/note_logo.png`} className="card-img-top"
                                   style={{width: 'auto', height: '100%'}}/>
                        </div>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body className="custom-offcanvas-body">
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextTitle">
                            <Form.Label className="custom-label" column sm="2">
                                Title
                            </Form.Label>
                            <Col sm="10">
                                <TextareaAutosize
                                    readOnly
                                    className="form-control-plaintext custom-textarea"
                                    value={currentNote ? currentNote.title : ''}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextDescription">
                            <Form.Label className="custom-label" column sm="2">
                                Description
                            </Form.Label>
                            <Col sm="10">
                                <TextareaAutosize
                                    readOnly
                                    className="form-control-plaintext custom-textarea"
                                    value={currentNote ? currentNote.description : ''}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextLink">
                            <Form.Label className="custom-label" column sm="2">
                                Link
                            </Form.Label>
                            <Col sm="2" className="d-flex justify-content-center">
                                <Button href={currentNote ? currentNote.link : ''}> Open </Button>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextTheme">
                            <Form.Label className="custom-label" column sm="2">
                                Theme
                            </Form.Label>
                            <Col sm="10">
                                <TextareaAutosize
                                    readOnly
                                    className="form-control-plaintext custom-textarea"
                                    value={currentNote ? currentNote.theme_name : ''}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Offcanvas.Body>
                <Button onClick={handleChangeNote}> Change note </Button>
            </Offcanvas>
        </Card>
    );
};

export default NoteCard;
