import React from 'react';
import { Modal, Button, ModalFooter } from 'react-bootstrap';

const DeleteConfirm = ({ show, onHide, onConfirm, title }) => {
    return (
        <Modal
            className="confirm-delete-modal"
            show={show}
            onHide={onHide}
            centered
            aria-labelledby="custom-modal-styling-title"
        >
            <Modal.Body className="text-center">
                <h5 className="modal-title" id="modalLabel">{title}</h5>
            </Modal.Body>
            <ModalFooter className="justify-content-center">
                <Button className="btn btn-secondary" onClick={onHide}>No</Button>
                <Button className="btn btn-primary" onClick={onConfirm}>Yes</Button>
            </ModalFooter>
        </Modal>
    );
};

export default DeleteConfirm;
