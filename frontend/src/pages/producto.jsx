import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el ID del producto desde la URL
import axios from 'axios';
import '../components/sass/Producto.scss'; // Estilos específicos para la página de producto


const Producto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    // Función para limpiar el nombre del producto
    const cleanProductName = (name) => name.replace(/\s+/g, '_');

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/productos/${id}`);
                setProducto(response.data);
            } catch (error) {
                console.error("Error al obtener el producto:", error);
            }
        };
        fetchProducto();
    }, [id]);

    if (!producto) {
        return <p>Cargando producto...</p>;
    }

    return (
        <div className="producto">
            <div className="producto-imagen">
                <img
                    src={`/src/assets/productoimg/${cleanProductName(producto.nombre_producto)}.jpg`}
                    alt={producto.nombre_producto}
                    onError={(e) => (e.target.src = '/src/assets/img/default.jpg')}
                />
            </div>
            <div className="producto-info">
                <h1>{producto.nombre_producto}</h1>
                <p className="price">Precio: ${producto.precio}</p>
                <p className="descripcion">{producto.descripcion_larga}</p>
                <button className="agregar-carrito">Agregar al carrito</button>
            </div>
        </div>
    );
};

export default Producto;
