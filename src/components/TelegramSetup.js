import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {initTelegram, settingsButton} from '../telegram';

const TelegramSetup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        initTelegram();
    }, []);

    useEffect(() => {
        settingsButton(() => {
            navigate('/home');
        });
    }, [navigate]);

    return null;
};

export default TelegramSetup;
