import React, {useEffect, useState} from 'react';
import {
    Image,
    Form,
    Row,
    Col,
    Button,
    Modal,
    Card,
    ModalHeader,
    Toast
} from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';
import "../style/FullInfoNote.css"
import {openLink} from "../telegram";

const getButtonStyles = (link) => {
    if (link.startsWith('https://www.youtube.com/') || link.startsWith('https://youtu.be/')) {
        return {
            imgSrc: `${process.env.PUBLIC_URL}/social/YouTube.png`,
            btnColor: 'rgba(147,146,146,0.76)'
        };
    } else if (link.startsWith('https://www.instagram.com')) {
        return {
            imgSrc: `${process.env.PUBLIC_URL}/social/Instagram.png`,
            btnColor: '#e877af'
        };
    } else if (link.startsWith('https://t.me')) {
        return {
            imgSrc: `${process.env.PUBLIC_URL}/social/Telegram.png`,
            btnColor: '#0088cc'
        };
    } else if (link.startsWith('https://dzen.ru/')) {
        return {
            imgSrc: `${process.env.PUBLIC_URL}/social/Zen.png`,
            btnColor: '#879298'
        };
    }
    else if (link.startsWith('https://www.linkedin.com/')) {
        return {
            imgSrc: `${process.env.PUBLIC_URL}/social/LinkedIn.png`,
            btnColor: '#007cf6'
        };
    } else {
        return {
            imgSrc: `${process.env.PUBLIC_URL}/social/Default.png`,
            btnColor: 'gray'
        };
    }
};

const FullInfoNote = (
    {
        show,
        handleClose,
        handleEditNote,
        setShowDeleteConfirm,
        selectedNote,
        availableThemes
    }) => {

    useEffect(() => {
        setEditNote(selectedNote)
    }, [selectedNote]);

    const [showUnchangedToAst, setShowUnchangedToAst] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editNote, setEditNote] = useState({
        description: '',
        id: '',
        link: '',
        image_url: '',
        title: '',
        theme_id: '',
        theme_name: '',
        is_favorite: false
    });
    const { imgSrc, btnColor } = getButtonStyles(editNote?.link || '');

    const handleIsEditMode = () => {
        if (isEditMode) {
            let isValid = validateUpdate(selectedNote, editNote)
            if (!isValid) {
                setShowUnchangedToAst(true)
            } else {
                handleEditNote(editNote);
                setIsEditMode(!isEditMode);
            }
        } else {
            setEditNote(selectedNote)
            setIsEditMode(!isEditMode);
        }
    };

    const validateUpdate = (selectedNote, editNote) => {
        if (selectedNote === null || editNote === null) {
            console.error('The selectedNote or editNote is empty')
            return
        }

        let isValid = false
        if (editNote?.title !== selectedNote?.title
            || editNote?.description !== selectedNote?.description
            || editNote?.link !== selectedNote?.link
            || editNote?.is_favorite !== selectedNote?.is_favorite
            || editNote?.theme_id !== selectedNote?.theme_id) {
            isValid = true
        }

        return isValid;
    }

    const handleChangeFavorite = () => {
        let favorite = !editNote?.is_favorite
        editNote.is_favorite = favorite
        handleEditNote(editNote);
        setEditNote({
            ...editNote,
            is_favorite: favorite
        })
    }

    const handleBack = () => {
        setEditNote(selectedNote)
        setIsEditMode(false);
    }

    const handleCloseModal = () => {
        handleClose()
        setTimeout(() => {
            setIsEditMode(false)
        }, 300);
    }

    const formatDate = (d) => {
        const date = new Date(d);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы идут от 0, поэтому добавляем 1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    return (
        <Modal
            className={`fullinfo-modal ${editNote?.is_favorite ? 'favorite-modal' : 'regular-modal'}`}
            show={show}
            onHide={handleCloseModal}
            centered
            aria-labelledby="custom-modal-styling-title"
        >
            <ModalHeader closeButton>
                {isEditMode ? (
                    <div style={{position: 'relative', width: '100%'}}>
                        <Image src={`${process.env.PUBLIC_URL}/back.png`} className="clickable-image"
                               style={{maxWidth: "25px"}}
                               onClick={() => handleBack()}
                        />
                    </div>
                ) : null}
            </ModalHeader>
            <Modal.Body className="text-center" style={{paddingTop: "0"}}>
                <Card className="custom-fullinfo-card">
                    {!isEditMode ? (
                        <Card.Img
                            variant="top"
                            src={editNote?.image_url ? editNote.image_url : `${process.env.PUBLIC_URL}/image-not-found.png`}
                            onError={e => {
                                e.currentTarget.src = `${process.env.PUBLIC_URL}/image-not-found.png`
                            }}
                            style={{padding: "10px", maxWidth: "100%", maxHeight: "200px", objectFit: "contain"}}
                        />
                    ) : null}
                    <Card.Body>
                        {!isEditMode ? (
                            <>
                                <Card.Title style={{marginBottom: "20px", fontFamily: "Trebuchet MS", fontWeight: "bold", fontSize: "19px"}}>
                                    {editNote?.title}
                                </Card.Title>
                                <Card.Text style={{marginBottom: "35px", fontFamily: "Courier, monospace", fontWeight: "normal", fontSize: "14px"}}>
                                    {editNote?.description}
                                </Card.Text>
                                <Button className="pulse-animation" style={{padding: "10px", width: "35%", backgroundColor: btnColor, borderColor: btnColor, boxShadow: "none", borderRadius: "9px"}}
                                        onClick={() => openLink(editNote.link)}
                                >
                                    <Image src={imgSrc} alt="Icon" style={{
                                        maxHeight: '20px',
                                        objectFit: 'contain',
                                        marginRight: '10px',
                                        verticalAlign: 'middle'
                                    }}/>
                                    <span style={{verticalAlign: 'middle', fontFamily: "Helvetica, monospace", fontWeight: "bold"}}>
                                        View
                                    </span>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Form>
                                    <Form.Group as={Row} className="mb-2" controlId="formPlaintextTitle">
                                        <Form.Label className="custom-label" column sm="2">Title</Form.Label>
                                        <Col sm="10">
                                            <TextareaAutosize
                                                className={`form-control textarea-enlarged custom-textarea textarea-animation`}
                                                placeholder="empty"
                                                value={editNote && editNote.title?.length > 0 ? editNote.title : ''}
                                                onChange={(e) => (
                                                    // console.log(`editNote: ${JSON.stringify(editNote)}`),
                                                    setEditNote({
                                                        ...editNote,
                                                        title: e.target.value
                                                    }))}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-2" controlId="formPlaintextDescription">
                                        <Form.Label className="custom-label" column sm="2">Description</Form.Label>
                                        <Col sm="10">
                                            <TextareaAutosize
                                                className={`form-control textarea-enlarged custom-textarea textarea-animation`}
                                                placeholder="empty"
                                                value={editNote && editNote.description?.length > 0 ? editNote.description : ''}
                                                onChange={(e) => setEditNote({
                                                    ...editNote,
                                                    description: e.target.value
                                                })}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-2" controlId="formPlaintextLink">
                                        <Form.Label className="custom-label" column sm="2">Link</Form.Label>
                                        <Col sm="10">
                                            <TextareaAutosize
                                                className={`form-control textarea-enlarged custom-textarea textarea-animation`}
                                                placeholder="empty"
                                                value={editNote && editNote.link?.length > 0 ? editNote.link : ''}
                                                onChange={(e) => setEditNote({
                                                    ...editNote,
                                                    link: e.target.value
                                                })}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-2" controlId="formEditableTheme">
                                        <Form.Label className="custom-label" column sm="2">Theme</Form.Label>
                                        <Col sm="10">
                                            <Form.Select
                                                className="form-control textarea-enlarged custom-form-select"
                                                value={editNote.theme_id}
                                                onChange={(e) => setEditNote({...editNote, theme_id: e.target.value})}
                                            >
                                                {availableThemes.map((theme) => (
                                                    <option key={theme.id} value={theme.id}>
                                                        {theme.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-2" controlId="formEditableFavorite">
                                        <Form.Label className="custom-label textarea-enlarged" column
                                                    sm="2">Favorite</Form.Label>
                                        <Col sm="10">
                                            <Form.Check
                                                type="switch"
                                                id="is-favorite"
                                                checked={editNote.is_favorite}
                                                onChange={(e) => setEditNote({
                                                    ...editNote,
                                                    is_favorite: e.target.checked
                                                })}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <small style={{color: "#b2b2b2", fontFamily: "Helvetica, monospace", fontWeight: "normal"}}>
                                        Created: {editNote ? formatDate(editNote?.created_date) : ''}
                                    </small>
                                </Form>
                                <Toast style={{
                                    backgroundColor: "#f5b25a",
                                    color: "#f8f4f4",
                                    fontFamily: "Helvetica, monospace",
                                    fontWeight: "bold"}}
                                       onClose={() => setShowUnchangedToAst(false)} show={showUnchangedToAst} delay={3000} autohide>
                                    <Toast.Body>
                                        You didn't change anything!
                                    </Toast.Body>
                                </Toast>
                            </>
                        )}
                    </Card.Body>
                    <Card.Footer style={{height: "43px", position: "relative"}}>
                        {!isEditMode ? (
                            <div className="flip-card-back-header">
                                <Image
                                    src={`${process.env.PUBLIC_URL}/bucket.png`}
                                    className="clickable-image"
                                    onClick={() => setShowDeleteConfirm(true)}
                                />
                                <Image
                                    src={editNote?.is_favorite
                                        ? `${process.env.PUBLIC_URL}/bookmark.png`
                                        : `${process.env.PUBLIC_URL}/bookmark-empty.png`}
                                    className="clickable-image"
                                    onClick={handleChangeFavorite}
                                />
                                <Image
                                    src={`${process.env.PUBLIC_URL}/edit.png`}
                                    className="clickable-image"
                                    onClick={handleIsEditMode}
                                />
                            </div>
                        ) : (
                            <Button
                                onClick={handleIsEditMode}
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: "30%",
                                    backgroundColor: "#fda949",
                                    borderColor: "#fd8c49",
                                    boxShadow: "none"
                                }}>
                                <span style={{fontFamily: "Helvetica, monospace", fontWeight: "bold"}}>
                                    Update
                                </span>
                            </Button>
                        )}
                    </Card.Footer>
                </Card>
            </Modal.Body>
        </Modal>
    );
};

export default FullInfoNote;