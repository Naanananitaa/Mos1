import React from "react";
import { FaHeadphonesAlt, FaLock, FaUser } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 text-sm font-medium">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-2 text-gray-700">
          <FaHeadphonesAlt className="text-lg" />
          <span>24/7</span>
          <span>037-2339-9874</span>
        </div>

        <div className="text-2xl font-extrabold tracking-wide text-gray-900">
          arbuzz
        </div>

        <div className="flex items-center gap-4 text-gray-700">
          <div className="flex items-center gap-1 cursor-pointer">
            <span>EN</span>
            <ChevronDown className="w-4 h-4 text-red-500" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <span>USD</span>
            <ChevronDown className="w-4 h-4 text-red-500" />
          </div>
          <FaLock className="text-lg cursor-pointer" />
          <div className="flex items-center gap-1 cursor-pointer">
            <FaUser className="text-lg" />
            <span className="text-gray-400">LOG IN</span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="flex justify-center items-center gap-6 py-2 bg-white">
        {[
          "MEN",
          "WOMEN",
          "KIDS",
          "COLLECTION",
          "OUTERWEAR",
          "SALE",
          "ABOUT",
          "BLOG",
          "SERVICES",
          "CONTACTS",
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1 text-gray-800 uppercase hover:text-red-500 cursor-pointer"
          >
            <span>{item}</span>
            {["MEN", "WOMEN", "KIDS", "COLLECTION", "OUTERWEAR"].includes(item) && (
              <ChevronDown className="w-4 h-4 text-red-500" />
            )}
          </div>
        ))}
      </nav>
    </header>
  );
}
