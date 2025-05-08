import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

const fragments = [
    {
      title: '¿Qué es la conducta?',
      text: 'La conducta es el conjunto de interacciones entre un organismo y su contexto. Estas interacciones pueden observarse y medirse en función de los cambios que ocurren en el ambiente y en el organismo como resultado de tales relaciones. No se limita a respuestas visibles, sino que también incluye disposiciones temporoespaciales que configuran patrones estables en situaciones similares.',
      keywords: ['conducta', 'interacciones', 'organismo', 'contexto', 'respuestas']
    },
    {
      title: 'Metodología Cuantitativa',
      text: 'La metodología cuantitativa se basa en la recolección y análisis de datos numéricos. Permite identificar patrones, establecer relaciones entre variables y generalizar resultados. Emplea técnicas estadísticas y experimentales para describir fenómenos y evaluar hipótesis con rigurosidad. Esta metodología busca objetividad y replicabilidad en la investigación.',
      keywords: ['metodología cuantitativa', 'datos', 'variables', 'estadísticas', 'hipótesis']
    },
    {
      title: 'El estímulo en psicología',
      text: 'El estímulo es cualquier cambio en el entorno que puede influir en la conducta de un organismo. En el análisis interconductual, un estímulo no tiene significado por sí solo, sino por las funciones que adquiere dentro de una situación dada. Así, un estímulo puede adquirir diferentes funciones dependiendo del campo interconductual en el que se encuentre el organismo.',
      keywords: ['estímulo', 'entorno', 'funciones', 'campo interconductual', 'organismo']
    }
  ];

export default function Ejercicios() {
  const [current, setCurrent] = useState(0);
  const [selectedWords, setSelectedWords] = useState({});
  const [startTime, setStartTime] = useState(Date.now());
  const [firstClickTime, setFirstClickTime] = useState(null);
  const [logData, setLogData] = useState([]);
  const navigate = useNavigate();

  const handleWordClick = (fragmentIndex, wordIndex) => {
    const key = `${fragmentIndex}-${wordIndex}`;
    if (!firstClickTime) setFirstClickTime(Date.now());
    setSelectedWords(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isCorrect = (word, keywords) => {
    return keywords.includes(word.toLowerCase().replace(/[.,;]/g, ''));
  };

  const handleNext = () => {
    const fragment = fragments[current];
    const words = fragment.text.split(' ');
    const data = words.map((word, j) => {
      const key = `${current}-${j}`;
      const selected = selectedWords[key];
      const correct = isCorrect(word, fragment.keywords);
      return { word, selected, correct };
    });

    const correctCount = data.filter(d => d.selected && d.correct).length;
    const totalSelected = data.filter(d => d.selected).length;
    const totalTime = Date.now() - startTime;
    const latency = firstClickTime ? firstClickTime - startTime : null;

    setLogData(prev => [
      ...prev,
      {
        fragmentTitle: fragment.title,
        correctCount,
        totalSelected,
        percentageCorrect: totalSelected ? (correctCount / totalSelected) * 100 : 0,
        totalTime,
        latency
      }
    ]);

    if (current + 1 < fragments.length) {
      setCurrent(current + 1);
      setSelectedWords({});
      setStartTime(Date.now());
      setFirstClickTime(null);
    } else {
      // Guardar en localStorage antes de redirigir
      localStorage.setItem('logData', JSON.stringify(logData));
      navigate('/resultados');
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelectedWords({});
    setStartTime(Date.now());
    setFirstClickTime(null);
    setLogData([]);
  };

  useEffect(() => {
    if (current >= fragments.length) {
      navigate('/resultados');
    }
  }, [current, navigate]);

  const fragment = fragments[current];

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      {current < fragments.length ? (
        <>
          <p className="p-4 text-gray-600">
            Lee el fragmento y selecciona las palabras clave. Las palabras correctas se mostrarán en azul, las incorrectas en amarillo.
          </p>

          <div className="bg-white p-4 rounded-xl shadow-lg">
            <p className="text-gray-700 leading-relaxed">
              {[fragment.title, fragment.text].join(' ').split(' ').map((word, j) => {
                const key = `${current}-${j}`;
                const selected = selectedWords[key];
                const correct = isCorrect(word, fragment.keywords);
                let bgColor = '';

                if (selected) {
                  bgColor = correct ? 'bg-blue-300' : 'bg-yellow-300';
                }

                return (
                  <span
                    key={key}
                    className={`cursor-pointer px-1 rounded-sm ${bgColor} transition-colors duration-200`}
                    onClick={() => handleWordClick(current, j)}
                  >
                    {word + ' '}
                  </span>
                );
              })}
            </p>
          </div>

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
