import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = mongoose.Schema({
    id_cliente: {
        type: Number,
        unique: true,
        autoIncrement: true, // MongoDB no soporta auto-increment nativo como SQL, pero puedes manejarlo manualmente o con un plugin.
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellido_cliente: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    telefono_cliente: {
        type: String,
        trim: true,
    },
    direccion_cliente: {
        type: String,
        trim: true,
    },
    fecha_registro: {
        type: Date,
        default: Date.now,
        required: true,
    },
    token: {
        type: String,
    },
    // Agrega el campo `role` aquí
    role: {
        type: String,
        enum: ["user", "admin"], // Define los roles posibles
        default: "user" // Asigna "user" como rol predeterminado
    }
}, {
    timestamps: true
});

usuarioSchema.pre('save', async function(next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
