// src/pages/Login.jsx
import React, { useState } from 'react';
import '../components/sass/Login.scss';
import googleLogo from '../assets/img/google.png';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Guarda el token en localStorage
      window.location.href = '/admin'; // Redirige a la página de administrador
    } catch (err) {
      console.error(err); // Log para depurar
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email"></label>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // Agregado para requerir el campo
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // Agregado para requerir el campo
            />
          </div>
        </div>
        <button type="submit" className="login-button">Ingresar</button>
        {error && <p className="error">{error}</p>}
      </form>
      <a href='/register'>
      <button type="submit" className="register-button">Registrarse</button>
      </a>
      <p>────────────────────────────────────────────────</p>
    </div>
  );
};

export default Login;
