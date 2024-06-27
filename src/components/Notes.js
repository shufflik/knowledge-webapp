import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import "./Notes.css";
import NoteCard from './NoteCard';
import {backButton, mainButton} from "../telegram";
import {useNavigate} from "react-router-dom";
import {Button, Col, Form, Offcanvas, Row} from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";

const notesTest = [
    {
        "id": "ab502f3b-f94b-4044-a925-ae46e9a49b4e",
        "created": true,
        "created_date": "2024-06-15T17:00:47.524560",
        "message_id": "1234",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": "test_theme1",
        "title": "saved_test_title1_aaaaaaaaaaaaaaaaaaaaaaaaasaved_test_title1_aaaaaaaaaaaaaaaaaaaaaaaaasaved_test_title1_aaaaaaaaaaaaaaaaaaaaaaaaasaved_test_title1_aaaaaaaaaaaaaaaaaaaaaaaaasaved_test_title1_aaaaaaaaaaaaaaaaaaaaaaaaa",
        "description": "saved_test_description1_aaaaaaaaaaaaaaaaaaaaaaaaa",
        "is_favorite": false
    },
    {
        "id": "88e0c002-997f-41c6-b479-a079fd7f5c60",
        "created": true,
        "created_date": "2024-06-15T17:00:47.524564",
        "message_id": "1235",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": "test_theme2",
        "title": "saved_test_title2",
        "description": "saved_test_description2",
        "is_favorite": true
    },
    {
        "id": "382fafa6-106a-44b2-af95-1be644a2a9d5",
        "created": true,
        "created_date": "2024-06-15T17:00:47.524566",
        "message_id": "1236",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": "test_theme1",
        "title": "saved_test_title3_aaaaaaaaaaaaaaaaaaaaaaaaa",
        "description": "saved_test_description3_aaaaaaaaaaaaaaaaaaaaaaaaa",
        "is_favorite": true
    },
    {
        "id": "a881643c-d6c9-433e-8853-ac28e35696ae",
        "created": true,
        "created_date": "2024-06-15T17:00:47.524568",
        "message_id": "1237",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": "test_theme2",
        "title": "saved_test_title4",
        "description": "saved_test_description4",
        "is_favorite": false
    }
];

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [showFullInfo, setShowFullInfo] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // console.info('Fetching notes..');
        // const fetchNotes = async () => {
        //   try {
        //     const response = await axios.get('http://127.0.0.1:8000/notes',
        //         {
        //           params: {username: "test"}
        //         }
        //     );
        //     setNotes(response.data);
        //   } catch (error) {
        //     console.error('Error fetching notes:', error);
        //   }
        // };
        // fetchNotes();
        setNotes(notesTest)

        mainButton("Create note", true, null, () => {
            console.log("Button in Component A clicked");
            navigate('/add');
        });
        backButton(false, null)
    }, [navigate]);


    useEffect(() => {
        if (showFullInfo && currentNote) {
            // Если информация о заметке показана и текущая заметка обновлена, устанавливаем кнопку "Edit"
            mainButton("Edit", true, "#dea635", () => {
                console.log("Button in Component A clicked");
                navigate('/add', {state: {note: currentNote}});
            });
        } else {
            // В противном случае возвращаем кнопку "Create note"
            mainButton("Create note", true, null, () => {
                console.log("Button in Component A clicked");
                navigate('/add');
            });
        }
    }, [showFullInfo, currentNote, navigate]);

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

    // const handleChangeNote = () => {
    //     navigate('/add', {state: {note: currentNote}});
    // };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                {notes.map((note, index) => (
                    <div key={index} className="col-6 col-sm-5 col-md-4 mb-3 d-flex align-items-stretch"
                         onClick={() => handleFullInfoShow(note)}>
                        <NoteCard note={note}/>
                    </div>
                ))}
            </div>
            <Offcanvas className="custom-offcanvas" show={showFullInfo} onHide={handleFullInfoClose} placement="bottom"
                       style={{height: "80%", color: '#e8e8e8', backgroundColor: '#262626'}}>
                <Offcanvas.Header closeButton className="custom-offcanvas-header">
                    {/*<div className="row justify-content-center">*/}
                    {/*    <div className="image-container">*/}
                    {/*        <Image src={`${process.env.PUBLIC_URL}/note-logo.png`} className="card-img-top"*/}
                    {/*               style={{width: 'auto', height: '100%'}}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
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
                {/*<Button onClick={handleChangeNote}> Change note </Button>*/}
            </Offcanvas>
        </div>
    );
};

export default Notes;