import Producto from '../models/Productos.js';

// Categorías permitidas
const categoriasPermitidas = [1, 2, 3, 4];

// Crear un nuevo producto
export const crearProducto = async (req, res) => {
    try {
        const { id_producto, nombre_producto, descripcion, precio, cantidad_disponible, fecha_vencimiento, categoria } = req.body;

        // Validación de la categoría
        if (!categoriasPermitidas.includes(categoria)) {
            return res.status(400).json({ mensaje: "Categoría no válida. Solo se permiten las categorías: 1, 2, 3, 4." });
        }

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

        // Validación de la categoría
        if (!categoriasPermitidas.includes(categoria)) {
            return res.status(400).json({ mensaje: "Categoría no válida. Solo se permiten las categorías: 1, 2, 3, 4." });
        }

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

        // Buscar y eliminar el producto
        const productoEliminado = await Producto.findOneAndDelete({ id_producto: id });

        if (!productoEliminado) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.status(200).json({ mensaje: "Producto eliminado exitosamente", productoEliminado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el producto", error: error.message });
    }
};
// Controlador para obtener productos por categoría
export const obtenerProductosPorCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;

        // Validar que la categoría esté dentro de las categorías permitidas (esto puede hacerse desde el modelo también)
        const categoriasPermitidas = [1, 2, 3, 4];  // Asumiendo que estas son las categorías válidas
        if (!categoriasPermitidas.includes(parseInt(categoria))) {
            return res.status(400).json({ mensaje: "Categoría no válida. Solo se permiten las categorías: 1, 2, 3, 4." });
        }

        // Buscar productos que coincidan con la categoría
        const productos = await Producto.find({ categoria: parseInt(categoria) });

        if (productos.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron productos para esta categoría" });
        }

        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los productos por categoría", error: error.message });
    }
};