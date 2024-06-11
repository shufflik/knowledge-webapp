import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import {initTelegram, vibrate} from './telegram';
import './App.css';

function App() {
  React.useEffect(() => {
    initTelegram();
  }, []);

  const handleButtonClick = () => {
    vibrate(200); // Вибрация на 200 миллисекунд при каждом нажатии на кнопку
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route index path="/" element={<Notes />} onClick={handleButtonClick} />
          <Route path="/home" element={<Home />} onClick={handleButtonClick} />
          <Route path="/add" element={<AddNote />} onClick={handleButtonClick} />
          <Route path="/edit" element={<EditNote />} onClick={handleButtonClick} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;