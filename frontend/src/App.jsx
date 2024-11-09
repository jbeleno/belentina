import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/notfound.jsx';
import Footer from './components/footer.jsx';
import Header from './components/header.jsx';
import Cart from './pages/Cart.jsx';
import Admin from './pages/Admin.jsx'; // Página protegida
import Register from './pages/Register.jsx';
import Medicamentos from './pages/medicamentos.jsx';
import Maquillaje from './pages/maquillaje.jsx';
import Facial from './pages/facial.jsx';
import Bebes from './pages/bebes.jsx';
import Producto from './pages/producto.jsx';
import { AuthProvider } from './context/AuthContext.jsx';  // Importar AuthProvider
import Cuenta from './pages/Cuenta.jsx';

const App = () => {
  

  return (
    <div className="app-container">
      <Header />
      <AuthProvider>  {/* Envolver el enrutamiento dentro de AuthProvider */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/medicamentos' element={<Medicamentos/>}/>
          <Route path='/maquillaje' element={<Maquillaje/>}/>
          <Route path='/bebes' element={<Bebes/>}/>
          <Route path='/facial' element={<Facial/>}/>
          <Route path="/producto/:id" element={<Producto />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />}/>
          <Route path="/cuenta" element={<Cuenta />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
      <Footer />
    </div>
  );
};

export default App;
