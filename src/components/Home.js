import React, {useContext, useEffect} from 'react';
import {getUserId, getUsername, mainButton} from "../telegram.js";
import {AppContext} from "../AppContext";

const Home = () => {
    const {
        currentTheme,
        setCurrentTheme,
    } = useContext(AppContext);

    const handleSaveTestData = () => {
        setCurrentTheme("home-test")
    };

    useEffect(() => {
        mainButton(null, false, null, null);
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1>Home</h1>
                <h1>Build: 1.2.1 </h1>
                <span>Username: {getUsername}</span>
                <span>User id: {getUserId}</span>
                <span>Current width: {window.innerWidth}</span>
                <span>Current height: {window.innerHeight}</span>
                <span>Current: {currentTheme}</span>
                <div className="row-cols-sm-5 mt-5 justify-content-center">
                    <button type="button" className="btn btn-success rounded-pill" onClick={handleSaveTestData}>Save
                        test data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;