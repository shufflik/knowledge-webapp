import React, {useEffect, useRef, useState} from 'react';
import './AddNote.css';
// import axios from "axios";
import {backButton, mainButton} from "../telegram";
import {useNavigate} from "react-router-dom";
import {Button, Offcanvas} from "react-bootstrap";
import {Textfit} from "react-textfit";

const notSavedNotesTest = [
    {
        "id": "7f09574e-b2f1-4a03-84d8-9522caeeb5a8",
        "created": false,
        "created_date": "2024-06-15T17:00:47.524575",
        "message_id": "12345",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": null,
        "title": "test_title1_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "description": "test_description1_aaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
        "id": "370d816a-d79b-480c-86e1-4919c8d84c7f",
        "created": false,
        "created_date": "2024-06-15T17:00:47.524578",
        "message_id": "12346",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": null,
        "title": "test_title2",
        "description": "test_description2"
    },
    {
        "id": "3a666d9b-efb6-4162-b263-cdce5adfc719",
        "created": false,
        "created_date": "2024-06-15T17:00:47.524579",
        "message_id": "12347",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": null,
        "title": "test_title3_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "description": "test_description3_aaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
        "id": "9acad02f-6819-4a9a-8e6b-944bbad7a8a6",
        "created": false,
        "created_date": "2024-06-15T17:00:47.524581",
        "message_id": "12348",
        "telegram_username": "test_username",
        "link": "https://fastapi.tiangolo.com/tutorial/query-params",
        "theme_name": null,
        "title": "test_title4",
        "description": "test_description4"
    }
];

const AddNote = () => {
    const [notSavedNote, setNotSavedNotes] = useState(null);
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // console.info('Fetching not saved notes..');
        // const fetchNotSavedNotes = async () => {
        //     try {
        //         const response = await axios.get('http://127.0.0.1:8000/notes',
        //             {
        //                 params: {username: "test", is_saved: false}
        //             }
        //         );
        //         console.info(response.data)
        //         setNotSavedNotes(response.data);
        //         if (response.data.length > 0) {
        //             setShowModal(true);
        //         }
        //     } catch (error) {
        //         console.error('Error fetching not saved notes:', error);
        //     }
        // };
        // fetchNotSavedNotes();

        setNotSavedNotes(notSavedNotesTest);

        const isEnabled = inputValue.trim() !== '';
        mainButton("Save note", isEnabled, () => {
            console.log("Button in Component A clicked");
            // Ваша логика для Component A
        });
        backButton(true, () => {
            navigate('/')
        })
    }, [inputValue, navigate]);

    // Обработка скрытия клавиатура
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                inputRef.current.blur();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const handleOffcanvasClose = () => {
        setShow(false);
    }
    const handleOffcanvasShow = () => {
        setShow(true);
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const listOfNames = [
        "San Francisco",
        "New York",
        "Seattle",
        "Los Angeles",
        "Chicago"
    ];

    return (
        <div className="container text-center">
            <Button variant="primary" onClick={handleOffcanvasShow} className="me-2">
                Unsaved notes
            </Button>
            <Offcanvas show={show} onHide={handleOffcanvasClose} placement="bottom" style={{height: '70%'}}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Not saved notes</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="row justify-content-center">
                        {notSavedNote && notSavedNote.map((note, index) => (
                            <div key={index} className="row mb-3">
                                <div className="note-card col d-flex justify-content-center align-items-center">
                                    <button type="button" className="btn btn-outline-primary d-flex justify-content-center align-items-center"
                                            style={{width: '100%', height: '50px'}}>
                                        <Textfit mode="single" max={15} style={{width: '100%', textAlign: 'center', color: '#262626'}}>
                                            {note.title}
                                        </Textfit>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            <div className="row justify-content-center">
                <div className="mb-3" style={{maxWidth: '400px', width: '100%'}}>
                    <label htmlFor="exampleDataList" className="form-label">Datalist example</label>
                    <input className="form-control" list="datalistOptions" id="exampleDataList"
                           placeholder="Type to search..." value={inputValue} onChange={handleInputChange}
                           ref={inputRef}/>
                    <datalist id="datalistOptions">
                        {listOfNames.map((option, index) => (
                            <option key={index} value={option}/>
                        ))}
                    </datalist>
                </div>
            </div>
            <div className="row justify-content-center">
                <button type="button" className="btn btn-primary">
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddNote;