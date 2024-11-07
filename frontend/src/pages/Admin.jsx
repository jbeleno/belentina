import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Recupera el rol del usuario

    // Redirige a /home si no hay token o si el rol no es admin
    if (!token || userRole !== 'admin') {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Bienvenido al Panel de Administración</h1>
      <p>Solo los usuarios autenticados pueden ver esta página.</p>
    </div>
  );
};

export default Admin;
