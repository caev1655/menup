// src/app.js
const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes"); // Importamos la ruta de user
const restaurantRoutes = require("./routes/restaurant.routes");
const menuRoutes = require("./routes/menu.routes"); 
const dishRoutes = require("./routes/dish.routes"); 
const reviewRoutes = require("./routes/review.routes");
const categoryRoutes = require("./routes/category.routes");
const templateRoutes = require("./routes/template.routes");


const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/restaurants",restaurantRoutes);
app.use("/api/menus",menuRoutes); // GET /api/menus, /api/menus/:menuId, etc.
app.use("/api/dishes",dishRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/templates", templateRoutes);


// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Hola desde Menup Backend! YEAH");
});

module.exports = app;
