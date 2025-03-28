const Dish = require("../models/dish.model");
const Menu = require("../models/menu.model");

// Crear un platillo
exports.createDish = async (req, res) => {
  try {
    const { menuId, name, description, price, imageUrl, category, status } = req.body;

    if (!menuId || !name) {
      return res.status(400).json({
        message: "Faltan campos obligatorios (menuId, name)"
      });
    }

    // Verificar que el menú exista
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }

    // (Opcional) Verificar que el usuario sea dueño del restaurante o algo similar
    // - Aquí, si el menu pertenece a un restaurante con owner "XYZ",
    //   podrías verificar que req.user.id === "XYZ". 

    const newDish = await Dish.create({
      menuId,
      name,
      description,
      price,
      imageUrl,
      category,
      status
    });

    res.status(201).json({
      message: "Platillo creado exitosamente",
      dish: newDish
    });
  } catch (error) {
    console.error("Error en createDish:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener todos los platillos de un menú
exports.getDishesByMenu = async (req, res) => {
  try {
    const { menuId } = req.params;

    const dishes = await Dish.find({ menuId }).populate("category");
    res.json(dishes);
  } catch (error) {
    console.error("Error en getDishesByMenu:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener un platillo por ID
exports.getDishById = async (req, res) => {
  try {
    const { dishId } = req.params;
    const dish = await Dish.findById(dishId);

    if (!dish) {
      return res.status(404).json({ message: "Platillo no encontrado" });
    }

    res.json(dish);
  } catch (error) {
    console.error("Error en getDishById:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Actualizar un platillo
exports.updateDish = async (req, res) => {
  try {
    const { dishId } = req.params;
    const { name, description, price, imageUrl, category, status } = req.body;

    let dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({ message: "Platillo no encontrado" });
    }

    // (Opcional) Verificar permisos

    // Actualizar campos
    if (name) dish.name = name;
    if (description) dish.description = description;
    if (price !== undefined) dish.price = price;
    if (imageUrl) dish.imageUrl = imageUrl;
    if (category) dish.category = category;
    if (status) dish.status = status;

    await dish.save();

    res.json({
      message: "Platillo actualizado",
      dish
    });
  } catch (error) {
    console.error("Error en updateDish:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Eliminar un platillo
exports.deleteDish = async (req, res) => {
  try {
    const { dishId } = req.params;

    // Verificar si existe
    const dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({ message: "Platillo no encontrado" });
    }

    // (Opcional) Verificar permisos

    // Eliminar
    await Dish.deleteOne({ _id: dishId }); // O findByIdAndDelete

    res.json({ message: "Platillo eliminado" });
  } catch (error) {
    console.error("Error en deleteDish:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
