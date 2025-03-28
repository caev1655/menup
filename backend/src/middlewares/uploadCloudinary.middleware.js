// src/middlewares/uploadCloudinary.middleware.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "menup", // la carpeta donde se guardarán en Cloudinary
    allowedFormats: ["jpg", "png", "jpeg"]
    // transformation: [{ width: 500, height: 500, crop: "limit" }]
  }
});

// Inicializamos multer
const uploadCloud = multer({ storage });

module.exports = uploadCloud;
 