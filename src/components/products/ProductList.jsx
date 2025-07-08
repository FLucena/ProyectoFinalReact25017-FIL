"use client"

import { Row, Col } from "react-bootstrap"
import ProductCard from "./ProductCard"
import ProductCardSkeleton from '../../components/ui/ProductCardSkeleton';
import MockDataNotification from '../../components/MockDataNotification';
import { useListLayoutShift } from '../../hooks/useLayoutShift';
import React from "react"

const ProductList = ({ 
  filteredGames, 
  addToCart, 
  removeFromCart, 
  cartItems, 
  updateQuantity, 
  loading, 
  error,
  usingMockData,
  isInitialLoad = false,
  refetchGames,
  forceMockData
}) => {
  // Validación adicional para asegurar que filteredGames sea un array
  const safeProducts = Array.isArray(filteredGames) ? filteredGames : [];
  
  let columns = 1;
  if (typeof window !== 'undefined') {
    if (window.innerWidth >= 1200) {
      columns = 4;
    } else if (window.innerWidth >= 768) {
      columns = 3;
    } else if (window.innerWidth >= 576) {
      columns = 2;
    }
  }
  const rows = Math.ceil(safeProducts.length / columns) || 1;
  const { containerRef, containerStyle } = useListLayoutShift(
    rows,
    '500px'
  )

  if (loading && !isInitialLoad) {
    return (
      <div className="mx-3 mx-md-4">
        <MockDataNotification 
          usingMockData={usingMockData}
          error={error}
          onRefetch={refetchGames}
          onForceMock={forceMockData}
        />
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando productos...</p>
        </div>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Col key={`skeleton-${index}`}>
              <ProductCardSkeleton />
            </Col>
          ))}
        </Row>
      </div>
    )
  }

  if (!safeProducts || safeProducts.length === 0) {
    return (
      <div className="mx-3 mx-md-4">
        <MockDataNotification 
          usingMockData={usingMockData}
          error={error}
          onRefetch={refetchGames}
          onForceMock={forceMockData}
        />
        <div className="text-center py-5">
          <div className="alert alert-info" role="alert">
            <h4 className="alert-heading">No se encontraron juegos</h4>
            <p className="mb-0">
              {error ? 'Hubo un problema al cargar los productos.' : 'No hay productos disponibles en este momento.'}
            </p>
            {error && refetchGames && (
              <>
                <hr />
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={refetchGames}
                >
                  Reintentar carga
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }



  return (
    <div 
      className="mx-3 mx-md-4"
      ref={containerRef}
      style={{
        ...containerStyle,
        minHeight: '350px',
        position: 'relative'
      }}
    >
      <MockDataNotification 
        usingMockData={usingMockData}
        error={error}
        onRefetch={refetchGames}
        onForceMock={forceMockData}
      />
      
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {safeProducts.map((product, index) => (
          <Col key={product.id}>
            <ProductCard 
              product={product} 
              addToCart={addToCart} 
              removeFromCart={removeFromCart}
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              isLCP={index === 0} // Mark first product as LCP image
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default React.memo(ProductList)
