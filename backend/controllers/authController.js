import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js'; // Asegúrate de que la ruta del modelo sea correcta

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario en la base de datos por su correo electrónico
    const usuario = await Usuario.findOne({ email });

    // Si no se encuentra el usuario, devolver un error
    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Comprobar si la contraseña es correcta
    const esValido = await usuario.comprobarPassword(password); // método comprobarPassword

    if (!esValido) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Comprobar si el usuario tiene el rol 'admin'
    if (usuario.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado: solo administradores' });
    }

    // Generar el JWT (Token)
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Enviar el token y el rol en la respuesta
    res.json({ token, role: usuario.role });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al autenticar al usuario' });
  }
};
