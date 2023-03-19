import React from "react";
import logo from '../../assets/images/logo.png';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <>
    <nav className="nav--bar mb-5">
      <div className="nav--bar--logo">
        <img className="logo--img" src={logo} alt="logo" />
        <h1 className="nav--title">Restaurant Table Reservation 🍽</h1>
      </div>
      <div className="nav--bar--links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? 'active nav--link' : 'inactive nav--link')}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/newreservation"
          className={({ isActive }) => (isActive ? 'active nav--link' : 'inactive nav--link')}
        >
          New Reservation
        </NavLink>
        <NavLink
          to="/newtables"
          className={({ isActive }) => (isActive ? 'active nav--link' : 'inactive nav--link')}
        >
          New Table
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) => (isActive ? 'active nav--link' : 'inactive nav--link')}
        >
          Search
        </NavLink>
      </div>
    </nav>
  </>
  );
}

export default Menu;
  