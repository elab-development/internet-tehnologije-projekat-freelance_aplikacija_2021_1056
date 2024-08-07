import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/LoginPage.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('kathryn.crona@example.org');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: username,
        password,
      });

      if (response.data.Poruka === "Uspesna prijava!") {
        // Save token to session storage
        sessionStorage.setItem('token', response.data['Token: ']);
        sessionStorage.setItem('loggedInUser', JSON.stringify(response.data['User: ']));
        sessionStorage.setItem('loggedInUserId', JSON.stringify(response.data['User: '].id));

        const user = response.data['User: '];
        onLogin(user);

        // Redirect based on user role
        if (user.role === 'nudi') {
          navigate('/mojeUsluge');
        } else if (user.role === 'trazi') {
          navigate('/usluge');
        } else if (user.role === 'admin') {
          navigate('/statistike');
        }
      } else {
        setError('Bad credentials, try again!');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
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

        {error && <p className="error-message">{error}</p>}

        <p style={{ marginTop: '10px' }}>If you don't have an account, click <Link to="/register">here</Link> to register.</p>
      </div>
    </div>
  );
};

export default Login;
