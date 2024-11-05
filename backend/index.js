// Importación de módulos
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import productoRoutes from './routes/productoRoutes.js';

// Configuración de la aplicación
const app = express();
app.use(express.json());

dotenv.config();

// Conectar a la base de datos
conectarDB();

// Configuración de CORS
const whitelist = ['http://localhost:5173'];
const corsOption = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            // Permitir acceso a la API si el origin es permitido o si es una solicitud sin origin (como en Postman)
            callback(null, true);
        } else {
            // Denegar acceso si el origin no está permitido
            callback(new Error("Error de Cors"));
        }
    },
};
app.use(cors(corsOption));

// Rutas de la API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/productos', productoRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
