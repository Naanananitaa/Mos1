import React, { useState } from "react";
import { FaHeadphonesAlt, FaUser } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const languages = [
    { code: "es", label: "Español", emoji: "🇪🇸" },
    { code: "en", label: "English", emoji: "🇺🇸" },
    { code: "fr", label: "Français", emoji: "🇫🇷" },
    { code: "pt", label: "Português", emoji: "🇧🇷" },
  ];

  const toggleDropdown = () => setLanguageOpen(!languageOpen);
  const handleLanguageSelect = (code) => {
    i18n.changeLanguage(code);
    setLanguageOpen(false);
  };

  const navItems = [
    "nav.home",
    "nav.lessons",
    "nav.exercises",
    "nav.assessments",
    "nav.glossary",
    "nav.resources",
    "nav.tools",
    "nav.contact",
  ];

  const handleLogin = () => { navigate("/login"); setModalOpen(false); };
  const handleRegister = () => { navigate("/register"); setModalOpen(false); };
  const handleForgotPassword = () => { navigate("/forgot-password"); setModalOpen(false); };

  return (
    <header className="w-full border-b border-gray-200 text-sm font-medium">
      <div className="flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-2 text-gray-700">
          <FaHeadphonesAlt className="text-lg" />
          <span>{t("support")}</span>
        </div>
        <div className="text-2xl font-extrabold tracking-wide text-gray-900">
          Mos-proyect
        </div>
        <div className="flex items-center gap-4 text-gray-700 relative">
          <div className="flex items-center gap-1 cursor-pointer" onClick={toggleDropdown}>
            <span>
              {languages.find((l) => l.code === i18n.language)?.emoji}{" "}
              {i18n.language.toUpperCase()}
            </span>
            <ChevronDown className="w-4 h-4 text-blue-300" />
          </div>
          {languageOpen && (
            <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded shadow-md w-32 z-10">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  {lang.emoji} {lang.label}
                </div>
              ))}
            </div>
          )}
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <FaUser className="text-lg" />
            <span className="text-gray-400">{t("login")}</span>
          </div>
          {modalOpen && (
            <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded shadow-md w-48 z-10 p-4">
              <div onClick={handleLogin} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                {t("login")}
              </div>
              <div onClick={handleRegister} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                {t("register")}
              </div>
              <div onClick={handleForgotPassword} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                {t("forgotPassword")}
              </div>
            </div>
          )}
        </div>
      </div>
      <nav className="flex justify-center items-center gap-6 py-2 bg-white">
        {navItems.map((key, i) => (
          <div key={i} className="flex items-center gap-1 uppercase hover:text-blue-300 cursor-pointer">
            {t(key)}
          </div>
        ))}
      </nav>
    </header>
  );
}
