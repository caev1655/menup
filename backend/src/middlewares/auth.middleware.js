// src/middlewares/auth.middleware.js
const jwt = require("jsonwebtoken");

// Middleware para proteger rutas
// Buscaremos el token en "Authorization: Bearer <token>"
exports.protect = (req, res, next) => {
  let token = null;

  // 1. Verificar si viene en el header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extraemos el token, quitando "Bearer "
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "No token, autorización denegada"
    });
  }

  try {
    // 2. Verificar el token usando la misma clave secreta
    // process.env.JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Guardamos la info del usuario en req.user
    // de modo que podamos acceder a req.user.id y req.user.role
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    // 4. Continuar con la ruta
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido"
    });
  }
};
