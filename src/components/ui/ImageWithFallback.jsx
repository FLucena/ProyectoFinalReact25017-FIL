import { useState } from 'react';
import { isExternalImage, getProxiedImageUrl } from '../../utils/imageProxy';

const getModernImageUrl = (src, format) => {
  if (!src) return src;
  // Si la imagen ya es webp/avif, retorna igual
  if (src.endsWith('.webp') || src.endsWith('.avif')) return src;
  // Si es externa, no intentamos cambiar el formato
  if (isExternalImage(src)) return src;
  // Cambia la extensión si es local
  return src.replace(/\.(jpg|jpeg|png)$/i, `.${format}`);
};

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc = "/game-placeholder.webp",
  className = "", 
  style = {},
  onLoad,
  onError,
  width,
  height,
  aspectRatio = "16/9",
  fetchpriority = "auto",
  useProxy = true,
  loading = "lazy",
  isLCP = false,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = (e) => {
    if (!imageError) {
      setImageError(true);
      setImageLoading(false);
      if (onError) onError(e);
    }
  };

  const handleImageLoad = (e) => {
    setImageLoading(false);
    if (onLoad) onLoad(e);
  };

  const getImageSrc = () => {
    if (imageError) {
      return fallbackSrc;
    }
    
    const originalSrc = src || fallbackSrc;
    
    // Usar proxy para imágenes externas si está habilitado
    if (useProxy && isExternalImage(originalSrc)) {
      return getProxiedImageUrl(originalSrc);
    }
    
    return originalSrc;
  };

  const finalSrc = getImageSrc();
  const isExternal = isExternalImage(finalSrc);

  // Generar URLs para WebP y AVIF si es local
  const webpSrc = !isExternal ? getModernImageUrl(finalSrc, 'webp') : undefined;
  const avifSrc = !isExternal ? getModernImageUrl(finalSrc, 'avif') : undefined;

  return (
    <div 
      className={`position-relative ${isLCP ? 'image-container' : ''} ${className}`}
      style={{
        backgroundColor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        aspectRatio: aspectRatio,
        width: width || '100%',
        height: height || 'auto',
        ...style
      }}
    >
      {imageLoading && !isLCP && (
        <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden">Cargando imagen...</span>
          </div>
        </div>
      )}
      <picture>
        {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          src={finalSrc}
          alt={alt}
          width={width}
          height={height}
          fetchpriority={isLCP ? "high" : fetchpriority}
          crossOrigin={isExternal ? "anonymous" : undefined}
          className={`w-100 h-100 ${imageLoading && !isLCP ? 'opacity-0' : 'opacity-100'} ${isLCP ? 'lcp-image' : ''} ${className}`}
          style={{ 
            objectFit: 'cover',
            transition: isLCP ? 'none' : 'opacity 0.3s ease'
          }}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading={isLCP ? "eager" : loading}
          {...props}
        />
      </picture>
    </div>
  );
};

export default ImageWithFallback; 