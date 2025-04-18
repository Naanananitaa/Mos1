const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Ruta para login con validación adicional
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Correo y contraseña son requeridos." });
  }

  if (email === "test@example.com" && password === "Password123") {
    return res.json({ success: true, message: "Login successful", token: "fake-jwt-token" });
  } else {
    return res.status(401).json({ success: false, message: "Credenciales inválidas." });
  }
});

// Ruta para registro con validación adicional
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Todos los campos son obligatorios." });
  }

  if (email === "test@example.com") {
    return res.status(409).json({ success: false, message: "El usuario ya existe." });
  }

  return res.status(201).json({ success: true, message: "Usuario registrado correctamente." });
});

// Configuración del puerto con variable de entorno
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor backend corriendo en http://localhost:${PORT}`));
