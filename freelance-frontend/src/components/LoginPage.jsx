import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../CSS/LoginPage.css';

const Login = ({ onLogin, users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      onLogin(username);
    } else {
      alert('Bad credentials, try again!');
    }
  };

  return (
    <div className="login-form">
      <div className="login-form-data">
        <h2>Login</h2>
        <label htmlFor="loginUsername" className="login-form-label">Username:</label>
        <input
          type="text"
          id="loginUsername"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-form-input"
        />
        <label htmlFor="loginPassword" className="login-form-label">Password:</label>
        <input
          type="password"
          id="loginPassword"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-form-input"
        />
        <button onClick={handleLogin} className="login-form-button">LOGIN</button>

        {/* Message for registration */}
        <p style={{ marginTop: '10px' }}>If you don't have an account, click <Link to="/register">here</Link> to register.</p>
      </div>
    </div>
  );
};

export default Login;