import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/sass/Login.scss';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Verificar si ya está autenticado cuando el componente se monte
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (token && role) {
      // Si hay un token en el localStorage, redirigir según el rol
      if (role === 'admin') {
        navigate('/admin'); // Redirigir al panel de administración
      } else if (role === 'user') {
        navigate('/home'); // Redirigir al home
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Realizar la solicitud POST al backend para autenticación
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // Revisar la respuesta del backend para asegurarnos de que se reciban los datos correctos
      console.log('Respuesta del servidor:', response.data);

      const { token, role } = response.data;

      // Verificar si la respuesta tiene token y rol antes de almacenarlos
      if (token && role) {
        // Almacenar el token y el rol en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', role); // Guardar el rol del usuario en localStorage

        // Redirigir según el rol del usuario
        if (role === 'admin') {
          navigate('/admin'); // Si es administrador, redirigir al panel de administración
        } else if (role === 'user') {
          navigate('/home'); // Si es usuario regular, redirigir al home
        } else {
          setError('Rol de usuario no reconocido');
        }
      } else {
        setError('No se recibieron datos válidos del servidor');
      }
    } catch (err) {
      console.error('Error en la solicitud de login:', err);
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <a href="/register">
        <button className="register-button">Registrarse</button>
      </a>
      <p>────────────────────────────────────────────────</p>
    </div>
  );
};

export default Login;
