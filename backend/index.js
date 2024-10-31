//const express = require("express");
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';


const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

// Configurar CORS
const whitelist = ['http://localhost:5174'];

const corsOption = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            // puede consultar la API
            callback(null, true);
        }else{
            // No esta permitido
            callback(new Error("Error de Cors"));
        }
    },
};

app.use(cors(corsOption));

// Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);

const PORT = process.env.PORT || 7500;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})