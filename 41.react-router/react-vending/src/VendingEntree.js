import React from 'react';
import { NavLink } from 'react-router-dom';

function VendingEntree() {
  return (
    <div>
      <h2>Dinner Time!</h2>
      <NavLink exact to="/">Menu</NavLink>
    </div>
  );
}

export default VendingEntree;