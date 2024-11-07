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

        // Verificar si el rol del usuario es 'admin'
        if (req.usuario.role !== "admin") {
            return res.status(403).json({ msg: "Acceso denegado: Solo administradores" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token no válido' });
    }
};

export default checkAuth;
