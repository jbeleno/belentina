import express from 'express';
import {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
    obtenerProductosPorCategoria // Método que vamos a agregar
} from '../controllers/productoController.js';

const router = express.Router();

// Ruta para obtener todos los productos, obtener productos por categoría y crear un nuevo producto
router.route('/')
    .get(obtenerProductos)  // Obtener todos los productos
    .post(crearProducto);   // Crear un nuevo producto

// Ruta para obtener, actualizar y eliminar un producto específico por ID
router.route('/:id')
    .get(obtenerProductoPorId) // Obtener producto por ID
    .put(actualizarProducto)   // Actualizar producto por ID
    .delete(eliminarProducto); // Eliminar producto por ID

// Ruta para obtener productos por categoría
router.route('/categoria/:categoria')
    .get(obtenerProductosPorCategoria);  // Obtener productos por categoría

export default router;
