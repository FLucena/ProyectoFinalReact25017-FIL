"use client"

import { Card, Button, Badge } from "react-bootstrap"
import { ShoppingCart, Minus, Plus, Trash2, Eye } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const ProductCard = ({ product, addToCart, removeFromCart, cartItems, updateQuantity }) => {
  const { title, thumbnail, genre, platform, publisher, release_date } = product
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    if (cartItems) {
      const cartItem = cartItems.find((item) => item.id === product.id);
      if (cartItem) {
        setIsAdded(true);
        setQuantity(cartItem.quantity);
      } else {
        setIsAdded(false);
        setQuantity(1);
      }
    }
  }, [cartItems, product.id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    setIsAdded(true)
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      const prevQuantity = quantity;
      setQuantity(newQuantity);
      updateQuantity(product.id, newQuantity, prevQuantity);
    }
  }

  const handleRemove = () => {
    removeFromCart(product.id)
    setIsAdded(false)
    setQuantity(1)
  }

  return (
    <Card className="h-100 shadow-sm hover-shadow transition">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={thumbnail}
          alt={title}
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "/placeholder.svg"
          }}
        />
        <Badge 
          bg="primary" 
          className="position-absolute top-0 end-0 m-2"
        >
          {platform}
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6 fw-bold mb-2">{title}</Card.Title>
        <div className="mb-2">
          <Badge bg="success" className="me-2">{genre}</Badge>
        </div>
        <Card.Text className="small text-muted mb-2">
          Editor: {publisher}
        </Card.Text>
        <Card.Text className="small text-muted mb-3">
          Fecha de lanzamiento: {formatDate(release_date)}
        </Card.Text>
        
        <div className="d-flex gap-2 mb-2">
          <Link to={`/product/${product.id}`} className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center gap-1">
            <Eye size={15} />
            Detalles
          </Link>
        </div>
        
        {!isAdded ? (
          <Button
            variant="outline-primary"
            className="mt-auto d-flex align-items-center justify-content-center gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
            Añadir al carrito
          </Button>
        ) : (
          <div className="mt-auto w-100 d-flex justify-content-center">
            <div className="input-group input-group-sm" style={{ width: "140px" }}>
              <button
                onClick={quantity === 1 ? handleRemove : () => handleQuantityChange(quantity - 1)}
                className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                style={{ width: "40px" }}
              >
                {quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
              </button>
              <span 
                className="input-group-text bg-white text-center d-flex align-items-center justify-content-center" 
                style={{ width: "60px" }}
              >
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                style={{ width: "40px" }}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductCard
