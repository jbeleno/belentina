import express from 'express';
import {
    obtenerProductos,
    crearProducto,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto
} from '../controllers/productoController.js';

const router = express.Router();

// Ruta para obtener todos los productos y crear un nuevo producto
router.route('/')
    .get(obtenerProductos)
    .post(crearProducto);

// Ruta para obtener, actualizar y eliminar un producto específico por ID
router.route('/:id')
    .get(obtenerProductoPorId)
    .put(actualizarProducto)
    .delete(eliminarProducto);

export default router;
