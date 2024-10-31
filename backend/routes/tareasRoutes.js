import express from 'express';

import {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado,
} from "../controllers/tareaController.js";

const router = express.Router

export default router;