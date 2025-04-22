import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  localStorage.setItem("auth", "true");
  navigate("/mi-perfil");

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Campo obligatorio.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido.'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Campo obligatorio.'
    }

    const password = formData.password
    const validPassword =
      password.length >= 8 &&
      /[A-Z]/.test(password) && //Mayusculas
      /[a-z]/.test(password) && //Minusculas
      /[0-9]/.test(password)    //Numeros

    if (!validPassword) {
      newErrors.password =
        'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número.'
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Campo obligatorio.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const response = await axios.post('http://localhost:3001/api/register', formData)
      if (response.data.success) {
        setSuccessMessage('Registro exitoso. Redirigiendo a tu progreso...')
        setTimeout(() => {
          navigate('/mi-progreso') 
        }, 500)
      } else {
        setErrors({ general: response.data.message || 'Error en el registro.' })
      }
    } catch (error) {
      setErrors({ general: 'No se pudo conectar al servidor.' })
    }
  }

  return (
    <div className="flex h-screen">
      {/* Panel izquierdo */}
      <div className="w-1/2 bg-blue-500 text-white p-10 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-4">¿Ya tienes cuenta?</h2>
        <p className="mb-6 text-center">
          Si ya formas parte de nuestra comunidad, inicia sesión para continuar tu progreso y acceder a tus recursos.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-white text-blue-400 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
        >
          Iniciar sesión
        </button>
      </div>

      {/* Panel derecho */}
      <div className="w-1/2 bg-white p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Crear una cuenta</h2>

        <div className="flex gap-4 mb-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Facebook</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Google+</button>
          <button className="bg-blue-400 text-white px-4 py-2 rounded-lg">LinkedIn</button>
        </div>

        <p className="text-gray-500 mb-4">or use your email for registration:</p>

        {errors.general && <p className="text-red-500 mb-2">{errors.general}</p>}
        {successMessage && <p className="text-blue-400 mb-2">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            className={`mb-2 px-4 py-2 border rounded-lg w-full ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className={`mb-2 px-4 py-2 border rounded-lg w-full ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className={`mb-2 px-4 py-2 border rounded-lg w-full ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

          <button
            type="submit"
            className="bg-blue-400 text-white px-4 py-2 rounded-lg w-full mt-2"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
