import { useEffect, useRef, useState } from 'react';

export const useLayoutShift = (options = {}) => {
  const {
    minHeight = 'auto',
    minWidth = 'auto',
    aspectRatio = null,
    placeholder = true
  } = options;

  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      
      // Establecer dimensiones mínimas para prevenir cambios de diseño
      if (minHeight !== 'auto') {
        container.style.minHeight = minHeight;
      }
      if (minWidth !== 'auto') {
        container.style.minWidth = minWidth;
      }
      if (aspectRatio) {
        container.style.aspectRatio = aspectRatio;
      }

      // Usar ResizeObserver para rastrear dimensiones reales
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { width, height } = entry.contentRect;
          setDimensions({ width, height });
        });
      });

      resizeObserver.observe(container);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [minHeight, minWidth, aspectRatio]);

  const markAsLoaded = () => {
    setIsLoaded(true);
  };

  return {
    containerRef,
    isLoaded,
    dimensions,
    markAsLoaded,
    containerStyle: {
      minHeight: minHeight !== 'auto' ? minHeight : undefined,
      minWidth: minWidth !== 'auto' ? minWidth : undefined,
      aspectRatio: aspectRatio || undefined,
      position: 'relative',
      overflow: 'hidden'
    }
  };
};

// Hook para prevenir cambios de diseño en listas
export const useListLayoutShift = (itemCount, itemHeight = 'auto') => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && itemCount > 0) {
      // Calcular altura total para reservar espacio
      const container = containerRef.current;
      if (itemHeight !== 'auto') {
        container.style.minHeight = `calc(${itemHeight} * ${itemCount})`;
      }
      setIsLoading(false);
    }
  }, [itemCount, itemHeight]);

  return {
    containerRef,
    isLoading,
    containerStyle: {
      minHeight: itemHeight !== 'auto' ? `calc(${itemHeight} * ${itemCount})` : undefined,
      position: 'relative'
    }
  };
};

// Hook para prevenir cambios de diseño en modales
export const useModalLayoutShift = () => {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current && isVisible) {
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isVisible]);

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  return {
    modalRef,
    isVisible,
    showModal,
    hideModal,
    modalStyle: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1050,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  };
}; 