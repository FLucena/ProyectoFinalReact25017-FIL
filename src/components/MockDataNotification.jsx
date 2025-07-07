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
      <span className="me-2">{getIcon()}</span>
      <span>{error || "Usando datos de demostración"}</span>
      {onRefetch && (
        <Button 
          variant="outline-primary" 
          size="sm"
          onClick={onRefetch}
          aria-label="Reintentar carga de datos"
          className="mx-4"
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
    </Alert>
  );
};

export default MockDataNotification; 