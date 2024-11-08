import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';

const registrar = async (req, res) => {
    const { email, role } = req.body;

    const existeUsuario = await Usuario.findOne({ email });

    if (existeUsuario) {
        const error = new Error("Usuario ya Registrado");
        return res.status(400).json({ msg: error.message });
    }

    try {
        const usuario = new Usuario({
            ...req.body,
            role: role || 'user'  // Asigna 'user' por defecto si no se pasa otro rol
        });
        await usuario.save();
        res.json({ msg: 'Usuario Creado Correctamente' });
    } catch (error) {
        console.log(error);
    }
};

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
    }

    // Comprobar si la contraseña es correcta
    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id),
            role: usuario.role // Incluimos el rol del usuario
        });
    } else {
        const error = new Error("El Password es Incorrecto");
        return res.status(403).json({ msg: error.message });
    }
};

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuario.token = generarId();
        await usuario.save();
        res.json({ msg: "Hemos enviado un email con las instrucciones" });
    } catch (error) {
        console.log(error);
    }
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const tokenValido = await Usuario.findOne({ token });

    if (tokenValido) {
        res.json({ msg: "Token válido y el usuario existe" });
    } else {
        const error = new Error("Token no Valido");
        return res.status(404).json({ msg: error.message });
    }
};

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token });

    if (usuario) {
        usuario.password = password;
        usuario.token = '';
        try {
            await usuario.save();
            res.json({ msg: 'Password Modificado Correctamente' });
        } catch (error) {
            console.log(error);
        }
    } else {
        const error = new Error("Token no Valido");
        return res.status(404).json({ msg: error.message });
    }
};

// Función perfil ajustada para obtener datos según el correo registrado
const perfil = async (req, res) => {
    const { email } = req.usuario;  // Usamos el email del usuario autenticado

    // Buscamos al usuario con el email
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ msg: error.message });
    }

    // Devolvemos todos los datos del usuario encontrado
    res.json(usuario);  // Devuelve todo el documento de usuario
};

// Función para obtener el perfil de usuario con rol 'user'
const obtenerPerfilUsuario = async (req, res) => {
    const { email } = req.usuario;  // Usamos el email del usuario autenticado

    try {
        // Buscar al usuario por su email
        const usuario = await Usuario.findOne({ email }).select("-password -token -createdAt -updatedAt -__v");

        // Si no se encuentra el usuario
        if (!usuario) {
            const error = new Error("Usuario no encontrado");
            return res.status(404).json({ msg: error.message });
        }

        // Verificamos que el rol sea 'user', ya que este endpoint es solo para usuarios comunes
        if (usuario.role !== "user") {
            return res.status(403).json({ msg: "Acceso denegado: Solo usuarios comunes" });
        }

        // Devolver la información del perfil del usuario
        res.json({
            nombre: usuario.nombre,
            apellido_cliente: usuario.apellido_cliente,
            email: usuario.email,
            telefono_cliente: usuario.telefono_cliente,
            direccion_cliente: usuario.direccion_cliente,
            fecha_registro: usuario.fecha_registro,
            role: usuario.role,
        });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", error: error.message });
    }
};

export { registrar, autenticar, olvidePassword, comprobarToken, nuevoPassword, perfil, obtenerPerfilUsuario };
