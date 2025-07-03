"use client"

import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import MockDataNotification from "./MockDataNotification"
import { Container, Row, Col, Alert } from "react-bootstrap"

const Offers = ({ 
  games = [], 
  loading, 
  error, 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  cartItems, 
  usingMockData,
  onRefetch,
  onForceMock
}) => {
  if (loading) {
    return (
      <div className="container py-4">
        <h2 className="mb-4">Ofertas Especiales</h2>
        <div className="text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando ofertas...</p>
        </div>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="container py-4">
        <h2 className="mb-4">Ofertas Especiales</h2>
        <MockDataNotification 
          usingMockData={usingMockData}
          error={error}
          onRefetch={onRefetch}
          onForceMock={onForceMock}
        />
        <Alert variant="info">
          No hay ofertas disponibles en este momento.
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Ofertas Especiales</h2>
      
      <MockDataNotification 
        usingMockData={usingMockData}
        error={error}
        onRefetch={onRefetch}
        onForceMock={onForceMock}
      />
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {games.map((game, index) => (
          <div key={game.id} className="col">
            <ProductCard
              product={game}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              cartItems={cartItems}
              isLCP={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers 