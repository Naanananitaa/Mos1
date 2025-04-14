import React from 'react';
import Home from './pages/Home';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      {/* Aquí puedes poner tu contenido */}
      <main className="p-6">
        <h1 className="text-3xl font-bold">Bienvenida</h1>
      </main>
    </>
  );
}

export default App;