import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

export default function AuthForm() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode");
    
    const [isLogin, setIsLogin] = useState(mode !== "register"); // true si no dice register
    ;

  return (
    <div className="relative w-full max-w-md h-[500px] mx-auto overflow-hidden bg-gray-200 rounded-lg shadow-lg">
      <div className="absolute w-full h-full flex transition-transform duration-500 ease-in-out" 
           style={{ transform: isLogin ? "translateX(0)" : "translateX(-100%)" }}>
        
        {/* Pantalla de inicio de sesión */}
        <div className="w-full flex flex-col items-center justify-center p-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-700">Welcome Back</h2>
          <p className="text-gray-500">Sign in to continue</p>
          <input type="email" placeholder="Email" className="mt-4 p-2 w-full border rounded"/>
          <input type="password" placeholder="Password" className="mt-2 p-2 w-full border rounded"/>
          <button className="mt-4 p-2 w-full bg-green-500 text-white rounded">Sign In</button>
          <button className="mt-2 text-green-500" onClick={() => setIsLogin(false)}>Hello Friend? Sign Up</button>
        </div>

        {/* Pantalla de registro */}
        <div className="w-full flex flex-col items-center justify-center p-6 bg-green-500 text-white">
          <h2 className="text-2xl font-bold">Hello Friend</h2>
          <p className="text-white">Register to get started</p>
          <input type="text" placeholder="Name" className="mt-4 p-2 w-full border rounded"/>
          <input type="email" placeholder="Email" className="mt-2 p-2 w-full border rounded"/>
          <input type="password" placeholder="Password" className="mt-2 p-2 w-full border rounded"/>
          <button className="mt-4 p-2 w-full bg-white text-green-500 rounded">Sign Up</button>
          <button className="mt-2 text-white" onClick={() => setIsLogin(true)}>Welcome Back? Sign In</button>
        </div>
      </div>
    </div>
  );
}
