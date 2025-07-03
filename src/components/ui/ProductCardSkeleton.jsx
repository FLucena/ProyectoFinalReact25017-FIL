import React from 'react';

const ProductCardSkeleton = () => (
  <div 
    className="card loading-skeleton"
    style={{
      width: '100%',
      aspectRatio: '16/9',
      minHeight: '225px', // igual que la imagen de la card real
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '1rem',
      borderRadius: '0.5rem',
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'loading 1.5s infinite',
    }}
  >
    <div style={{ width: '80%', height: '1.5rem', marginBottom: '0.5rem', borderRadius: '4px', background: '#e0e0e0' }} />
    <div style={{ width: '60%', height: '1rem', borderRadius: '4px', background: '#e0e0e0' }} />
  </div>
);

export default ProductCardSkeleton; 