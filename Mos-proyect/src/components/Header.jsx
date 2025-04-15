import React, { useState } from "react";
import { FaHeadphonesAlt, FaUser } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: "ES", label: "Español" },
    { code: "EN", label: "English" },
    { code: "FR", label: "Français" },
    { code: "POR", label: "Portuguese" },
  ];

  const toggleDropdown = () => setLanguageOpen(!languageOpen);

  const handleLanguageSelect = (code) => {
    setLanguage(code);
    setLanguageOpen(false);
  };

  return (
    <header className="w-full border-b border-gray-200 text-sm font-medium">
      <div className="flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-4 text-gray-700 relative">
          <div className="flex items-center gap-1 cursor-pointer" onClick={toggleDropdown}>
            <span>{language}</span>
            <ChevronDown className="w-4 h-4 text-blue-300" />
          </div>
          {languageOpen && (
            <div className="absolute top-8 left-0 bg-white border border-gray-300 rounded shadow-md w-32 z-10">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  {lang.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="text-2xl font-extrabold tracking-wide text-gray-900">
          Mos-proyect
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <FaHeadphonesAlt className="text-lg" />
          <span>{t.support}</span>
          <span>|</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <FaUser className="text-lg" />
          <span className="text-gray-400">{t.login}</span>
        </div>
      </div>

      <nav className="flex justify-center items-center gap-6 py-2 bg-white">
        {t.nav.map((item, index) => (
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
