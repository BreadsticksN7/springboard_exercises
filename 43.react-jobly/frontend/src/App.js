import './App.css';
import React, { useState, useEffect } from 'react';
import { Navigate, Routes, Route, BrowserRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';

//API component
import JoblyApi from './api/api';
//Company components
import CompanyList from './companies/CompanyList';
import CompanyDetails from './companies/CompanyDetail';
//Job Components
import JobList from './jobs/JobList';
//Auth Components
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import ProfileForm from './auth/ProfileForm';
import UserContext from './auth/UserContext';
//Common components
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import useLocalStorage from './hooks/useLocalStorage';
import LoadingSpinner from './Components/LoadingSpinner';

//Key name for jwt token in local storage
export const TOKEN_STORAGE_ID = 'jobly-token';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  //Checks for token and loads current user info when logging-in
  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (e) {
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  //Login process
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true};
    } catch (e) {
      console.error('login failed', e);
      return { success: false, e };
    }
  }
  
  //Logout and removes states
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  //User account creation and token
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (e) {
      return { success: false, e };
    }
  }
  
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
      <Navbar login={login} logout={logout} signup={signup} />
      <Routes>
        <Route path="/" element={<Home login={login} signup={signup} />} />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/signup" element={<SignUpForm signup={signup} />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/:handle" element={<CompanyDetails />} />
        <Route path="/jobs" element={<JobList />} />
        
        {/* Invalid paths will redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
