import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Badge, Spinner, Alert } from "react-bootstrap";
import { ArrowLeft, ShoppingCart, Minus, Plus, Trash2, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useGameDetail } from '../../hooks/useGameDetail';

const ProductDetail = ({ games, loading: gamesLoading, error: gamesError, addToCart, removeFromCart, updateQuantity, cartItems }) => {
  const { id } = useParams();
  const { game: detailedGame, loading: detailLoading, error: detailError } = useGameDetail(id);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (games && games.length > 0) {
      const foundProduct = games.find(game => 
        String(game.id) === String(id) ||
        (typeof game.id === 'number' && game.id === parseInt(id, 10))
      );
      
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [games, id]);

  useEffect(() => {
    if (detailedGame) {
      setProduct(detailedGame);
    }
  }, [detailedGame]);

  useEffect(() => {
    if (cartItems && product) {
      const cartItem = cartItems.find((item) => item.id === product.id);
      if (cartItem) {
        setIsAdded(true);
        setQuantity(cartItem.quantity);
      } else {
        setIsAdded(false);
        setQuantity(1);
      }
    }
  }, [cartItems, product]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setIsAdded(true);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      const prevQuantity = quantity;
      setQuantity(newQuantity);
      updateQuantity(product.id, newQuantity, prevQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
    setIsAdded(false);
    setQuantity(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeSinceRelease = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: es });
    } catch (e) {
      return "fecha desconocida";
    }
  };

  const loading = gamesLoading || detailLoading;
  const error = detailError || gamesError;

  if (loading && !product) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      </Container>
    );
  }

  if (error && !product) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          Error al cargar el juego: {error}
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          No se encontró el juego con ID {id}. <Link to="/" className="alert-link">Volver a la tienda</Link>
        </Alert>
        <div className="mt-4">
          <p>Puede que el juego no esté disponible en este momento o el ID no exista en nuestra base de datos.</p>
          <Link to="/" className="btn btn-primary mt-3">Volver a la tienda</Link>
        </div>
      </Container>
    );
  }

  const { 
    title, 
    thumbnail, 
    description = "Un emocionante juego que te mantendrá al borde de tu asiento. Explora vastos mundos, supera desafíos y vive una experiencia inolvidable.",
    genre, 
    platform, 
    publisher, 
    release_date,
    game_url,
    short_description,
    screenshots,
    minimum_system_requirements,
    rating = (Math.random() * 2 + 3).toFixed(1),
    discount = Math.floor(Math.random() * 40),
    price = 29.99
  } = product;

  const discountedPrice = price - (price * (discount / 100));

  return (
    <Container className="py-4">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline-secondary d-inline-flex align-items-center gap-2">
          <ArrowLeft size={16} />
          Volver a la tienda
        </Link>
      </div>

      {detailLoading && (
        <Alert variant="info">
          Cargando información detallada del juego...
        </Alert>
      )}

      {detailError && (
        <Alert variant="warning">
          No se pudo cargar información detallada: {detailError}
        </Alert>
      )}

      <Row className="g-4">
        <Col md={5}>
          <div className="position-relative">
            <img
              src={thumbnail}
              alt={title}
              className="img-fluid rounded shadow"
              width="800"
              height="450"
              fetchpriority="high"
              crossorigin="anonymous"
              style={{ width: "100%", height: "350px", objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.svg";
              }}
              loading="lazy"
            />
            <Badge 
              bg="primary" 
              className="position-absolute top-0 end-0 m-3 fs-6 py-2 px-3"
            >
              {platform}
            </Badge>
          </div>

          {screenshots && screenshots.length > 0 && (
            <div className="mt-3">
              <h5>Capturas de pantalla</h5>
              <Row className="g-2 mt-2">
                {screenshots.slice(0, 3).map((screenshot, index) => (
                  <Col xs={4} key={index}>
                    <img 
                      src={screenshot.image} 
                      alt={`Screenshot ${index+1}`}
                      className="img-fluid rounded"
                      width="120"
                      height="80"
                      loading="lazy"
                      crossorigin="anonymous"
                      style={{height: "80px", width: "100%", objectFit: "cover"}}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.svg";
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Col>
        
        <Col md={7}>
          <div className="d-flex flex-column h-100">
            <h2 className="display-6 fw-bold mb-2">{title}</h2>
            
            <div className="mb-3">
              <Badge bg="success" className="me-2 py-2 px-3 fs-6">{genre}</Badge>
              <span className="d-inline-flex align-items-center ms-2 text-warning-accessible">
                <Star size={18} fill="currentColor" />
                <span className="ms-1 fw-semibold">{rating}</span>
              </span>
            </div>
            
            <div className="mb-3">
              <p className="text-muted mb-1">
                <strong>Desarrollador:</strong> {publisher}
              </p>
              <p className="text-muted mb-1">
                <strong>Lanzamiento:</strong> {formatDate(release_date)} ({getTimeSinceRelease(release_date)})
              </p>
              {game_url && (
                <p className="text-muted mb-1">
                  <strong>Sitio oficial:</strong> <a href={game_url} target="_blank" rel="noopener noreferrer">{game_url}</a>
                </p>
              )}
            </div>
            
            <p className="mb-4">{short_description || description}</p>
            
            {minimum_system_requirements && (
              <div className="mb-4">
                <h5>Requisitos mínimos del sistema</h5>
                <ul className="list-group">
                  {minimum_system_requirements.os && (
                    <li className="list-group-item"><strong>SO:</strong> {minimum_system_requirements.os}</li>
                  )}
                  {minimum_system_requirements.processor && (
                    <li className="list-group-item"><strong>Procesador:</strong> {minimum_system_requirements.processor}</li>
                  )}
                  {minimum_system_requirements.memory && (
                    <li className="list-group-item"><strong>Memoria:</strong> {minimum_system_requirements.memory}</li>
                  )}
                  {minimum_system_requirements.graphics && (
                    <li className="list-group-item"><strong>Gráficos:</strong> {minimum_system_requirements.graphics}</li>
                  )}
                  {minimum_system_requirements.storage && (
                    <li className="list-group-item"><strong>Almacenamiento:</strong> {minimum_system_requirements.storage}</li>
                  )}
                </ul>
              </div>
            )}
            
            <div className="mt-auto">
              <div className="mb-3">
                <div className="d-flex align-items-center">
                  {discount > 0 && (
                    <Badge bg="danger" className="me-2">-{discount}%</Badge>
                  )}
                  <div>
                    {discount > 0 && (
                      <span className="text-muted text-decoration-line-through me-2">
                        ${price.toFixed(2)}
                      </span>
                    )}
                    <span className="fs-3 fw-bold text-success">
                      ${discountedPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              {!isAdded ? (
                <Button
                  variant="danger"
                  size="lg"
                  className="d-flex align-items-center gap-2 ps-3"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} />
                  Añadir al carrito
                </Button>
              ) : (
                <div className="d-flex align-items-center">
                  <div className="input-group" style={{ width: "180px" }}>
                    <button
                      onClick={quantity === 1 ? handleRemove : () => handleQuantityChange(quantity - 1)}
                      className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                    >
                      {quantity === 1 ? <Trash2 size={18} /> : <Minus size={18} />}
                    </button>
                    <span 
                      className="input-group-text bg-white text-center d-flex align-items-center justify-content-center fs-5" 
                      style={{ width: "60px" }}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <span className="ms-3 fs-5 fw-bold text-primary">
                    Total: ${(discountedPrice * quantity).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail; 