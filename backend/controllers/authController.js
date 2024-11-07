import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const esValido = await usuario.comprobarPassword(password);

    if (!esValido) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
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
