import React, { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import Inicio from './pages/inicio.js'; // Asegúrate de que este archivo exista
import Contacto from './pages/contacto.js'; // Asegúrate de que este archivo exista
import Evaluacion from './pages/Evaluacion.js'; // Asegúrate de que este archivo exista
import Lecciones from './pages/Lecciones.js'; // Asegúrate de que este archivo exista
import Herramientas from './pages/herramientas.js'; // Asegúrate de que este archivo exista
import Lecturas from './pages/lecturas.js'; // Asegúrate de que este archivo exista
import Progreso from './pages/Progreso.js'; // Asegúrate de que este archivo exista

// Definimos las rutas para la navegación
const router = createBrowserRouter([
  { path: "/", element: <Inicio /> },
  { path: "/contacto", element: <Contacto /> }, // Corregí la ruta
  { path: "/evaluacion", element: <Evaluacion /> },
  { path: "/lecciones", element: <Lecciones /> },
  { path: "/herramientas", element: <Herramientas /> },
  { path: "/lecturas", element: <Lecturas /> },
  { path: "/progreso", element: <Progreso /> },
]);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <RouterProvider router={router}>
      <div className="App">
        <nav className="navbar">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/herramientas">Herramientas</Link></li>
            <li><Link to="/lecturas">Lecturas</Link></li>
            <li><Link to="/evaluacion">Evaluación</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            {!isLoggedIn ? (
              <>
                <li><Link to="/login">Iniciar sesión</Link></li>
                <li><Link to="/register">Registrarse</Link></li>
              </>
            ) : (
              <li><Link to="/progreso">Mi Progreso</Link></li>
            )}
            {isLoggedIn && <li><button onClick={handleLogout}>Cerrar sesión</button></li>}
          </ul>
        </nav>
        <header className="App-header">
          <h1>Mi aplicación</h1>
        </header>
      </div>
    </RouterProvider>
  );
}

export default App;