const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category",
    default: null
  },
  
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    default: 0
  },
  imageUrl: String,
  status: {
    type: String,
    default: "available" // "available", "out-of-stock", "promotion"
  }
}, { timestamps: true });

module.exports = mongoose.model("Dish", dishSchema);
