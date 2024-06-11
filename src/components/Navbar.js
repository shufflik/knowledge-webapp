import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { vibrate } from '../telegram';

const Navbar = () => {
    const handleButtonClick = () => {
        vibrate(200); // Вибрация на 200 миллисекунд при каждом нажатии на кнопку
    };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <h1>Build Number: 1.1 </h1>
      </div>
      <NavLink to="/" className="nav-item" activeClassName="active" onClick={handleButtonClick}>
        Home
      </NavLink>
      <NavLink to="/notes" className="nav-item" activeClassName="active" onClick={handleButtonClick}>
        Notes
      </NavLink>
      <NavLink to="/add" className="nav-item" activeClassName="active" onClick={handleButtonClick}>
        Add Note
      </NavLink>
      <NavLink to="/edit" className="nav-item" activeClassName="active" onClick={handleButtonClick}>
        Edit Note
      </NavLink>
      <NavLink to="/profile" className="nav-item" activeClassName="active" onClick={handleButtonClick}>
        Profile
      </NavLink>
    </nav>
  );
};

export default Navbar;