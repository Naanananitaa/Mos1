import React from 'react';
import { useNavigate } from 'react-router-dom';

const exerciseSections = [
  {
    title: 'Lectura Interactiva',
    description: 'Identifica títulos, subtítulos y conceptos clave en fragmentos de texto.',
    path: '/ejercicios/seleccion-tutorial',
    color: 'from-teal-400 to-cyan-400',
  },
  {
    title: 'Subrayado',
    description: 'Subraya las ideas principales del texto.',
    path: '/ejercicios/subrayado-tutorial',
    color: 'from-blue-400 to-teal-400',
  },
  {
    title: 'Transcripción guiada',
    description: 'Transcribe un texto de acuerdo con la pregunta que se presenta.',
    path: '/ejercicios/transcripcion-tutorial',
    color: 'from-blue-400 to-purple-400',
  },
  {
    title: 'Parafraseo',
    description: 'Parafrasea un texto de acuerdo con la pregunta que se presenta.',
    path: '/ejercicios/parafraseo-tutorial',
    color: 'from-violet-300 to-cyan-700',
  },
  {
    title: 'Preguntas de opción múltiple',
    description: '.Selecciona la respuesta correcta de acuerdo con el texto.',
    path: '/ejercicios/opcionmultiple-tutorial',
    color: 'from-cyan-400 to-sky-600',
  },
  {
    title: 'Correcciones de frases',
    description: 'lee frases erróneas y selecciona la opción correcta.',
    path: '/ejercicios/correcciones-tutorial',
    color: 'from-indigo-400 to-sky-700',
  },


];

function ExercisesMenu() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-5 text-center">
        Selecciona el tipo de ejercicio
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 max-w-6x2 mx-auto">
        {exerciseSections.map((exercise, index) => (
          <div
            key={index}
            onClick={() => {
              if (exercise.path !== '#') navigate(exercise.path);
            }}
            className={`bg-gradient-to-br ${exercise.color} text-white font-sans p-6 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300`}
          >
            <h2 className="text-xl font-semibold mb-2">{exercise.title}</h2>
            <p className="text-sm">{exercise.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExercisesMenu;
