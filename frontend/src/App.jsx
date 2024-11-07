import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
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
import Medicamentos from './pages/medicamentos.jsx';
import Maquillaje from './pages/maquillaje.jsx';
import Facial from './pages/facial.jsx';
import Bebes from './pages/bebes.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // Almacena el rol del usuario
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (token && userRole) {
      // Verificar si el token es válido
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
          setRole(userRole); // Establecer el rol del usuario
        } else {
          localStorage.removeItem('token'); // Si el token no es válido, eliminarlo
          localStorage.removeItem('role');  // Eliminar el rol también
          setIsAuthenticated(false);
          setRole(null);
        }
      })
      .catch(err => {
        console.error('Error al verificar el token:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setRole(null);
      })
      .finally(() => {
        setLoading(false); // Una vez verificado, detener el estado de carga
      });
    } else {
      setLoading(false); // Si no hay token, también terminamos la carga
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se verifica el token
  }

  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/medicamentos' element={<Medicamentos/>}/>
        <Route path='/maquillaje' element={<Maquillaje/>}/>
        <Route path='/bebes' element={<Bebes/>}/>
        <Route path='/facial' element={<Facial/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
