// Importación de módulos
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Agrega esta línea para importar authRoutes

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
        if (whitelist.includes(origin)) {
            // Permitir acceso a la API
            callback(null, true);
        } else {
            // Denegar acceso
            callback(new Error("Error de Cors"));
        }
    },
};
app.use(cors(corsOption));

// Rutas de la API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/auth', authRoutes); // Agrega esta línea para habilitar la ruta de autenticación

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
