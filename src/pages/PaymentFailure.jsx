import { useSearchParams, Link } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { XCircle, Home, ShoppingBag, RefreshCw } from 'lucide-react';

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  
  const paymentId = searchParams.get('payment_id');
  const preferenceId = searchParams.get('preference_id');
  const status = searchParams.get('status');
  const error = searchParams.get('error');

  const getErrorMessage = () => {
    if (error) return error;
    if (status === 'rejected') return 'El pago fue rechazado';
    if (status === 'cancelled') return 'El pago fue cancelado';
    return 'Ocurrió un error durante el proceso de pago';
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <XCircle size={64} className="text-danger mb-3" />
        <h1 className="text-danger">Pago Fallido</h1>
        <p className="lead">No se pudo procesar tu compra</p>
      </div>

      <Alert variant="danger" className="mb-4">
        <h6>Error:</h6>
        <p className="mb-0">{getErrorMessage()}</p>
      </Alert>

      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Información del Pago</h5>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-6">
              <p><strong>ID de Pago:</strong> {paymentId || 'N/A'}</p>
              <p><strong>Estado:</strong> 
                <span className="badge bg-danger ms-2">
                  {status || 'Fallido'}
                </span>
              </p>
            </div>
            <div className="col-md-6">
              <p><strong>Preferencia ID:</strong> {preferenceId || 'N/A'}</p>
              <p><strong>Fecha:</strong> {new Date().toLocaleDateString('es-AR')}</p>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Alert variant="info" className="mb-4">
        <h6>¿Qué puedes hacer?</h6>
        <ul className="mb-0">
          <li>Verificar que los datos de tu tarjeta sean correctos</li>
          <li>Intentar con otro método de pago</li>
          <li>Contactar a soporte si el problema persiste</li>
          <li>Recuerda que este es un proyecto educativo</li>
        </ul>
      </Alert>

      <div className="text-center">
        <Link to="/cart" className="btn btn-primary me-3">
          <RefreshCw size={16} className="me-2" />
          Intentar de Nuevo
        </Link>
        <Link to="/" className="btn btn-outline-primary me-3">
          <Home size={16} className="me-2" />
          Volver al Inicio
        </Link>
        <Link to="/products" className="btn btn-outline-secondary">
          <ShoppingBag size={16} className="me-2" />
          Seguir Comprando
        </Link>
      </div>
    </Container>
  );
};

export default PaymentFailure; 