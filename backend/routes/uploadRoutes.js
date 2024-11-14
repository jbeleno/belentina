// routes/uploadRoutes.js
import express from 'express';
import upload from '../config/multer.js'; // Importar configuración de Multer

const router = express.Router();

// Ruta para manejar la carga de un archivo
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({
      message: 'Archivo subido exitosamente',
      file: req.file // Retorna la información del archivo subido
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al subir el archivo',
      error: error.message
    });
  }
});

export default router;
