"use client"

import { Minus, Plus, Trash2, Lock, ShoppingCart } from "lucide-react"
import { FaMinus, FaPlus, FaTrash, FaLock, FaShoppingCart, FaCreditCard, FaTimes } from "react-icons/fa"
import { useState } from "react"
import { Modal, Button, Offcanvas } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import ImageWithFallback from "./ui/ImageWithFallback"
import Checkout from "./Checkout"

const Cart = ({ cart, removeFromCart, closeCart, updateQuantity, clearCart, isOpen = true, toggleLogin, onExited }) => {
  // Estados para manejo de modales de confirmación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const { isAuthenticated } = useAuth();

  // Calcula el total y cantidad de items para mostrar en el header
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete.id);
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearModal(false);
  };

  // Renderiza pantalla de acceso restringido si no está autenticado
  if (!isAuthenticated) {
    return (
      <Offcanvas 
        show={isOpen} 
        onHide={closeCart} 
        placement="end" 
        backdropClassName="bg-dark bg-opacity-50"
        aria-labelledby="cart-title"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="cart-title">
            <FaShoppingCart size={20} className="me-2" />
            Carrito de Compras
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="p-4 text-center">
            <FaLock size={48} className="text-muted mb-3" aria-hidden="true" />
            <h5 className="mb-3">Acceso Restringido</h5>
            <p className="text-secondary mb-4">
              Necesitas iniciar sesión para acceder al carrito de compras.
            </p>
            <Button 
              variant="danger" 
              onClick={() => {
                closeCart();
                toggleLogin();
              }}
              className="me-2"
              aria-label="Iniciar sesión para acceder al carrito"
            >
              Iniciar Sesión
            </Button>
            <Button 
              variant="outline-secondary" 
              onClick={closeCart}
              aria-label="Cerrar carrito y continuar comprando"
            >
              Continuar Comprando
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    );
  }

  return (
    <>
      <Offcanvas 
        show={isOpen} 
        onHide={closeCart} 
        placement="end" 
        backdropClassName="bg-dark bg-opacity-50"
        onExited={onExited}
        aria-labelledby="cart-title"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="cart-title">
            <FaShoppingCart size={20} className="me-2" />
            Carrito de Compras
            {itemCount > 0 && (
              <span className="badge bg-danger ms-2">{itemCount}</span>
            )}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          {/* Botón para vaciar carrito - solo visible si hay items */}
          {cart.length > 0 && (
            <div className="p-2 border-bottom text-end">
              <Button 
                variant="outline-danger" 
                size="sm" 
                onClick={() => setShowClearModal(true)}
                aria-label="Vaciar todo el carrito"
              >
                Vaciar Carrito
              </Button>
            </div>
          )}
          
          <div className="flex-grow-1">
            {cart.length === 0 ? (
              // Estado vacío del carrito
              <div className="p-4 text-center">
                <FaShoppingCart size={48} className="text-muted mb-3" aria-hidden="true" />
                <p className="text-secondary mb-3">Tu carrito está vacío</p>
                <Button 
                  variant="danger" 
                  onClick={closeCart}
                  aria-label="Cerrar carrito y continuar comprando"
                >
                  Continuar Comprando
                </Button>
              </div>
            ) : (
              // Lista de productos en el carrito
              <div className="border-bottom">
                {cart.map((item) => (
                  <div key={item.id} className="p-3 border-bottom">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3" style={{ width: "80px", height: "80px" }}>
                        <ImageWithFallback
                          src={item.image || item.thumbnail}
                          alt={`Imagen de ${item.title}`}
                          width="80"
                          height="80"
                          aspectRatio="1/1"
                          style={{ width: "80px", height: "80px" }}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h5
                          className="fs-6 mb-1"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {item.title}
                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <p className="text-danger fw-bold mb-0">${item.price.toFixed(2)}</p>
                          <p className="text-muted mb-0">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="text-danger fw-bold mb-2">
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          {/* Controles de cantidad con botones +/- */}
                          <div className="input-group input-group-sm justify-content-center align-items-center" style={{ width: "120px" }}>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label={`Reducir cantidad de ${item.title}`}
                            >
                              <FaMinus size={14} />
                            </Button>
                            <span 
                              className="input-group-text bg-white text-center d-flex justify-content-center align-items-center" 
                              style={{ minWidth: "40px", width: "40px", height: "32px" }}
                              aria-label={`Cantidad actual: ${item.quantity}`}
                            >
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label={`Aumentar cantidad de ${item.title}`}
                            >
                              <FaPlus size={14} />
                            </Button>
                          </div>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => handleDeleteClick(item)}
                            className="text-danger p-0"
                            aria-label={`Eliminar ${item.title} del carrito`}
                          >
                            <FaTrash size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Resumen y botón de pago - solo visible si hay items */}
          {cart.length > 0 && (
            <div className="p-3 border-top bg-white">
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Total ({itemCount} {itemCount === 1 ? 'artículo' : 'artículos'}):</span>
                <span className="fw-bold text-danger">${total.toFixed(2)}</span>
              </div>
              <Button 
                variant="danger" 
                className="w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                onClick={() => setShowCheckout(true)}
                aria-label="Proceder al pago con MercadoPago"
              >
                <FaCreditCard size={16} />
                Pagar con MercadoPago
              </Button>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Modal de confirmación para eliminar item individual */}
      <Modal 
        show={showDeleteModal} 
        onHide={() => setShowDeleteModal(false)} 
        centered
        aria-labelledby="delete-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="delete-modal-title">Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar "{itemToDelete?.title}" del carrito?
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowDeleteModal(false)}
            aria-label="Cancelar eliminación"
          >
            Cancelar
          </Button>
          <Button 
            variant="danger" 
            onClick={handleConfirmDelete}
            aria-label="Confirmar eliminación del producto"
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación para vaciar todo el carrito */}
      <Modal 
        show={showClearModal} 
        onHide={() => setShowClearModal(false)} 
        centered
        aria-labelledby="clear-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="clear-modal-title">Vaciar Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas vaciar todo el carrito? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowClearModal(false)}
            aria-label="Cancelar vaciado del carrito"
          >
            Cancelar
          </Button>
          <Button 
            variant="danger" 
            onClick={handleClearCart}
            aria-label="Confirmar vaciado del carrito"
          >
            Vaciar Carrito
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Componente de Checkout con MercadoPago */}
      <Checkout
        show={showCheckout}
        onHide={() => setShowCheckout(false)}
        cartItems={cart}
        total={total}
        onPaymentSuccess={() => {
          clearCart();
          setShowCheckout(false);
          closeCart();
        }}
        onPaymentFailure={() => {
          setShowCheckout(false);
        }}
      />
    </>
  );
};

export default Cart;