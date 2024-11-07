// Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../components/sass/Register.scss';  // Asegúrate de que la ruta sea correcta

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [role, setRole] = useState("user"); // Puedes ajustar este valor si es necesario
  const [mensajeError, setMensajeError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmarPassword) {
      setMensajeError('Las contraseñas no coinciden');
      return;
    }

    const nuevoUsuario = {
      nombre,
      apellido_cliente: apellido,
      email,
      telefono_cliente: telefono,
      direccion_cliente: direccion,
      password,
      role
    };

    try {
      const response = await axios.post('http://localhost:5000/api/usuarios', nuevoUsuario);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar:', error.response ? error.response.data : error);
      setMensajeError(error.response ? error.response.data.msg : 'Hubo un error al registrar al usuario');
    }
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit} className="register-form">
        {mensajeError && <p className="error-message">{mensajeError}</p>}
        
        <div className="input-group">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Apellido</label>
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>

        <div className="input-group input-email">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Teléfono</label>
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Dirección</label>
          <input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>

        <div className="input-group input-password">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button">Registrarse</button>
      </form>

      <p>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  );
};

export default Register;
