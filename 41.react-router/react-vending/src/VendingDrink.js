import React from 'react';
import { NavLink } from 'react-router-dom';

function VendingDrink() {
  return (
    <div>
      <h2>So thirsty!</h2>
      <NavLink exact to="/">Menu</NavLink>
    </div>
  );
}

export default VendingDrink;