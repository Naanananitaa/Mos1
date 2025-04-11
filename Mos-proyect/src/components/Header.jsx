export default function Header() {
    return (
      <header className="bg-indigo-700 text-white p-4 shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Mi Plataforma Educativa</h1>
          <nav className="space-x-4">
            <a href="#" className="hover:underline">Inicio</a>
            <a href="#" className="hover:underline">Sobre</a>
          </nav>
        </div>
      </header>
    );
  }
  