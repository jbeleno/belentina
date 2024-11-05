import Producto from '../models/Productos.js';

// Crear un nuevo producto
export const crearProducto = async (req, res) => {
    try {
        const { id_producto, nombre_producto, descripcion, precio, cantidad_disponible, fecha_vencimiento, categoria } = req.body;

        const nuevoProducto = new Producto({
            id_producto,
            nombre_producto,
            descripcion,
            precio,
            cantidad_disponible,
            fecha_vencimiento,
            categoria
        });

        await nuevoProducto.save();
        res.status(201).json({ mensaje: "Producto creado exitosamente", nuevoProducto });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el producto", error: error.message });
    }
};

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los productos", error: error.message });
    }
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findOne({ id_producto: id });

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el producto", error: error.message });
    }
};

// Actualizar un producto
export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_producto, descripcion, precio, cantidad_disponible, fecha_vencimiento, categoria } = req.body;

        const productoActualizado = await Producto.findOneAndUpdate(
            { id_producto: id },
            { nombre_producto, descripcion, precio, cantidad_disponible, fecha_vencimiento, categoria },
            { new: true } // Para devolver el documento actualizado
        );

        if (!productoActualizado) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.status(200).json({ mensaje: "Producto actualizado exitosamente", productoActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el producto", error: error.message });
    }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const productoEliminado = await Producto.findOneAndDelete({ id_producto: id });

        if (!productoEliminado) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.status(200).json({ mensaje: "Producto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el producto", error: error.message });
    }
};
