// src/server.js
require("dotenv").config(); // para leer las variables de entorno
const connectDB = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 4000;

// Conectar a la base de datos
connectDB();

// Levantar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});
