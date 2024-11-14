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
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    id_producto: '',
    nombre_producto: '',
    descripcion: '',
    descripcion_larga: '',
    precio: '',
    cantidad_disponible: '',
    fecha_vencimiento: '',
    categoria: '',
  });
  const [error, setError] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const crearProducto = async (e) => {
    e.preventDefault();

    // Asegurarse de que la categoría sea un número
    const productoConCategoriaNumerica = {
      ...nuevoProducto,
      categoria: Number(nuevoProducto.categoria), // Convierte la categoría a número
    };

    // Verificar los datos antes de enviarlos
    console.log("Datos a enviar:", productoConCategoriaNumerica);

    try {
      // Enviar la solicitud para crear el producto
      await axios.post('http://localhost:5000/api/productos', productoConCategoriaNumerica);

      // Si la solicitud es exitosa, obtener la lista de productos actualizada
      obtenerProductos();

      // Limpiar el formulario después de agregar el producto
      setNuevoProducto({
        id_producto: '',
        nombre_producto: '',
        descripcion: '',
        descripcion_larga: '',
        precio: '',
        cantidad_disponible: '',
        fecha_vencimiento: '',
        categoria: '',
      });
    } catch (error) {
      // Manejo de errores si la solicitud falla
      if (error.response) {
        // Si el servidor responde con un código de error
        console.error("Error en la respuesta del servidor:", error.response.data);
        setError(`Error al crear el producto: ${error.response.data.message || 'Datos no válidos'}`);
      } else if (error.request) {
        // Si no hay respuesta del servidor
        console.error("Error en la solicitud:", error.request);
        setError("No se recibió respuesta del servidor. Intente de nuevo más tarde.");
      } else {
        // Cualquier otro error
        console.error("Error inesperado:", error.message);
        setError("Hubo un problema al crear el producto.");
      }
    }
  };

  const editarProducto = async (e) => {
    e.preventDefault();

    // Crear un objeto con solo los campos que han cambiado
    const productoActualizado = {};

    // Compara cada campo y agrega al objeto solo los campos que tienen cambios
    if (nuevoProducto.nombre_producto !== productoAEditar.nombre_producto) {
      productoActualizado.nombre_producto = nuevoProducto.nombre_producto;
    }
    if (nuevoProducto.descripcion !== productoAEditar.descripcion) {
      productoActualizado.descripcion = nuevoProducto.descripcion;
    }
    if (nuevoProducto.descripcion_larga !== productoAEditar.descripcion_larga) {
      productoActualizado.descripcion_larga = nuevoProducto.descripcion_larga;
    }
    if (nuevoProducto.precio !== productoAEditar.precio) {
      productoActualizado.precio = nuevoProducto.precio;
    }
    if (nuevoProducto.cantidad_disponible !== productoAEditar.cantidad_disponible) {
      productoActualizado.cantidad_disponible = nuevoProducto.cantidad_disponible;
    }
    if (nuevoProducto.fecha_vencimiento !== productoAEditar.fecha_vencimiento) {
      productoActualizado.fecha_vencimiento = nuevoProducto.fecha_vencimiento;
    }
    if (nuevoProducto.categoria !== productoAEditar.categoria) {
      productoActualizado.categoria = nuevoProducto.categoria;
    }

    // Asegurarse de que al menos un campo haya sido modificado antes de enviar la solicitud
    if (Object.keys(productoActualizado).length === 0) {
      setError('No se ha realizado ningún cambio.');
      return;
    }

    try {
      // Realizar la solicitud de actualización solo con los campos modificados
      await axios.put(`http://localhost:5000/api/productos/${productoAEditar.id_producto}`, productoActualizado);

      // Obtener los productos actualizados
      obtenerProductos();

      // Restablecer el formulario
      setModoEdicion(false);
      setProductoAEditar(null);
      setNuevoProducto({
        id_producto: '',
        nombre_producto: '',
        descripcion: '',
        descripcion_larga: '',
        precio: '',
        cantidad_disponible: '',
        fecha_vencimiento: '',
        categoria: '',
      });
    } catch (error) {
      setError('Hubo un problema al actualizar el producto.');
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/productos/${id}`);
      obtenerProductos();
    } catch (error) {
      setError('Hubo un problema al eliminar el producto.');
    }
  };

  const handleChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value,
    });
  };

  const activarEdicion = (producto) => {
    setModoEdicion(true);
    setProductoAEditar(producto);
    setNuevoProducto({ ...producto });
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file || !nuevoProducto.nombre_producto) {
      alert('Por favor, selecciona un archivo y asegúrate de ingresar un nombre para el producto.');
      return;
    }
  
    // Asigna el nombre del producto como nombre del archivo
    const formData = new FormData();
    const newFileName = `${nuevoProducto.nombre_producto}.jpg`; // Usar el nombre del producto para el archivo
    formData.append('file', new File([file], newFileName, { type: file.type }));
  
    // Enviar el archivo
    fetch('http://localhost:5000/api/upload/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Archivo subido:', data);
      } else {
        console.error('Error al subir archivo:', data.error);
      }
    })
    .catch(error => {
      console.error('Error en la conexión:', error);
    });
  };
  

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Gestión de Productos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
  
      <h2>{modoEdicion ? 'Editar Producto' : 'Agregar/Actualizar Productos'}</h2>
      <form onSubmit={modoEdicion ? editarProducto : crearProducto} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input
          type="number"
          name="id_producto"
          value={nuevoProducto.id_producto}
          onChange={handleChange}
          placeholder="ID Producto"
          required
          disabled={modoEdicion}
        />
        <input
          type="text"
          name="nombre_producto"
          value={nuevoProducto.nombre_producto}
          onChange={handleChange}
          placeholder="Nombre del Producto"
          required
        />
        <input
          type="text"
          name="descripcion"
          value={nuevoProducto.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
        />
        <input
          type="text"
          name="descripcion_larga"
          value={nuevoProducto.descripcion_larga}
          onChange={handleChange}
          placeholder="Descripción Larga"
        />
        <input
          type="text"
          name="precio"
          value={nuevoProducto.precio}
          onChange={(e) => {
            const value = e.target.value;
            // Permite solo números y un máximo de dos decimales
            if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
              setNuevoProducto((prev) => ({
                ...prev,
                precio: value,
              }));
            }
          }}
          placeholder="Precio"
          required
        />
        <input
          type="text"
          name="cantidad_disponible"
          value={nuevoProducto.cantidad_disponible}
          onChange={(e) => {
            const value = e.target.value;
            // Permite solo números enteros
            if (value === '' || /^\d+$/.test(value)) {
              setNuevoProducto((prev) => ({
                ...prev,
                cantidad_disponible: value,
              }));
            }
          }}
          placeholder="Cantidad Disponible"
          required
        />
        <input
          type="date"
          name="fecha_vencimiento"
          value={nuevoProducto.fecha_vencimiento}
          onChange={(e) => {
            const value = e.target.value;
            // Verifica si el valor ingresado es una fecha válida
            if (value === '' || /^\d{4}-\d{2}-\d{2}$/.test(value)) {
              setNuevoProducto((prev) => ({
                ...prev,
                fecha_vencimiento: value,
              }));
            }
          }}
          placeholder="Fecha de Vencimiento"
          required
        />
        <input
          type="text"
          name="categoria"
          value={nuevoProducto.categoria}
          onChange={(e) => {
            const value = e.target.value;
            // Permite solo los valores 1, 2, 3 o 4
            if (['1', '2', '3', '4'].includes(value) || value === '') {
              setNuevoProducto((prev) => ({
                ...prev,
                categoria: value,
              }));
            }
          }}
          placeholder="Categoría (ID)"
          required
          inputMode="numeric"
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {modoEdicion ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
        <button
          type="button" // Botón de tipo "button" para evitar el submit
          onClick={() => setNuevoProducto({
            id_producto: '',
            nombre_producto: '',
            descripcion: '',
            descripcion_larga: '',
            precio: '',
            cantidad_disponible: '',
            fecha_vencimiento: '',
            categoria: '',
          })}
          style={{ padding: '10px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Limpiar Campos
        </button>
      </form>
  
      <h2>Lista de Productos</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div style={{
          maxHeight: '500px',
          overflowY: 'scroll',
          border: '1px solid #ddd',
          padding: '10px',
          borderRadius: '5px',
          marginLeft: '400px',
          marginRight: '400px'
        }}>
          <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
            {productos.map((producto) => (
              <li key={producto.id_producto} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                backgroundColor: '#f9f9f9'
              }}>
                <img
                  src={`/src/assets/productoimg/${producto.nombre_producto.replace(/\s+/g, '_')}.jpg`}
                  onClick={() => navigate(`/producto/${producto.id_producto}`)}
                  alt={producto.nombre_producto}
                  onError={(e) => (e.target.src = '/src/assets/img/default.jpg')}
                  className="imagen"
                  style={{
                    width: '250px', // Ajusta el tamaño según prefieras
                    height: '250px',
                    marginRight: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                />
                <div>
                  <p><strong>{producto.nombre_producto}</strong></p>
                  <p>{producto.descripcion}</p>
                  <p>Precio: {producto.precio}</p>
                  <p>Cantidad disponible: {producto.cantidad_disponible}</p>
                  <p>Fecha de vencimiento: {producto.fecha_vencimiento}</p>
                  <p>Categoría: {producto.categoria}</p>
                  <button onClick={() => activarEdicion(producto)} style={{
                    marginRight: '15px',
                    padding: '10px',
                    backgroundColor: '#4CAF50',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}>Editar</button>
                  <button onClick={() => eliminarProducto(producto.id_producto)} style={{
                    padding: '10px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}>Eliminar</button>
  
                  {/* Campo para seleccionar el archivo */}
                  <input type="file" onChange={handleFileChange} />

                {/* Botón para subir el archivo, el nombre del archivo será el nombre del producto */}
                  <button onClick={handleUpload}>Subir archivo</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );  
  
};

export default Admin;
