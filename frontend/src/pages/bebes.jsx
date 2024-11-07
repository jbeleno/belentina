// Medicamentos.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bebes = () => {
    // Estado para almacenar los productos y la categoría
    const [productos, setProductos] = useState([]);
    const [categoria, setCategoria] = useState({ nombre_categoria: '', descripcion_categoria: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Variable para la categoría
    const categoriaId = 4; // Aquí puedes cambiar el número de categoría según sea necesario

    // Función para obtener los productos y la categoría
    useEffect(() => {
        const obtenerProductosYCategoria = async () => {
            try {
                // Obtener los productos de la categoría usando la variable categoriaId
                const productosResponse = await axios.get(`http://localhost:5000/api/productos/categoria/${categoriaId}`);
                setProductos(productosResponse.data);

                // Obtener la categoría usando la misma variable categoriaId
                const categoriaResponse = await axios.get(`http://localhost:5000/api/categorias/${categoriaId}`);
                setCategoria({
                    nombre_categoria: categoriaResponse.data.nombre_categoria,
                    descripcion_categoria: categoriaResponse.data.descripcion_categoria,
                });

                setLoading(false); // Cambiar el estado de carga
            } catch (error) {
                setError('Error al cargar los productos y la categoría');
                setLoading(false);
            }
        };

        obtenerProductosYCategoria(); // Llamar a la función cuando el componente se monte
    }, [categoriaId]); // Añadir categoriaId al arreglo de dependencias para que el efecto se ejecute cuando cambie

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>{categoria.nombre_categoria}</h1>
            <p>{categoria.descripcion_categoria}</p>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id_producto}>
                        <h2>{producto.nombre_producto}</h2>
                        <p>{producto.descripcion}</p>
                        <p>Precio: ${producto.precio}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Bebes;
