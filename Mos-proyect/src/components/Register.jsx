// src/components/Register.jsx
import useAuthForm from "../hooks/useAuthForm";

export default function Register() {
  const {
    correo, setCorreo,
    contrasena, setContrasena,
    correoTocado, contrasenaTocada,
    esCorreoValido, esContrasenaValida,
    handleSubmit,
  } = useAuthForm("register");

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Correo electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        onBlur={() => setCorreoTocado(true)}
        className="w-full p-2 border rounded"
      />
      {correoTocado && !esCorreoValido && (
        <p className="text-red-500 text-sm">Correo inválido</p>
      )}

      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        onBlur={() => setContrasenaTocada(true)}
        className="w-full p-2 border rounded"
      />
      {contrasenaTocada && !esContrasenaValida && (
        <p className="text-red-500 text-sm">Debe tener al menos 8 caracteres, una mayúscula y un número</p>
      )}

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Registrarse
      </button>
    </form>
  );
}
