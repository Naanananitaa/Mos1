import React, { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'; // Importamos Link
import Inicio from './pages/inicio';
import Contacto from './pages/contacto';
import Evaluacion from './pages/Evaluacion';
import Lecciones from './pages/Lecciones';
import Herramientas from './pages/herramientas';
import Lecturas from './pages/lecturas';
import Progreso from './pages/Progreso';

// Definimos las rutas para la navegación
const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/contacto",
    element: <Contacto />,
  },
  {
    path: "/evaluacion",
    element: <Evaluacion />,
  },
  {
    path: "/lecciones",
    element: <Lecciones />,
  },
  {
    path: "/herramientas",
    element: <Herramientas />,
  },
  {
    path: "/lecturas",
    element: <Lecturas />,
  },
  {
    path: "/progreso",
    element: <Progreso />,
  },
]);

function App() {
  // Estado de si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Funciones para manejar el login, logout y registro
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  const handleRegister = () => setIsLoggedIn(true);

  return (
    <RouterProvider router={router}>
      <div className="App">
        {/* Barra de navegación */}
        <nav className="navbar">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/herramientas">Herramientas</Link></li>
            <li><Link to="/lecturas">Lecturas</Link></li>
            <li><Link to="/evaluacion">Evaluación</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>

            {/* Condicional para mostrar opciones según el estado de sesión */}
            {!isLoggedIn ? (
              <>
                <li><Link to="/login">Iniciar sesión</Link></li>
                <li><Link to="/register">Registrarse</Link></li>
              </>
            ) : (
              <li><Link to="/progreso">Mi Progreso</Link></li>
            )}

            {/* Opción para cerrar sesión si el usuario está logueado */}
            {isLoggedIn && <li><button onClick={handleLogout}>Cerrar sesión</button></li>}
          </ul>
        </nav>

        {/* Contenido de la aplicación */}
        <header className="App-header">
          <h1>Mi aplicación</h1>
        </header>
      </div>
    </RouterProvider>
  );
}

export default App;