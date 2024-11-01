// src/pages/Register.jsx
import React, { useState } from 'react';
import '../components/sass/Register.scss';
import Company_logo from '../assets/img/logo.png';

const Register = () => {
  const [formData, setFormData] = useState({
    identification: '',
    userEmail: '',
    firstName: '',
    lastName: '',
    userPassword: '',
    contact: '',
    registrationDate: '',  
    address: '',           
    termsAccepted: false,
    dataPolicyAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Agrega aquí la lógica de validación y envío del formulario
  };

  return (
    <div className="register-container">
      <img src={Company_logo} alt="Company_logo" className="Company_logo" />
      <h2>Crea una Cuenta</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label>Identificación</label>
          <input
            type="text"
            name="identification"
            value={formData.identification}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            className="input-email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Nombre</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Apellido</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            className="input-password"
            name="userPassword"
            value={formData.userPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Celular de Contacto</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Fecha de Registro</label> 
          <input
            type="date"
            name="registrationDate"  o
            value={formData.registrationDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Dirección</label> 
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            Acepto términos y condiciones de uso
          </label>
          <label>
            <input
              type="checkbox"
              name="dataPolicyAccepted"
              checked={formData.dataPolicyAccepted}
              onChange={handleChange}
              required
            />
            Autorizo y acepto política de tratamiento de datos
          </label>
        </div>

        <button type="submit" className="submit-button">Crear</button>
      </form>

      <p>¿Ya tienes una cuenta? <a href="/login">Ingresa</a></p>
    </div>
  );
};

export default Register;
