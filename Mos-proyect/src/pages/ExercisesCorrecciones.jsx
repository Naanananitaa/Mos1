// Ejercicios.jsx
import { useState } from "react";

const textoOriginal = `
El análisis funcional permite establecer relaciones entre los eventos del contexto y las respuestas observables del organismo.
`;

const frasesErroneas = [
  {
    frase: "El análisis funcional describe los procesos internos de la mente.",
    correccionEsperada: "El análisis funcional permite establecer relaciones entre eventos del contexto y respuestas observables.",
  },
  {
    frase: "Las respuestas del organismo son causadas por sus emociones.",
    correccionEsperada: "Las respuestas del organismo se configuran por las condiciones funcionales del contexto.",
  },
];

export default function Ejercicios() {
  const [respuestas, setRespuestas] = useState(["", ""]);
  const [retro, setRetro] = useState([null, null]);

  const verificarRespuestas = () => {
    const nuevaRetro = frasesErroneas.map((item, i) => {
      const esCorrecta = respuestas[i]
        .toLowerCase()
        .includes(item.correccionEsperada.toLowerCase().slice(0, 20)); // verificación parcial
      return esCorrecta
        ? "¡Bien! Tu corrección se ajusta al criterio funcional."
        : "Revisa cómo se estructuran las relaciones funcionales en el texto.";
    });
    setRetro(nuevaRetro);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">.</h2>

      <div className="bg-white p-4 shadow rounded-xl mb-6">
        <h3 className="text-lg font-semibold mb-2">Texto original</h3>
        <p className="text-gray-700">{textoOriginal}</p>
      </div>

      {frasesErroneas.map((item, i) => (
        <div key={i} className="mb-6">
          <p className="text-red-700 font-medium">Frase errónea {i + 1}:</p>
          <p className="italic mb-2">{item.frase}</p>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Escribe una corrección..."
            rows={3}
            value={respuestas[i]}
            onChange={(e) => {
              const nuevasRespuestas = [...respuestas];
              nuevasRespuestas[i] = e.target.value;
              setRespuestas(nuevasRespuestas);
            }}
          />
          {retro[i] && (
            <p className={`mt-2 ${retro[i].startsWith("¡Bien!") ? "text-green-600" : "text-yellow-700"}`}>
              {retro[i]}
            </p>
          )}
        </div>
      ))}

      <button
        onClick={verificarRespuestas}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Verificar respuestas
      </button>
    </div>
  );
}
