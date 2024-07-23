import React, {useEffect, useRef, useState} from 'react';
import './AddNote.css';
// import axios from "axios";
import {backButton, mainButton, showAlertPopup} from "../telegram";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, DropdownButton, InputGroup, Dropdown, Offcanvas, Form} from "react-bootstrap";
import {Textfit} from "react-textfit";

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
]

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
    const [validated, setValidated] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState('');
    const [selectedUnSavedNote, setSelectedUnSavedNote] = useState({
        description: '',
        id: '',
        link: '',
        title: '',
        theme_name: '',
        is_favorite: false
    });

    const location = useLocation();
    const inputRef = useRef(null);
    const navigate = useNavigate();
    // const isCanBeSaved = selectedUnSavedNote.id.trim() !== '' &&
    //                      selectedUnSavedNote.title.trim() !== '' &&
    //                      selectedUnSavedNote.description.trim() !== '' &&
    //                      selectedUnSavedNote.link.trim() !== '' &&
    //                      selectedTheme.trim() !== '';
    //
    // const setupMainButton = useCallback(() => {
    //     mainButton("Save note", isCanBeSaved, "#2cab37", () => {
    //         console.log("Button in Component A clicked");
    //         if (!isCanBeSaved) {
    //             showAlertPopup("Required fields are empty! "
    //                 + "\nId: " + selectedUnSavedNote.id
    //                 + "\ntitle: " + selectedUnSavedNote.title
    //                 + "\ndesc: " + selectedUnSavedNote.description
    //                 + "\nlink: " + selectedUnSavedNote.link
    //                 + "\ntheme: " + selectedTheme);
    //         }
    //         // Your logic for saving the note
    //     });
    // }, [isCanBeSaved, selectedUnSavedNote.id, selectedUnSavedNote.title, selectedUnSavedNote.description, selectedUnSavedNote.link, selectedTheme]);

    useEffect(() => {
        console.log("location state: " + location.state)
        if (location.state && location.state.note) {
            console.log("Pass location state: " + location.state)
            // setSelectedUnSavedNote(prevState => {
            //     if (prevState.id !== location.state.note.id) {
            //         return {
            //             description: location.state.note.description,
            //             id: location.state.note.id,
            //             link: location.state.note.link,
            //             title: location.state.note.title,
            //             theme_name: location.state.note.theme_name,
            //             is_favorite: location.state.note.is_favorite
            //         }
            //     } else {
            //         return {
            //             description: prevState.description,
            //             id: prevState.id,
            //             link: prevState.link,
            //             title: prevState.title,
            //             theme_name: prevState.theme_name,
            //             is_favorite: prevState.is_favorite
            //         }
            //     }
            // });
            setSelectedUnSavedNote({
                description: location.state.note.description,
                id: location.state.note.id,
                link: location.state.note.link,
                title: location.state.note.title,
                theme_name: location.state.note.theme_name,
                is_favorite: location.state.note.is_favorite
            });
            setSelectedTheme(location.state.note.theme_name);
            setIsFavorite(location.state.note.is_favorite);
            // navigate('/add', { replace: true, state: {} });
        }
    }, [location.state, navigate]);

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
        mainButton("Save note", true, "#2cab37", () => {
            const form = document.getElementById('custom-form');
            if (form.checkValidity() === false) {
                form.reportValidity();
            } else {
                console.log("Form is valid and can be submitted");
                const formValues = {};
                form.querySelectorAll('input, textarea').forEach((input) => {
                    if (input.id === 'is-favorite') {
                        formValues[input.id] = input.checked;
                    } else {
                        formValues[input.id] = input.value;
                    }
                });
                // showAlertPopup(`VALID! Form keys: ${Object.keys(formValues)} values: ${Object.values(formValues)}`);
                setSelectedUnSavedNote({
                    description: '',
                    id: '',
                    link: '',
                    title: '',
                    theme_name: '',
                    is_favorite: false
                })
            }
        });
        backButton(true, () => {
            navigate('/')
        })
    }, [navigate]);

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
    const handleSelectTheme = (eventKey) => {
        setSelectedTheme(eventKey);
    };
    const handleFavoriteChange = () => {
        setIsFavorite(!isFavorite);
        // setSelectedUnSavedNote(prevState => (
        //     // {
        //     //     ...prevState,
        //     //     is_favorite: !isFavorite
        //     // }
        //     {
        //         description: prevState.description,
        //         id: prevState.id,
        //         link: prevState.link,
        //         title: prevState.title,
        //         theme_name: prevState.theme_name,
        //         is_favorite: !isFavorite
        //     }
        // ));
    };
    const handleUnSavedNoteClick = (note) => {
        setSelectedUnSavedNote({
            description: note.description,
            id: note.id,
            link: note.link,
            title: note.title,
            theme_name: '',
            is_favorite: false
        });
        setIsFavorite(false);
        setShow(false);
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const handleSaveNote = () => {
        const form = document.getElementById('custom-form');
        if (form.checkValidity() === false) {
            form.reportValidity();
        } else {
            console.log("Form is valid and can be submitted");
            const formValues = {};
            form.querySelectorAll('input, textarea').forEach((input) => {
                if (input.id === 'is-favorite') {
                    formValues[input.id] = input.checked;
                } else {
                    formValues[input.id] = input.value;
                }
            });
            console.log(`VALID! Form keys: ${Object.keys(formValues)} values: ${Object.values(formValues)}`);
            showAlertPopup(`VALID! Form keys: ${Object.keys(formValues)} values: ${Object.values(formValues)}`);
        }
    };

    return (
        <div className="container">
            <Button variant="primary position-relative mb-5" onClick={handleOffcanvasShow} className="me-2">
                Unsaved notes
                {notSavedNotesTest && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {notSavedNotesTest.length}
                        <span className="visually-hidden">unread messages</span>
                </span>
                )}
            </Button>
            <Offcanvas show={show} onHide={handleOffcanvasClose} placement="bottom"
                       style={{height: '70%', color: '#e8e8e8', backgroundColor: '#262626'}}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Not saved notes</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="row justify-content-center">
                        {notSavedNote && notSavedNote.map((note, index) => (
                            <div key={index} className="row mb-3">
                                <div className="note-card col d-flex justify-content-center align-items-center">
                                    <Button className="btn btn-primary d-flex justify-content-center align-items-center"
                                            style={{width: '100%', height: '50px'}}
                                            onClick={() => handleUnSavedNoteClick(note)}>
                                        <Textfit mode="single" max={15} style={{width: '100%', textAlign: 'center'}}>
                                            {note.title}
                                        </Textfit>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            <div className="row justify-content-center">
                <Form id="custom-form" noValidate validated={validated} onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            required
                            id="title"
                            placeholder="Title"
                            aria-label="Title"
                            aria-describedby="title-addon"
                            value={selectedUnSavedNote.title}
                            onChange={(e) => setSelectedUnSavedNote(prevState => {
                                // return ({...prevState, title: e.target.value});
                                console.log("prevState: ", prevState)
                                return {
                                    description: prevState.description,
                                    id: prevState.id,
                                    link: prevState.link,
                                    title: e.target.value,
                                    theme_name: prevState.theme_name,
                                    is_favorite: prevState.is_favorite
                                }
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose the title
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control
                            required
                            id="description"
                            placeholder="Description"
                            aria-label="Description"
                            aria-describedby="description-addon"
                            value={selectedUnSavedNote.description}
                            onChange={(e) => setSelectedUnSavedNote(prevState => {
                                // return ({...prevState, description: e.target.value});
                                console.log("prevState: ", prevState)
                                return {
                                    description: e.target.value,
                                    id: prevState.id,
                                    link: prevState.link,
                                    title: prevState.title,
                                    theme_name: prevState.theme_name,
                                    is_favorite: prevState.is_favorite
                                }
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose the description
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="url-addon">url</InputGroup.Text>
                        <Form.Control
                            required
                            id="url"
                            placeholder="https://test.com"
                            aria-label="Link"
                            aria-describedby="url-addon"
                            value={selectedUnSavedNote.link}
                            onChange={(e) => setSelectedUnSavedNote(
                                prevState => {
                                    // return ({...prevState, link: e.target.value});
                                    console.log("prevState: ", prevState)
                                    return {
                                        description: prevState.description,
                                        id: prevState.id,
                                        link: e.target.value,
                                        title: prevState.title,
                                        theme_name: prevState.theme_name,
                                        is_favorite: prevState.is_favorite
                                    }
                                }
                            )}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose the url
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-4">
                        <DropdownButton title='' onSelect={handleSelectTheme}>
                            {themeList && themeList.map((theme, index) => (
                                <Dropdown.Item key={index} eventKey={theme.name}>{theme.name}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                        <Form.Control required id="theme" placeholder="Select or write a new theme name" aria-label="Theme"
                                      aria-describedby="theme-addon" style={{fontSize: '14px'}}
                                      value={selectedTheme}
                                      onChange={(e) => setSelectedTheme(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose the theme
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup>
                        <Form.Check
                            type="switch"
                            id="is-favorite"
                            label="Add to favorite"
                            checked={isFavorite}
                            onChange={handleFavoriteChange}
                        />
                    </InputGroup>
                </Form>
                <Button onClick={handleSaveNote}> Save note </Button>
            </div>
        </div>
    );
};

export default AddNote;