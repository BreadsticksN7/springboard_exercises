import './App.css';
import React, { useState, useEffect } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import jwt from 'jsonwebtoken';

//Company components
import CompanyList from './companies/CompanyList';
import CompanyDetails from './companies/CompanyDetail';
//Job Components
import JobList from './jobs/JobList';
//Auth Components
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';

//Common components
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import JoblyApi from './api/api';
import useLocalStorage from './hooks/useLocalStorage';
import LoadingSpinner from './Components/LoadingSpinner';

export const TOKEN_STORAGE_ID = 'jobly-token';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (e) {
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

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

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (e) {
      return { success: false, e };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div className="App">
      <Navbar login={login} logout={logout} signup={signup} />
      <Routes>
        <Route path="/" element={<Home login={login} signup={signup} />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/:handle" element={<CompanyDetails />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/signup" element={<SignUpForm signup={signup} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
