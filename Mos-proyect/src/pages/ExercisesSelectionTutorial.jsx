import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EjercicioSubrayado() {
  const [fase, setFase] = useState('video'); // 'video' | 'instrucciones' | 'ejercicio'
  const navigate = useNavigate();

  const avanzarAFase = (nuevaFase) => setFase(nuevaFase);

  const irAEjercicios = () => {
    navigate('/ejercicios/seleccion');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {fase === 'video' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Tutorial</h2>
          <video controls className="w-full rounded">
            <source src="/videos/tutorial-seleccion.mp4" type="video/mp4" />
            Tu navegador no soporta video HTML5.
          </video>
          <button
            onClick={() => avanzarAFase('instrucciones')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Siguiente
          </button>
        </div>
      )}

      {fase === 'instrucciones' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Instrucciones</h2>
          <p>En este ejercicio debes subrayar las palabras clave del fragmento presentado...</p>
          <button
            onClick={irAEjercicios}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            Comenzar ejercicio
          </button>
        </div>
      )}
    </div>
  );
}
