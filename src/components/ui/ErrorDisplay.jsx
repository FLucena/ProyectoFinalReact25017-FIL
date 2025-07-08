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
    <Alert variant={getVariant()} className={`py-2 px-3 d-flex align-items-center ${className}`} style={{ marginBottom: 0 }}>
      <div className="d-flex align-items-center me-3">
        {getIcon()}
        <div className="ms-2">
          <strong>{getTitle()}</strong>
          <span className="ms-2 small text-muted">{getMessage()}</span>
        </div>
      </div>
      <div className="ms-auto d-flex gap-2 align-items-center">
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
        {children}
      </div>
    </Alert>
  );
};

export default ErrorDisplay; 