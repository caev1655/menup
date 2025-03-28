// src/models/menu.model.js
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  // Podríamos agregar fields para plantillas, estilos, idioma, etc.
  template: { type: String, default: "template1" },
  templateConfig: {
    primaryColor: { type: String, default: "#000000" },
    secondaryColor: { type: String, default: "#FFFFFF" },
    // ... más configuraciones
  },
  language: { type: String, default: "es" },
  qrCode: { type: String }, // en caso de que quieras guardar la URL del código QR
}, { timestamps: true });

module.exports = mongoose.model("Menu", menuSchema);
