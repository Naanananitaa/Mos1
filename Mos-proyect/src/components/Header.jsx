// src/components/Header.jsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Poseidon Logo" className="h-6 w-6" />
          <span className="font-semibold text-lg text-gray-800">Mos Proyect</span>
        </div>

        {/* Botón hamburguesa solo visible en móvil */}
        <button 
          onClick={toggleMenu} 
          className="block md:hidden text-gray-700 focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navegación para pantallas medianas en adelante */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-gray-700">
          <a href="#" className="hover:text-black transition-colors">HOME</a>
          <a href="#" className="hover:text-black transition-colors">PRODUCTS</a>
          <a href="#" className="hover:text-black transition-colors">ABOUT US</a>
          <a href="#" className="hover:text-black transition-colors">CONTACTS</a>
        </nav>

        {/* Botones de autenticación */}
        <div className="hidden md:flex gap-2">
          <button className="border border-gray-400 rounded-full px-4 py-1 text-sm hover:bg-gray-100 transition">Iniciar sesión</button>
          <button className="border border-gray-400 rounded-full px-4 py-1 text-sm hover:bg-gray-100 transition">Registrarse</button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isMenuOpen && (
        <div className="block md:hidden bg-white shadow-md px-4 pb-4 pt-2 flex flex-col gap-3 text-sm font-semibold text-gray-700 animate-slide-down">
          <a href="#" className="hover:text-black transition-colors">HOME</a>
          <a href="#" className="hover:text-black transition-colors">PRODUCTS</a>
          <a href="#" className="hover:text-black transition-colors">ABOUT US</a>
          <a href="#" className="hover:text-black transition-colors">CONTACTS</a>
          <div className="flex flex-col gap-2 mt-2">
            <button className="border border-gray-400 rounded-full px-4 py-1 text-sm hover:bg-gray-100 transition">Iniciar sesión</button>
            <button className="border border-gray-400 rounded-full px-4 py-1 text-sm hover:bg-gray-100 transition">Registrarse</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
