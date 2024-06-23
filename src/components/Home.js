import React, {useEffect} from 'react';
import tg, {mainButton} from "../telegram.js";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleGoToNotes = () => {
        navigate('/');
    };

    useEffect(() => {
        mainButton(null, false, null, null);
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1>Home</h1>
                <h1>Build: 1.2.1 </h1>
                <span>User: {tg.initDataUnsafe?.user?.username}</span>
                <span>Current width: {window.innerWidth}</span>
                <span>Current height: {window.innerHeight}</span>
                <div className="row-cols-sm-5 mt-5 justify-content-center">
                    <button type="button" className="btn btn-success rounded-pill" onClick={handleGoToNotes}>Go to notes</button>
                </div>
            </div>
        </div>
    );
};

export default Home;