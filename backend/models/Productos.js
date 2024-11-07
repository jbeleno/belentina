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
    imagen: {
        type: String, // Aquí se almacenará el código Base64 de la imagen
        trim: true,
    },
    categoria: {
        type: Number, // Ahora 'categoria' es un número (id_categoria)
        required: true, // Es posible agregar la validación para asegurarse de que siempre se asigna una categoría válida
    }
}, {
    timestamps: true
});

const Producto = mongoose.model("Producto", productoSchema);
export default Producto;
