// category.model.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // Relación con restaurante, 
  // si deseas que cada restaurante tenga categorías distintas
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true
  },
  templateId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "Template",
     default: null // Por si no asigna ninguna plantilla
  },
  // 🎯 Bloque agrupado para todos los estilos personalizados
  styles: {
    type: mongoose.Schema.Types.Mixed, // te da flexibilidad total
    default: {},
  },

}, { timestamps: true });

module.exports = mongoose.models.Category || mongoose.model("Category", categorySchema);
