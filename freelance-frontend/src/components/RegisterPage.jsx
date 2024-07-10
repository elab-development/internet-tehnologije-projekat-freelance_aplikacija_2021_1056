import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/RegisterPage.css';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name,
        email,
        password,
      });

      if (response.data.Poruka === 'Uspesna registracija!') {
        onRegister(response.data['User: ']);
        navigate('/');
      } else {
        setError('Registration failed. Try again!');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="register-form">
      <div className="register-form-data">
        <h2>Register</h2>
        <label htmlFor="registerName" className="register-form-label">Name:</label>
        <input
          type="text"
          id="registerName"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="register-form-input"
        />
        <label htmlFor="registerEmail" className="register-form-label">Email:</label>
        <input
          type="email"
          id="registerEmail"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
