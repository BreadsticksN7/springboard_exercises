import React, { useContext} from 'react';
import './Home.css';
import UserContext from '../auth/UserContext';
import { NavLink } from 'react-router-dom'

function Home() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className='Home'>
      <div className='container text-center'>
        {currentUser
         ? <h3>
            Welcome back, {currentUser.firstName || currentUser.username}!
           </h3>
         : (
          <p>
            <NavLink className='btn btn-primary font-weight-bold mr-3' to="/login">Log In</NavLink>
            <NavLink className='btn btn-primary font-weight-bold' to="/signup">Sign Up</NavLink>
          </p>
         )}
      </div>
    </div>
  );
}

export default Home;