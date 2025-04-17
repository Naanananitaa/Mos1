import React, { useState } from "react";
import { FaHeadphonesAlt, FaUser } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [languageOpen, setLanguageOpen] = useState(false);
  const navigate = useNavigate();

  const languages = [
    { code: "es", label: "Español", emoji: "🇪🇸" },
    { code: "en", label: "English", emoji: "🇺🇸" },
    { code: "fr", label: "Français", emoji: "🇫🇷" },
    { code: "pt", label: "Português", emoji: "🇧🇷" },
  ];

  const toggleDropdown = () => {
    setLanguageOpen(!languageOpen);
  };

  const handleLanguageSelect = (code) => {
    i18n.changeLanguage(code);
    setLanguageOpen(false);
  };

  const navItems = [
    { key: "nav.home", path: "/" },
    { key: "nav.lessons", path: "/lessons" },
    { key: "nav.exercises", path: "/exercises" },
    { key: "nav.assessments", path: "/assessments" },
    { key: "nav.glossary", path: "/glossary" },
    { key: "nav.resources", path: "/resources" },
    { key: "nav.tools", path: "/tools" },
    { key: "nav.contact", path: "/contact" },
  ];

  return (
    <header className="w-full border-b border-gray-200 text-sm font-medium">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Soporte */}
        <div
          className="flex items-center gap-2 text-gray-700 cursor-pointer"
          onClick={() => navigate("/support-chat")}
        >
          <FaHeadphonesAlt className="text-lg" />
          <span>{t("support")}</span>
        </div>

        {/* Título del proyecto */}
        <div className="text-2xl font-extrabold tracking-wide text-gray-900">
          Mos-proyect
        </div>

        {/* Contenedor de idioma + login */}
        <div className="flex items-center gap-4 text-gray-700 relative">
          {/* Idioma */}
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={toggleDropdown}
          >
            <span>
              {languages.find((lang) => lang.code === i18n.language)?.emoji}{" "}
              {i18n.language.toUpperCase()}
            </span>
            <ChevronDown className="w-4 h-4 text-blue-300" />
          </div>

          {/* Dropdown de idiomas */}
          {languageOpen && (
            <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded shadow-md w-32 z-10">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  <span>
                    {lang.emoji} {lang.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Login directo */}
          <div
            className="flex items-center gap-1 cursor-pointer text-gray-700"
            onClick={() => navigate("/login")}
          >
            <FaUser className="text-lg" />
            <span className="text-gray-400">{t("login")}</span>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <nav className="flex justify-center items-center gap-6 py-2 bg-white">
        {navItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1 text-gray-800 uppercase hover:text-blue-300 cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            <span>{t(item.key)}</span>
          </div>
        ))}
      </nav>
    </header>
  );
}
