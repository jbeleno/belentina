import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección
import '../components/sass/Medicamentos.scss';  // Importamos el archivo de estilos Sass

const Medicamentos = () => {
    const [productos, setProductos] = useState([]);
    const [categoria, setCategoria] = useState({ nombre_categoria: '', descripcion_categoria: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Define useNavigate
    const categoriaId = 1;

    useEffect(() => {
        const obtenerProductosYCategoria = async () => {
            try {
                const productosResponse = await axios.get(`http://localhost:5000/api/productos/categoria/${categoriaId}`);
                setProductos(productosResponse.data);

                const categoriaResponse = await axios.get(`http://localhost:5000/api/categorias/${categoriaId}`);
                setCategoria({
                    nombre_categoria: categoriaResponse.data.nombre_categoria,
                    descripcion_categoria: categoriaResponse.data.descripcion_categoria,
                });

                setLoading(false);
            } catch (error) {
                setError('Error al cargar los productos y la categoría');
                setLoading(false);
            }
        };

        obtenerProductosYCategoria();
    }, [categoriaId]);

    const cleanProductName = (name) => name.replace(/\s+/g, '_');

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="med-container">
            <h1>{categoria.nombre_categoria}</h1>
            <p>{categoria.descripcion_categoria}</p>
            <ul className="product-list">
                {productos.map((producto) => (
                    <li
                        key={producto.id_producto}
                        className="product-item"
                        onClick={() => navigate(`/producto/${producto.id_producto}`)} // Redirige al producto específico
                    >
                        <img
                            src={`/src/assets/productoimg/${cleanProductName(producto.nombre_producto)}.jpg`}
                            alt={producto.nombre_producto}
                        />
                        <h2>{producto.nombre_producto}</h2>
                        <p>{producto.descripcion}</p>
                        <p className="price">Precio: ${producto.precio}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Medicamentos;
