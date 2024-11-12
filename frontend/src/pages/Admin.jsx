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


const ProductosRecomendados = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/productos');
        setProductos(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };
    obtenerProductos();
  }, []);

  const handleAddProduct = async (product) => {
    try {
      const response = await axios.post('http://localhost:5000/api/productos', product);
      setProductos([...productos, response.data]);
      alert('Producto agregado exitosamente');
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert("No se pudo agregar el producto");
    }
  };

  const handleEditProduct = (producto) => {
    setEditingProduct(producto);
  };

  const handleUpdateProduct = async (product) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/productos/${product.id_producto}`, product);
      setProductos(productos.map((p) => (p.id_producto === product.id_producto ? response.data : p)));
      setEditingProduct(null);
      alert("Producto actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("No se pudo actualizar el producto");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/productos/${id}`);
      setProductos(productos.filter((p) => p.id_producto !== id));
      alert("Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("No se pudo eliminar el producto");
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="productosRecomendados">
      <h1>Todos los productos</h1>
      <ProductForm
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        editingProduct={editingProduct}
        onClearForm={() => setEditingProduct(null)}
      />
      <div className="center-group">
        {productos.map((producto) => (
          <div key={producto.id_producto} className="center"
            > 
            <div className="fila1">
              <img
                src={`/src/assets/productoimg/${producto.nombre_producto.replace(/\s+/g, '_')}.jpg`}
                onClick={() => navigate(`/producto/${producto.id_producto}`)}// Redirige al producto específico
                alt={producto.nombre_producto}
                onError={(e) => (e.target.src = '/src/assets/img/default.jpg')}
                className="imagen"
              />
            </div>
            <div>
            <h1>{producto.nombre_producto}</h1>
              <p>Descripción: {producto.descripcion}</p>
              <p>Descripción larga: {producto.descripcion_larga}</p>
              <p>Precio: ${producto.precio.toString()}</p>
              <p>Cantidad disponible: {producto.cantidad_disponible}</p>
              <p>Fecha de vencimiento: {producto.fecha_vencimiento ? new Date(producto.fecha_vencimiento).toLocaleDateString() : 'N/A'}</p>
              <p>Categoría ID: {producto.categoria}</p>
            </div>
            <div className="buttons">
              <button onClick={() => handleEditProduct(producto)}>Editar</button>
              <button onClick={() => handleDeleteProduct(producto.id_producto)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductForm = ({ onAddProduct, onUpdateProduct, editingProduct, onClearForm }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [descripcionLarga, setDescripcionLarga] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setNombre(editingProduct.nombre_producto);
      setDescripcion(editingProduct.descripcion);
      setDescripcionLarga(editingProduct.descripcion_larga);
      setPrecio(editingProduct.precio.toString());
      setCantidad(editingProduct.cantidad_disponible);
      setFechaVencimiento(editingProduct.fecha_vencimiento ? new Date(editingProduct.fecha_vencimiento).toISOString().substr(0, 10) : '');
      setCategoria(editingProduct.categoria);
    } else {
      clearForm();
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      nombre_producto: nombre,
      descripcion,
      descripcion_larga: descripcionLarga,
      precio,
      cantidad_disponible: cantidad,
      fecha_vencimiento: fechaVencimiento || null,
      categoria,
    };

    if (editingProduct) {
      onUpdateProduct({ ...editingProduct, ...product });
    } else {
      onAddProduct(product);
    }
    clearForm();
  };

  const clearForm = () => {
    setNombre('');
    setDescripcion('');
    setDescripcionLarga('');
    setPrecio('');
    setCantidad('');
    setFechaVencimiento('');
    setCategoria('');
    onClearForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del Producto"
        required
      />
      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción"
        required
      />
      <textarea
        value={descripcionLarga}
        onChange={(e) => setDescripcionLarga(e.target.value)}
        placeholder="Descripción Larga"
      />
      <input
        type="number"
        value={precio}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d+(\.\d{0,2})?$/.test(value)) { // Solo permite números y hasta dos decimales
            setPrecio(value);
          }
        }}
        placeholder="Precio"
        required
      />
      <input
        type="number"
        value={cantidad}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d+$/.test(value)) { // Solo permite números enteros
            setCantidad(value);
          }
        }}
        placeholder="Cantidad Disponible"
        required
      />
      <input
        type="date"
        value={fechaVencimiento}
        onChange={(e) => setFechaVencimiento(e.target.value)}
        placeholder="Fecha de Vencimiento"
      />
      <input
        type="number"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        placeholder="Categoría ID"
        required
      />
      <button type="submit">{editingProduct ? 'Actualizar' : 'Agregar'}</button>
      <button type="button" onClick={clearForm}>Limpiar</button>
    </form>
  );
  
};

export default Admin;
