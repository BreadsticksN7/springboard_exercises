import React from 'react';
import { NavLink } from 'react-router-dom';

function VendingHome() {
  return (
    <div>
      What would you like to order tonight?
      <ul>
      <NavLink exact to="/entree">
          <li className="menu">Entree</li>
      </NavLink>
      <NavLink exact to="/drink">
          <li className="menu">Drink</li>
      </NavLink>
      <NavLink exact to="/snack">
          <li className="menu">Snack</li>
      </NavLink>
      </ul>
    </div>
  );
}

export default VendingHome;