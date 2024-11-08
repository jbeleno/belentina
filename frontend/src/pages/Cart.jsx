// Cart.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/sass/Cart.scss';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Función para mezclar el arreglo de productos
  const mezclarArray = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/productos');
        const productosAleatorios = mezclarArray(response.data).slice(0, 3); // Selecciona 3 productos
        setCartItems(productosAleatorios);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };

    obtenerProductos();
  }, []);

  const cleanProductName = (name) => name.replace(/\s+/g, '_');

  // Calcular el total del carrito, convirtiendo el precio a número
  const total = cartItems.reduce((acc, item) => {
    const precio = parseFloat(item.precio.replace('$', '').replace(',', '')); // Elimina el signo '$' y convierte el valor a número
    return acc + precio;
  }, 0);

  if (loading) return <p>Cargando productos del carrito...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cart">
      <h1>Carrito de Compras</h1>
      <div className="cart-items">
        {cartItems.map((producto) => (
          <div
            key={producto.id_producto}
            className="cart-item"
            onClick={() => navigate(`/producto/${producto.id_producto}`)}
          >
            <img
              src={`/src/assets/productoimg/${cleanProductName(producto.nombre_producto)}.jpg`}
              alt={producto.nombre_producto}
              onError={(e) => (e.target.src = '/src/assets/img/default.jpg')}
              className="imagen"
            />
            <div className="item-details">
              <h2>{producto.nombre_producto}</h2>
              <p className="price">Precio: ${producto.precio}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total del Carrito</h2>
        <p className="total-price">Total: ${total.toFixed(2)}</p>
        <button className="checkout-button">Proceder al Pago</button>
      </div>
    </div>
  );
};

export default Cart;
