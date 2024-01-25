import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the correct hook
import '../CSS/RegisterPage.css'; // Import the CSS file

const Register = ({ onRegister, users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use the correct hook

  const handleRegister = () => {
    // Check if the username already exists
    if (users.some((user) => user.username === username)) {
      alert('Username already exists. Please choose a different one.');
      return;
    }

    // Add the new user to the array
    const newUser = { username, password };
    onRegister(newUser);
    // Navigate to login page
    navigate('/');
  };

  return (
    <div className="register-form">
      <div className="register-form-data">
        <h2>Register</h2>
        <label htmlFor="registerUsername" className="register-form-label">Username:</label>
        <input
          type="text"
          id="registerUsername"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-form-input"
        />
        <label htmlFor="registerPassword" className="register-form-label">Password:</label>
        <input
          type="password"
          id="registerPassword"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-form-input"
        />
        <button onClick={handleRegister} className="register-form-button">REGISTER</button>
      </div>
    </div>
  );
};

export default Register;