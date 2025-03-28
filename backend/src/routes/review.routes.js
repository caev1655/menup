const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");

const {
  createReview,
  getReviewsByMenu,
  getReviewsByDish,
  deleteReview
} = require("../controllers/review.controller");

// Crear reseña (de menú o platillo)
router.post("/", createReview); 
// Nota: Podrías poner protect si deseas que solo usuarios logueados puedan reseñar

// Obtener reseñas de un menú
router.get("/menu/:menuId", getReviewsByMenu);

// Obtener reseñas de un platillo
router.get("/dish/:dishId", getReviewsByDish);

// Eliminar reseña (opcional - si deseas moderar)
router.delete("/:reviewId", protect, deleteReview);

module.exports = router;
