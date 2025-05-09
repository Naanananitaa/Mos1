import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Header from "./components/Header";

// Páginas principales
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import ExercisesMenu from './pages/Exercises';
    import SelectionExercise from './pages/SelectionExercise';
    import ResultadosSeleccion from './pages/SeleccionRF';
    import Underline from './pages/SubrayadoExercise';
    import ResultadosSubrayado from './pages/SubrayadoRF';
    import Transcripcion from './pages/TranscriptionExercise';
    import ResultadosTranscripcion from './pages/TranscriptionRF';
    import Parafraseo from './pages/ParafraseoExercise';
    import ResultadosParafraseo from './pages/ParafraseoRF';
    import Correcciones from './pages/CorreccionesExercise'
    import ResultadosCorrecciones from './pages/CorreccionesRF';
    import OpcionMultiple from './pages/OpcionMultipleExercise';
    import ResultadosOpcionMultiple from './pages/ExercisesOpcionMultipleRF';

    
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
  const [logData, setLogData] = useState(null);  // Definir el estado 'logData'

  return (
    <>
      <Header />
      <Routes>
        {/* Navegación principal */}
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/exercises" element={<ExercisesMenu />} />
          <Route path="/ejercicios/seleccion" element={<SelectionExercise />} />
          <Route path="/resultados-seleccion" element={<ResultadosSeleccion logData={logData} />} />
          <Route path="/ejercicios/subrayado" element={<Underline />} />
          <Route path="/resultados-subrayado" element={<ResultadosSubrayado />} />
          <Route path="/ejercicios/transcripcion" element={<Transcripcion />} />
          <Route path="/resultados-transcripcion" element={<ResultadosTranscripcion />} />
          <Route path="/ejercicios/parafraseo" element={<Parafraseo />} />
          <Route path="/resultados-parafraseo" element={<ResultadosParafraseo />} />
          <Route path="/ejercicios/correcciones" element={<Correcciones />} />
          <Route path="/resultados-correcciones" element={<ResultadosCorrecciones />} />
          <Route path="/ejercicios/opcionmultiple" element={<OpcionMultiple />} />
          <Route path="/resultados-opcionmultiple" element={<ResultadosOpcionMultiple />} />
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
