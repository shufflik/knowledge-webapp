import React from 'react';
import { NavLink } from 'react-router-dom';
// import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" exact className="nav-item" activeClassName="active">
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
      <NavLink to="/profile" className="nav-item" activeClassName="active">
        Profile
      </NavLink>
    </nav>
  );
};

export default Navbar;