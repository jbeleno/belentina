import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/sass/admin.scss';
import adminImage from '../assets/img/admin.png'; // Imagen de perfil de administrador

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role === 'admin') {
      setIsAuthorized(true);
      setLoading(false);

      const fetchUserProfile = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/usuarios/perfil', {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          setUsuario(response.data);
        } catch (err) {
          console.error('Error al obtener el perfil del usuario', err);
          setError('No se pudo obtener la información del perfil');
        }
      };

      fetchUserProfile();
    } else {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    isAuthorized && (
      <div>
        <h1>Bienvenido al Panel de Administración</h1>
        <p>Solo los usuarios autenticados con rol de administrador pueden ver esta página.</p>

        {error && <p className="error">{error}</p>}
        {usuario ? (
          <div className="perfil-info">
            {/* Imagen de perfil a la derecha */}
            <div className="perfil-text">
              <h2>Perfil de Usuario</h2>
              <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido_cliente}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Teléfono:</strong> {usuario.telefono_cliente}</p>
              <p><strong>Dirección:</strong> {usuario.direccion_cliente}</p>
              <p><strong>Fecha de Registro:</strong> {new Date(usuario.fecha_registro).toLocaleDateString()}</p>
              <p><strong>Rol:</strong> {usuario.role}</p>
              <div className="logout-button-container-admin">
                <button onClick={handleLogout} className="logout-button-admin">Cerrar sesión</button>
              </div>
            </div>

            <img src={adminImage} alt="Imagen de administrador" className="admin-image" />
          </div>
        ) : (
          <p>Cargando perfil...</p>
        )}
      </div>
    )
  );
};

export default Admin;

