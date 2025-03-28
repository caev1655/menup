// src/models/user.model.js
const mongoose = require("mongoose");

// Creamos un "esquema" (schema) para el usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // hace que sea obligatorio
  },
  email: {
    type: String,
    required: true,
    unique: true // evita que se repitan correos
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "owner" // podría ser "owner", "collaborator", etc.
  }
}, { timestamps: true }); 
/*
  timestamps: true hace que se agreguen 
  automáticamente createdAt y updatedAt 
  en cada documento.
*/

// Exportamos un "modelo" llamado "User",
// basado en el esquema userSchema.
module.exports = mongoose.model("User", userSchema);
