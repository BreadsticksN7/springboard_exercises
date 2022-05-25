import React from 'react';
import { NavLink } from 'react-router-dom';

function VendingSnack() {
  return (
    <div>
      <h2>NOM NOM NOM</h2>
      <NavLink exact to="/">Menu</NavLink>
    </div>
  );
}

export default VendingSnack;