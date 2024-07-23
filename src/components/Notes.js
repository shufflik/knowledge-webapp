import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import "./Notes.css";
import NoteCard from './NoteCard';
import {backButton, mainButton} from "../telegram";
import {useNavigate} from "react-router-dom";
import {Button, Col, Dropdown, DropdownButton, Form, Image, Offcanvas, Row} from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";

const themeList = [
  {
    "id": "71e50e69-cfea-4db7-a06d-35cfe81ac4aa",
    "created_date": "2024-06-16T23:08:22.416462",
    "telegram_username": "test_username",
    "name": "test_theme1"
  },
  {
    "id": "e7e06080-2da1-4b08-833b-3079357b58d2",
    "created_date": "2024-06-16T23:08:22.416474",
    "telegram_username": "test_username",
    "name": "test_theme2"
  }
];

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
    },
    {
        "id": "96c96df5-3b92-4eda-9e1e-a2ee3cf8a620",
        "created": true,
        "created_date": "2024-06-15T17:00:47.524568",
        "message_id": "1237",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": "test_theme2",
        "title": "saved_test_title5",
        "description": "saved_test_description5",
        "is_favorite": false
    },
    {
        "id": "cd65f52c-019c-4c5c-9926-2a6ee885421f",
        "created": true,
        "created_date": "2024-06-15T17:00:47.524568",
        "message_id": "1237",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": "test_theme2",
        "title": "saved_test_title6",
        "description": "saved_test_description6",
        "is_favorite": false
    },
    {
        "id": "488ac770-75bf-4847-9620-bbb415c6d1f6",
        "created": true,
        "created_date": "2024-06-15T17:00:47.524568",
        "message_id": "1237",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": "test_theme2",
        "title": "saved_test_title7",
        "description": "saved_test_description7",
        "is_favorite": false
    },
    {
        "id": "2c2cef6d-94aa-4199-af15-550b1023f975",
        "created": true,
        "created_date": "2024-06-15T17:00:47.524568",
        "message_id": "1237",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": "test_theme2",
        "title": "saved_test_title8",
        "description": "saved_test_description8",
        "is_favorite": false
    },
    {
        "id": "337a9635-714c-455b-aa14-c39db5740636",
        "created": true,
        "created_date": "2024-06-15T17:00:47.524568",
        "message_id": "1237",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": "test_theme2",
        "title": "saved_test_title9",
        "description": "saved_test_description9",
        "is_favorite": false
    },
    {
        "id": "da6c0938-b8b7-4301-80cf-fc9d120ccc30",
        "created": true,
        "created_date": "2024-06-15T17:00:47.524568",
        "message_id": "1237",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": "test_theme2",
        "title": "saved_test_title10",
        "description": "saved_test_description10",
        "is_favorite": false
    },
    {
        "id": "0e3f460e-7207-44a4-9aac-d8099e7b302a",
        "created": true,
        "created_date": "2024-06-15T17:00:47.524568",
        "message_id": "1237",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": "test_theme2",
        "title": "saved_test_title11",
        "description": "saved_test_description11",
        "is_favorite": false
    },
    {
        "id": "df9d5d91-8a82-45e4-ae3c-f217609579e5",
        "created": true,
        "created_date": "2024-06-15T17:00:47.524568",
        "message_id": "1237",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": "test_theme2",
        "title": "saved_test_title12",
        "description": "saved_test_description12",
        "is_favorite": false
    }
];

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [themes, setThemes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [showFullInfo, setShowFullInfo] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // console.info('Fetching themes..');
        // const fetchThemes = async () => {
        //   try {
        //     const response = await axios.get('http://127.0.0.1:8000/themes',
        //         {
        //           params: {username: "test"}
        //         }
        //     );
        //     setThemes(response.data);
        //   } catch (error) {
        //     console.error('Error fetching themes:', error);
        //   }
        // };
        // fetchThemes();
        setThemes(themeList)

        mainButton("Create note", true, null, () => {
            navigate('/add', {state: {themes: themes}});
        });
        backButton(false, null)
    }, [navigate, themes]);

    useEffect(() => {
        if (showFullInfo && currentNote) {
            // Если информация о заметке показана и текущая заметка обновлена, устанавливаем кнопку "Edit"
            mainButton("Edit", true, "#dea635", () => {
                navigate('/add', {state: {note: currentNote, themes: themes}});
            });
        } else {
            // В противном случае возвращаем кнопку "Create note"
            mainButton("Create note", true, null, () => {
                navigate('/add', {state: {themes: themes}});
            });
        }
    }, [showFullInfo, currentNote, themes, navigate]);

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

    const sortNotesByTheme = (theme_name) => {
        // const fetchNotesByTheme = async () => {
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
        // fetchNotesByTheme();
        //TODO временное решение, для тестирования
        setNotes(notesTest.filter((note) => note.theme_name === theme_name))
    };

    // const handleChangeNote = () => {
    //     navigate('/add', {state: {note: currentNote}});
    // };

    return (
        <div className="container">
            <div className="row mb-3 justify-content-center sticky-dropdown">
                <DropdownButton id="dropdown-basic-button" title="Select theme">
                    {themes.map((theme) => (
                        <Dropdown.Item onClick={() => sortNotesByTheme(theme.name)}>
                            {theme.name}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </div>
            <div className="row justify-content-center">
                {notes.length === 0
                    ? (<Image src={`${process.env.PUBLIC_URL}/no-record-found.png`} className="card-img-top"
                            style={{width: 'auto', height: '100%'}}/>)
                    : (notes.map((note, index) => (
                        <div key={index} className="col-6 col-sm-5 col-md-4 mb-3 d-flex align-items-stretch"
                             onClick={() => handleFullInfoShow(note)}>
                            <NoteCard note={note}/>
                        </div>
                    )))
                }
            </div>
            <Offcanvas className="custom-offcanvas" show={showFullInfo} onHide={handleFullInfoClose} placement="bottom"
                       style={{height: "80%"}}>
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