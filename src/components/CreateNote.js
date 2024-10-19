import {
    Badge,
    Button,
    ButtonGroup,
    Dropdown,
    DropdownButton,
    Form,
    Image,
    InputGroup,
    Modal,
    ModalFooter,
    ModalHeader,
    Offcanvas, Spinner
} from "react-bootstrap";
import {Textfit} from "react-textfit";
import React, {useEffect, useState} from "react";
import Loading from "./Loading";
import {deleteNotes} from "../fetches";
import {useLoadingModal} from "./useLoadingModal";
import {openLink} from "../telegram";

const CreateNote = (
    {
        show,
        onHide,
        notSavedNotes,
        setNotSavedNotes,
        availableThemes,
        handleSubmit,
        newNote,
        setNewNote,
        fetchNotSavedNotes
    }) => {

    const [showUnsavedNote, setShowUnsavedNote] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isLoadingUnsavedNotes, setIsLoadingUnsavedNotes] = useState(false)
    const [isNotSavedNotesDeleted, setIsNotSavedNotesDeleted] = useState(false)
    const {
        showLoadingModal,
        saveStatus,
        setLoadingModalWithLoading,
        setLoadingModalWithStatus,
        closeLoadingModal
    } = useLoadingModal();

    useEffect(() => {
        setShowUnsavedNote(false)
        setValidated(false)
    }, []);

    const handleUnSavedNoteClick = (note) => {
        setNewNote({
            description: note.description,
            id: note.id,
            link: note.link,
            title: note.title,
            theme_id: '',
            is_favorite: false
        });
        setShowUnsavedNote(false);
    };

    const handleUnsavedNoteHide = async () => {
        setShowUnsavedNote(false)
        if (isNotSavedNotesDeleted) {
            setIsLoadingUnsavedNotes(true)
            await fetchNotSavedNotes(true)
            setIsLoadingUnsavedNotes(false)
        }
    }

    const handleDeleteNote = async (note) => {
        console.log("Delete unsaved note: ", note)
        setLoadingModalWithLoading();
        const response = await deleteNotes(note)
        if (response.status === 200) {
            setNotSavedNotes(notSavedNotes.filter(unsaved => note.id !== unsaved.id))
            setIsNotSavedNotesDeleted(true)
        }
        setLoadingModalWithStatus(response.status);
    }

    const handleCloseLoading = async () => {
        closeLoadingModal()
        if (saveStatus === 200 && notSavedNotes?.length === 0) {
            await handleUnsavedNoteHide()
        }
    }

    function getThemeById(theme_id) {
        let theme = availableThemes.filter((theme) => {
            return theme.id === theme_id
        })
        return theme[0].name
    }

    function handleThemeByName(theme_name) {
        let theme = availableThemes.filter((theme) => {
            return theme.name.trim().toLowerCase() === theme_name.trim().toLowerCase()
        })

        let name = theme.length > 0 ? theme[0].name : theme_name;
        let id = theme.length > 0 ? theme[0].id : '';

        // console.log(`theme_name: ${name}, theme_id: ${id}, incoming theme: ${theme_name}`)
        setNewNote(prevState => {
            return ({...prevState, theme_name: name, theme_id: id});
        })
    }

    const handleFormSubmit = () => {
        const form = document.getElementById('custom-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        handleSubmit(newNote);
    };

    return (
        <>
            <Loading
                show={showLoadingModal}
                saveStatus={saveStatus}
                onClose={handleCloseLoading}
            />
            <Offcanvas className="custom-offcanvas-unsaved" show={showUnsavedNote}
                       onHide={handleUnsavedNoteHide}
                       placement="bottom" style={{height: '80%'}}>
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <Offcanvas.Body className="custom-offcanvas-body-unsaved">
                    <div className="row justify-content-center">
                        {notSavedNotes && notSavedNotes.map((note, index) => (<div key={index} className="row mb-3">
                            <div className="note-card col d-flex justify-content-center align-items-center">
                                <ButtonGroup aria-label="unsaved-notes-group"
                                             style={{ width: '100%', height: '50px'}}>
                                    <Button className="btn btn-primary d-flex justify-content-center align-items-center"
                                        style={{ flex: '9', height: '50px' }}
                                        onClick={() => handleUnSavedNoteClick(note)}>
                                        <Textfit mode="multi" max={15} style={{width: '100%', maxHeight: '100%', textAlign: 'center'}}>
                                            {note.title}
                                        </Textfit>
                                    </Button>
                                    <Button className="btn d-flex justify-content-center align-items-center"
                                            style={{ flex: '1', height: '50px', backgroundColor: '#f15353',
                                                borderColor: '#f15353', outline: 'none', boxShadow: 'none'}}
                                            onClick={() => handleDeleteNote(note)}>
                                        <Image src={`${process.env.PUBLIC_URL}/bucket.png`}
                                               style={{ width: '100%', height: 'auto' }}/>
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </div>))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            <Modal className="create-note-modal" show={show && !showUnsavedNote} onHide={onHide}
                   centered aria-labelledby="custom-modal-styling-title">
                <ModalHeader className="justify-content-center" style={{borderBottom: "none"}}>
                    {isLoadingUnsavedNotes ? (
                        <Spinner
                            as="span"
                            animation="border"
                            role="status"
                            aria-hidden="true"
                        />
                    ) : notSavedNotes.length !== 0 ? (
                        <Button className="unsaved-button pulse-animation-button"
                                onClick={() => {setShowUnsavedNote(true)}}>
                            Unsaved notes
                            <br/>
                            <Badge pill bg="light" text="dark">{notSavedNotes.length}</Badge>
                        </Button>
                    ) : null}
                </ModalHeader>
                <Modal.Body className="text-center">
                    <Form id="custom-form" noValidate validated={validated}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                required
                                id="title"
                                placeholder="Title"
                                aria-label="Title"
                                aria-describedby="title-addon"
                                value={newNote ? newNote.title : ''}
                                onChange={(e) => setNewNote(prevState => {
                                    return ({...prevState, title: e.target.value});
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose the title
                            </Form.Control.Feedback>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Form.Control
                                id="description"
                                placeholder="Description"
                                aria-label="Description"
                                aria-describedby="description-addon"
                                value={newNote ? newNote.description : ''}
                                onChange={(e) => setNewNote(prevState => {
                                    return ({...prevState, description: e.target.value});
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose the description
                            </Form.Control.Feedback>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            {newNote && newNote.link ? (
                                <Button variant="outline-secondary" id="url-addon" style={{boxShadow: "none"}}
                                        onClick={() => openLink(newNote.link)}>
                                    Open
                                </Button>
                            ) : (
                                <InputGroup.Text id="url-addon">url</InputGroup.Text>
                            )}
                            <Form.Control
                                required
                                id="url"
                                placeholder="https://test.com"
                                aria-label="Link"
                                aria-describedby="url-addon"
                                value={newNote ? newNote.link : ''}
                                onChange={(e) => setNewNote(prevState => {
                                    return ({...prevState, link: e.target.value});
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose the url
                            </Form.Control.Feedback>
                        </InputGroup>
                        <InputGroup className="mb-4">
                            <DropdownButton menuAlign="right" title=''
                                            onSelect={(eventKey) => setNewNote(prevState => {
                                                return ({
                                                    ...prevState,
                                                    theme_name: getThemeById(eventKey),
                                                    theme_id: eventKey
                                                });
                                            })}>
                                {availableThemes && availableThemes.map((theme, index) => (
                                    <Dropdown.Item key={index} eventKey={theme.id}>{theme.name}</Dropdown.Item>))}
                            </DropdownButton>
                            <Form.Control required id="theme" placeholder="Select or write a new theme name"
                                          aria-label="Theme"
                                          aria-describedby="theme-addon" style={{fontSize: '14px'}}
                                          value={newNote.theme_name}
                                          onBlur={(e) => handleThemeByName(e.target.value)}
                                          onChange={(e) => setNewNote(prevState => ({
                                              ...prevState, theme_name: e.target.value
                                          }))}
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
                                checked={newNote.is_favorite}
                                onChange={(e) => setNewNote(prevState => {
                                    return ({...prevState, is_favorite: e.target.checked});
                                })}
                            />
                        </InputGroup>
                    </Form>
                </Modal.Body>
                <ModalFooter className="justify-content-center">
                    <Button className="btn create-button" onClick={handleFormSubmit}>
                        Create
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default CreateNote;