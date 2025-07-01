"use client"

import { Row, Col, Modal, Button } from "react-bootstrap"
import ProductCard from "./ProductCard"
import MockDataNotification from "./MockDataNotification"
import { useState } from "react"

const ProductList = ({ 
  products, 
  addToCart, 
  removeFromCart, 
  cartItems, 
  updateQuantity, 
  loading, 
  error,
  usingMockData,
  onRefetch,
  onForceMock
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // Validación adicional para asegurar que products sea un array
  const safeProducts = Array.isArray(products) ? products : [];

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted">Cargando juegos...</p>
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
    <div className="mx-4 mx-md-5">
      <MockDataNotification 
        usingMockData={usingMockData}
        error={error}
        onRefetch={onRefetch}
        onForceMock={onForceMock}
      />
      
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {safeProducts.map((product) => (
          <Col key={product.id}>
            <ProductCard 
              product={product} 
              addToCart={addToCart} 
              removeFromCart={removeFromCart}
              cartItems={cartItems}
              updateQuantity={updateQuantity}
            />
          </Col>
        ))}
      </Row>
      
      <div className="text-center mt-4">
        <Button variant="link" onClick={handleShow} className="text-muted">
          Aviso Legal
        </Button>
      </div>

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
