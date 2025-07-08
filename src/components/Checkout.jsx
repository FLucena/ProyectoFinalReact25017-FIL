import { useState } from 'react';
import { Button, Modal, Alert, Spinner, Card } from 'react-bootstrap';

const Checkout = ({ show, onHide, cartItems, total, onPurchaseSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCheckout = async () => {
    if (!cartItems || cartItems.length === 0) {
      setError('El carrito está vacío');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setShowSuccessModal(true);
      setLoading(false);
      if (onPurchaseSuccess) onPurchaseSuccess();
      onHide();
    }, 1000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Finalizar Compra
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}
          <div className="mb-4">
            <h6>Resumen de tu compra:</h6>
            <Card className="border-0 bg-light">
              <Card.Body>
                {cartItems.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <strong>{item.title}</strong>
                      <br />
                      <small className="text-muted">
                        Cantidad: {item.quantity} x {formatPrice(item.price)}
                      </small>
                    </div>
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Total:</h6>
                  <h5 className="mb-0 text-primary">{formatPrice(total)}</h5>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Cancelar
          </Button>
          <Button 
            variant="success" 
            onClick={handleCheckout}
            disabled={loading || !cartItems || cartItems.length === 0}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Procesando...
              </>
            ) : (
              <>
                Confirmar Compra
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal de éxito de compra */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>¡Compra realizada con éxito!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h4 className="text-success mb-3">¡Gracias por tu compra!</h4>
          <p>Tu pedido ha sido registrado correctamente.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSuccessModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Checkout; 