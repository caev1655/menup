// src/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // process.env.MONGO_URI viene de tu archivo .env
    const conn = await mongoose.connect(process.env.MONGO_URI, { });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // detiene la app si no conecta
  }
};

module.exports = connectDB;
