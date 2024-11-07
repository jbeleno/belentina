import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Estado de carga para mostrar hasta verificar la autenticación

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Recupera el rol del usuario

    // Si no hay token o el rol no es admin, redirige
    if (!token || userRole !== 'admin') {
      navigate('/home');
    } else {
      setLoading(false); // Si el usuario tiene el token y el rol, dejamos de cargar
    }
  }, [navigate]);

  if (loading) {
    return <div>Cargando...</div>; // Muestra un cargando mientras se valida la sesión
  }

  return (
    <div>
      <h1>Bienvenido al Panel de Administración</h1>
      <p>Solo los usuarios autenticados con rol de administrador pueden ver esta página.</p>
    </div>
  );
};

export default Admin;
