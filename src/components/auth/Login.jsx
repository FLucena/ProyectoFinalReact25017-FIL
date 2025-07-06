"use client"

import { useState, useEffect } from "react"
import { X, Eye, EyeOff } from "lucide-react"
import { FaTimes, FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaSignInAlt, FaUserPlus } from "react-icons/fa"
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"

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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeLogin()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [closeLogin])

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
        toast.success(result.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
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
      onClick={closeLogin}
    >
      <div 
        className="bg-white rounded shadow-lg p-4" 
        style={{ width: "100%", maxWidth: "400px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-4 fw-bold m-0">{isRegister ? "Crear Cuenta" : "Iniciar Sesión"}</h2>
          <button 
            onClick={closeLogin} 
            className="btn btn-sm p-0"
            aria-label="Cerrar modal de login"
            style={{ 
              width: '36px', 
              height: '36px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px solid #ced4da',
              background: 'transparent',
              transition: 'background 0.2s, border-color 0.2s',
              position: 'relative',
              outline: 'none',
              cursor: 'pointer',
            }}
            onMouseOver={e => e.currentTarget.style.background = '#f1f3f5'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}
            onFocus={e => e.currentTarget.style.background = '#f1f3f5'}
            onBlur={e => e.currentTarget.style.background = 'transparent'}
          >
            <FaTimes size={18} style={{ color: '#495057' }} />
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
            <label htmlFor="email" className="form-label d-flex align-items-center gap-2">
              <FaEnvelope size={14} />
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
            <label htmlFor="password" className="form-label d-flex align-items-center gap-2">
              <FaLock size={14} />
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
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {isRegister && (
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label d-flex align-items-center gap-2">
                <FaLock size={14} />
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
                  {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2 mb-3 d-flex align-items-center justify-content-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {isRegister ? "Registrándose..." : "Iniciando sesión..."}
              </>
            ) : (
              <>
                {isRegister ? <FaUserPlus size={16} /> : <FaSignInAlt size={16} />}
                {isRegister ? "Registrarse" : "Iniciar Sesión"}
              </>
            )}
          </button>
        </form>

        <div className="text-center">
          <button 
            onClick={toggleMode} 
            className="btn btn-link text-primary p-0"
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
