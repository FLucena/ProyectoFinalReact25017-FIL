// Utilidad para prevenir cambios de diseño
export const preventLayoutShift = (element, callback) => {
  if (!element) return;

  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const { width, height } = entry.contentRect;
      if (callback) {
        callback(width, height);
      }
    });
  });

  observer.observe(element);
  return observer;
};

// Utilidad para establecer dimensiones mínimas para contenedores
export const setMinDimensions = (element, minWidth, minHeight) => {
  if (!element) return;
  
  element.style.minWidth = minWidth;
  element.style.minHeight = minHeight;
  element.style.boxSizing = 'border-box';
};

// Utilidad para precargar imágenes con dimensiones
export const preloadImage = (src, width, height) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.width = width;
    img.height = height;
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Utilidad para calcular relación de aspecto
export const calculateAspectRatio = (width, height) => {
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
}; 