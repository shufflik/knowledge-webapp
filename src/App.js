import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import TelegramSetup from './components/TelegramSetup';
import './App.css';

function App() {
    return (
        <Router basename="/knowledge-webapp">
            <div className="App">
                <TelegramSetup/>
                <div className="container mt-5 pt-5">
                    <Routes>
                        <Route index path="/" element={<Notes/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/add" element={<AddNote/>}/>
                        <Route path="/edit" element={<EditNote/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;