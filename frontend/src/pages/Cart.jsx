import React, { useState } from 'react';
import '../components/sass/Cart.scss';
import Aceta from '../assets/img/Aceta.png';
import Advil from '../assets/img/advil.png';
import Clarito from '../assets/img/Clarito.png';

const Cart = () => {
  const initialCartItems = [
    {
      image: Aceta,
      name: 'ACETAMINOFEN 500 MG',
      quantity: 1,
      price: 2000
    },
    {
      image: Advil,
      name: 'ADVIL MAX 10 CAPSULAS',
      quantity: 1,
      price: 20000
    },
    {
      image: Clarito,
      name: 'CLARITROMICINA 500 MG',
      quantity: 1,
      price: 36400
    }
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (index, delta) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = Math.max(1, newCartItems[index].quantity + delta);
    setCartItems(newCartItems);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const CartItem = ({ item, index }) => (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="item-details">
        <h3>{item.name}</h3>
        <div className="item-controls">
          <button className="item-button" onClick={() => handleQuantityChange(index, 1)}>+</button>
          <span className="item-quantity">{item.quantity}</span>
          <button className="item-button" onClick={() => handleQuantityChange(index, -1)}>-</button>
        </div>
        <div className="item-price">{item.price} $</div>
        <div className="item-actions">
          <button>Eliminar</button>
          <button>Guardar</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="cart-container">
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <CartItem key={index} item={item} index={index} />
        ))}
      </div>
      <div className="cart-summary">
        <h2>RESUMEN DE LA COMPRA</h2>
        <div className="summary-details">
          <p className="label">PRODUCTOS ({cartItems.length})</p>
          <p className="value">{total} $</p>
        </div>
        <div className="summary-details">
          <p className="label">ENVIOS</p>
          <p className="value">GRATIS</p>
        </div>
        <div className="summary-details total">
          <p className="label">TOTAL</p>
          <p className="value">{total} $</p>
        </div>
        <button className="checkout-button">Comprar</button>
      </div>
    </div>
  );
};

export default Cart;
