import React from 'react';
import { Modal, Spinner, Image, Button } from 'react-bootstrap';
import "../style/Loading.css"


const Loading = ({ show, saveStatus, onClose }) => {
    return (
        <Modal
            className="custom-save-modal"
            show={show}
            onHide={onClose}
            fullscreen={true}
            animation={false}
            centered
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Body>
                {saveStatus === null ? (
                    <div className="text-center">
                        <Spinner
                            animation="border"
                            variant="secondary"
                            role="status"
                            style={{ width: "4rem", height: "4rem" }}
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <div className="row justify-content-center">
                        {saveStatus === 200 || saveStatus === 201 ? (
                            <Image
                                src={`${process.env.PUBLIC_URL}/success.png`}
                                className="success-card-img-top"
                                style={{ width: '200px', height: 'auto', margin: '10%' }}
                            />
                        ) : (
                            <Image
                                src={`${process.env.PUBLIC_URL}/error.png`}
                                className="error-card-img-top"
                                style={{ width: '100px', height: 'auto', margin: '10%' }}
                            />
                        )}
                        <div className="row justify-content-center">
                            <Button onClick={onClose} variant="secondary" style={{ width: '100px' }}>
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default Loading;