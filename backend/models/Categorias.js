import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
    id_categoria: {
        type: Number,
        required: true,
        unique: true, // PRIMARY KEY
    },
    nombre_categoria: {
        type: String,
        required: true,
        maxlength: 100, // VARCHAR(100)
        trim: true,
    },
    descripcion_categoria: {
        type: String, // TEXT
        trim: true,
    }
}, {
    timestamps: true
});

const Categoria = mongoose.model("Categoria", categoriaSchema);
export default Categoria;
