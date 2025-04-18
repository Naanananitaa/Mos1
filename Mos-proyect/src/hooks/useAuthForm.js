// src/hooks/useAuthForm.js
import { useState } from "react";
import axios from "axios";

export default function useAuthForm(modo = "login") {
  const esRegistro = modo === "register";
  const [correo, setCorreo] = useState("");
  const [correoTocado, setCorreoTocado] = useState(false);
  const [contrasena, setContrasena] = useState("");
  const [contrasenaTocada, setContrasenaTocada] = useState(false);

  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const esCorreoValido = correoRegex.test(correo);
  const esContrasenaValida = contrasenaRegex.test(contrasena);
  const PORT = 3001;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCorreoTocado(true);
    setContrasenaTocada(true);
    if (!esCorreoValido || !esContrasenaValida) return;

    try {
      const url = esRegistro
        ? `http://localhost:${PORT}/api/register`
        : `http://localhost:${PORT}/api/login`;

      const response = await axios.post(url, {
        email: correo,
        password: contrasena,
      });

      console.log(`${esRegistro ? "Registro" : "Login"} exitoso`, response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return {
    correo, setCorreo,
    contrasena, setContrasena,
    correoTocado, setCorreoTocado,
    contrasenaTocada, setContrasenaTocada,
    esCorreoValido, esContrasenaValida,
    handleSubmit,
  };
}
