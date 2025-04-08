import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Inicio from './pages/inicio.js'; // Agrega la extensión .js

ReactDOM.render(
  <React.StrictMode>
    <Inicio />
  </React.StrictMode>,
  document.getElementById('root')
);