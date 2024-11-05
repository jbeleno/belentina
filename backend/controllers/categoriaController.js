import Categoria from '../models/Categorias.js';

// Crear una nueva categoría
export const crearCategoria = async (req, res) => {
    try {
        const { id_categoria, nombre_categoria, descripcion_categoria } = req.body;

        const nuevaCategoria = new Categoria({
            id_categoria,
            nombre_categoria,
            descripcion_categoria
        });

        await nuevaCategoria.save();
        res.status(201).json({ mensaje: "Categoría creada exitosamente", nuevaCategoria });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear la categoría", error: error.message });
    }
};

// Obtener todas las categorías
export const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las categorías", error: error.message });
    }
};

// Obtener una categoría por ID
export const obtenerCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findOne({ id_categoria: id });

        if (!categoria) {
            return res.status(404).json({ mensaje: "Categoría no encontrada" });
        }

        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la categoría", error: error.message });
    }
};

// Actualizar una categoría
export const actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_categoria, descripcion_categoria } = req.body;

        const categoriaActualizada = await Categoria.findOneAndUpdate(
            { id_categoria: id },
            { nombre_categoria, descripcion_categoria },
            { new: true } // Para devolver el documento actualizado
        );

        if (!categoriaActualizada) {
            return res.status(404).json({ mensaje: "Categoría no encontrada" });
        }

        res.status(200).json({ mensaje: "Categoría actualizada exitosamente", categoriaActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la categoría", error: error.message });
    }
};

// Eliminar una categoría
export const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoriaEliminada = await Categoria.findOneAndDelete({ id_categoria: id });

        if (!categoriaEliminada) {
            return res.status(404).json({ mensaje: "Categoría no encontrada" });
        }

        res.status(200).json({ mensaje: "Categoría eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la categoría", error: error.message });
    }
};
