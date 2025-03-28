// src/controllers/restaurant.controller.js

const Restaurant = require("../models/restaurant.model");
const Menu = require("../models/menu.model")




exports.createRestaurant = async (req, res) => {
  try {
    // Ahora req.user.id es el ID del usuario que pasó por el middleware
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Falta el nombre del restaurante" });
    }
 
    // Creamos el restaurante en la DB
    const newRestaurant = await Restaurant.create({
      name,
      owner: req.user.id // Asignamos como dueño al usuario que está logueado
    });

    res.status(201).json({
      message: "Restaurante creado",
      restaurant: newRestaurant
    });
  } catch (error) {
    console.error("Error en createRestaurant:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.updateSubscriptionPlan = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { newPlan } = req.body; // 'basic' o 'premium'

    // Verificar permisos: quizá solo un adminGlobal puede cambiar planes
    // o el mismo owner con un pago
    // De momento, supongamos que si llegó aquí es porque tiene permisos

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante no encontrado" });
    }

    restaurant.subscriptionPlan = newPlan;
    // Podrías poner restaurant.subscriptionStatus = 'active'
    // Podrías actualizar expiresAt, etc.

    await restaurant.save();

    res.json({
      message: "Plan de suscripción actualizado",
      restaurant
    });
  } catch (error) {
    console.error("Error en updateSubscriptionPlan:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener todos los menús de un restaurante
exports.getRestaurantsByOwnerId = async (req, res) => {
  try {
 
    const owner = req.user.id;
    const restaurants = await Restaurant.find({owner});
    res.json(restaurants);
  } catch (error) {
    console.error("Error en getRestaurantsById:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }

};




// GET /api/restaurants/byOwnerWithMenus
exports.getRestaurantsWithMenus = async (req, res) => {
  try {
    const owner = req.user.id;
    const restaurants = await Restaurant.find({ owner });

    // Recorremos con un for normal (o forEach), para reescribir el array
    for (let i = 0; i < restaurants.length; i++) {
      const doc = restaurants[i];          // El doc de Mongoose
      const ms = await Menu.find({ restaurantId: doc._id });
      
      // Convertimos doc a objeto JS
      const docObj = doc.toObject();
      docObj.menus = ms;

      // Sobrescribimos el elemento en el array
      restaurants[i] = docObj;
    }

    res.json(restaurants);
  } catch (error) {
    console.error("Error en getRestaurantsWithMenus", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
