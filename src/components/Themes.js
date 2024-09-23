import React, {useContext, useState} from "react";
import {AppContext} from "../AppContext";
import Loading from "./Loading";
import {Button, Col, Form, Image, Modal, ModalFooter, Row, Spinner} from "react-bootstrap";
import ThemeCard from "./ThemeCard";
import {useLoadingModal} from "./useLoadingModal";
import TextareaAutosize from "react-textarea-autosize";
import "../style/Themes.css";
import DeleteConfirm from "./DeleteConfirm";
import FullInfoTheme from "./FullInfoTheme";
import {createTheme, deleteTheme, updateTheme} from "../fetches";

const Themes = () => {
    const {
        availableThemes,
        isAvailableThemesFetched,
        isFailedFetching,
        fetchAvailableThemes
    } = useContext(AppContext);

    const {
        showLoadingModal,
        saveStatus,
        setLoadingModalWithLoading,
        setLoadingModalWithStatus,
        closeLoadingModal
    } = useLoadingModal();

    const [selectedTheme, setSelectedTheme] = useState(null);
    const [newTheme, setNewTheme] = useState('');
    const [showFullInfo, setShowFullInfo] = useState(false);
    const [isGetThemesFailed, setIsGetThemesFailed] = useState(false)
    const [isLoadingThemes, setIsLoadingThemes] = useState(false)
    const [showCreateTheme, setShowCreateTheme] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [isNewThemeValid, setIsNewThemeValid] = useState(true);


    const handleCloseLoading = async () => {
        closeLoadingModal()
        if (saveStatus === 200 || saveStatus === 201) {
            setShowFullInfo(false)
            setShowCreateTheme(false)
            await getThemes()
        }
    }

    const handleFullInfoClose = () => {
        setShowFullInfo(false);
        setTimeout(() => {
            setSelectedTheme(null)
        }, 300);
    }
    const handleFullInfoShow = (theme) => {
        setSelectedTheme(theme)
        setShowFullInfo(true);
    }

    const handleCreateTheme = async () => {
        const isThemeEmpty = newTheme.length === 0;
        const isThemeExists = availableThemes.some(theme => theme.name.toLowerCase() === newTheme.toLowerCase());

        if (isThemeEmpty || isThemeExists) {
            console.log(`Invalid creating new theme: ${newTheme}`);
            setIsNewThemeValid(false);
            setErrorMessage(isThemeEmpty ? 'The new theme name is empty' : 'Theme with this name already exists');
        }
        else {
            console.log(`Creating new theme: ${newTheme}`);
            setIsNewThemeValid(true);
            setErrorMessage('');
            setLoadingModalWithLoading();
            const response = await createTheme(newTheme)
            setLoadingModalWithStatus(response.status);
            setNewTheme('')
        }
    };

    const handleEditTheme = async (editTheme) => {
        console.log("Edit theme: ", editTheme)
        setLoadingModalWithLoading();
        const response = await updateTheme(editTheme)
        setLoadingModalWithStatus(response.status);
    }

    const handleDeleteTheme = async () => {
        console.log("Delete theme: ", selectedTheme)
        setShowDeleteConfirm(false)
        setLoadingModalWithLoading();
        const response = await deleteTheme(selectedTheme)
        setLoadingModalWithStatus(response.status);
    }

    const getThemes = async () => {
        console.log(`Load themes`)
        setIsGetThemesFailed(false)
        setIsLoadingThemes(true)
        try {
            await fetchAvailableThemes(true);
        } catch (error) {
            setIsGetThemesFailed(true)
        } finally {
            setIsLoadingThemes(false)
        }
    }

    return (
        <div className="container">
            <Loading show={showLoadingModal}
                     saveStatus={saveStatus}
                     onClose={handleCloseLoading}
            />
            <DeleteConfirm
                show={showDeleteConfirm}
                onHide={() => setShowDeleteConfirm(false)}
                onConfirm={handleDeleteTheme}
                title="Delete theme?"
            />
            <Modal className="create-theme-modal" show={showCreateTheme} onHide={() => setShowCreateTheme(false)}
                   centered aria-labelledby="custom-modal-styling-title">
                <Modal.Body className="text-center">
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formEditableTitle">
                            <Form.Label className="custom-label" column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="10">
                                <TextareaAutosize
                                    className={`form-control custom-textarea ${!isNewThemeValid ? 'is-invalid' : ''}`}
                                    value={newTheme ? newTheme : ''}
                                    onChange={(e) => setNewTheme(e.target.value)}
                                />
                                {!isNewThemeValid && <div className="invalid-feedback">{errorMessage}</div>}
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <ModalFooter className="justify-content-center">
                    <Button className="btn create-button" onClick={handleCreateTheme}>
                        Create
                    </Button>
                </ModalFooter>
            </Modal>
            {!isLoadingThemes && availableThemes.length !== 0 && isAvailableThemesFetched ? (
                <div className="row justify-content-center overflow-auto">
                    <Row xs={2} sm={3} md={4} lg={6} className="g-2 scrollable-theme-card-container">
                        {availableThemes.map((theme, index) => (
                            <div key={index} onClick={() => handleFullInfoShow(theme)}>
                                <ThemeCard theme={theme}/>
                            </div>
                        ))}
                    </Row>
                    {/* TODO добавить Pagination */}
                    <Button className="btn create-new-button" onClick={() => setShowCreateTheme(true)}>
                        <Image
                            src={`${process.env.PUBLIC_URL}/plus.png`}
                            className="centered-image"
                            style={{height: '70%', width: 'auto'}}
                        />
                    </Button>
                </div>
            ) : (
                <div className="row justify-content-center">
                    {isLoadingThemes || (!isAvailableThemesFetched && availableThemes.length === 0) ? (
                        <Spinner
                            as="span"
                            animation="border"
                            role="status"
                            aria-hidden="true"
                        />
                    ) : (isGetThemesFailed || isFailedFetching) ? (
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
                                    Failed received themes, please try to reload
                                </h5>
                            </div>
                            <Button style={{
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
                                    onClick={() => fetchAvailableThemes(true)}
                                />
                                <span style={{
                                    verticalAlign: 'middle', fontFamily: "Helvetica, monospace",
                                    fontWeight: "bold"
                                }}>Reload</span>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Image
                                src={`${process.env.PUBLIC_URL}/no-record-found.png`}
                                className="card-img-top"
                                style={{width: '100%', height: 'auto', margin: '20%'}}
                            />
                            <Button className="btn create-new-button" onClick={() => setShowCreateTheme(true)}>
                                <Image
                                    src={`${process.env.PUBLIC_URL}/plus.png`}
                                    className="centered-image "
                                    style={{height: '70%', width: 'auto'}}
                                />
                            </Button>
                        </>
                    )}
                </div>
            )}
            <FullInfoTheme
                show={showFullInfo}
                handleClose={handleFullInfoClose}
                handleEditTheme={handleEditTheme}
                setShowDeleteConfirm={setShowDeleteConfirm}
                selectedTheme={selectedTheme}
            />
        </div>
    );
};

export default Themes;