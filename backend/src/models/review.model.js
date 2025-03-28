const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu"
  },
  dishId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dish"
  },
  userName: {
    type: String,
    default: "Anónimo"
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
