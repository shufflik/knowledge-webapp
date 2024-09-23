import React, {useContext, useEffect, useState} from 'react';
import "../style/Notes.css";
import NoteCard from './NoteCard';
import {
    Badge,
    Button,
    Form,
    Image,
    Row,
    Spinner
} from "react-bootstrap";
import {useLoadingModal} from "./useLoadingModal";
import Loading from "./Loading";
import {AppContext} from "../AppContext";
// import {notSavedNotesTest} from "../testData"
import FullInfoNote from "./FullInfoNote";
import {createNotes, deleteNotes, fetchNotesByTheme, updateNotes} from "../fetches";
import DeleteConfirm from "./DeleteConfirm";
import CreateNote from "./CreateNote";

const Notes = () => {
    const {
        currentTheme,
        setCurrentTheme,
        availableThemes,
        notesForTheme,
        setNotesForTheme,
        selectedNote,
        setSelectedNote,
        isAvailableThemesFetched,
        isFailedFetching,
        fetchAvailableThemes,
        fetchNotSavedNotes,
        notSavedNotesFetched,
        setNotSavedNotesFetched,
        notSavedNotes,
        setNotSavedNotes
    } = useContext(AppContext);
    const [newNote, setNewNote] = useState({
        description: '',
        id: '',
        link: '',
        title: '',
        theme_id: '',
        theme_name: '',
        is_favorite: false
    });
    const [showFullInfo, setShowFullInfo] = useState(false);
    const [isLoadingNotes, setIsLoadingNotes] = useState(false)
    const [isLoadingUnsavedNotes, setIsLoadingUnsavedNotes] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [showCreateNote, setShowCreateNote] = useState(false)
    const [isGetNoteFailed, setIsGetNoteFailed] = useState(false)
    const {
        showLoadingModal,
        saveStatus,
        setLoadingModalWithLoading,
        setLoadingModalWithStatus,
        closeLoadingModal
    } = useLoadingModal();

    useEffect(() => {
        if (availableThemes.length === 0 && !isAvailableThemesFetched) {
            console.info('Fetching themes..');
            fetchAvailableThemes()
        }
    }, [availableThemes, fetchAvailableThemes, isAvailableThemesFetched]);

    useEffect(() => {
        const fetchData = async () => {
            if (!notSavedNotesFetched) {
                setIsLoadingUnsavedNotes(true);
                await fetchNotSavedNotes();
                setIsLoadingUnsavedNotes(false);
            }
        };
        fetchData();
    }, [fetchNotSavedNotes, notSavedNotesFetched]);

    const handleFullInfoClose = () => {
        setShowFullInfo(false);
        setTimeout(() => {
            setSelectedNote(null);
        }, 300);
    }
    const handleFullInfoShow = (note) => {
        setSelectedNote(note);
        setShowFullInfo(true);
    }

    const handleCloseCreateNote = () => {
        setShowCreateNote(false)
        setNewNote({
            description: '',
            id: '',
            link: '',
            title: '',
            theme_id: '',
            theme_name: '',
            is_favorite: false
        })
    }

    const handleDeleteNote = async () => {
        console.log("Delete note: ", selectedNote)
        setShowDeleteConfirm(false)
        setLoadingModalWithLoading();
        const response = await deleteNotes(selectedNote)
        setLoadingModalWithStatus(response.status);
    }

    const handleEditNote = async (editNote) => {
        console.log("Edit note: ", editNote)
        setLoadingModalWithLoading();
        const response = await updateNotes(editNote)
        setLoadingModalWithStatus(response.status);
    }

    const handleSubmit = async () => {
        console.log("Create note: ", newNote)
        setLoadingModalWithLoading();
        const response = newNote.id === '' ? await createNotes(newNote) : await updateNotes(newNote)
        if (response.status === 200 || response.status === 201) {
            //Удаляем несохраненную заметку, если только что сохранили
            setNotSavedNotes(notSavedNotes.filter(unsaved => newNote.id !== unsaved.id))
        }
        setLoadingModalWithStatus(response.status);
    };

    const handleCloseLoading = () => {
        closeLoadingModal()
        if (saveStatus === 200 || saveStatus === 201) {
            setShowFullInfo(false)
            setShowCreateNote(false)

            // Create new note flow
            if (newNote && notSavedNotes.some(unsaved => newNote.id === unsaved.id)) {
                console.log("(note) Update notSavedNotesFetched to FALSE")
                setNotSavedNotesFetched(false)
            }
            if (currentTheme !== '' && newNote?.theme_id === currentTheme) {
                console.log("CurrentTheme", currentTheme)
                getNotesByTheme(currentTheme)
            }
            setNewNote({
                description: '',
                id: '',
                link: '',
                title: '',
                theme_id: '',
                theme_name: '',
                is_favorite: false
            })

            //Update or Delete note flow
            if (selectedNote && selectedNote.theme_id) {
                console.log("SelectedNote", selectedNote)
                setSelectedNote({
                    description: '',
                    id: '',
                    link: '',
                    title: '',
                    theme_id: '',
                    theme_name: '',
                    is_favorite: false
                })
                getNotesByTheme(selectedNote.theme_id)
            }
        }
    }

    const getNotesByTheme = async (theme_id) => {
        console.log(`Load notes by theme_id: ${theme_id}`)
        setIsGetNoteFailed(false)
        setIsLoadingNotes(true)
        setCurrentTheme(theme_id)

        const response = await fetchNotesByTheme(theme_id);
        setIsLoadingNotes(false)
        if (response.status === 200) {
            setNotesForTheme(response.data.notes)
            //TODO testing
            // setNotesForTheme(notesTest.filter((note) => note.theme_id === theme_id))
        } else {
            setIsGetNoteFailed(true)
            setNotesForTheme([])
        }
    };

    return (
        <div className="container">
            <Loading
                show={showLoadingModal}
                saveStatus={saveStatus}
                onClose={handleCloseLoading}
            />
            <DeleteConfirm
                show={showDeleteConfirm}
                onHide={() => setShowDeleteConfirm(false)}
                onConfirm={handleDeleteNote}
                title="Delete note?"
            />
            <CreateNote
                show={showCreateNote}
                onHide={handleCloseCreateNote}
                notSavedNotes={notSavedNotes}
                setNotSavedNotes={setNotSavedNotes}
                availableThemes={availableThemes}
                handleSubmit={handleSubmit}
                newNote={newNote}
                setNewNote={setNewNote}
                fetchNotSavedNotes={fetchNotSavedNotes}
            />
            <div className={!isFailedFetching ? "row justify-content-center mb-4" : ""}>
                {availableThemes.length === 0 && !isAvailableThemesFetched ? (
                    <Spinner
                        as="span"
                        animation="border"
                        role="status"
                        aria-hidden="true"
                    />
                ) : !isFailedFetching ? (
                    <Form.Select
                        className="form-select-animated"
                        id="themeSelect"
                        aria-label="Default select example"
                        style={{
                            backgroundColor: '#FFFAFA',
                            color: '#808080',
                            width: '70%',
                            textAlign: 'center',
                            textAlignLast: 'center'
                        }}
                        value={currentTheme || ""}
                        onChange={(e) => getNotesByTheme(e.target.value)}
                        disabled={isLoadingNotes}
                    >
                        <option value="" disabled>
                            Select theme
                        </option>
                        {availableThemes.map((theme) => (
                            <option key={theme.id} value={theme.id}>
                                {theme.name}
                            </option>
                        ))}
                    </Form.Select>
                ) : null}
            </div>
            {!isLoadingNotes && notesForTheme.length !== 0 ? (
                <div className="row justify-content-center overflow-auto">
                <Row xs={2} sm={3} md={4} lg={6} className="g-2 scrollable-card-container">
                        {notesForTheme.map((note, index) => (
                            <div key={index} onClick={() => handleFullInfoShow(note)}>
                                <NoteCard note={note}/>
                            </div>
                        ))}
                    </Row>
                    {/*/!*TODO добавить Pagination *!/*/}
                    <Button className="btn create-new-button" onClick={() => setShowCreateNote(true)}>
                        {isLoadingUnsavedNotes ? (
                            <Spinner
                                as="span"
                                animation="border"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            <h5>
                                <Image
                                    src={`${process.env.PUBLIC_URL}/plus.png`}
                                    className="centered-image "
                                    style={{height: '70%', width: 'auto'}}
                                />
                                {(notSavedNotes !== null && notSavedNotes.length !== 0) && (
                                    <Badge pill bg="light" text="dark" className="create-unsaved-badge pulse-animation">
                                        {notSavedNotes.length}
                                    </Badge>
                                )}
                            </h5>
                        )}
                    </Button>
                </div>
            ) : (
                <div className="row justify-content-center">
                    {isLoadingNotes ? (
                        <Spinner
                            as="span"
                            animation="border"
                            role="status"
                            aria-hidden="true"
                        />
                    ) : (isGetNoteFailed || isFailedFetching) ? (
                        <>
                            <div className="text-center" style={{marginBottom: "20px"}}>
                                <Image
                                    src={`${process.env.PUBLIC_URL}/data-error.png`}
                                    className="card-img-top"
                                    style={{width: '20%', height: 'auto'}}
                                />
                                <h5 className="modal-title" id="modalLabel" style={{
                                    color: "#DA4228FF",
                                    fontFamily: "Bookman Old Style, monospace",
                                    fontWeight: "bold"
                                }}>
                                    Failed received notes, please try to reload
                                </h5>
                            </div>
                            <Button
                                onClick={() => fetchAvailableThemes(true)}
                                style={{
                                    padding: "10px", width: "35%", boxShadow: "none", borderRadius: "6px",
                                    backgroundColor: "grey", borderColor: "grey"
                                }}>
                                <Image
                                    src={`${process.env.PUBLIC_URL}/reload.png`}
                                    style={{
                                        maxHeight: '20px',
                                        height: 'auto',
                                        objectFit: 'contain',
                                        marginRight: '10px',
                                        verticalAlign: 'middle'
                                    }}
                                />
                                <span style={{
                                    verticalAlign: 'middle', fontFamily: "Helvetica, monospace",
                                    fontWeight: "bold"
                                }}>Reload</span>
                            </Button>
                        </>
                    ) : (
                        <>
                            {currentTheme === '' ? (
                                <div className="row flex-column align-items-center">
                                    <Image
                                        src={`${process.env.PUBLIC_URL}/up-array.png`}
                                        style={{height: '30%', width: 'auto'}}
                                    />
                                    <h5 style={{
                                        color: "#2896da",
                                        fontFamily: "Courier New, monospace",
                                        fontSize: "1.5em",
                                        fontWeight: "bold",
                                        textAlign: 'center'
                                    }}>
                                        Choose your <br/>
                                        <span style={{
                                            fontFamily: "Courier, monospace",
                                            fontWeight: "bold",
                                            fontSize: "2.5em",
                                            color: "#2896DAFF"
                                        }}>THEME</span>
                                    </h5>
                                </div>
                            ) : (
                                <Image
                                    src={`${process.env.PUBLIC_URL}/no-record-found.png`}
                                    className="card-img-top"
                                    style={{width: '100%', height: 'auto', margin: '20%'}}
                                />
                            )}
                            <Button className="btn create-new-button" onClick={() => setShowCreateNote(true)}>
                                {isLoadingUnsavedNotes ? (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <h5>
                                        <Image
                                            src={`${process.env.PUBLIC_URL}/plus.png`}
                                            className="centered-image "
                                            style={{height: '70%', width: 'auto'}}
                                        />
                                        {(notSavedNotes !== null && notSavedNotes.length !== 0) && (
                                            <Badge pill bg="light" text="dark"
                                                   className="create-unsaved-badge pulse-animation">
                                                {notSavedNotes.length}
                                            </Badge>
                                        )}
                                    </h5>
                                )}
                            </Button>
                        </>
                    )}
                </div>
            )}
            <FullInfoNote
                show={showFullInfo}
                handleClose={handleFullInfoClose}
                handleEditNote={handleEditNote}
                setShowDeleteConfirm={setShowDeleteConfirm}
                selectedNote={selectedNote}
                availableThemes={availableThemes}
            />
        </div>
    );
};

export default Notes;