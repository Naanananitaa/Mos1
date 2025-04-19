const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const router = express.Router();
const USERS_FILE = path.join(__dirname, "../data/users.json");
const saltRounds = 10;

// Leer y escribir usuarios
const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Validaciones
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPassword = (password) =>
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /[0-9]/.test(password);

// 🚀 POST /api/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Todos los campos son obligatorios." });
  }

  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Correo electrónico no válido." });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({
      success: false,
      message:
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.",
    });
  }

  const users = readUsers();
  const userExists = users.find((u) => u.email === email);

  if (userExists) {
    return res
      .status(400)
      .json({ success: false, message: "El correo ya está registrado." });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = { name, email, password: hashedPassword };

  users.push(newUser);
  writeUsers(users);

  return res
    .status(201)
    .json({ success: true, message: "Usuario registrado exitosamente." });
});

// 🚀 POST /api/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Correo y contraseña son requeridos." });
  }

  const users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Usuario no registrado." });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Contraseña incorrecta." });
  }

  return res.json({
    success: true,
    message: "Inicio de sesión exitoso.",
    token: "fake-jwt-token",
  });
});

module.exports = router;
