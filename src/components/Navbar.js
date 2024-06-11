import React from 'react';
import { NavLink } from 'react-router-dom';
import { vibrate } from '../telegram';

const Navbar = () => {
    const handleButtonClick = () => {
        vibrate(200); // Вибрация на 200 миллисекунд при каждом нажатии на кнопку
    };

    return (
        <nav className="navbar">
            <NavLink to="/" exact className="nav-item" activeClassName="active" onClick={handleButtonClick}>
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
        </nav>
    );
};

export default Navbar;