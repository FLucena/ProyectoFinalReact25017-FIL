import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { CheckCircle, Home, ShoppingBag, Receipt } from 'lucide-react';
import { getPaymentInfo } from '../config/mercadopago';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const paymentId = searchParams.get('payment_id');
  const preferenceId = searchParams.get('preference_id');
  const status = searchParams.get('status');

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      if (paymentId) {
        try {
          const result = await getPaymentInfo(paymentId);
          if (result.success) {
            setPaymentInfo(result.payment);
          } else {
            setError('No se pudo obtener la información del pago');
          }
        } catch (err) {
          console.error('Error fetching payment info:', err);
          setError('Error al obtener información del pago');
        }
      }
      setLoading(false);
    };

    fetchPaymentInfo();
  }, [paymentId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Verificando pago...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <CheckCircle size={64} className="text-success mb-3" />
        <h1 className="text-success">¡Pago Exitoso!</h1>
        <p className="lead">Tu compra ha sido procesada correctamente</p>
      </div>

      {error && (
        <Alert variant="warning" className="mb-4">
          {error}
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">
            <Receipt size={20} className="me-2" />
            Detalles del Pago
          </h5>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-6">
              <p><strong>ID de Pago:</strong> {paymentId || 'N/A'}</p>
              <p><strong>Estado:</strong> 
                <span className="badge bg-success ms-2">
                  {status || (paymentInfo?.status || 'Aprobado')}
                </span>
              </p>
              <p><strong>Preferencia ID:</strong> {preferenceId || 'N/A'}</p>
            </div>
            <div className="col-md-6">
              {paymentInfo && (
                <>
                  <p><strong>Método de Pago:</strong> {paymentInfo.payment_method?.type || 'N/A'}</p>
                  <p><strong>Monto:</strong> {formatPrice(paymentInfo.transaction_amount || 0)}</p>
                  <p><strong>Fecha:</strong> {formatDate(paymentInfo.date_created || new Date())}</p>
                </>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>

      <Alert variant="info" className="mb-4">
        <h6>Información importante:</h6>
        <ul className="mb-0">
          <li>Este es un proyecto educativo - no se realizaron cobros reales</li>
          <li>Recibirás un email de confirmación (simulado)</li>
          <li>Los productos serán enviados a tu dirección registrada</li>
        </ul>
      </Alert>

      <div className="text-center">
        <Link to="/" className="btn btn-primary me-3">
          <Home size={16} className="me-2" />
          Volver al Inicio
        </Link>
        <Link to="/cart" className="btn btn-outline-primary">
          <ShoppingBag size={16} className="me-2" />
          Ver Carrito
        </Link>
      </div>
    </Container>
  );
};

export default PaymentSuccess; 