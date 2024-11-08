import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/sass/cuenta.scss';
import UserImage from '../assets/img/user.png'; // Importa la imagen

const Cuenta = () => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Si no hay token, redirigir a la página de login
    if (!token) {
      navigate('/login');
      return;
    }

    // Obtener el perfil del usuario
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/usuarios/perfil', {
          headers: {
            'Authorization': `Bearer ${token}`,  // Enviar token en la cabecera de autorización
          }
        });
        setUsuario(response.data);
      } catch (err) {
        console.error('Error al obtener el perfil del usuario', err);
        setError('No se pudo obtener la información del perfil');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    // Eliminar el token del almacenamiento local y redirigir a la página de login
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="perfil-container">
      {error && <p className="error">{error}</p>}
      {usuario ? (
        <div className="perfil-info1">
          {/* Contenedor de texto y imagen alineados */}
          <div className="perfil-text">
            <h2>Perfil de Usuario</h2>
            <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido_cliente}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Teléfono:</strong> {usuario.telefono_cliente}</p>
            <p><strong>Dirección:</strong> {usuario.direccion_cliente}</p>
            <p><strong>Fecha de Registro:</strong> {new Date(usuario.fecha_registro).toLocaleDateString()}</p>
            <p><strong>Rol:</strong> {usuario.role}</p>

            {/* Contenedor para centrar el botón */}
            <div className="logout-button-container">
              <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
            </div>
          </div>

          {/* Imagen del usuario */}
          <img src={UserImage} alt="Imagen de Usuario" className="user-image" />
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default Cuenta;
