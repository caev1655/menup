const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");
// const { checkRole } = require("../middlewares/role.middleware"); // si quieres usar roles

const {
  createMenu,
  getMenusByRestaurant,
  getMenuById,
  updateMenu,
  deleteMenu,
  getMenuPublic,
} = require("../controllers/menu.controller");

// Rutas:
// Crear un menú -> POST /api/menus
router.post("/", protect, createMenu);

// Listar menús de un restaurante -> GET /api/menus/restaurant/:restaurantId
router.get("/restaurant/:restaurantId", protect, getMenusByRestaurant);

// Obtener un menú específico -> GET /api/menus/:menuId
router.get("/:menuId",protect, getMenuById);

// Ruta PÚBLICA para que se muestre sin login
router.get("/public/:menuId", getMenuPublic);

// Actualizar un menú -> PUT /api/menus/:menuId
router.put("/:menuId", protect, updateMenu);

// Eliminar un menú -> DELETE /api/menus/:menuId
router.delete("/:menuId", protect, deleteMenu);

module.exports = router;
