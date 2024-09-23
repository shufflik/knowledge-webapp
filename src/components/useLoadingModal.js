import { useState } from 'react';

export const useLoadingModal = () => {
    const [showLoadingModal, setLoadingModal] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    const setLoadingModalWithLoading = () => {
        setLoadingModal(true);
    };

    const setLoadingModalWithStatus = (status) => {
        setSaveStatus(status);
    };

    const closeLoadingModal = () => {
        setLoadingModal(false);
        setSaveStatus(null);
    };

    return {
        showLoadingModal,
        saveStatus,
        setLoadingModalWithLoading: setLoadingModalWithLoading,
        setLoadingModalWithStatus: setLoadingModalWithStatus,
        closeLoadingModal: closeLoadingModal
    };
};