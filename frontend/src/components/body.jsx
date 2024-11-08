import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './sass/body.scss';

const Body = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/productos');
                const productosAleatorios = mezclarArray(response.data).slice(0, 8); // Mezcla y selecciona 8 productos
                setProductos(productosAleatorios);
                setLoading(false);
            } catch (error) {
                setError('Error al cargar los productos');
                setLoading(false);
            }
        };

        obtenerProductos();
    }, []);

    // Función para mezclar un array
    const mezclarArray = (array) => array.sort(() => Math.random() - 0.5);

    const cleanProductName = (name) => name.replace(/\s+/g, '_');

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="body">
            <h1>Productos Recomendados</h1>
            <div className="center-group">
                {productos.map((producto) => (
                    <div key={producto.id_producto} className="center">
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Body;
