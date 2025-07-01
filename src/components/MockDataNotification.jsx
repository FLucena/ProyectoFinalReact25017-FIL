import { Alert, Button } from 'react-bootstrap';
import { FaInfoCircle, FaSync } from 'react-icons/fa';

const MockDataNotification = ({ 
  usingMockData, 
  error, 
  onRefetch, 
  onForceMock,
  className = "mb-3" 
}) => {
  if (!usingMockData && !error) {
    return null;
  }

  const getVariant = () => {
    if (error && error.includes('❌')) return 'danger';
    if (error && error.includes('🛠️')) return 'info';
    return 'warning';
  };

  const getIcon = () => {
    if (error && error.includes('❌')) return <FaInfoCircle />;
    if (error && error.includes('🛠️')) return <FaInfoCircle />;
    return <FaInfoCircle />;
  };

  return (
    <Alert variant={getVariant()} className={className}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <span className="me-2">{getIcon()}</span>
          <span>{error || "Usando datos de demostración"}</span>
        </div>
        <div className="d-flex gap-2">
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
          {onForceMock && (
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={onForceMock}
              aria-label="Forzar datos de demostración"
            >
              Usar Demo
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
};

export default MockDataNotification; 