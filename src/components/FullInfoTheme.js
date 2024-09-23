import React, {useEffect, useState} from 'react';
import {Form, Row, Col, Modal, ModalFooter, Button} from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';
import "../style/FullInfoNote.css"

const FullInfoNote = (
    {
        show,
        handleClose,
        handleEditTheme,
        setShowDeleteConfirm,
        selectedTheme
    }) => {

    useEffect(() => {
        setEditTheme(selectedTheme)
    }, [selectedTheme]);

    const [isEditMode, setIsEditMode] = useState(false);
    const [editTheme, setEditTheme] = useState({name: ''});

    const handleIsEditMode = () => {
        if (isEditMode) {
            handleCloseOffcanvas()
            handleEditTheme(editTheme);
        } else {
            setEditTheme(selectedTheme)
            setIsEditMode(true);
        }
    };

    const handleCloseOffcanvas = () => {
        handleClose()
        setTimeout(() => {
            setIsEditMode(false)
            setEditTheme({name: ''})
        }, 300);
    }

    return (
        <>
            <Modal className="fullinfo-theme" show={show} onHide={handleCloseOffcanvas}
                   centered aria-labelledby="custom-modal-styling-title">
                <Modal.Body className="text-center" style={{backgroundColor: "#FFFFF0", borderRadius: "10px"}}>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formEditableTitle">
                            <Form.Label className="custom-label" column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="10">
                                <TextareaAutosize
                                    readOnly={!isEditMode}
                                    className={`form-control ${isEditMode ? 'textarea-enlarged' : 'form-control-plaintext'} custom-textarea textarea-animation`}
                                    value={editTheme ? editTheme.name : 'empty'}
                                    onChange={isEditMode ? (e) => (
                                        setEditTheme({
                                            ...editTheme,
                                            name: e.target.value
                                        })) : null}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <ModalFooter className="justify-content-center">
                    {isEditMode ? (
                        <Button className="save-button" onClick={handleIsEditMode}>
                            Save
                        </Button>
                    ) : (
                        <>
                            <Button className="edit-button" onClick={handleIsEditMode}>
                                Edit
                            </Button>
                            <Button className="delete-button" onClick={() => setShowDeleteConfirm(true)}>
                                Delete
                            </Button>
                        </>
                    )}
                </ModalFooter>
            </Modal>
        </>
    );
};

export default FullInfoNote;