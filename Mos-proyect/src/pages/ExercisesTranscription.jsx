// Falta verificar si la trascripcion del texto original es correcta 
// Falta que indique o guie la trascripcion del texto original y las respuestas (marcando en amarillo las palabras, untos, comas, letras, etc que no son correctas y las que si).


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fragments = [
  {
    title: '¿Qué es la conducta?',
    original: `La conducta es el conjunto de interacciones entre un organismo y su contexto. Estas interacciones pueden observarse y medirse en función de los cambios que ocurren en el ambiente y en el organismo como resultado de tales relaciones. No se limita a respuestas visibles, sino que también incluye disposiciones temporoespaciales que configuran patrones estables en situaciones similares.`,
    questions: [
      {
        question: '¿Según el texto, cómo se define la conducta?',
        expectedAnswer: 'La conducta es el conjunto de interacciones entre un organismo y su contexto.',
        explanation: 'Esta definición sitúa a la conducta como una relación funcional entre el organismo y su entorno, descartando causas internas o innatistas.'
      },
      {
        question: '¿Qué más incluye la conducta además de respuestas visibles?',
        expectedAnswer: 'No se limita a respuestas visibles, sino que también incluye disposiciones temporoespaciales que configuran patrones estables en situaciones similares.',
        explanation: 'Se destaca que no sólo se consideran respuestas motoras, sino la disposición del organismo ante contextos repetidos en el tiempo y el espacio.'
      }
    ]
  },
  {
    title: 'Metodología Cuantitativa',
    original: `La metodología cuantitativa se basa en la recolección y análisis de datos numéricos. Permite identificar patrones, establecer relaciones entre variables y generalizar resultados. Emplea técnicas estadísticas y experimentales para describir fenómenos y evaluar hipótesis con rigurosidad. Esta metodología busca objetividad y replicabilidad en la investigación.`,
    questions: [
      {
        question: '¿Qué permite hacer la metodología cuantitativa?',
        expectedAnswer: 'Permite identificar patrones, establecer relaciones entre variables y generalizar resultados.',
        explanation: 'Esta respuesta resume las capacidades clave de la metodología cuantitativa en cuanto a detección de regularidades y relaciones funcionales entre variables.'
      },
      {
        question: '¿Qué busca esta metodología en la investigación?',
        expectedAnswer: 'Esta metodología busca objetividad y replicabilidad en la investigación.',
        explanation: 'Se enfatiza que esta metodología se orienta a eliminar sesgos y asegurar que los resultados puedan ser reproducidos bajo condiciones similares.'
      }
    ]
  },
  {
    title: 'El estímulo en psicología',
    original: `El estímulo es cualquier cambio en el entorno que puede influir en la conducta de un organismo. En el análisis interconductual, un estímulo no tiene significado por sí solo, sino por las funciones que adquiere dentro de una situación dada. Así, un estímulo puede adquirir diferentes funciones dependiendo del campo interconductual en el que se encuentre el organismo.`,
    questions: [
      {
        question: '¿A qué se refiere con estímulo?',
        expectedAnswer: 'El estímulo es cualquier cambio en el entorno que puede influir en la conducta de un organismo.',
        explanation: 'Esta respuesta resalta que el significado de un estímulo no es intrínseco, sino contextual, de acuerdo con las relaciones funcionales presentes en el campo interconductual.'
      },
      {
        question: '¿Qué determina las funciones que puede adquirir un estímulo?',
        expectedAnswer: 'dependiendo del campo interconductual en el que se encuentre el organismo.',
        explanation: 'Se aclara que las funciones de un estímulo dependen de las condiciones relacionales presentes entre el organismo y su entorno específico.'
      }
    ]
  }
];

export default function TranscripcionEjercicios() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const fragment = fragments[current];

  const handleAnswerChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
    setFeedback(prev => ({ ...prev, [index]: null }));
    setValidated(false);
  };

  const verifyAnswers = () => {
    const newFeedback = {};
    fragment.questions.forEach((q, index) => {
      const userAnswer = (answers[index] || '').toLowerCase().trim();
      const expected = q.expectedAnswer.toLowerCase().trim();
      newFeedback[index] = userAnswer === expected
        ? { correct: true }
        : { correct: false, expected: q.expectedAnswer, explanation: q.explanation };
    });
    setFeedback(newFeedback);
    setValidated(true);
  };

  const handleNext = () => {
    if (current + 1 < fragments.length) {
      setCurrent(current + 1);
      setAnswers({});
      setFeedback({});
      setValidated(false);
    } else {
      navigate('/resultados-transcripcion');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800">{fragment.title}</h2>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-medium text-gray-700 mb-2">Texto original:</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{fragment.original}</p>
      </div>
        <div className="bg-white p-4 rounded-xl shadow space-y-2">
        <p className="font-semibold text-gray-700">Transcripción del texto:</p>
        <p className="text-gray-600">Trascribe el texto original.</p>
        <textarea
            rows={5}
            value={answers['transcription'] || ''}
            onChange={(e) => handleAnswerChange('transcription', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
            placeholder="Transcribe aquí el texto original..."
        />
        {validated && feedback['transcription'] && (
            <div className={`mt-2 p-2 rounded-lg ${feedback['transcription'].correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {feedback['transcription'].correct ? (
                <span>✅ Transcripción correcta</span>
            ) : (
                <>
                <p><strong>❌ Transcripción incorrecta.</strong></p>
                <p><strong>Texto esperado:</strong> {fragment.original}</p>
                </>
            )}
            </div>
        )}
        </div>

      {fragment.questions.map((q, index) => (
        <div key={index} className="bg-white p-4 rounded-xl shadow space-y-2">
          <p className="font-semibold text-gray-700">Pregunta {index + 1}:</p>
          <p className="text-gray-600">{q.question}</p>
          <textarea
            rows={3}
            value={answers[index] || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
            placeholder="Escribe tu respuesta aquí..."
          />
          {validated && feedback[index] && (
            <div className={`mt-2 p-2 rounded-lg ${feedback[index].correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {feedback[index].correct ? (
                <span>✅ Respuesta correcta</span>
              ) : (
                <>
                  <p><strong>❌ Respuesta incorrecta.</strong></p>
                  <p><strong>Respuesta esperada:</strong> {feedback[index].expected}</p>
                  <p><strong>Explicación:</strong> {feedback[index].explanation}</p>
                </>
              )}
            </div>
          )}
        </div>
      ))}

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
        <button
          onClick={verifyAnswers}
          className="px-6 py-2 bg-teal-500 hover:bg-teal-700 text-white rounded-xl"
        >
          Verificar respuestas
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-sky-500 hover:bg-sky-700 text-white rounded-xl"
          disabled={!validated}
        >
          {current + 1 < fragments.length ? 'Siguiente fragmento' : 'Finalizar'}
        </button>
      </div>
    </div>
  );
}
