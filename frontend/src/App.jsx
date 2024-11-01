// src/App.jsx
import React from 'react';
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
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si el token existe

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
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} /> 
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
