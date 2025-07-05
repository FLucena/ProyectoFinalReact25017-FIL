import { useEffect, useState } from 'react';

const LCPMonitor = () => {
  const [lcpValue, setLcpValue] = useState(null);
  const [lcpElement, setLcpElement] = useState(null);
  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    let lcpObserver;
    let lcpValue = 0;

    if ('PerformanceObserver' in window) {
      try {
        lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          if (lastEntry) {
            lcpValue = lastEntry.startTime;
            setLcpValue(lcpValue);
            setLcpElement(lastEntry.element);
            
            if (lcpValue < 2500) {
              setIsOptimized(true);
              // LCP Optimizado
            } else if (lcpValue < 4000) {
              // LCP Necesita Mejora
            } else {
              // LCP Pobre
            }
          }
        });

        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        console.warn('LCP monitoring failed:', error);
      }
    }

    const logLCPElement = () => {
      if (lcpElement) {
        // LCP Element registrado
      }
    };

    const timeoutId = setTimeout(logLCPElement, 5000);

    return () => {
      if (lcpObserver) {
        lcpObserver.disconnect();
      }
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
};

export default LCPMonitor; 