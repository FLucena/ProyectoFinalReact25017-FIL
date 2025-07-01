import { useState, useEffect } from 'react';

const SkipLink = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        setIsVisible(true);
      }
    };

    const handleClick = () => {
      setIsVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="skip-links" style={{ position: 'absolute', top: '-40px', left: '6px', zIndex: 9999 }}>
      <a
        href="#main-content"
        className="btn btn-primary"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          background: '#dc3545',
          color: 'white',
          padding: '8px 16px',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: 'bold',
          transition: 'top 0.3s ease'
        }}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-label="Saltar al contenido principal"
      >
        Saltar al contenido principal
      </a>
    </div>
  );
};

export default SkipLink; 