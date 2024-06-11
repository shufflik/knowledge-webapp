import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
// import { vibrate } from '../telegram';

const Navbar = () => {
    // const handleButtonClick = () => {
    //     vibrate(200); // Вибрация на 200 миллисекунд при каждом нажатии на кнопку
    // };

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-item" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/notes" className="nav-item" activeClassName="active">
        Notes
      </NavLink>
      <NavLink to="/add" className="nav-item" activeClassName="active">
        Add Note
      </NavLink>
      <NavLink to="/edit" className="nav-item" activeClassName="active">
        Edit Note
      </NavLink>
    </nav>
  );
};

export default Navbar;