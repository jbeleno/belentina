import express from 'express';
import {
    obtenerCategorias,
    crearCategoria,
    obtenerCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria
} from '../controllers/categoriaController.js';

const router = express.Router();

// Ruta para obtener todas las categorías y crear una nueva categoría
router.route('/')
    .get(obtenerCategorias)
    .post(crearCategoria);

// Ruta para obtener, actualizar y eliminar una categoría específica por ID
router.route('/:id')
    .get(obtenerCategoriaPorId)
    .put(actualizarCategoria)
    .delete(eliminarCategoria);

export default router;
