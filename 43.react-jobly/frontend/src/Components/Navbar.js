import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../auth/UserContext';

import './Navbar.css';

function Navbar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function logInNav() {
    return (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/companies'>Companies</NavLink>
        </li>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/jobs'>Jobs</NavLink>
        </li>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/profile'>Profile</NavLink>
        </li>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/' onClick={logout}>Log out {currentUser.first_name || currentUser.username}</NavLink>
        </li>
      </ul>
    );
  }

  function logOutNav() {
    return (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/signup'>Sign Up</NavLink>
        </li>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/login'>Log In</NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className='Navbar navar navbar-expand-md'>
      <NavLink className='navbar-brand' to='/'>
        Jobly
      </NavLink>
      {currentUser ? logInNav() : logOutNav()}
    </nav>
  );
}

export default Navbar;