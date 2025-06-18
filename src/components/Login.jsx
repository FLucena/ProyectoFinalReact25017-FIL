"use client"

import { useState } from "react"
import { X, Eye, EyeOff } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from "sonner"

const Login = ({ closeLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let result
      
      if (isRegister) {
        result = register(email, password, confirmPassword)
      } else {
        result = login(email, password)
      }

      if (result.success) {
        toast.success(result.message)
        closeLogin()
        
        // Redirigir a la página anterior o al home
        const from = location.state?.from?.pathname || "/"
        navigate(from, { replace: true })
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsRegister(!isRegister)
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  return (
    <div
      className="position-fixed top-0 end-0 bottom-0 start-0 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1050 }}
    >
      <div className="bg-white rounded shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-4 fw-bold m-0">{isRegister ? "Crear Cuenta" : "Iniciar Sesión"}</h2>
          <button onClick={closeLogin} className="btn btn-sm btn-outline-secondary rounded-circle">
            <X size={20} />
          </button>
        </div>

        {!isRegister && (
          <div className="alert alert-info mb-3">
            <small>
              <strong>Credenciales de prueba:</strong><br />
              Admin: admin@test.com / admin123<br />
              Usuario: user@test.com / user123
            </small>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              placeholder="tu@email.com"
              disabled={isLoading}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <div className="input-group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
                placeholder="********"
                disabled={isLoading}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {isRegister && (
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Contraseña
              </label>
              <div className="input-group">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={isRegister}
                  className="form-control"
                  placeholder="********"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-danger w-100 py-2 mb-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {isRegister ? "Registrándose..." : "Iniciando sesión..."}
              </>
            ) : (
              isRegister ? "Registrarse" : "Iniciar Sesión"
            )}
          </button>
        </form>

        <div className="text-center">
          <button 
            onClick={toggleMode} 
            className="btn btn-link text-danger p-0"
            disabled={isLoading}
          >
            {isRegister ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes una cuenta? Regístrate"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
