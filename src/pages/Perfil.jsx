"use client"

import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const Perfil = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">Mi Perfil</h2>
              
              <div className="mb-4">
                <h3 className="h5 mb-3">Información Personal</h3>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      value={user?.email || ''} 
                      disabled 
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="h5 mb-3">Historial de Compras</h3>
                <div className="alert alert-info">
                  No hay compras registradas aún.
                </div>
              </div>

              <div className="mb-4">
                <h3 className="h5 mb-3">Juegos Favoritos</h3>
                <div className="alert alert-info">
                  No hay juegos favoritos guardados.
                </div>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary">
                  Actualizar Perfil
                </button>
                <button className="btn btn-outline-danger">
                  Eliminar Cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Perfil 