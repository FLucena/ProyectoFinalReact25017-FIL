// Utilidad de proxy de imágenes para prevenir cookies de terceros
// Esta utilidad proporciona métodos para manejar imágenes externas sin establecer cookies

/**
 * Check if an image URL is external (not from our domain)
 * @param {string} url - The image URL to check
 * @returns {boolean} - True if external, false if internal
 */
export const isExternalImage = (url) => {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url, window.location.origin);
    return urlObj.hostname !== window.location.hostname;
  } catch {
      // Si el análisis de URL falla, asumir que es externa si comienza con http/https
  return url.startsWith('http://') || url.startsWith('https://');
  }
};

/**
 * Get a proxy URL for external images to prevent third-party cookies
 * @param {string} originalUrl - The original image URL
 * @returns {string} - The proxied URL or original URL if internal
 */
export const getProxiedImageUrl = (originalUrl) => {
  if (!originalUrl || !isExternalImage(originalUrl)) {
    return originalUrl;
  }

  // Usar un proxy CORS para imágenes externas
  const proxyUrl = "https://images.weserv.nl/?url=";
  return `${proxyUrl}${encodeURIComponent(originalUrl)}`;
};

/**
 * Create an optimized image URL with proper attributes
 * @param {string} url - The image URL
 * @param {Object} options - Additional options
 * @returns {Object} - Object with url and attributes
 */
export const createOptimizedImageUrl = (url, options = {}) => {
  const {
    width = 300,
    height = 169,
    quality = 80,
    format = 'webp'
  } = options;

  if (!url || !isExternalImage(url)) {
    return {
      url,
      attributes: {}
    };
  }

  // Usar images.weserv.nl para optimización y CORS
  const optimizedUrl = `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${width}&h=${height}&q=${quality}&output=${format}`;
  
  return {
    url: optimizedUrl,
    attributes: {
      crossorigin: 'anonymous',
      loading: 'lazy'
    }
  };
};

/**
 * Preload an image with CORS handling
 * @param {string} url - The image URL to preload
 * @returns {Promise} - Promise that resolves when image is loaded
 */
export const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    
    // Agregar crossorigin para imágenes externas
    if (isExternalImage(url)) {
      img.crossOrigin = 'anonymous';
    }
    
    img.src = url;
  });
};

/**
 * Batch preload multiple images
 * @param {string[]} urls - Array of image URLs to preload
 * @returns {Promise} - Promise that resolves when all images are loaded
 */
export const preloadImages = (urls) => {
  return Promise.allSettled(urls.map(url => preloadImage(url)));
};

/**
 * Optimize image URL for LCP (Largest Contentful Paint)
 * @param {string} url - The original image URL
 * @param {Object} options - Optimization options
 * @returns {Object} - Optimized image data
 */
export const optimizeForLCP = (url, options = {}) => {
  const {
    width = 300,
    height = 169,
    quality = 85,
    format = 'webp'
  } = options;

  if (!url) {
    return {
      url: '/game-placeholder.webp',
      attributes: {
        fetchpriority: 'high',
        loading: 'eager',
        crossorigin: undefined
      }
    };
  }

  // Use proxy for external images
  const finalUrl = isExternalImage(url) 
    ? getProxiedImageUrl(url)
    : url;

  return {
    url: finalUrl,
    attributes: {
      fetchpriority: 'high',
      loading: 'eager',
      crossorigin: isExternalImage(url) ? 'anonymous' : undefined,
      width,
      height,
      aspectRatio: `${width}/${height}`
    }
  };
};

/**
 * Create preload link for LCP image
 * @param {string} url - The image URL to preload
 * @param {Object} options - Preload options
 */
export const createLCPPreload = (url, options = {}) => {
  const { priority = 'high', cleanup = true, timeout = 10000 } = options;
  
  if (!url) return null;

  // Remove existing LCP preload links
  const existingLinks = document.querySelectorAll('link[rel="preload"][data-lcp="true"]');
  existingLinks.forEach(link => link.remove());

  const finalUrl = isExternalImage(url) 
    ? getProxiedImageUrl(url)
    : url;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = finalUrl;
  link.fetchpriority = priority;
  link.setAttribute('data-lcp', 'true');

  if (isExternalImage(url)) {
    link.crossOrigin = 'anonymous';
  }

  // Insert at the beginning for highest priority
  document.head.insertBefore(link, document.head.firstChild);

  if (cleanup) {
    setTimeout(() => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    }, timeout);
  }

  return link;
}; 