"use client"

import ProductCard from "./ProductCard"
import MockDataNotification from '../../components/MockDataNotification';
import { Alert } from "react-bootstrap"
import { useMemo } from "react"

const MustHave = ({ 
  games = [], 
  loading, 
  error, 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  cartItems, 
  usingMockData,
  onRefetch,
  onForceMock,
  currentPage = 1,
  totalPages = 1,
  totalGames = 0,
  currentPageGames = 0
}) => {
  if (loading) {
    return (
      <div className="container py-4">
        <h2 className="mb-4">Infaltables</h2>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando juegos destacados...</p>
        </div>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="container py-4">
        <h2 className="mb-4">Infaltables</h2>
        <MockDataNotification 
          usingMockData={usingMockData}
          error={error}
          onRefetch={onRefetch}
          onForceMock={onForceMock}
        />
        <Alert variant="info">
          No hay juegos destacados disponibles en este momento.
        </Alert>
      </div>
    );
  }
  
  // Calcular los juegos de la página actual
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedGames = useMemo(() => 
    games.slice(startIndex, endIndex), [games, currentPage, itemsPerPage]
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4">Infaltables</h2>
      
      <MockDataNotification 
        usingMockData={usingMockData}
        error={error}
        onRefetch={onRefetch}
        onForceMock={onForceMock}
      />
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {paginatedGames.map((game, index) => (
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

export default MustHave 