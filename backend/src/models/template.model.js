// models/template.model.js
const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  layout: {
    type: String,
    default: "one-col", // "one-col", "2-cols", "cards", etc.
  },
  columns: {
    type: Number,
    default: 1,
  },
  backgroundColor: {
    type: String,
    default: "#ffffff",
  },
  textColor: {
    type: String,
    default: "#000000",
  },
  fontFamily: {
    type: String,
    default: "Arial, sans-serif",
  },
  // Agrega todos los campos que quieras:
  // "borderStyle", "borderColor", ...
  // o un subdocumento "styles: {...}"
}, { timestamps: true });

module.exports = mongoose.model("Template", templateSchema);
