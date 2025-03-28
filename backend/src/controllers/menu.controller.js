// src/controllers/menu.controller.js
const Menu = require("../models/menu.model");
const Dish = require("../models/dish.model");
const Restaurant = require("../models/restaurant.model");

// Crear un menú
exports.createMenu = async (req, res) => {
  try {
    const { restaurantId, name, template, templateConfig, language } = req.body;

    if (!restaurantId || !name) {
      return res.status(400).json({ message: "Faltan campos obligatorios (restaurantId, name)" });
    }

    // Verificar que el restaurante exista
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante no encontrado" });
    }

    // Verificar que el usuario (req.user) sea el dueño o tenga permisos
    // Si quieres que solo el owner pueda crear menús, checa:
    if (restaurant.owner.toString() !== req.user.id && req.user.role !== "adminGlobal") {
      // Si req.user.role no es 'adminGlobal' o 'owner' del restaurant,
      // podríamos rechazar. Depende de tu lógica de permisos.
      return res.status(403).json({ message: "No tienes permiso para crear menú en este restaurante" });
    }

    // -------- LÓGICA DE SUSCRIPCIÓN --------
    if (restaurant.subscriptionPlan === "basic") {
        // Contar cuántos menús existen
        const existingMenus = await Menu.countDocuments({ restaurantId });
        if (existingMenus >= 1) {
          return res.status(403).json({
            message: "Plan básico: solo se permite 1 menú. Mejora tu suscripción."
          });
        }
      }
      // Si es 'premium', no restringimos, o puedes poner un límite mayor...

    // Crear el menú
    const newMenu = await Menu.create({
      restaurantId,
      name,
      template,
      templateConfig,
      language
    });

    res.status(201).json({
      message: "Menú creado exitosamente",
      menu: newMenu
    });
  } catch (error) {
    console.error("Error en createMenu:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener todos los menús de un restaurante
exports.getMenusByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Opcional: verificar que el usuario tenga acceso
    // ...

    const menus = await Menu.find({ restaurantId });
    res.json(menus);
  } catch (error) {
    console.error("Error en getMenusByRestaurant:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener un menú específico
exports.getMenuById = async (req, res) => {
  try {
    const { menuId } = req.params;
    const menu = await Menu.findById(menuId);

    if (!menu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }

    res.json(menu);
  } catch (error) {
    console.error("Error en getMenuById:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// GET /api/menus/public/:menuId
exports.getMenuPublic = async (req, res) => {
  try {
    const { menuId } = req.params;
    const menu = await Menu.findById(menuId); 
    if (!menu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }

    // Query separada para los platillos
    const dishes = await Dish.find({ menuId }).populate("category"); 
    
    // Devolver ambos: 
    res.json({ 
      ...menu.toObject(), 
      dishes // anexa los platillos 
    });
  } catch (error) {
    console.error("Error en getMenuById:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Actualizar un menú
exports.updateMenu = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { name, template, templateConfig, language } = req.body;

    let menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }

    // Verificar permisos aquí si quieres (dueño o admin)
    // ...

    // Actualizar campos
    if (name) menu.name = name;
    if (template) menu.template = template;
    if (templateConfig) menu.templateConfig = templateConfig;
    if (language) menu.language = language;

    await menu.save();

    res.json({
      message: "Menú actualizado",
      menu
    });
  } catch (error) {
    console.error("Error en updateMenu:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Eliminar un menú
exports.deleteMenu = async (req, res) => {
  try {
    const { menuId } = req.params;

    // Verificar si existe
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }

    // Verificar permisos
    // ...

    await menu.deleteOne()

    res.json({ message: "Menú eliminado" });
  } catch (error) {
    console.error("Error en deleteMenu:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
