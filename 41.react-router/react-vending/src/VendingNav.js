import React from 'react';
import { NavLink } from 'react-router-dom';

function VendingNav() {
  return (
    <nav className="navbar">
      <NavLink exact to="/">
          Menu
      </NavLink>
      <NavLink exact to="/entree">
          Entree
      </NavLink>
      <NavLink exact to="/drink">
          Drink
      </NavLink>
      <NavLink exact to="/snack">
          Snack
      </NavLink>
    </nav>
  );
}

export default VendingNav;