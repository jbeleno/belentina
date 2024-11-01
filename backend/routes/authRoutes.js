import express from 'express';
import { login } from '../controllers/authController.js'; // Asegúrate de tener la extensión .js si usas ES6

const router = express.Router();

router.post('/login', login);

export default router; // Exporta el router como predeterminado
