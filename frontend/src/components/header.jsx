import React from 'react';
import './sass/Header.scss'; // Importa el archivo Sass
import '../components/sass/app.scss'; // Importa el archivo Sass
import logo from '../assets/img/logo.jpg';
import { FaSearch} from 'react-icons/fa';


const Header = () => {
    return (
      <header className="header">
        <div className="top">
          <div className="left">
            <a href='/'>
            <img src={logo} alt="Logo" className="logo" />
            </a>
            <span className="title">DROGUERÍA BELENTINA</span>
            
          </div>
          <div className="center">
            <div className="search">
              <input type="text" placeholder="Search" className="search-input" />
              <FaSearch className="search-icon" />
            </div>
          </div>
          <div className="right">
            <a href='/cart'>
            <button className="cart-button">Carrito</button>
            </a>
            <a href='/login'>
            <button className="account-button">Mi cuenta</button>
            </a>
          </div>
        </div>
        <div className="bottom">
          <div className="gray-bar">
            <a href='/medicine'>
            <button href='/medicine' className="gray-button">
              Medicamentos
              </button>
            </a>
            <button className="gray-button">Maquillaje</button>
            <button className="gray-button">Cuidado Facial</button>
            <button className="gray-button">Bebes</button>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;
