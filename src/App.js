import React, { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import Inicio from './pages/inicio.js';
import Contacto from './pages/contacto.js';
import Evaluacion from './pages/Evaluacion.js';
import Lecciones from './pages/Lecciones.js';
import Herramientas from './pages/herramientas.js';
import Lecturas from './pages/lecturas.js';
import Progreso from './pages/Progreso.js';

// Definimos las rutas para la navegación
const router = createBrowserRouter([
  { path: "/", element: <Inicio /> },
  { path: "/contacto", element: <Contacto /> },
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