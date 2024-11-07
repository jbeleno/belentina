import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Estado de carga inicial
  const [isAuthorized, setIsAuthorized] = useState(false); // Estado para determinar si el usuario es autorizado

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Verificar si hay token y si el rol es 'admin'
    if (token && role === 'admin') {
      setIsAuthorized(true); // Usuario es administrador
      setLoading(false); // Deja de cargar porque la autorización es correcta
    } else {
      navigate('/home', { replace: true }); // Redirige solo si no está autorizado
    }
  }, [navigate]); // `navigate` en el array de dependencias garantiza que no se cicla

  // Mostrar mensaje de carga mientras se verifica el estado de autorización
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Mostrar el contenido solo si el usuario está autorizado
  return (
    isAuthorized && (
      <div>
        <h1>Bienvenido al Panel de Administración</h1>
        <p>Solo los usuarios autenticados con rol de administrador pueden ver esta página.</p>
      </div>
    )
  );
};

export default Admin;
