import { useState } from "react";

const preguntas = [
  {
    id: 1,
    texto: "¿Cuál es la idea principal del texto presentado?",
    opciones: [
      { texto: "Detalles complementarios del tema", correcta: false },
      { texto: "Tema central que organiza la información", correcta: true },
      { texto: "Ejemplo secundario", correcta: false },
      { texto: "Información irrelevante", correcta: false },
    ],
    retroalimentacion: {
      correcta: "¡Correcto! Has identificado adecuadamente la idea principal.",
      incorrecta: "Revisa el texto nuevamente. La idea principal organiza el contenido del texto.",
    },
  },
  // Puedes agregar más preguntas similares aquí.
];

export default function Ejercicios() {
  const [seleccion, setSeleccion] = useState({});
  const [resultado, setResultado] = useState({});

  const manejarRespuesta = (preguntaId, opcion, esCorrecta) => {
    setSeleccion({ ...seleccion, [preguntaId]: opcion });
    setResultado({
      ...resultado,
      [preguntaId]: esCorrecta ? "correcta" : "incorrecta",
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">.</h2>

      {/* Aquí presentas un texto ejemplo */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 border-l-4 border-blue-400">
        <p>
          El aprendizaje de la lectura en psicología requiere reconocer cómo los
          términos clave se relacionan con contextos académicos. Identificar la
          idea principal permite construir relaciones funcionales entre términos
          y prácticas profesionales.
        </p>
      </div>

      {preguntas.map((pregunta) => (
        <div key={pregunta.id} className="mb-6">
          <h3 className="text-lg font-semibold">{pregunta.texto}</h3>
          <div className="grid grid-cols-1 gap-2 mt-2">
            {pregunta.opciones.map((opcion, index) => (
              <button
                key={index}
                onClick={() =>
                  manejarRespuesta(pregunta.id, opcion.texto, opcion.correcta)
                }
                className={`p-3 rounded-xl text-left border hover:shadow-md transition-all ${
                  seleccion[pregunta.id] === opcion.texto
                    ? opcion.correcta
                      ? "bg-green-100 border-green-400"
                      : "bg-red-100 border-red-400"
                    : "bg-gray-50 border-gray-300"
                }`}
                disabled={!!seleccion[pregunta.id]}
              >
                {opcion.texto}
              </button>
            ))}
          </div>
          {seleccion[pregunta.id] && (
            <div
              className={`mt-2 p-3 rounded ${
                resultado[pregunta.id] === "correcta"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {
                pregunta.retroalimentacion[
                  resultado[pregunta.id]
                ]
              }
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
