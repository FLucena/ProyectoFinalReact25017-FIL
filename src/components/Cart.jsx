"use client"

import { Minus, Plus, Trash2, Lock } from "lucide-react"
import { useState } from "react"
import { Modal, Button, Offcanvas } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"

const Cart = ({ cart, removeFromCart, closeCart, updateQuantity, clearCart, isOpen = true, toggleLogin }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const { isAuthenticated } = useAuth();

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

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isAuthenticated) {
    return (
      <Offcanvas show={isOpen} onHide={closeCart} placement="end" backdropClassName="bg-dark bg-opacity-50">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="p-4 text-center">
            <Lock size={48} className="text-muted mb-3" />
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
            >
              Iniciar Sesión
            </Button>
            <Button variant="outline-secondary" onClick={closeCart}>
              Continuar Comprando
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    );
  }

  return (
    <>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end" backdropClassName="bg-dark bg-opacity-50">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.length > 0 && (
            <div className="p-2 border-bottom text-end">
              <button className="btn btn-outline-danger btn-sm" onClick={() => setShowClearModal(true)}>
                Vaciar Carrito
              </button>
            </div>
          )}
          {cart.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-secondary mb-3">Tu carrito está vacío</p>
              <button onClick={closeCart} className="btn btn-danger">
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              <div className="border-bottom">
                {cart.map((item) => (
                  <div key={item.id} className="p-3 border-bottom">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3 bg-light rounded" style={{ width: "80px", height: "80px" }}>
                        <img
                          src={item.image || item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                          className="w-100 h-100 p-2"
                          style={{ objectFit: "contain" }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder.svg?height=80&width=80";
                          }}
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
                          <p className="text-muted mb-0">x{item.quantity}</p>
                        </div>
                        <p className="text-danger fw-bold mb-2">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="input-group input-group-sm justify-content-center align-items-center" style={{ width: "120px" }}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="btn btn-outline-secondary"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="input-group-text bg-white text-center d-flex justify-content-center align-items-center" style={{ minWidth: "40px", width: "40px", height: "32px" }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="btn btn-outline-secondary"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => handleDeleteClick(item)}
                            className="btn btn-sm text-danger"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-top sticky-bottom bg-white">
                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold text-danger">${total.toFixed(2)}</span>
                </div>
                <button className="btn btn-danger w-100 py-2">Proceder al Pago</button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este juego del carrito?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showClearModal} onHide={() => setShowClearModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Vaciar Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas vaciar todo el carrito?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClearModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => { clearCart(); setShowClearModal(false); }}>
            Vaciar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;