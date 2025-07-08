import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { FaInfoCircle, FaSync } from 'react-icons/fa';
import ErrorDisplay from './ui/ErrorDisplay';

const MockDataNotification = ({ 
  usingMockData, 
  error, 
  onRefetch, 
  onForceMock,
  className = "mb-3" 
}) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  if (!usingMockData && !error) {
    return null;
  }

  // Si hay un error, usar ErrorDisplay
  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={onRefetch}
        onDismiss={() => setVisible(false)}
        className={className}
      >
      </ErrorDisplay>
    );
  }

  // Si no hay error pero estamos usando mock data
  return (
    <Alert variant="info" className={`py-2 px-3 d-flex align-items-center ${className}`} style={{ marginBottom: 0 }}>
      <div className="d-flex align-items-center me-3">
        <FaInfoCircle className="me-2" />
        <div>
          <strong>Información</strong>
          <div className="small text-muted">Usando datos de demostración</div>
        </div>
      </div>
      <div className="ms-auto d-flex gap-2 align-items-center">
        {onRefetch && (
          <Button 
            variant="outline-primary" 
            size="sm"
            onClick={onRefetch}
            aria-label="Reintentar carga de datos"
          >
            <FaSync className="me-1" />
            Reintentar
          </Button>
        )}
        <Button 
          variant="outline-secondary" 
          size="sm"
          onClick={() => setVisible(false)}
        >
          Cerrar
        </Button>
      </div>
    </Alert>
  );
};

export default MockDataNotification; 