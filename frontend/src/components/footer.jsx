import React from 'react';
import './sass/footer.scss'; // Importa los estilos Sass
import logo from '../assets/img/logo.jpg';
import socialIcons from '../assets/img/redes.jpg'; // Nueva imagen con los logos de redes sociales
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content">
        <div className="logo">
          {/* Contenido de la columna del logo de la empresa */}
          <img src={logo} alt="Logo de la empresa" className="logo-img" />
          <div className="logo-text">
            <p>DROGUERIA BELENTINA</p>
            <p>
              <Link to='/about'>Sobre nosotros</Link>
            </p>
          </div>
        </div>
        <div className="social-icons">
          {/* Imagen que contiene los logos de redes sociales */}
          <img src={socialIcons} alt="Logos de redes sociales" className="social-icons-img" />
        </div>
        <div className="contact">
          {/* Contenido de la columna "Contáctanos" */}
          <h3>Contáctanos</h3>
          <p>Movil: 3123969747</p>
          <p>Fijo: 8605712</p>
          <p>Correo: Valbelen@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
