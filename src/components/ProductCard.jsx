"use client"

import { Card, Button, Badge } from "react-bootstrap"
import { FaShoppingCart, FaMinus, FaPlus, FaTrash, FaEye, FaStar, FaHeart, FaShare } from "react-icons/fa"
import { toast } from "react-toastify"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ImageWithFallback from "./ui/ImageWithFallback"
import styled from 'styled-components'
import { useFavorites } from '../context/FavoritesContext'

// Styled-components
const StyledCard = styled(Card)`
  height: 100%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    transform: translateY(-2px);
  }
`

const ImageWrapper = styled.div`
  position: relative;
`

const StyledImage = styled(ImageWithFallback)`
  height: 200px;
  object-fit: cover;
  width: 100%;
`

const StyledBadge = styled(Badge)`
  font-size: 0.8rem;
`

const StyledTitle = styled(Card.Title)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
  min-height: 2.6em;
`

const ActionOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: white;
    transform: scale(1.1);
  }
`

const ProductCard = ({ product, addToCart, removeFromCart, cartItems, updateQuantity }) => {
  const { title, thumbnail, genre, platform, publisher, release_date, discount, rating } = product
  const [quantity, setQuantity] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (cartItems) {
      const cartItem = cartItems.find((item) => item.id === product.id);
      if (cartItem) {
        setIsAdded(true);
        setQuantity(cartItem.quantity);
      } else {
        setIsAdded(false);
        setQuantity(0);
      }
    }
  }, [cartItems, product.id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Fecha no disponible';
    }
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleQuantityChange = (e, newQuantity) => {
    e.preventDefault();
    e.stopPropagation();
    if (newQuantity > 0) {
      updateQuantity(product.id, newQuantity);
    } else {
      removeFromCart(product.id);
    }
  };

  // Doble click/tap para mobile
  let lastTap = 0;
  const handleImageDoubleClick = (e) => {
    const now = Date.now();
    if (now - lastTap < 400) {
      toggleFavorite(product);
      toast(isFavorite(product.id) ? "Quitado de favoritos" : "Agregado a favoritos", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        type: isFavorite(product.id) ? "error" : "success"
      });
    }
    lastTap = now;
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
    toast(isFavorite(product.id) ? "Quitado de favoritos" : "Agregado a favoritos", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      type: isFavorite(product.id) ? "error" : "success"
    });
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `¡Mira este juego: ${title}!`,
        url: window.location.href
      }).then(() => {
        toast.info("¡Juego compartido exitosamente!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }).catch(() => {
        toast.error("Error al compartir el juego");
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.info("Enlace copiado al portapapeles", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }).catch(() => {
        toast.error("Error al copiar el enlace");
      });
    }
  };

  const formatPrice = (price) => {
    return typeof price === 'number' ? `$${price.toFixed(2)}` : '$29.99';
  };

  const getDiscountPrice = () => {
    const originalPrice = product.price || 29.99;
    const discount = product.discount || 0;
    return originalPrice * (1 - discount / 100);
  };

  return (
    <StyledCard role="article" aria-labelledby={`product-title-${product.id}`}>
      <ImageWrapper>
        <StyledImage
          src={thumbnail}
          alt={`Imagen de ${title}`}
          loading="lazy"
          onClick={handleImageDoubleClick}
        />
        {discount && discount > 0 && (
          <StyledBadge 
            bg="danger" 
            className="position-absolute top-0 start-0 m-2"
            aria-label={`Descuento del ${discount}%`}
          >
            -{discount}%
          </StyledBadge>
        )}
        {rating && (
          <StyledBadge 
            bg="warning" 
            text="dark"
            className="position-absolute top-0 end-0 m-2 d-flex align-items-center gap-1"
            aria-label={`Calificación de ${rating.toFixed(1)} estrellas`}
          >
            <FaStar size={12} />
            {rating.toFixed(1)}
          </StyledBadge>
        )}
        <StyledBadge 
          bg="primary" 
          className="position-absolute bottom-0 start-0 m-2"
          aria-label={`Plataforma: ${platform}`}
        >
          {platform}
        </StyledBadge>
        
        <ActionOverlay role="group" aria-label="Acciones del producto">
          <ActionButton
            onClick={handleFavorite}
            title={isFavorite(product.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
            aria-label={isFavorite(product.id) ? `Quitar ${title} de favoritos` : `Agregar ${title} a favoritos`}
            aria-pressed={isFavorite(product.id)}
          >
            <FaHeart color={isFavorite(product.id) ? "#dc3545" : "#6c757d"} size={16} aria-hidden="true" />
          </ActionButton>
          <ActionButton
            onClick={handleShare}
            title="Compartir"
            aria-label={`Compartir ${title}`}
          >
            <FaShare color="#6c757d" size={16} aria-hidden="true" />
          </ActionButton>
        </ActionOverlay>
      </ImageWrapper>
      <Card.Body className="d-flex flex-column">
        <StyledTitle 
          id={`product-title-${product.id}`}
          className="fs-6 fw-bold mb-2"
        >
          {title}
        </StyledTitle>
        
        <div className="mb-2" role="group" aria-label="Información del juego">
          <Badge bg="success" className="me-2" aria-label={`Género: ${genre}`}>
            {genre}
          </Badge>
        </div>
        
        <Card.Text className="small text-muted mb-2">
          <span aria-label={`Editor: ${publisher || 'No disponible'}`}>
            Editor: {publisher || 'No disponible'}
          </span>
        </Card.Text>
        
        <Card.Text className="small text-muted mb-3">
          <span aria-label={`Fecha de lanzamiento: ${formatDate(release_date)}`}>
            Fecha: {formatDate(release_date)}
          </span>
        </Card.Text>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div role="group" aria-label="Precio del producto">
              {product.discount && product.discount > 0 ? (
                <div>
                  <span 
                    className="text-decoration-line-through text-muted small"
                    aria-label={`Precio original: ${formatPrice(product.price)}`}
                  >
                    {formatPrice(product.price)}
                  </span>
                  <br />
                  <span 
                    className="text-danger fw-bold fs-6"
                    aria-label={`Precio con descuento: ${formatPrice(getDiscountPrice())}`}
                  >
                    {formatPrice(getDiscountPrice())}
                  </span>
                </div>
              ) : (
                <span 
                  className="text-danger fw-bold fs-6"
                  aria-label={`Precio: ${formatPrice(product.price)}`}
                >
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>
          
          <div className="d-flex gap-2">
            <Link 
              to={`/product/${product.id}`} 
              className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center gap-1"
              style={{ textDecoration: 'none' }}
              aria-label={`Ver detalles de ${title}`}
            >
              <FaEye size={15} aria-hidden="true" />
            </Link>
            
            {!isAdded ? (
              <Button
                variant="danger"
                size="sm"
                onClick={handleAddToCart}
                className="d-flex align-items-center gap-1"
                title="Agregar al carrito"
                aria-label={`Agregar ${title} al carrito`}
              >
                <FaShoppingCart size={16} aria-hidden="true" />
              </Button>
            ) : (
              <div className="btn-group btn-group-sm" role="group" aria-label={`Controles de cantidad para ${title}`}>
                <Button 
                  variant="outline-danger" 
                  onClick={(e) => handleQuantityChange(e, quantity - 1)}
                  title="Reducir cantidad"
                  aria-label={quantity === 1 ? `Eliminar ${title} del carrito` : `Reducir cantidad de ${title}`}
                >
                  {quantity === 1 ? <FaTrash size={14} aria-hidden="true" /> : <FaMinus size={14} aria-hidden="true" />}
                </Button>
                <span className="btn btn-outline-secondary disabled" aria-label={`Cantidad: ${quantity}`}>
                  {quantity}
                </span>
                <Button 
                  variant="outline-danger" 
                  onClick={(e) => handleQuantityChange(e, quantity + 1)}
                  title="Aumentar cantidad"
                  aria-label={`Aumentar cantidad de ${title}`}
                >
                  <FaPlus size={14} aria-hidden="true" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card.Body>
    </StyledCard>
  )
}

export default ProductCard
