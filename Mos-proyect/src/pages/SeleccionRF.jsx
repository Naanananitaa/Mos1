import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResultadosFinales = ({ logData }) => {
  const respuestas = logData ? logData.respuestas : [];  // Asegúrate de que 'logData' tenga la estructura correcta

  // Datos para el gráfico
  const data = respuestas.map((respuesta, index) => ({
    nombre: `Pregunta ${index + 1}`,
    puntaje: respuesta.puntaje,  // Suponiendo que 'puntaje' es una propiedad
  }));

  return (
    <div>
      <h2>Resultados Finales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="puntaje" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <p>Puntaje Total: {respuestas.reduce((sum, res) => sum + res.puntaje, 0)}</p>
      <button onClick={() => window.location.href = '/'}>Volver al Inicio</button>
    </div>
  );
};

export default ResultadosFinales;
