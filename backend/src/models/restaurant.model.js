// src/models/restaurant.model.js
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    // Relacionamos con el usuario dueño
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true
  },
  subscriptionPlan: {
    type: String,
    default: "basic" // 'basic' | 'premium'
  },
  subscriptionStatus: {
    type: String,
    default: "active" // 'active' | 'expired' | etc.
  },
  // Agrega aquí lo que quieras:
  // collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // subscriptionPlan: { type: String, default: "basic" },
  // etc.
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);
