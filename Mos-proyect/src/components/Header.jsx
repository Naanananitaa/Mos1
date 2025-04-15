import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-blue-600 tracking-tight">
          MOS Project
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-base font-medium text-gray-700">
          {["HOME", "PRODUCTS", "ABOUT US", "CONTACTS"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-blue-600 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-blue-600 focus:outline-none transition-transform duration-200"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 bg-white border-t border-gray-200">
          <nav className="flex flex-col gap-4 text-base font-medium text-gray-700">
            {["HOME", "PRODUCTS", "ABOUT US", "CONTACTS"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-blue-600 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
