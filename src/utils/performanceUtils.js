import { useState, useEffect } from 'react';

// Performance monitoring utilities
export const performanceUtils = {
  // Measure component render time
  measureRenderTime: (componentName, renderFn) => {
    const start = performance.now();
    const result = renderFn();
    const end = performance.now();
    
    const renderTime = end - start;
    if (renderTime > 16) { // More than one frame
      console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms`);
    }
    
    return result;
  },

  // Debounce function for expensive operations
  debounce: (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  },

  // Throttle function for scroll events
  throttle: (func, limit) => {
    let lastFunc;
    let lastRan;
    return function(...args) {
      if (!lastRan) {
        func.apply(this, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  },

  // Memory usage monitoring
  getMemoryUsage: () => {
    if (performance.memory) {
      return {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      };
    }
    return null;
  },

  // FPS monitoring
  measureFPS: (callback) => {
    let frames = 0;
    let startTime = performance.now();
    
    const countFrame = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime - startTime >= 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - startTime));
        callback(fps);
        frames = 0;
        startTime = currentTime;
      }
      
      requestAnimationFrame(countFrame);
    };
    
    requestAnimationFrame(countFrame);
  },

  // Bundle size analyzer
  analyzeBundleSize: async () => {
    const getSize = (obj) => {
      const str = JSON.stringify(obj);
      return new Blob([str]).size;
    };
    
    const modules = {};
    
    // Analyze loaded modules
    if (typeof window !== 'undefined' && window.webpackChunkName) {
      Object.keys(window.webpackChunkName).forEach(chunk => {
        modules[chunk] = getSize(window.webpackChunkName[chunk]);
      });
    }
    
    return modules;
  },

  // Network performance monitoring
  measureNetworkPerformance: () => {
    if ('getEntriesByType' in performance) {
      const networkEntries = performance.getEntriesByType('navigation');
      const resourceEntries = performance.getEntriesByType('resource');
      
      return {
        navigation: networkEntries.map(entry => ({
          name: entry.name,
          duration: entry.duration,
          loadEventEnd: entry.loadEventEnd,
          domContentLoadedEventEnd: entry.domContentLoadedEventEnd
        })),
        resources: resourceEntries.map(entry => ({
          name: entry.name,
          duration: entry.duration,
          transferSize: entry.transferSize,
          encodedBodySize: entry.encodedBodySize
        }))
      };
    }
    return null;
  },

  // Core Web Vitals monitoring
  measureWebVitals: (callback) => {
    // LCP (Largest Contentful Paint)
    const observeLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        callback('LCP', lastEntry.startTime);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    };

    // FID (First Input Delay)
    const observeFID = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          callback('FID', entry.processingStart - entry.startTime);
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    };

    // CLS (Cumulative Layout Shift)
    const observeCLS = () => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        callback('CLS', clsValue);
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    };

    // FCP (First Contentful Paint)
    const observeFCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            callback('FCP', entry.startTime);
          }
        });
      });
      
      observer.observe({ entryTypes: ['paint'] });
    };

    // Start observers
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      observeLCP();
      observeFID();
      observeCLS();
      observeFCP();
    }
  },

  // Resource loading optimization
  preloadResource: (url, type = 'script') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = type;
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  },

  // Critical resource hints
  addResourceHints: (urls) => {
    const fragment = document.createDocumentFragment();
    
    urls.forEach(({ url, type = 'prefetch' }) => {
      const link = document.createElement('link');
      link.rel = type;
      link.href = url;
      fragment.appendChild(link);
    });
    
    document.head.appendChild(fragment);
  },

  // Lazy loading utility
  createLazyLoader: (callback, options = {}) => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '50px'
    };
    
    const observerOptions = { ...defaultOptions, ...options };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    return {
      observe: (element) => observer.observe(element),
      unobserve: (element) => observer.unobserve(element),
      disconnect: () => observer.disconnect()
    };
  },

  // Service Worker utilities
  registerServiceWorker: async (swUrl) => {
    if ('serviceWorker' in navigator && 'caches' in window) {
      try {
        const registration = await navigator.serviceWorker.register(swUrl);
        console.log('Service Worker registered successfully:', registration);
        return registration;
      } catch (error) {
        console.log('Service Worker registration failed:', error);
        return null;
      }
    }
    return null;
  },

  // Cache API utilities
  cacheManager: {
    set: async (cacheName, url, response) => {
      const cache = await caches.open(cacheName);
      await cache.put(url, response);
    },
    
    get: async (cacheName, url) => {
      const cache = await caches.open(cacheName);
      return await cache.match(url);
    },
    
    delete: async (cacheName, url) => {
      const cache = await caches.open(cacheName);
      return await cache.delete(url);
    },
    
    clear: async (cacheName) => {
      return await caches.delete(cacheName);
    }
  },

  // Performance budget checker
  checkPerformanceBudget: (budget) => {
    const navigation = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    
    const results = {
      loadTime: navigation.loadEventEnd,
      totalSize: resources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0),
      requests: resources.length,
      passed: true,
      violations: []
    };
    
    if (budget.maxLoadTime && results.loadTime > budget.maxLoadTime) {
      results.passed = false;
      results.violations.push(`Load time ${results.loadTime}ms exceeds budget ${budget.maxLoadTime}ms`);
    }
    
    if (budget.maxSize && results.totalSize > budget.maxSize) {
      results.passed = false;
      results.violations.push(`Total size ${results.totalSize} bytes exceeds budget ${budget.maxSize} bytes`);
    }
    
    if (budget.maxRequests && results.requests > budget.maxRequests) {
      results.passed = false;
      results.violations.push(`Request count ${results.requests} exceeds budget ${budget.maxRequests}`);
    }
    
    return results;
  }
};

// Hook for performance monitoring
export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    fps: null,
    memory: null
  });

  useEffect(() => {
    // Monitor Web Vitals
    performanceUtils.measureWebVitals((metric, value) => {
      setMetrics(prev => ({
        ...prev,
        [metric.toLowerCase()]: value
      }));
    });

    // Monitor FPS
    performanceUtils.measureFPS((fps) => {
      setMetrics(prev => ({
        ...prev,
        fps
      }));
    });

    // Monitor memory (if available)
    const memoryInterval = setInterval(() => {
      const memory = performanceUtils.getMemoryUsage();
      if (memory) {
        setMetrics(prev => ({
          ...prev,
          memory
        }));
      }
    }, 5000);

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  return metrics;
};