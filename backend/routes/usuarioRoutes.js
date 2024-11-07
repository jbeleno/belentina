import express from "express";
const router = express.Router();
import { registrar, autenticar, olvidePassword, comprobarToken, nuevoPassword, perfil } from '../controllers/usuarioController.js';
import checkAuth from '../middleware/checkAuth.js';

// Autenticación, Registro y Confirmación de Usuarios
router.post('/', registrar); // Crea un nuevo usuario
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);

router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

router.get('/perfil', checkAuth, perfil);

export default router;
