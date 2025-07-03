"use client"

import { Row, Col, Modal, Button } from "react-bootstrap"
import ProductCard from "./ProductCard"
import ProductCardSkeleton from "./ui/ProductCardSkeleton"
import MockDataNotification from "./MockDataNotification"
import { useState } from "react"
import { useListLayoutShift } from "../hooks/useLayoutShift"

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
  const [showModal, setShowModal] = useState(false);

  // Validación adicional para asegurar que products sea un array
  const safeProducts = Array.isArray(products) ? products : [];
  
  const { containerRef, containerStyle } = useListLayoutShift(
    safeProducts.length || 8, 
    '400px'
  );

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  if (loading && !isInitialLoad) {
    return (
      <div className="mx-4 mx-md-5">
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
      <div className="mx-4 mx-md-5">
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
      className="mx-4 mx-md-5"
      ref={containerRef}
      style={{
        ...containerStyle,
        minHeight: '450px', // 1 fila de 4 cards
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
      
      <Button variant="link" onClick={handleShow} className="text-muted text-center mt-4 d-block">
        Aviso Legal
      </Button>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Aviso Legal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Esta página web ha sido creada exclusivamente con fines educativos y de aprendizaje. No tiene ningún propósito comercial ni busca generar ingresos.</p>
          <p>Todo el contenido presentado es únicamente para demostrar habilidades de desarrollo y aprendizaje en el ámbito de la programación web.</p>
          <p><strong>Proyecto Educativo:</strong> Desarrollado como parte del curso de React en Talento Tech.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProductList
