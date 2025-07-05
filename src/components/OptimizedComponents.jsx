import React, { memo, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { debounce } from 'lodash-es';

// Optimized ProductCard with React.memo
export const OptimizedProductCard = memo(({ product, addToCart, removeFromCart, cartItems, updateQuantity, ...props }) => {
  // Memoize cart item check
  const cartItem = useMemo(() => 
    cartItems.find(item => item.id === product.id), 
    [cartItems, product.id]
  );

  // Memoize add to cart handler
  const handleAddToCart = useCallback(() => {
    addToCart(product);
  }, [addToCart, product]);

  // Memoize remove from cart handler
  const handleRemoveFromCart = useCallback(() => {
    removeFromCart(product.id);
  }, [removeFromCart, product.id]);

  // Memoize update quantity handler
  const handleUpdateQuantity = useCallback((newQuantity) => {
    const prevQuantity = cartItem?.quantity || 0;
    updateQuantity(product.id, newQuantity, prevQuantity);
  }, [updateQuantity, product.id, cartItem?.quantity]);

  return (
    <div className="product-card-optimized">
      {/* Product card content */}
      <div className="product-info">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <span className="price">${product.price}</span>
      </div>
      
      <div className="product-actions">
        {cartItem ? (
          <div className="quantity-controls">
            <button 
              onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
              disabled={cartItem.quantity <= 1}
            >
              -
            </button>
            <span>{cartItem.quantity}</span>
            <button 
              onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
            >
              +
            </button>
            <button onClick={handleRemoveFromCart}>Remove</button>
          </div>
        ) : (
          <button onClick={handleAddToCart}>Add to Cart</button>
        )}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for React.memo
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.title === nextProps.product.title &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.cartItems.length === nextProps.cartItems.length &&
    JSON.stringify(prevProps.cartItems.find(item => item.id === prevProps.product.id)) === 
    JSON.stringify(nextProps.cartItems.find(item => item.id === nextProps.product.id))
  );
});

// Optimized Search Component with debounced input
export const OptimizedSearch = memo(({ searchTerm, setSearchTerm, placeholder = "Buscar productos..." }) => {
  // Debounce search input to reduce re-renders
  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchTerm(value), 300),
    [setSearchTerm]
  );

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    debouncedSearch(value);
  }, [debouncedSearch]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  );
});

// Optimized Image Component with lazy loading and WebP support
export const OptimizedImage = memo(({ src, alt, width, height, className = "", ...props }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate WebP version if supported
  const webpSrc = useMemo(() => {
    if (typeof src === 'string' && src.includes('.')) {
      const extension = src.split('.').pop();
      if (['jpg', 'jpeg', 'png'].includes(extension.toLowerCase())) {
        return src.replace(`.${extension}`, '.webp');
      }
    }
    return src;
  }, [src]);

  // Handle image load
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  // Handle image error
  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    // Fallback to original format if WebP fails
    if (imageSrc === webpSrc && webpSrc !== src) {
      setImageSrc(src);
    }
  }, [imageSrc, webpSrc, src]);

  // Intersection Observer for lazy loading
  const imageRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={imageRef}
      className={`image-container ${className}`}
      style={{ width, height }}
      {...props}
    >
      {isInView && (
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            onLoad={handleLoad}
            onError={handleError}
            className={`${isLoading ? 'loading' : ''} ${hasError ? 'error' : ''}`}
            loading="lazy"
          />
        </picture>
      )}
      
      {isLoading && (
        <div className="image-placeholder">
          <div className="spinner"></div>
        </div>
      )}
      
      {hasError && (
        <div className="image-error">
          <span>Error loading image</span>
        </div>
      )}
    </div>
  );
});

// Optimized List Component with virtualization for large lists
export const OptimizedList = memo(({ items, renderItem, itemHeight = 100, maxVisibleItems = 10 }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  const visibleItems = useMemo(() => {
    const containerHeight = maxVisibleItems * itemHeight;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(startIndex + maxVisibleItems + 1, items.length);
    
    return items.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      virtualIndex: startIndex + index
    }));
  }, [items, scrollTop, itemHeight, maxVisibleItems]);

  const totalHeight = items.length * itemHeight;
  const offsetY = Math.floor(scrollTop / itemHeight) * itemHeight;

  return (
    <div 
      ref={containerRef}
      className="optimized-list"
      style={{ height: `${maxVisibleItems * itemHeight}px`, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item) => (
            <div key={item.id} style={{ height: itemHeight }}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// Performance monitoring HOC
export const withPerformanceMonitoring = (WrappedComponent, componentName) => {
  return memo((props) => {
    const renderStart = performance.now();
    
    useEffect(() => {
      const renderEnd = performance.now();
      const renderTime = renderEnd - renderStart;
      
      if (renderTime > 16) { // More than one frame (16ms)
        console.warn(`${componentName} took ${renderTime.toFixed(2)}ms to render`);
      }
    });

    return <WrappedComponent {...props} />;
  });
};

// Optimized Modal with portal and focus management
export const OptimizedModal = memo(({ isOpen, onClose, children, className = "" }) => {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!mounted || !isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className={`modal-backdrop ${className}`}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div 
        ref={modalRef}
        className="modal-content"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    document.body
  );
});

OptimizedProductCard.displayName = 'OptimizedProductCard';
OptimizedSearch.displayName = 'OptimizedSearch';
OptimizedImage.displayName = 'OptimizedImage';
OptimizedList.displayName = 'OptimizedList';
OptimizedModal.displayName = 'OptimizedModal';