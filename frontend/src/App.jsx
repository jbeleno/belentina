import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/notfound.jsx';
import Footer from './components/footer.jsx';
import Header from './components/header.jsx';
import Medicine from './pages/medicine.jsx';
import MedicineInfo from './pages/MedicineInfo.jsx';
import Cart from './pages/Cart.jsx';
import Admin from './pages/Admin.jsx'; // Página protegida
import Register from './pages/Register.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí verificamos si el token es válido
      fetch('/api/usuario/perfil', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.usuario) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token'); // Si no es válido, eliminar el token
          setIsAuthenticated(false);
        }
      })
      .catch(err => {
        console.error('Error al verificar el token', err);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false); // Una vez verificado, detén el estado de carga
      });
    } else {
      setLoading(false); // Si no hay token, también terminamos la carga
    }
  }, []); // Solo se ejecuta una vez al cargar la aplicación

  if (loading) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras verificas el token
  }

  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        {/* Ruta protegida, solo accesible si está autenticado */}
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
