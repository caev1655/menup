const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");
const {createCategory, getCategories,updateCategory,deleteCategory,updateCategoryStyle } = require("../controllers/category.controller");

// Crear categoría
router.post("/", protect, createCategory);

// Obtener categorías de un restaurante
router.get("/", protect, getCategories);

// Actualizar categoría
router.put("/:categoryId", protect, updateCategory);

// Actualizar los estilos de la categoría
router.patch("/:categoryId", protect, updateCategoryStyle );

// Eliminar categoría
router.delete("/:categoryId", protect, deleteCategory);

module.exports = router;
