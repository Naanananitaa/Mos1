import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Mail, Lock, Facebook, Linkedin, CircleUserRound } from "lucide-react";
import axios from "axios";

export default function AuthForm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");

  const esModoRegistro = mode === "register";
  const PORT = 3001; // Ajusta al puerto correcto del backend

  const [correo, setCorreo] = useState("");
  const [correoTocado, setCorreoTocado] = useState(false);
  const [contrasena, setContrasena] = useState("");
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

    try {
      const url = esModoRegistro
        ? `http://localhost:${PORT}/api/register`
        : `http://localhost:${PORT}/api/login`;

      console.log("URL generada:", url);

      const response = await axios.post(url, { email: correo, password: contrasena });
      console.log(`${esModoRegistro ? "Registro" : "Inicio de sesión"} exitoso`, response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex w-full h-[550px] max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-xl overflow-hidden">
      {/* Panel izquierdo - Formulario */}
      <div className="w-1/2 p-10 flex flex-col justify-center bg-white relative">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          {esModoRegistro ? "Crea una cuenta" : "Inicia sesión"}
        </h2>

        <div className="flex gap-6 justify-center mb-6">
          <button type="button" className="border border-gray-300 rounded-full p-3 text-gray-600 hover:bg-blue-100 transition">
            <Facebook size={20} />
          </button>
          <button type="button" className="border border-gray-300 rounded-full p-3 text-gray-600 hover:bg-blue-100 transition">
            <CircleUserRound size={20} />
          </button>
          <button type="button" className="border border-gray-300 rounded-full p-3 text-gray-600 hover:bg-blue-100 transition">
            <Linkedin size={20} />
          </button>
        </div>

        <p className="text-gray-500 text-sm text-center mb-4">o usa tu correo electrónico:</p>

        {/* Correo electrónico */}
        <div className="mb-4 relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            onBlur={() => setCorreoTocado(true)}
            className={`pl-12 w-full p-3 border rounded focus:outline-none ${
              correoTocado && !esCorreoValido ? "border-red-500" : "border-gray-300"
            }`}
          />
          {correoTocado && !esCorreoValido && (
            <p className="text-sm text-red-500 mt-1">Ingresa un correo electrónico válido.</p>
          )}
        </div>

        {/* Contraseña */}
        <div className="mb-4 relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            onBlur={() => setContrasenaTocada(true)}
            className={`pl-12 w-full p-3 border rounded focus:outline-none ${
              contrasenaTocada && !esContrasenaValida ? "border-red-500" : "border-gray-300"
            }`}
          />
          {contrasenaTocada && !esContrasenaValida && (
            <p className="text-sm text-red-500 mt-1">
              La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula y un número.
            </p>
          )}
        </div>

        {!esModoRegistro && (
          <a href="#" className="text-sm text-gray-500 hover:text-blue-400 mb-4 text-right block">
            ¿Olvidaste tu contraseña?
          </a>
        )}

        {/* Botón */}
        <button
          type="submit"
          disabled={!esCorreoValido || !esContrasenaValida}
          className={`py-3 w-full rounded text-lg font-semibold mt-4 transition ${
            !esCorreoValido || !esContrasenaValida
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-400"
          }`}
        >
          {esModoRegistro ? "REGISTRARSE" : "INICIAR SESIÓN"}
        </button>
      </div>
      
      {/* Panel derecho */}
<div className="w-1/2 flex flex-col items-center justify-center text-white bg-blue-500 px-10 text-center">
  <h2 className="text-2xl font-bold mb-4">{esModoRegistro ? "¡Bienvenido!" : "¡Aun no formas parte!"}</h2>
  <p className="text-lg mb-6">
    {esModoRegistro ? "Únete y forma parte de nuestra comunidad." : " Únete y forma parte de nuestra comunidad."}
  </p>

  {!esModoRegistro && (
    <button
      onClick={() => (window.location.href = "?mode=register")}
      className="px-6 py-3 bg-white text-blue-400 font-bold rounded-lg shadow-md hover:bg-gray-200 transition"
    >
      Registrate
    </button>
  )}
</div>
    </div>
  );
}

