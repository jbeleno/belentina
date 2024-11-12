import Producto from '../models/Productos.js';

// Categorías permitidas
const categoriasPermitidas = [1, 2, 3, 4];

// Crear un nuevo producto
export const crearProducto = async (req, res) => {
    try {
        const { id_producto, nombre_producto, descripcion, descripcion_larga, precio, cantidad_disponible, fecha_vencimiento, categoria } = req.body;

        // Validación de la categoría
        if (!categoriasPermitidas.includes(categoria)) {
            return res.status(400).json({ mensaje: "Categoría no válida. Solo se permiten las categorías: 1, 2, 3, 4." });
        }

        // Validación de nombre único
        const productoExistente = await Producto.findOne({ nombre_producto });
        if (productoExistente) {
            return res.status(400).json({ mensaje: `El nombre de producto "${nombre_producto}" ya está en uso. Elige otro nombre.` });
        }

        const nuevoProducto = new Producto({
            id_producto,
            nombre_producto,
            descripcion,
            descripcion_larga,
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

        // Convertir el precio de Decimal128 a string
        const productosConPrecioString = productos.map((producto) => ({
            ...producto.toObject(),
            precio: producto.precio.toString(), // Convertir a string para evitar formato $numberDecimal
        }));

        res.status(200).json(productosConPrecioString);
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

        // Convertir el precio de Decimal128 a string
        const productoConPrecioString = {
            ...producto.toObject(),
            precio: producto.precio.toString() // Convertir a string para evitar formato $numberDecimal
        };

        res.status(200).json(productoConPrecioString);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el producto", error: error.message });
    }
};



export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_producto, descripcion, precio, cantidad_disponible, fecha_vencimiento, categoria } = req.body;

        // Creamos un objeto vacío donde solo se añadirán los campos que han sido enviados
        const productoActualizado = {};

        // Validación de la categoría si se envía
        if (categoria) {
            if (!categoriasPermitidas.includes(categoria)) {
                return res.status(400).json({ mensaje: "Categoría no válida. Solo se permiten las categorías: 1, 2, 3, 4." });
            }
            productoActualizado.categoria = categoria; // Solo se añade si es enviado
        }

        // Validación de nombre único (exceptuando el producto actual)
        if (nombre_producto) {
            const productoExistente = await Producto.findOne({ 
                nombre_producto, 
                _id: { $ne: id }  // Excluye el producto actual de la búsqueda
            });
            if (productoExistente) {
                return res.status(400).json({ mensaje: `El nombre de producto "${nombre_producto}" ya está en uso. Elige otro nombre.` });
            }
            productoActualizado.nombre_producto = nombre_producto; // Solo se añade si es enviado
        }

        // Si los demás campos son enviados, los añadimos al objeto
        if (descripcion) productoActualizado.descripcion = descripcion;
        if (precio) productoActualizado.precio = precio;
        if (cantidad_disponible) productoActualizado.cantidad_disponible = cantidad_disponible;
        if (fecha_vencimiento) productoActualizado.fecha_vencimiento = fecha_vencimiento;

        // Si no hay campos para actualizar, se responde con un mensaje de error
        if (Object.keys(productoActualizado).length === 0) {
            return res.status(400).json({ mensaje: "No se proporcionaron cambios para actualizar." });
        }

        // Realizamos la actualización del producto con solo los campos enviados
        const productoActualizadoBD = await Producto.findOneAndUpdate(
            { id_producto: id },
            productoActualizado,  // Solo enviamos los campos modificados
            { new: true } // Para devolver el documento actualizado
        );

        if (!productoActualizadoBD) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.status(200).json({ mensaje: "Producto actualizado exitosamente", productoActualizado: productoActualizadoBD });
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

        // Verifica que la categoría sea válida
        if (!categoriasPermitidas.includes(parseInt(categoria))) {
            return res.status(400).json({ mensaje: "Categoría no válida. Solo se permiten las categorías: 1, 2, 3, 4." });
        }

        // Busca los productos y convierte el precio
        let productos = await Producto.find({ categoria: parseInt(categoria) });

        // Convertir precio de Decimal128 a string
        productos = productos.map((producto) => ({
            ...producto.toObject(),
            precio: producto.precio.toString(), // Convertir a string para evitar formato $numberDecimal
        }));

        if (productos.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron productos para esta categoría" });
        }

        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los productos por categoría", error: error.message });
    }
};