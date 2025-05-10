// Falta definir los posibles resultados correctos de los ejercicios de parafrasis (Dado que es parafrasis, no hay una respuesta correcta única, pero se pueden definir criterios de evaluación para la retroalimentación).
// También falta la parte de guardar los resultados en el localStorage y mostrarlos en la página de resultados.

import { useState } from 'react';

export default function Ejercicios() {
  const [respuesta, setRespuesta] = useState('');
  const [retro, setRetro] = useState('');
  const [enviado, setEnviado] = useState(false);

  const textoOriginal = `La psicología interconductual propone que la conducta es el resultado de las interacciones funcionales entre el organismo y su contexto, descartando explicaciones basadas en variables internas.`;

  const criterios = [
    { clave: 'interacciones funcionales', mensaje: 'Buen uso del concepto de interacciones funcionales.' },
    { clave: 'organismo y su contexto', mensaje: 'Has considerado correctamente la relación organismo-contexto.' },
    { clave: 'descartando explicaciones internas', mensaje: 'Identificaste correctamente el rechazo de explicaciones internas.' },
  ];

  const evaluarParafraseo = () => {
    let retroFinal = [];
    criterios.forEach(c => {
      if (respuesta.toLowerCase().includes(c.clave.toLowerCase())) {
        retroFinal.push(`✔️ ${c.mensaje}`);
      }
    });

    if (retroFinal.length === 0) {
      retroFinal.push('No se identificaron elementos clave del texto original. Intenta enfocarte en las relaciones funcionales y no en ideas internas.');
    }

    setRetro(retroFinal.join('\n'));
    setEnviado(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800">Actividad: Parafraseo de texto</h2>

      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-700"><strong>Texto original:</strong> {textoOriginal}</p>
      </div>

      <textarea
        className="w-full h-40 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Escribe tu parafraseo aquí..."
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
      />

      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300"
        onClick={evaluarParafraseo}
      >
        Enviar
      </button>

      {enviado && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg whitespace-pre-line text-green-800">
          <h3 className="font-semibold mb-2">Retroalimentación:</h3>
          {retro}
        </div>
      )}
    </div>
  );
}
