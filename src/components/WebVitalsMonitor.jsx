import { useEffect } from 'react';

const WebVitalsMonitor = () => {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    // Monitor CLS
    let clsValue = 0;
    let clsEntries = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
          
          // CLS Entry registrada
        }
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });

    // Monitor LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      // LCP registrado
    });

    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor FID
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // FID registrado
      }
    });

    fidObserver.observe({ entryTypes: ['first-input'] });

    // Log final CLS on page unload
    const handleBeforeUnload = () => {
      // Final CLS registrado
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Log development info
    if (import.meta.env.DEV) {
      // Web Vitals Monitor activo en modo desarrollo
    }

    return () => {
      observer.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default WebVitalsMonitor; 