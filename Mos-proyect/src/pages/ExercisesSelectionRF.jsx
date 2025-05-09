import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';

export default function ResultadosFinales() {
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('logData');
    if (data) {
      setResultados(JSON.parse(data));
    }
  }, []);

  const calcularPromedios = () => {
    const totalEjercicios = resultados.length;
    const totalAciertos = resultados.reduce((sum, r) => sum + r.correctCount, 0);
    const totalSeleccionadas = resultados.reduce((sum, r) => sum + r.totalSelected, 0);
    const totalTiempo = resultados.reduce((sum, r) => sum + r.totalTime, 0);
    const totalLatencia = resultados.reduce((sum, r) => sum + (r.latency || 0), 0);

    return {
      promedioAciertos: (totalAciertos / totalEjercicios).toFixed(2),
      promedioSeleccionadas: (totalSeleccionadas / totalEjercicios).toFixed(2),
      promedioTiempo: (totalTiempo / totalEjercicios / 1000).toFixed(2),
      promedioLatencia: (totalLatencia / totalEjercicios / 1000).toFixed(2),
    };
  };

  const promedios = calcularPromedios();

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center">Resultados Finales</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Promedios Generales</h3>
          <p>Aciertos por ejercicio: {promedios.promedioAciertos}</p>
          <p>Palabras seleccionadas por ejercicio: {promedios.promedioSeleccionadas}</p>
          <p>Tiempo total por ejercicio: {promedios.promedioTiempo} segundos</p>
          <p>Latencia promedio: {promedios.promedioLatencia} segundos</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Gráfico de Aciertos</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={resultados}>
              <XAxis dataKey="fragmentTitle" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentageCorrect" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>

          {/* Botones debajo del gráfico */}
          <div className="mt-4 flex justify-center gap-4">
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700"
              onClick={() => navigate('/ejercicios/subrayado')}
            >
              Ir al siguiente ejercicio (Subrayado)
            </button>
            <button
              className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-700"
              onClick={() => navigate('/exercises')}
            >
              Volver al menú
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Detalles por Ejercicio</h3>
        {resultados.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h4 className="text-lg font-semibold">{item.fragmentTitle}</h4>
            <p>Aciertos: {item.correctCount}</p>
            <p>Palabras seleccionadas: {item.totalSelected}</p>
            <p>Porcentaje de aciertos: {item.percentageCorrect.toFixed(2)}%</p>
            <p>Tiempo total: {(item.totalTime / 1000).toFixed(2)} segundos</p>
            <p>Latencia (primer clic): {item.latency ? (item.latency / 1000).toFixed(2) : 'N/A'} segundos</p>
          </div>
        ))}
      </div>
    </div>
  );
}
