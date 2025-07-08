import React, { useState } from 'react';
import { Modal, Button, Alert, Card, Row, Col, Badge } from 'react-bootstrap';
import { CheckCircle, Download, Home, ShoppingBag, Receipt, FileText } from 'lucide-react';
import { getPaymentInfo } from '../../config/mercadopago';

const PaymentSuccessModal = ({ 
  show, 
  onHide, 
  paymentId, 
  preferenceId, 
  status,
  cartItems = [],
  total = 0,
  onDownloadReceipt 
}) => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (show && paymentId) {
      fetchPaymentInfo();
    }
  }, [show, paymentId]);

  const fetchPaymentInfo = async () => {
    setLoading(true);
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateReceipt = () => {
    const receiptData = {
      orderNumber: `ORD-${Date.now()}`,
      paymentId: paymentId,
      preferenceId: preferenceId,
      date: new Date().toISOString(),
      items: cartItems,
      total: total,
      paymentInfo: paymentInfo
    };

    // Crear contenido del recibo
    let receiptContent = `
RECIBO DE COMPRA
Mi Nuevo Vicio - Tienda de Videojuegos
===========================================

Número de Orden: ${receiptData.orderNumber}
ID de Pago: ${paymentId || 'N/A'}
Fecha: ${formatDate(new Date())}
Estado: ${status || 'Aprobado'}

PRODUCTOS COMPRADOS:
`;

    cartItems.forEach((item, index) => {
      receiptContent += `
${index + 1}. ${item.title}
   Cantidad: ${item.quantity}
   Precio unitario: ${formatPrice(item.price)}
   Subtotal: ${formatPrice(item.price * item.quantity)}
`;
    });

    receiptContent += `
===========================================
TOTAL: ${formatPrice(total)}

INFORMACIÓN DE PAGO:
Método: ${paymentInfo?.payment_method?.type || 'N/A'}
Fecha de pago: ${paymentInfo ? formatDate(paymentInfo.date_created) : formatDate(new Date())}

NOTAS:
- Este es un proyecto educativo
- No se realizaron cobros reales
- Los productos son simulados

Gracias por tu compra!
`;

    return receiptContent;
  };

  const downloadReceipt = () => {
    const receiptContent = generateReceipt();
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recibo-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (onDownloadReceipt) {
      onDownloadReceipt();
    }
  };

  const handleClose = () => {
    onHide();
    // Limpiar estados al cerrar
    setPaymentInfo(null);
    setError('');
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title className="d-flex align-items-center">
          <CheckCircle size={24} className="me-2" />
          ¡Pago Exitoso!
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-4">
        <div className="text-center mb-4">
          <CheckCircle size={64} className="text-success mb-3" />
          <h4 className="text-success">¡Tu compra ha sido procesada correctamente!</h4>
          <p className="text-muted">Gracias por confiar en Mi Nuevo Vicio</p>
        </div>

        {error && (
          <Alert variant="warning" className="mb-4">
            {error}
          </Alert>
        )}

        {/* Resumen de la compra */}
        <Card className="mb-4">
          <Card.Header>
            <h6 className="mb-0">
              <ShoppingBag size={16} className="me-2" />
              Resumen de tu Compra
            </h6>
          </Card.Header>
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
              <h5 className="mb-0 text-success">{formatPrice(total)}</h5>
            </div>
          </Card.Body>
        </Card>

        {/* Detalles del pago */}
        <Card className="mb-4">
          <Card.Header>
            <h6 className="mb-0">
              <Receipt size={16} className="me-2" />
              Detalles del Pago
            </h6>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <p><strong>ID de Pago:</strong> {paymentId || 'N/A'}</p>
                <p><strong>Estado:</strong> 
                  <Badge bg="success" className="ms-2">
                    {status || (paymentInfo?.status || 'Aprobado')}
                  </Badge>
                </p>
                <p><strong>Preferencia ID:</strong> {preferenceId || 'N/A'}</p>
              </Col>
              <Col md={6}>
                {paymentInfo && (
                  <>
                    <p><strong>Método de Pago:</strong> {paymentInfo.payment_method?.type || 'N/A'}</p>
                    <p><strong>Monto:</strong> {formatPrice(paymentInfo.transaction_amount || 0)}</p>
                    <p><strong>Fecha:</strong> {formatDate(paymentInfo.date_created || new Date())}</p>
                  </>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Información importante */}
        <Alert variant="info" className="mb-4">
          <h6>Información importante:</h6>
          <ul className="mb-0">
            <li>Este es un proyecto educativo - no se realizaron cobros reales</li>
            <li>Recibirás un email de confirmación (simulado)</li>
            <li>Los productos serán enviados a tu dirección registrada</li>
          </ul>
        </Alert>
      </Modal.Body>
      
      <Modal.Footer className="d-flex justify-content-between">
        <div>
          <Button 
            variant="outline-primary" 
            onClick={downloadReceipt}
            className="d-flex align-items-center gap-2"
          >
            <Download size={16} />
            Descargar Recibo
          </Button>
        </div>
        <div>
          <Button variant="secondary" onClick={handleClose} className="me-2">
            <Home size={16} className="me-2" />
            Volver al Inicio
          </Button>
          <Button variant="success" onClick={handleClose}>
            Continuar Comprando
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentSuccessModal; 