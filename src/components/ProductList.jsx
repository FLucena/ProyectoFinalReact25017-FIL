"use client"

import { Row, Col, Modal, Button } from "react-bootstrap"
import ProductCard from "./ProductCard"
import { useState } from "react"

const ProductList = ({ products, addToCart, removeFromCart, cartItems, updateQuantity, loading, error }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No se encontraron juegos
      </div>
    )
  }

  return (
    <div className="mx-4 mx-md-5">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
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
