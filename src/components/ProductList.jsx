"use client"

import { Row, Col } from "react-bootstrap"
import ProductCard from "./ProductCard"
import ProductCardSkeleton from "./ui/ProductCardSkeleton"
import MockDataNotification from "./MockDataNotification"
import { useState } from "react"
import { useListLayoutShift } from "../hooks/useLayoutShift"
import React from "react"

const ProductList = ({ 
  products, 
  addToCart, 
  removeFromCart, 
  cartItems, 
  updateQuantity, 
  loading, 
  error,
  usingMockData,
  isInitialLoad = false,
  onRefetch,
  onForceMock
}) => {
  // Validación adicional para asegurar que products sea un array
  const safeProducts = Array.isArray(products) ? products : [];
  
  // Determinar columnas según el ancho de pantalla (Bootstrap breakpoints)
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
          onRefetch={onRefetch}
          onForceMock={onForceMock}
        />
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
          onRefetch={onRefetch}
          onForceMock={onForceMock}
        />
        <div className="alert alert-info" role="alert">
          No se encontraron juegos
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
        onRefetch={onRefetch}
        onForceMock={onForceMock}
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
