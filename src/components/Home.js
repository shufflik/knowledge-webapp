import React, {useEffect} from 'react';
import tg, {mainButton} from "../telegram.js";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleGoToNotes = () => {
        navigate('/');
    };

    useEffect(() => {
        mainButton(null, false, null);
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <h1>Build: 1.2.1 </h1>
            <span>User: {tg.initDataUnsafe?.user?.username}</span>
            <p>Welcome to the note-taking app!</p>
            <p>Current width: {window.innerWidth}</p>
            <p>Current height: {window.innerHeight}</p>
            <button onClick={handleGoToNotes}>Go to notes</button>
        </div>
    );
};

export default Home;