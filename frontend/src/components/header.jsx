// Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sass/Header.scss'; 
import logo from '../assets/img/logo.jpg';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/productos`);
            const productos = response.data;

            const productoEncontrado = productos.find(
                (producto) => producto.nombre_producto.toLowerCase() === searchQuery.toLowerCase()
            );

            if (productoEncontrado) {
                navigate(`/producto/${productoEncontrado.id_producto}`);
                setErrorMessage(''); // Limpiar mensaje de error
            } else {
                setErrorMessage("Producto no encontrado");
            }
        } catch (error) {
            console.error("Error al buscar el producto:", error);
            setErrorMessage("Error al realizar la búsqueda. Intente de nuevo.");
        }
    };

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
                        <input
                            type="text"
                            placeholder="Buscar producto"
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="search-icon" onClick={handleSearch} />
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
                    <a href='/medicamentos'>
                        <button className="gray-button">Medicamentos</button>
                    </a>
                    <a href='/maquillaje'>
                        <button className="gray-button">Maquillaje</button>
                    </a>
                    <a href='/bebes'>
                        <button className="gray-button">Bebes</button>
                    </a>
                    <a href='/facial'>
                        <button className="gray-button">Cuidado facial</button>
                    </a>
                </div>
            </div>
            {errorMessage && (
                <div className="error-container">
                    <p className="error-message">{errorMessage}</p>
                </div>
            )}
        </header>
    );
};

export default Header;
