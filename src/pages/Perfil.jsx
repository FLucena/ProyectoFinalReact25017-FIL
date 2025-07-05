"use client"

import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import { useFavorites } from "../context/FavoritesContext"
import ProductCard from '../components/products/ProductCard';

const Perfil = () => {
  const { isAuthenticated, user } = useAuth();
  const { favorites, removeFavorite } = useFavorites();

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
                {favorites.length === 0 ? (
                  <div className="alert alert-info">
                    No hay juegos favoritos guardados.
                  </div>
                ) : (
                  <div className="row g-3">
                    {favorites.map((game) => (
                      <div className="col-6 col-md-4 col-lg-3" key={game.id}>
                        <ProductCard 
                          product={game} 
                          addToCart={() => {}} 
                          removeFromCart={() => {}} 
                          cartItems={[]} 
                          updateQuantity={() => {}} 
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Perfil 