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
  if (!usingMockData && !error) {
    return null;
  }

  // Si hay un error, usar ErrorDisplay
  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={onRefetch}
        onDismiss={onForceMock}
        className={className}
      >
        {onForceMock && (
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={onForceMock}
            aria-label="Forzar datos de demostración"
            className="mt-2"
          >
            Usar Demo
          </Button>
        )}
      </ErrorDisplay>
    );
  }

  // Si no hay error pero estamos usando mock data
  return (
    <Alert variant="info" className={className}>
      <span className="me-2"><FaInfoCircle /></span>
      <span>Usando datos de demostración</span>
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