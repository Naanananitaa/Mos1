//Falta el video tutorial 
//Falta correir las instrucciones

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EjercicioSubrayado() {
  const [fase, setFase] = useState('video'); // 'video' | 'instrucciones' | 'ejercicio'
  const navigate = useNavigate();

  const avanzarAFase = (nuevaFase) => setFase(nuevaFase);

  const irAEjercicios = () => {
    navigate('/ejercicios/subrayado');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {fase === 'video' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Tutorial</h2>
          <video controls className="w-full rounded">
            <source src="/videos/tutorial-subrayado.mp4" type="video/mp4" />
            Tu navegador no soporta video HTML5.
          </video>
          <button
            onClick={() => avanzarAFase('instrucciones')}
            className="mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded"
          >
            Siguiente
          </button>
        </div>
      )}

      {fase === 'instrucciones' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Instrucciones</h2>
          <p>A continuación se te presentaran una serie de textos.<br/>
          lee atentamente cada uno, tu tarea es identificar  seleccionar la idea princpal de cada texto.</p>
          <p>Recuerda que puedes dar click y arrastar con cursor en las palabras para seleccionarlas.<br/> 
          Debajo del texto apareceran las frases o sementos de texto que seleccionaste, <br/> 
          puedes seleccionar la respuesta hasta que creas que es la final y una vez verificar la respuesta.</p>
          <p>Una vez verificado puedes enviarlo.</p>

          <button
            onClick={irAEjercicios}
            className="mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-700 text-white rounded"
          >
            Comenzar
          </button>
        </div>
      )}
    </div>
  );
}
