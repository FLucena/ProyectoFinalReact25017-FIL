"use client"

import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import { Container, Row, Col, Alert } from "react-bootstrap"

const Offers = ({ games = [], loading, error, addToCart, removeFromCart, updateQuantity, cartItems, searchTerm, selectedPlatform, selectedGenre }) => {
  const gamesWithExtras = games.map(game => ({
    ...game,
    discount: game.discount ?? Math.floor(Math.random() * 40),
  }));
  let filteredGames = gamesWithExtras.filter((game) => game.discount > 0);

  if (searchTerm) {
    filteredGames = filteredGames.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (selectedPlatform && selectedPlatform !== 'Todas las Plataformas') {
    filteredGames = filteredGames.filter(game =>
      game.platform.toLowerCase().includes(selectedPlatform.toLowerCase())
    );
  }
  if (selectedGenre && selectedGenre !== 'Todos los Géneros') {
    filteredGames = filteredGames.filter(game =>
      game.genre.toLowerCase().includes(selectedGenre.toLowerCase())
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Ofertas Especiales</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {filteredGames.map((game) => (
            <div key={game.id} className="col">
              <ProductCard
                product={game}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                cartItems={cartItems}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Offers 