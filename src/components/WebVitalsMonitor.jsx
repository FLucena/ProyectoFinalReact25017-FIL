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
          
          console.log('CLS Entry:', {
            value: entry.value,
            cumulative: clsValue,
            sources: entry.sources?.map(source => ({
              node: source.node,
              currentRect: source.currentRect,
              previousRect: source.previousRect
            }))
          });
        }
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });

    // Monitor LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime, lastEntry.element);
    });

    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor FID
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('FID:', entry.processingStart - entry.startTime);
      }
    });

    fidObserver.observe({ entryTypes: ['first-input'] });

    // Log final CLS on page unload
    const handleBeforeUnload = () => {
      console.log('Final CLS:', clsValue);
      console.log('CLS Entries:', clsEntries);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Log development info
    if (import.meta.env.DEV) {
      console.log('🔍 Web Vitals Monitor active in development mode');
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