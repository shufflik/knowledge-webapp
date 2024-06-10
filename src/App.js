import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import tg, { initTelegram } from './telegram';
import './App.css';

function App() {
  React.useEffect(() => {
    initTelegram();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/notes" component={Notes} />
          <Route path="/add" component={AddNote} />
          <Route path="/edit" component={EditNote} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;