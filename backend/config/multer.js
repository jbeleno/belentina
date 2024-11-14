// config/multer.js
import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/jesus/OneDrive/Desktop/probar cosas/multer/belentina/frontend/src/assets/productoimg'); // Carpeta absoluta
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Nombre original del archivo
  }
});

// Limitar el tamaño de los archivos y definir qué tipos de archivos son válidos
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Tamaño máximo de 10MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/; // Solo imágenes
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes'));
    }
  }
});

export default upload;
