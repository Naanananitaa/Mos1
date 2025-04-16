import React from 'react';
import Home from './pages/Home';
import Header from './components/Header';
import './i18n/i18n';

function App() {
  return (
    <>
      <Header />
      <main className="p-6">
        <Home />
      </main>
    </>
  );
}

export default App;
