// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <nav className="bg-blue-500 text-white p-4">
        <ul className="flex justify-center space-x-4">
          <li><a href="#" className="hover:underline">Inicio</a></li>
          <li><a href="#" className="hover:underline">Cursos</a></li>
          <li><a href="#" className="hover:underline">Contacto</a></li>
        </ul>
      </nav>
      <section className="flex-grow p-8">
        <h1 className="text-3xl font-semibold text-center">Bienvenidos a la Plataforma Educativa</h1>
        <p className="mt-4 text-lg text-center">
          Aquí puedes aprender conceptos clave de psicología con interacciones personalizadas.
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
