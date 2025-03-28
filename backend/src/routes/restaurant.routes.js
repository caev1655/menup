// src/routes/restaurant.routes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware"); // Importamos el middleware
const {checkRole} = require("../middlewares/role.middleware");
const { createRestaurant, updateSubscriptionPlan, getRestaurantsByOwnerId, getRestaurantsWithMenus } = require("../controllers/restaurant.controller");


// Solo un usuario logueado (con token) puede crear un restaurante
// Solo alguien con rol "owner" o "adminGlobal" puede crear restaurante
router.post(
    "/",
    protect,          // primero revisa que haya token
    checkRole(["owner", "adminGlobal"]), // luego revisa que su rol sea owner o adminGlobal
    createRestaurant
  ); 

  // Obtener un menú específico -> GET /api/menus/:menuId
  router.get("/", protect, getRestaurantsByOwnerId);

  router.get("/menus", protect, getRestaurantsWithMenus);
  

  router.put("/:restaurantId/subscription", protect, checkRole(["owner","adminGlobal"]), updateSubscriptionPlan);


module.exports = router;
