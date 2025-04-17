// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de ejemplo para login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Validación básica (simulada)
  if (email === "test@example.com" && password === "Password123") {
    return res.json({ success: true, message: "Login successful" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Ruta de ejemplo para registro
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  // Aquí podrías guardar el usuario en una base de datos
  return res.status(201).json({ success: true, message: "User registered successfully" });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor backend corriendo en http://localhost:${PORT}`));
