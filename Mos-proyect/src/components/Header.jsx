import React from "react";
import { FaHeadphonesAlt, FaLock, FaUser } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 text-sm font-medium">
      <div className="flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-2 text-gray-700">
          <FaHeadphonesAlt className="text-lg" />
          <span>Soporte</span>
          <span>|</span>
        </div>

        <div className="text-2xl font-extrabold tracking-wide text-gray-900">
         Mos-proyect
        </div>

        <div className="flex items-center gap-4 text-gray-700">
          <div className="flex items-center gap-1 cursor-pointer">
            <span>ES</span>
            <ChevronDown className="w- h-4 text-blue-300" />
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <FaUser className="text-lg" />
            <span className="text-gray-400">INICIAR SESIÓN</span>
          </div>
        </div>
      </div>

      <nav className="flex justify-center items-center gap-6 py-2 bg-white">
        {[
          "INICIO",
          "LECCIONES",
          "EJERCICIOS",
          "EVALUACIONES",
          "GLOSARIO",
          "RECURSOS",
          "HERRAMIENTAS",
          "CONTACTANOS",
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1 text-gray-800 uppercase hover:text-blue-300 cursor-pointer"
          >
            <span>{item}</span>
          </div>
        ))}
      </nav>
    </header>
  );
}
