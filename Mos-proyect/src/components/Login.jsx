import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthForm() {
  const [modo, setModo] = useState("login"); // 'login' o 'register'
  const esRegistro = modo === "register";

  const [correo, setCorreo] = useState("");
  const [correoTocado, setCorreoTocado] = useState(false);
  const [contrasena, setContrasena] = useState("");
  const [contrasenaTocada, setContrasenaTocada] = useState(false);

  const PORT = 3001;
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

  const cambiarModo = () => {
    setModo((prev) => (prev === "login" ? "register" : "login"));
    setCorreo("");
    setContrasena("");
    setCorreoTocado(false);
    setContrasenaTocada(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[550px] overflow-hidden rounded-xl shadow-lg bg-gray-100">
      <div className="flex w-full h-full relative">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={modo}
            initial={{ x: modo === "register" ? "100%" : "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: modo === "register" ? "-100%" : "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 w-full h-full bg-white flex"
          >
            {/* Panel del formulario */}
            <div className="w-1/2 p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                {esRegistro ? "Crea una cuenta" : "Inicia sesión"}
              </h2>

              <p className="text-gray-500 text-sm text-center mb-6">
                Usa tu correo electrónico para continuar
              </p>

              <form onSubmit={handleSubmit}>
                {/* Correo */}
                <div className="mb-4 relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    onBlur={() => setCorreoTocado(true)}
                    className={`pl-12 w-full p-3 border rounded ${
                      correoTocado && !esCorreoValido ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {correoTocado && !esCorreoValido && (
                    <p className="text-sm text-red-500 mt-1">Correo no válido.</p>
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
                    className={`pl-12 w-full p-3 border rounded ${
                      contrasenaTocada && !esContrasenaValida ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {contrasenaTocada && !esContrasenaValida && (
                    <p className="text-sm text-red-500 mt-1">
                      Mínimo 8 caracteres, una mayúscula, una minúscula y un número.
                    </p>
                  )}
                </div>

                {!esRegistro && (
                  <a href="#" className="text-sm text-gray-500 hover:text-blue-400 mb-4 block text-right">
                    ¿Olvidaste tu contraseña?
                  </a>
                )}

                <button
                  type="submit"
                  disabled={!esCorreoValido || !esContrasenaValida}
                  className={`py-3 w-full rounded text-lg font-semibold mt-4 transition ${
                    !esCorreoValido || !esContrasenaValida
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-400"
                  }`}
                >
                  {esRegistro ? "REGISTRARSE" : "INICIAR SESIÓN"}
                </button>
              </form>
            </div>

            {/* Panel lateral */}
            <div className="w-1/2 flex flex-col items-center justify-center text-white bg-blue-500 px-10 text-center">
              <h2 className="text-2xl font-bold mb-4">
                {esRegistro ? "¡Bienvenido!" : "¡Aún no formas parte!"}
              </h2>
              <p className="text-lg mb-6">
                {esRegistro ? "Únete y forma parte de nuestra comunidad." : "Regístrate y únete a nuestra comunidad."}
              </p>

              <button
                onClick={cambiarModo}
                className="px-6 py-3 bg-white text-blue-400 font-bold rounded-lg shadow-md hover:bg-gray-200 transition"
              >
                {esRegistro ? "Iniciar Sesión" : "Registrarse"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
