import React, {useEffect, useState} from 'react';
import './AddNote.css';
// import axios from "axios";
import NoteNotSavedCard from "./NoteNotSavedCard";
import {openMainButton} from "../telegram";

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
    const [showModal, setShowModal] = useState(false);
    const [inputValue, setInputValue] = useState('');

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
        openMainButton("Save note", isEnabled, () => {
            console.log("Button in Component A clicked");
            // Ваша логика для Component A
        });
    }, [inputValue]);

    useEffect(() => {
        // Показать модальное окно только при первом монтировании компонента
        setShowModal(true);
    }, []);

    const handleClose = () => setShowModal(false);
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
            {showModal && (
                <div className="modal fade show" style={{display: 'block'}} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Not saved notes</h5>
                                {/*<button type="button" className="close" aria-label="Close" onClick={handleClose}>*/}
                                {/*    <span aria-hidden="true">&times;</span>*/}
                                {/*</button>*/}
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="row">
                                        {notSavedNote.map((note, index) => (
                                            <div key={index}
                                                 className="col-4 col-sm-4 col-md-4 mb-4 d-flex align-items-stretch">
                                                <NoteNotSavedCard note={note}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}
            <br/>
            <div className="row justify-content-center">
                <div className="mb-3" style={{maxWidth: '400px', width: '100%'}}>
                    <label htmlFor="exampleDataList" className="form-label">Datalist example</label>
                    <input className="form-control" list="datalistOptions" id="exampleDataList"
                           placeholder="Type to search..." value={inputValue} onChange={handleInputChange}/>
                    <datalist id="datalistOptions">
                        {listOfNames.map((option, index) => (
                            <option key={index} value={option}/>
                        ))}
                    </datalist>
                </div>
            </div>
            <div className="row justify-content-center">
                <button type="button" className="btn btn-primary" onClick={handleClose}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddNote;