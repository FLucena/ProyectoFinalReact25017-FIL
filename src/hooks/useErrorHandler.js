import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export const useErrorHandler = () => {
  const [errors, setErrors] = useState({});

  const handleError = useCallback((error, context = 'general') => {
    console.error(`Error in ${context}:`, error);
    
    // Determinar el tipo de error y mensaje apropiado
    let message = 'Ha ocurrido un error inesperado';
    let type = 'error';
    
    if (error?.message) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    } else if (error?.response?.status) {
      // Error de API
      switch (error.response.status) {
        case 400:
          message = 'Datos inválidos enviados al servidor';
          break;
        case 401:
          message = 'No tienes permisos para realizar esta acción';
          break;
        case 403:
          message = 'Acceso denegado';
          break;
        case 404:
          message = 'Recurso no encontrado';
          break;
        case 500:
          message = 'Error interno del servidor';
          break;
        default:
          message = `Error del servidor (${error.response.status})`;
      }
    } else if (error?.name === 'NetworkError' || error?.code === 'NETWORK_ERROR') {
      message = 'Error de conexión. Verifica tu conexión a internet';
      type = 'warning';
    } else if (error?.name === 'TimeoutError') {
      message = 'La operación tardó demasiado. Inténtalo de nuevo';
      type = 'warning';
    }

    // Mostrar toast
    toast[type](message, {
      autoClose: 5000,
      position: 'top-right',
    });

    // Guardar error en el estado
    setErrors(prev => ({
      ...prev,
      [context]: {
        message,
        timestamp: new Date().toISOString(),
        originalError: error
      }
    }));

    return message;
  }, []);

  const clearError = useCallback((context = 'general') => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[context];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const getError = useCallback((context = 'general') => {
    return errors[context];
  }, [errors]);

  const hasError = useCallback((context = 'general') => {
    return !!errors[context];
  }, [errors]);

  return {
    errors,
    handleError,
    clearError,
    clearAllErrors,
    getError,
    hasError
  };
}; 