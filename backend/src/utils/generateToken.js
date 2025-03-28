// src/utils/generateToken.js
const jwt = require("jsonwebtoken");

function generateToken(userId, userRole) {
  // userId y userRole serán incluidos en el payload
  // process.env.JWT_SECRET es la clave secreta de tu archivo .env
  // expiresIn: "7d" => significa que el token durará 7 días
  return jwt.sign(
    { id: userId, role: userRole },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

module.exports = generateToken;
