const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");
const uploadCloud = require("../middlewares/uploadCloudinary.middleware"); 

const {
  createDish,
  getDishesByMenu,
  getDishById,
  updateDish,
  deleteDish
} = require("../controllers/dish.controller");

// Crear platillo -> POST /api/dishes
router.post("/", protect, createDish);

// Listar platillos de un menú -> GET /api/dishes/menu/:menuId
router.get("/menu/:menuId", protect, getDishesByMenu);


// Obtener un platillo por ID -> GET /api/dishes/:dishId
router.get("/:dishId", protect, getDishById);

// Actualizar un platillo -> PUT /api/dishes/:dishId
router.put("/:dishId", protect, updateDish);

// Eliminar un platillo -> DELETE /api/dishes/:dishId
router.delete("/:dishId", protect, deleteDish);

// Ejemplo de endpoint cloudinary
router.post(
    "/upload-image-cloud",
    protect,         // si requieres token
    uploadCloud.single("image"), // "image" es el nombre del campo
    (req, res) => {
      try {
        // Al llegar aquí, la imagen ya está subida a Cloudinary
        // req.file tiene info como:
        // {
        //   path: 'https://res.cloudinary.com/xxx/image/upload/v1680407/menup/xxx.png',
        //   filename: 'menup/xxx'
        //   ...
        // }
        return res.json({
          message: "Imagen subida a Cloudinary con éxito",
          url: req.file.path // Esta es la URL pública
        });
      } catch (error) {
        console.error("Error al subir imagen a Cloudinary:", error);
        return res.status(500).json({ message: "Error en el servidor" });
      }
    }
  );

module.exports = router;
