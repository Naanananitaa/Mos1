import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

// Páginas principales
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Exercises from "./pages/Exercises";
import Assessments from "./pages/Assessments";
import Glossary from "./pages/Glossary";
import Resources from "./pages/Resources";
import Tools from "./pages/Tools";
import Contact from "./pages/Contact";
import Miperfil from "./pages/Miperfil";

// Páginas de usuario
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import SupportChat from "./pages/SupportChat";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Navegación principal */}
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mi-perfil" element={<Miperfil />} />

        {/* Usuario */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/support-chat" element={<SupportChat />} />
      </Routes>
    </>
  );
}
