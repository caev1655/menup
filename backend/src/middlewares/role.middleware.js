// src/middlewares/role.middleware.js

// Esta función recibe una lista de roles permitidos
// y devuelve un middleware que verifica si req.user.role está en esa lista
exports.checkRole = (allowedRoles) => {
    return (req, res, next) => {
      // A estas alturas, req.user debería existir porque ya pasó por el middleware protect
      // Si no existe, algo está mal o no se llamó a protect primero
      if (!req.user) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
  
      // Verificamos si el rol del usuario está dentro de allowedRoles
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ 
          message: "No tienes permiso para realizar esta acción" 
        });
      }
  
      // Si pasa la verificación, continúa
      next();
    };
  };
  