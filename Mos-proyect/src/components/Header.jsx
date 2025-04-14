import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        
        {/* Logo y nombre del proyecto */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-[#1E3A8A] rounded-full"></div>
          <span className="text-lg font-semibold text-gray-900">Mos-proyect</span>
        </div>

        {/* Menú de navegación */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-[#1E3A8A] transition">Inicio</a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-[#1E3A8A] transition">Lecciones</a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-[#1E3A8A] transition">Herramientas</a>
        </nav>

        {/* Botones de acceso */}
        <div className="hidden sm:flex space-x-4">
          <button className="px-4 py-1 border border-gray-400 text-sm rounded-full hover:bg-gray-100 transition">Sign in</button>
          <button className="px-4 py-1 border border-[#1E3A8A] text-sm text-[#1E3A8A] rounded-full hover:bg-[#1E3A8A] hover:text-white transition">Sign up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;

