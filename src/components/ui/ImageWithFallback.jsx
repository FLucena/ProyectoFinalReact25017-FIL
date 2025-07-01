import { useState } from 'react';

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc = "/placeholder-logo.png",
  className = "", 
  style = {},
  onLoad,
  onError,
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
    return src || fallbackSrc;
  };

  return (
    <div 
      className={`position-relative ${className}`}
      style={{
        backgroundColor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...style
      }}
    >
      {imageLoading && (
        <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
          <div className="spinner-border spinner-border-sm text-danger" role="status">
            <span className="visually-hidden">Cargando imagen...</span>
          </div>
        </div>
      )}
      
      <img
        src={getImageSrc()}
        alt={alt}
        className={`w-100 h-100 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          objectFit: 'cover',
          transition: 'opacity 0.3s ease'
        }}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback; 