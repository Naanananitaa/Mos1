// Falta indicar si el usuario selecciono la idea principal o no, y si no lo hizo, mostrarle cual es y porque y de ser correcta indicarlo.
// Falta guardar los resultados en el localStorage y mostrarlos en la página de resultados.

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

const fragments = [
  {
    title: '¿Qué es la conducta?',
    text: 'La conducta es el conjunto de interacciones entre un organismo y su contexto. Estas interacciones pueden observarse y medirse en función de los cambios que ocurren en el ambiente y en el organismo como resultado de tales relaciones. No se limita a respuestas visibles, sino que también incluye disposiciones temporoespaciales que configuran patrones estables en situaciones similares.',
    keywords: ['conducta', 'interacciones', 'organismo', 'contexto', 'respuestas']
  },
  {
    title: 'Características de la conducta interconductual',
    text: 'La conducta no es una entidad que reside dentro del organismo, sino una función de campo que surge de la interacción entre el organismo y su medio. Esta interacción puede ser descrita en términos de relaciones funcionales que se mantienen constantes bajo ciertas condiciones temporoespaciales.',
    keywords: ['función de campo', 'interacción', 'relaciones funcionales', 'condiciones temporoespaciales']
  },
  {
    title: 'Niveles de respuesta en el análisis interconductual',
    text: 'En el análisis interconductual, se reconoce que las respuestas pueden organizarse en niveles dependiendo del grado de complejidad y ajuste al contexto. Estos niveles van desde respuestas elementales hasta patrones altamente diferenciados que configuran estilos de comportamiento en situaciones específicas.',
    keywords: ['niveles de respuesta', 'ajuste', 'estilos de comportamiento', 'complejidad']
  }
];

export default function EjerciciosTextoLibre() {
  const [current, setCurrent] = useState(0);
  const [selectedFragments, setSelectedFragments] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [firstClickTime, setFirstClickTime] = useState(null);
  const [logData, setLogData] = useState([]);
  const textRef = useRef(null);
  const navigate = useNavigate();

  const getSelectionText = () => {
    if (window.getSelection) {
      const selection = window.getSelection();
      return selection.toString().trim();
    }
    return '';
  };

  const handleTextSelection = () => {
    const selection = getSelectionText();
    if (selection && !firstClickTime) setFirstClickTime(Date.now());
    if (selection && !selectedFragments.includes(selection)) {
      setSelectedFragments(prev => [...prev, selection]);
    }
  };

  const handleNext = () => {
    const fragment = fragments[current];
    const correctCount = selectedFragments.filter(sel =>
      fragment.keywords.some(kw => sel.toLowerCase().includes(kw))
    ).length;

    const totalSelected = selectedFragments.length;
    const totalTime = Date.now() - startTime;
    const latency = firstClickTime ? firstClickTime - startTime : null;

    const newLog = {
      fragmentTitle: fragment.title,
      correctCount,
      totalSelected,
      percentageCorrect: totalSelected ? (correctCount / totalSelected) * 100 : 0,
      totalTime,
      latency
    };

    const updatedLogData = [...logData, newLog];
    setLogData(updatedLogData);

    if (current + 1 < fragments.length) {
      setCurrent(current + 1);
      setSelectedFragments([]);
      setStartTime(Date.now());
      setFirstClickTime(null);
    } else {
      localStorage.setItem('logData', JSON.stringify(updatedLogData));
      navigate('/resultados-subrayado');
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelectedFragments([]);
    setStartTime(Date.now());
    setFirstClickTime(null);
    setLogData([]);
  };

  const fragment = fragments[current];

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      {current < fragments.length ? (
        <>
          <p className="p-4 text-gray-600">
            Selecciona con el cursor las frases o fragmentos que consideres palabras clave.
          </p>

          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h2 className="font-semibold mb-2 text-lg">{fragment.title}</h2>
            <p
              ref={textRef}
              onMouseUp={handleTextSelection}
              className="text-gray-700 leading-relaxed select-text cursor-text"
            >
              {fragment.text}
            </p>
          </div>

          {selectedFragments.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Fragmentos seleccionados:</h3>
              <ul className="list-disc pl-5 text-sm">
                {selectedFragments.map((frag, i) => (
                  <li key={i} className="text-blue-700">{frag}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-right">
            <button
              onClick={handleNext}
              className="bg-teal-400 hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
            >
              {current + 1 < fragments.length ? 'Siguiente' : 'Finalizar'}
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-center mb-4">Visualización de Resultados</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={logData}>
              <XAxis dataKey="fragmentTitle" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentageCorrect" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 text-center">
            <button
              onClick={handleReset}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Reiniciar Ejercicios
            </button>
          </div>
        </>
      )}
    </div>
  );
}
