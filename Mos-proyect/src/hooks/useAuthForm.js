// src/hooks/useAuthForm.js
import { useState } from "react";
import axios from "axios";

export default function useAuthForm(mode) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [correoTocado, setCorreoTocado] = useState(false);
  const [contrasenaTocada, setContrasenaTocada] = useState(false);

  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const esCorreoValido = correoRegex.test(correo);
  const esContrasenaValida = contrasenaRegex.test(contrasena);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCorreoTocado(true);
    setContrasenaTocada(true);
    if (!esCorreoValido || !esContrasenaValida) return;

    const url = mode === "register"
      ? "http://localhost:3001/api/register"
      : "http://localhost:3001/api/login";

    try {
      const response = await axios.post(url, {
        email: correo,
        password: contrasena,
      });
      console.log(`${mode === "register" ? "Registro" : "Login"} exitoso`, response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return {
    correo,
    setCorreo,
    contrasena,
    setContrasena,
    correoTocado,
    setCorreoTocado,
    contrasenaTocada,
    setContrasenaTocada,
    esCorreoValido,
    esContrasenaValida,
    handleSubmit,
  };
}
