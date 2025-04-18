import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import Register from "./Register";

export default function AuthContainer() {
  const [modo, setModo] = useState("login"); // 'login' o 'register'
  const cambiarModo = () => setModo((prev) => (prev === "login" ? "register" : "login"));

  return (
    <div className="w-full max-w-4xl mx-auto h-[550px] overflow-hidden rounded-xl shadow-lg bg-gray-100">
      <div className="flex w-full h-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={modo}
            initial={{ x: modo === "register" ? "100%" : "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: modo === "register" ? "-100%" : "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 w-full h-full bg-white flex"
          >
            {modo === "register" ? <Register cambiarModo={cambiarModo} /> : <Login cambiarModo={cambiarModo} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
