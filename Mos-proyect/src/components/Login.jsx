import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Lock, Facebook, Linkedin, CircleUserRound } from "lucide-react";

export default function AuthForm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");

  const [isLogin, setIsLogin] = useState(mode !== "register");
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmailTouched(true);
    setPasswordTouched(true);

    if (isEmailValid && isPasswordValid) {
      console.log("Enviando datos:", { email, password });
      // Aquí podrías hacer una llamada a tu backend
    } else {
      console.log("Formulario inválido.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-4xl h-[500px] mx-auto bg-white shadow-lg rounded-xl overflow-hidden"
    >
      {/* Panel izquierdo - Iniciar sesión */}
      <div className="w-1/2 p-10 flex flex-col justify-center bg-white relative">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Sign in to</h2>

        <div className="flex gap-4 mb-6">
          <button type="button" className="border rounded-full p-2 text-gray-600 hover:text-green-600">
            <Facebook size={20} />
          </button>
          <button type="button" className="border rounded-full p-2 text-gray-600 hover:text-green-600">
            <CircleUserRound size={20} />
          </button>
          <button type="button" className="border rounded-full p-2 text-gray-600 hover:text-green-600">
            <Linkedin size={20} />
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-4">or use your email account:</p>

        {/* Email */}
        <div className="mb-4 relative">
          <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            className={`pl-10 w-full p-2 border rounded focus:outline-none ${
              emailTouched && !isEmailValid ? "border-red-500" : "border-gray-300"
            }`}
          />
          {emailTouched && !isEmailValid && (
            <p className="text-sm text-red-500 mt-1">Please enter a valid email address.</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordTouched(true)}
            className={`pl-10 w-full p-2 border rounded focus:outline-none ${
              passwordTouched && !isPasswordValid ? "border-red-500" : "border-gray-300"
            }`}
          />
          {passwordTouched && !isPasswordValid && (
            <p className="text-sm text-red-500 mt-1">Password is required.</p>
          )}
        </div>

        <a href="#" className="text-sm text-gray-500 hover:text-green-600 mb-4 text-right block">
          Forgot your password?
        </a>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={!isEmailValid || !isPasswordValid}
          className={`py-2 rounded mt-2 transition ${
            !isEmailValid || !isPasswordValid
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          SIGN IN
        </button>
      </div>

      {/* Panel derecho */}
      <div className="w-1/2 bg-gradient-to-br from-teal-500 to-green-500 text-white flex flex-col justify-center items-center p-10">
        <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
        <p className="mb-6 text-center max-w-sm">
          Enter your personal details and start journey with us
        </p>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className="border-2 border-white text-white px-8 py-2 rounded hover:bg-white hover:text-green-500 transition"
        >
          SIGN UP
        </button>
      </div>
    </form>
  );
}
