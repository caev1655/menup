// src/controllers/user.controller.js
const User = require("../models/user.model"); // importamos el modelo User
const bcrypt = require("bcryptjs");           // para hashear contraseñas
const generateToken = require("../utils/generateToken"); // IMPORTA la función

// Controlador para registrar usuarios
// Se asume que llegará un body con name, email, password
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validamos que vengan todos los datos
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Faltan datos requeridos (name, email, password, role)",
      });
    }

    // Verificamos si ya existe un usuario con ese email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "El email ya está registrado",
      });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);         // generamos el "salt"
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creamos el usuario en la DB
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "owner",
    });

    // Enviamos la respuesta con el usuario creado
    // Nota: nunca envíes contraseñas en claro al frontend
    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error en registerUser:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};


// Nueva función de login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validar que vengan email y password
    if (!email || !password) {
      return res.status(400).json({
        message: "Faltan el email o la contraseña",
      });
    }

    // 2. Buscar el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas (user no encontrado)",
      });
    }

    // 3. Comparar la contraseña con el hash almacenado
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Credenciales inválidas (password no coincide)",
      });
    }

    // 4. Si llega aquí, la contraseña es correcta
    const token = generateToken(user._id, user.role);

     // Devolvemos el token y los datos de usuario
    res.json({
      message: "Login exitoso",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }, 
      token
    });
  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
