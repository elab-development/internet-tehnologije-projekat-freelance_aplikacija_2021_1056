import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import NavBar from './components/NavBar';
import WelcomePage from './components/WelcomePage';
import Usluge from './components/usluge/Usluge';
import About from './components/About';
import MyUsluge from './components/usluge/MojeUsluge/MyUsluge';

function App() {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setLoggedInUser(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedInUser(true);
  };

  const handleRegister = (newUser) => {
    if (users.some((user) => user.username === newUser.username)) {
      alert('Username already exists. Please choose a different one.');
      return;
    }

    setUsers((prevUsers) => [...prevUsers, newUser]);
    alert('Registration successful!');
  };

  const handleLogout = () => {
    setLoggedInUser(false);
    sessionStorage.removeItem('token');
  };

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar loggedInUser={loggedInUser} handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              loggedInUser ? (
                <Navigate to="/welcome" />
              ) : (
                <Login onLogin={handleLogin} users={users} />
              )
            }
          />
          <Route
            path="/register"
            element={<Register onRegister={handleRegister} users={users} />}
          />
          <Route
            path="/welcome"
            element={<WelcomePage loggedInUser={loggedInUser} />}
          />
          <Route path="/usluge" element={<Usluge />} />
          <Route path="/mojeUsluge" element={<MyUsluge />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
