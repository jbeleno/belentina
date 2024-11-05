import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const checkAuth = async (req, res, next) => {
    const token = req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : null;

    if (!token) {
        return res.status(401).json({ msg: "Token no válido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v");

        if (!req.usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        // Verifica que el ID del usuario coincida con el usuario específico
        if (req.usuario._id.toString() !== "672a6c2dcd3774a32b45966a") {
            return res.status(403).json({ msg: "Acceso denegado" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token no válido' });
    }
}

export default checkAuth;
