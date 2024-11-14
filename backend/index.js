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
import uploadRoutes from './routes/uploadRoutes.js'; // Importar las rutas de carga

// Configuración de la aplicación
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Asegura que req.body pueda leer datos de formularios

dotenv.config();

// Conectar a la base de datos
conectarDB();

// Configuración de CORS
const whitelist = ['http://localhost:5173'];
const corsOption = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
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
app.use('/api/upload', uploadRoutes); // Agregar ruta de carga

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
