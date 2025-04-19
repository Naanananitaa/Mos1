import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
  })

  const validateFields = () => {
    const newErrors = {}

    // Email básico
    if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'El correo debe contener "@" y un punto.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Formato de correo no válido.'
    }

    // Validación de contraseña
    const checks = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    }

    setPasswordChecks(checks)

    if (Object.values(checks).includes(false)) {
      newErrors.password = 'La contraseña no cumple con todos los requisitos.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateFields()) return

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password
      })

      if (response.data.success) {
        alert('¡Inicio de sesión exitoso!')
        // Redirigir a dashboard u otra página
        navigate('/dashboard')
      } else {
        setErrors({ general: response.data.message })
      }
    } catch (error) {
      setErrors({ general: 'Error de conexión con el servidor.' })
    }
  }

  return (
    <div className="flex h-screen">
      {/* Login */}
      <div className="w-1/2 bg-white p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Iniciar sesión</h2>

        <div className="flex gap-4 mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Facebook</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Google</button>
          <button className="bg-blue-400 text-white px-4 py-2 rounded-lg">LinkedIn</button>
        </div>

        {errors.general && <p className="text-red-500 mb-2">{errors.general}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mb-2 px-4 py-2 border rounded-lg w-full ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mb-2 px-4 py-2 border rounded-lg w-full ${errors.password ? 'border-red-500' : ''}`}
          />

          <a href="#" className="text-blue-500 text-sm mb-4 block">¿Olvidaste tu contraseña?</a>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
          >
            Iniciar sesión
          </button>
        </form>
      </div>

      {/* Registro */}
      <div className="w-1/2 bg-gradient-to-r from-blue-400 to-blue-600 text-white p-10 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
        <p className="mb-6 text-center">Ingresa tus datos personales y comienza tu experiencia en la plataforma</p>
        <button
          onClick={() => navigate('/register')}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
        >
          Regístrate
        </button>
      </div>
    </div>
  )
}

export default Login
