import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Bienvenida, Natalie 🌟</h2>
        <p className="text-gray-700">
          Este es el inicio de tu plataforma educativa. Aquí irán los módulos, ejercicios y recursos.
        </p>
      </main>
    </>
  );
}

export default App;
