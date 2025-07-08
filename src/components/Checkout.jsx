import { useState } from 'react';
import { Button, Modal, Alert, Spinner, Card } from 'react-bootstrap';
import { CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { createPaymentPreference } from '../config/mercadopago';
import PaymentSuccessModal from './payment/PaymentSuccessModal';

const Checkout = ({ show, onHide, cartItems, total, onPaymentSuccess, onPaymentFailure }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const handleCheckout = async () => {
    if (!cartItems || cartItems.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Crear preferencia de pago en MercadoPago
      const result = await createPaymentPreference(cartItems);

      if (result.success) {
        // Simular pago exitoso y mostrar modal
        setPaymentData({
          paymentId: result.preferenceId,
          preferenceId: result.preferenceId,
          status: 'approved',
          cartItems,
          total
        });
        setShowSuccessModal(true);
        onHide(); // Cerrar modal de checkout
        toast.success('¡Pago simulado exitoso!');
        if (onPaymentSuccess) onPaymentSuccess();
      } else {
        setError(result.error || 'Error al crear la preferencia de pago');
        toast.error('Error al procesar el pago');
        if (onPaymentFailure) onPaymentFailure();
      }
    } catch (err) {
      console.error('Error en checkout:', err);
      setError('Error inesperado al procesar el pago');
      toast.error('Error inesperado');
      if (onPaymentFailure) onPaymentFailure();
    } finally {
      setLoading(false);
    }
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
            <CreditCard size={20} className="me-2" />
            Finalizar Compra
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {error && (
            <Alert variant="danger" className="mb-3">
              <XCircle size={16} className="me-2" />
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

          <Alert variant="info" className="mb-3">
            <CheckCircle size={16} className="me-2" />
            <strong>Información importante:</strong>
            <ul className="mb-0 mt-2">
              <li>Este es un proyecto educativo - no se realizarán cobros reales</li>
              <li>Usarás credenciales de prueba de MercadoPago</li>
              <li>Puedes usar tarjetas de prueba para simular pagos</li>
            </ul>
          </Alert>

          <div className="text-center">
            <p className="text-muted small mb-3">
              Tarjetas de prueba disponibles:
              <br />
              <strong>Visa:</strong> 4509 9535 6623 3704 | <strong>Mastercard:</strong> 5031 4332 1540 6351
            </p>
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
                <CreditCard size={16} className="me-2" />
                Pagar con MercadoPago
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de éxito de pago */}
      {showSuccessModal && paymentData && (
        <PaymentSuccessModal
          show={showSuccessModal}
          onHide={() => setShowSuccessModal(false)}
          paymentId={paymentData.paymentId}
          preferenceId={paymentData.preferenceId}
          status={paymentData.status}
          cartItems={paymentData.cartItems}
          total={paymentData.total}
        />
      )}
    </>
  );
};

export default Checkout; 