// src/pages/AuthPage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "../components/Login";
import Register from "../components/Register";

export default function AuthPage() {
  const [modo, setModo] = useState("login");

  const alternarModo = () => {
    setModo((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {modo === "login" ? "Iniciar sesión" : "Registrarse"}
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={modo}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {modo === "login" ? <Login /> : <Register />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 text-center">
          <button
            onClick={alternarModo}
            className="text-sm text-blue-600 hover:underline"
          >
            {modo === "login"
              ? "¿No tienes cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>
    </div>
  );
}
