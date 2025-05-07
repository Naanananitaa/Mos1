import React, { useState, useEffect } from 'react';

const ResultadosFinales = ({ logData }) => {
  // Variables para el registro de los resultados
  const [resultados, setResultados] = useState({
    respuestasCorrectas: 0,
    respuestasIncorrectas: 0,
    porcentajeAciertos: 0,
    inicioActividad: '',
    primerClic: 0,
    tiempoTotal: 0,
    conteoClicsTotales: 0,
    palabrasOmitidas: [],
    erroresComunes: [],
    tiempoPromedioPorPalabra: 0,
    secuenciaSeleccion: []
  });

  // Variables temporales
  const [inicio, setInicio] = useState(null);
  const [primerClicTiempo, setPrimerClicTiempo] = useState(null);
  const [tiempoFinal, setTiempoFinal] = useState(null);
  const [secuenciaSeleccion, setSecuenciaSeleccion] = useState([]);
  const [erroresComunes, setErroresComunes] = useState([]);
  
  useEffect(() => {
    // Registrar el inicio de la actividad cuando el componente se monte
    const now = new Date();
    setInicio(now);
    setResultados(prev => ({ ...prev, inicioActividad: now.toISOString() }));

    // Recuperar datos de interacciones previas si es necesario
    const storedData = JSON.parse(localStorage.getItem('resultados'));
    if (storedData) {
      setResultados(storedData);
    }
  }, []);

  // Función para manejar la selección de palabras
  const manejarSeleccion = (palabra, esCorrecta) => {
    const now = new Date();
    if (!primerClicTiempo) {
      setPrimerClicTiempo(now);
    }

    // Actualizar secuencia de selección
    setSecuenciaSeleccion(prev => [...prev, palabra]);

    // Calcular respuestas correctas e incorrectas
    if (esCorrecta) {
      setResultados(prev => ({
        ...prev,
        respuestasCorrectas: prev.respuestasCorrectas + 1
      }));
    } else {
      setResultados(prev => ({
        ...prev,
        respuestasIncorrectas: prev.respuestasIncorrectas + 1
      }));
    }

    // Actualizar errores comunes
    if (esCorrecta === false) {
      setErroresComunes(prev => [...prev, palabra]);
    }
  };

  // Calcular porcentaje de aciertos
  useEffect(() => {
    const totalRespuestas = resultados.respuestasCorrectas + resultados.respuestasIncorrectas;
    if (totalRespuestas > 0) {
      const porcentaje = (resultados.respuestasCorrectas / totalRespuestas) * 100;
      setResultados(prev => ({
        ...prev,
        porcentajeAciertos: porcentaje.toFixed(2)
      }));
    }
  }, [resultados.respuestasCorrectas, resultados.respuestasIncorrectas]);

  // Calcular tiempos
  useEffect(() => {
    if (inicio && primerClicTiempo) {
      const tiempoDesdeInicio = (primerClicTiempo - inicio) / 1000; // En segundos
      setResultados(prev => ({
        ...prev,
        primerClic: tiempoDesdeInicio.toFixed(2)
      }));
    }
    if (tiempoFinal && inicio) {
      const tiempoTotal = (tiempoFinal - inicio) / 1000; // En segundos
      setResultados(prev => ({
        ...prev,
        tiempoTotal: tiempoTotal.toFixed(2)
      }));
    }
  }, [primerClicTiempo, tiempoFinal, inicio]);

  // Función para finalizar la actividad y almacenar los datos
  const finalizarActividad = () => {
    const tiempoPromedio = resultados.conteoClicsTotales
      ? (resultados.tiempoTotal / resultados.conteoClicsTotales).toFixed(2)
      : 0;

    // Calcular las palabras omitidas (deben ser las palabras correctas que no fueron seleccionadas)
    const palabrasOmitidas = []; // Lógica para encontrar palabras omitidas
    setResultados(prev => ({
      ...prev,
      tiempoPromedioPorPalabra: tiempoPromedio,
      palabrasOmitidas
    }));

    // Guardar los resultados en localStorage
    localStorage.setItem('resultados', JSON.stringify(resultados));
  };

  return (
    <div>
      <h2>Resultados Finales</h2>
      
      <div>
        <h3>Resumen de la Actividad:</h3>
        <p>Respuestas Correctas: {resultados.respuestasCorrectas}</p>
        <p>Respuestas Incorrectas: {resultados.respuestasIncorrectas}</p>
        <p>Porcentaje de Aciertos: {resultados.porcentajeAciertos}%</p>
        <p>Inicio de la Actividad: {resultados.inicioActividad}</p>
        <p>Primer Clic (Latencia): {resultados.primerClic} segundos</p>
        <p>Tiempo Total: {resultados.tiempoTotal} segundos</p>
        <p>Conteo de Clics Totales: {resultados.conteoClicsTotales}</p>
        <p>Palabras Omitidas: {JSON.stringify(resultados.palabrasOmitidas)}</p>
        <p>Errores Comunes: {JSON.stringify(erroresComunes)}</p>
        <p>Tiempo Promedio por Palabra: {resultados.tiempoPromedioPorPalabra} segundos</p>
        <p>Secuencia de Selección: {JSON.stringify(resultados.secuenciaSeleccion)}</p>
      </div>
      
      <button onClick={finalizarActividad}>Finalizar y Guardar Resultados</button>
    </div>
  );
};

export default ResultadosFinales;
