import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/herramientas">Herramientas</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">Iniciar sesión</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
          </>
        ) : (
          <li><Link to="/mi-progreso">Mi Progreso</Link></li>
        )}
        
        {isLoggedIn && <li><button onClick={handleLogout}>Cerrar sesión</button></li>}
      </ul>
    </nav>
  );
}

export default Navbar;
