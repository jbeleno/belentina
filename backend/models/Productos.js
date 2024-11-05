import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    id_producto: {
        type: Number,
        required: true,
        unique: true, // PRIMARY KEY
    },
    nombre_producto: {
        type: String,
        required: true,
        maxlength: 100, // VARCHAR(100)
        trim: true,
    },
    descripcion: {
        type: String, // TEXT
        trim: true,
    },
    precio: {
        type: mongoose.Types.Decimal128, // DECIMAL
        required: true,
    },
    cantidad_disponible: {
        type: Number,
        required: true,
    },
    fecha_vencimiento: {
        type: Date,
    },
    categoria: {
        type: String,
        maxlength: 50, // VARCHAR(50)
        trim: true,
    }
}, {
    timestamps: true
});

const Producto = mongoose.model("Producto", productoSchema);
export default Producto;
