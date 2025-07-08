import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { AlertCircle, RefreshCw, X } from 'lucide-react';

const ErrorDisplay = ({ 
  error, 
  onRetry, 
  onDismiss, 
  variant = 'danger',
  title = 'Error',
  showRetry = true,
  showDismiss = true,
  className = '',
  children 
}) => {
  if (!error) return null;

  const getVariant = () => {
    if (typeof error === 'string') {
      if (error.includes('❌')) return 'danger';
      if (error.includes('⚠️')) return 'warning';
      if (error.includes('🛠️')) return 'info';
    }
    return variant;
  };

  const getIcon = () => {
    const errorVariant = getVariant();
    switch (errorVariant) {
      case 'warning':
        return <AlertCircle size={20} className="text-warning" />;
      case 'info':
        return <AlertCircle size={20} className="text-info" />;
      default:
        return <AlertCircle size={20} className="text-danger" />;
    }
  };

  const getTitle = () => {
    if (typeof error === 'string') {
      if (error.includes('❌')) return 'Error';
      if (error.includes('⚠️')) return 'Advertencia';
      if (error.includes('🛠️')) return 'Información';
    }
    return title;
  };

  const getMessage = () => {
    if (typeof error === 'string') {
      // Remover emojis del mensaje
      return error.replace(/[❌⚠️🛠️]/g, '').trim();
    }
    if (error?.message) {
      return error.message;
    }
    return 'Ha ocurrido un error inesperado';
  };

  return (
    <Alert variant={getVariant()} className={className}>
      <div className="d-flex align-items-start">
        <div className="me-2 mt-1">
          {getIcon()}
        </div>
        <div className="flex-grow-1">
          <h6 className="alert-heading mb-2">{getTitle()}</h6>
          <p className="mb-2">{getMessage()}</p>
          {children}
          
          <div className="d-flex gap-2 mt-3">
            {showRetry && onRetry && (
              <Button 
                variant={`outline-${getVariant()}`} 
                size="sm"
                onClick={onRetry}
                className="d-flex align-items-center gap-1"
              >
                <RefreshCw size={14} />
                Reintentar
              </Button>
            )}
            {showDismiss && onDismiss && (
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={onDismiss}
                className="d-flex align-items-center gap-1"
              >
                <X size={14} />
                Cerrar
              </Button>
            )}
          </div>
        </div>
      </div>
    </Alert>
  );
};

export default ErrorDisplay; 