const Review = require("../models/review.model");

// Crear una reseña
exports.createReview = async (req, res) => {
  try {
    const { menuId, dishId, userName, comment, rating } = req.body;

    // Validar campos
    if (!comment) {
      return res.status(400).json({ message: "Falta el comentario" });
    }

    // Podrías validar que al menos uno de menuId o dishId venga
    if (!menuId && !dishId) {
      return res.status(400).json({ message: "Falta menuId o dishId" });
    }

    // Crear la reseña
    const newReview = await Review.create({
      menuId,
      dishId,
      userName: userName || "Anónimo",
      comment,
      rating
    });

    res.status(201).json({
      message: "Reseña creada",
      review: newReview
    });
  } catch (error) {
    console.error("Error en createReview:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener reseñas de un menú
exports.getReviewsByMenu = async (req, res) => {
  try {
    const { menuId } = req.params;
    const reviews = await Review.find({ menuId });
    res.json(reviews);
  } catch (error) {
    console.error("Error en getReviewsByMenu:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener reseñas de un platillo
exports.getReviewsByDish = async (req, res) => {
  try {
    const { dishId } = req.params;
    const reviews = await Review.find({ dishId });
    res.json(reviews);
  } catch (error) {
    console.error("Error en getReviewsByDish:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// (Opcional) Eliminar reseña, si quieres moderar
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    // Podrías verificar permisos:
    // - Solo el autor o un admin puede borrarla
    await Review.deleteOne({ _id: reviewId });
    res.json({ message: "Reseña eliminada" });
  } catch (error) {
    console.error("Error en deleteReview:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
