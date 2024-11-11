import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/sass/admin.scss';
import adminImage from '../assets/img/admin.png';

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role === 'admin') {
      setIsAuthorized(true);
      setLoading(true);

      const fetchUserProfile = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/usuarios/perfil', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setUsuario(response.data);
        } catch (err) {
          setError('No se pudo obtener la información del perfil');
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    } else {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthorized && (
      <div>
        <h1>Bienvenido al Panel de Administración</h1>
        <p style={{ textAlign: 'center' }}>Solo los usuarios autenticados con rol de administrador pueden ver esta página.</p> 
        <p>
        <br />
        </p>

        {error && <p className="error">{error}</p>}
        {usuario ? (
          <div className="perfil-info">
            <div className="perfil-text">
              <h2>Perfil de Usuario</h2>
              <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido_cliente}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Teléfono:</strong> {usuario.telefono_cliente}</p>
              <p><strong>Dirección:</strong> {usuario.direccion_cliente}</p>
              <p><strong>Fecha de Registro:</strong> {new Date(usuario.fecha_registro).toLocaleDateString()}</p>
              <p><strong>Rol:</strong> {usuario.role}</p>
              <div className="logout-button-container-admin">
                <button onClick={handleLogout} className="logout-button-admin"> Cerrar sesión</button>
              </div>
            </div>

            <img src={adminImage} alt="Imagen de administrador" className="admin-image" />
          </div>
        ) : (
          <p>Cargando perfil...</p>
        )}

        {/* Aquí se muestra el componente ProductosRecomendados que contiene todos los productos */}
        <ProductosRecomendados />
<p>
        <br />
        </p>
      
      </div>
    )
  );
};
/*ACA EMPIEZAN LOS PRODUCTOS Y TERMINA LA VISTA DE USUARIO*/
const ProductosRecomendados = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/productos');
        setProductos(response.data); // Aquí no se limita la cantidad de productos
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };

    obtenerProductos();
  }, []); // Solo se ejecuta una vez cuando se monta el componente

  const cleanProductName = (name) => name.replace(/\s+/g, '_'); // Limpiar el nombre del producto para la URL

  const handleAddProduct = (id) => {
    // Lógica para añadir producto (ej. añadir al carrito o base de datos)
    console.log(`Producto con id ${id} añadido.`);
  };

  const handleDeleteProduct = (id) => {
    // Lógica para eliminar el producto (puede ser eliminarlo de una lista o base de datos)
    console.log(`Producto con id ${id} eliminado.`);
  };

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="productosRecomendados">
      <h1>Todos los productos</h1>
      <div className="center-group">
        {productos.map((producto) => (
          <div
            key={producto.id_producto}
            className="center"
            onClick={() => navigate(`/producto/${producto.id_producto}`)} // Redirige al producto específico
          >
            <div className="fila1">
              <img
                src={`/src/assets/productoimg/${cleanProductName(producto.nombre_producto)}.jpg`}
                alt={producto.nombre_producto}
                onError={(e) => (e.target.src = '/src/assets/img/default.jpg')} // Imagen de respaldo
                className="imagen"
              />
              <h1>{producto.nombre_producto}</h1>
              <p>{producto.descripcion}</p>
              <p className="price">Precio: ${producto.precio}</p>
            </div>

            <div className="buttons">
              <button className="add-button" onClick={() => handleAddProduct(producto.id_producto)}>
                Añadir
              </button>
              <button className="delete-button" onClick={() => handleDeleteProduct(producto.id_producto)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
