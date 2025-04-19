const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const USERS_FILE = path.join(__dirname, "data", "users.json");

// Función para leer y escribir usuarios
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

// Ruta para login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Correo y contraseña son requeridos." });
  }

  const users = readUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    return res.json({
      success: true,
      message: "Inicio de sesión exitoso.",
      token: "fake-jwt-token",
    });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Credenciales inválidas." });
  }
});

// Ruta para registro
app.post("/api/register", (req, res) => {
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
  const userExists = users.some((u) => u.email === email);

  if (userExists) {
    return res
      .status(409)
      .json({ success: false, message: "El usuario ya existe." });
  }

  users.push({ name, email, password });
  writeUsers(users);

  return res
    .status(201)
    .json({ success: true, message: "Usuario registrado correctamente." });
});

// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`)
);
