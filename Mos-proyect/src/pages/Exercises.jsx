import React from 'react';
import { useNavigate } from 'react-router-dom';

const exerciseSections = [
  {
    title: 'Ejercicios de Lectura Interactiva',
    description: 'Identifica títulos, subtítulos y conceptos clave en fragmentos de texto.',
    path: '/ejercicios/seleccion',
    color: 'from-yellow-300 to-blue-300',
  },
  {
    title: 'Ejercicios de Subrayado',
    description: 'Subraya las ideas principales del texto. (Próximamente)',
    path: '#',
    color: 'from-green-300 to-blue-300',
  },
  {
    title: 'Relaciones Conceptuales',
    description: 'Establece relaciones entre conceptos clave. (Próximamente)',
    path: '#',
    color: 'from-pink-400 to-purple-300',
  },
];

function ExercisesMenu() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Selecciona el tipo de ejercicio
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {exerciseSections.map((exercise, index) => (
          <div
            key={index}
            onClick={() => {
              if (exercise.path !== '#') navigate(exercise.path);
            }}
            className={`bg-gradient-to-br ${exercise.color} text-white p-6 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300`}
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
