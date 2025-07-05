import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Animaciones CSS
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(1.1);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Styled Components
const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${props => props.$isExiting ? fadeOut : 'none'};
  opacity: ${props => props.$isExiting ? 1 : 1};
  transform: ${props => props.$isExiting ? 'scale(1)' : 'scale(1)'};
`;

const LogoContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.5s ease-out 0.1s both;
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
  max-width: 80vw;
  filter: drop-shadow(0 10px 20px rgba(220, 53, 69, 0.3));
  animation: ${pulse} 2s ease-in-out infinite;
  
  @media (max-width: 768px) {
    width: 150px;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  background: linear-gradient(45deg, #dc3545, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${slideUp} 0.4s ease-out 0.2s both;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: #cccccc;
  font-size: 1.1rem;
  margin: 0.5rem 0 0 0;
  text-align: center;
  animation: ${slideUp} 0.4s ease-out 0.3s both;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const LoadingContainer = styled.div`
  margin-top: 2rem;
  animation: ${slideUp} 0.4s ease-out 0.4s both;
`;

const LoadingText = styled.p`
  color: #888888;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  text-align: center;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.$progress}%;
    background: linear-gradient(90deg, #dc3545, #ff6b6b);
    border-radius: 2px;
    transition: width 0.3s ease;
  }
`;

const LoadingDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #dc3545;
  animation: ${pulse} 1.4s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
`;

const SimpleSplashScreen = ({ onComplete, progress = 0, loadingText = 'Iniciando...' }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Timeout de seguridad (máximo 8 segundos)
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      console.log('SplashScreen: Timeout de seguridad');
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 600);
    }, 8000);

    return () => clearTimeout(safetyTimer);
  }, [onComplete]);

  // Ocultar cuando el progreso llegue al 100%
  useEffect(() => {
    if (progress >= 100) {
      const hideTimer = setTimeout(() => {
        console.log('SplashScreen: Progreso completado, ocultando...');
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 600);
      }, 1000);

      return () => clearTimeout(hideTimer);
    }
  }, [progress, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <SplashContainer $isExiting={isExiting}>
      <LogoContainer>
        <Logo 
          src="/mi nuevo vicio.webp" 
          alt="Mi Nuevo Vicio"
          onError={(e) => {
            e.target.src = '/placeholder-logo.png';
          }}
        />
      </LogoContainer>
      
      <Title>Mi Nuevo Vicio</Title>
      <Subtitle>Tu próxima adicción gaming</Subtitle>
      
      <LoadingContainer>
        <LoadingText>{loadingText}</LoadingText>
        <ProgressBar $progress={progress} />
        <LoadingDots>
          <Dot $delay={0} />
          <Dot $delay={0.2} />
          <Dot $delay={0.4} />
        </LoadingDots>
      </LoadingContainer>
    </SplashContainer>
  );
};

export default SimpleSplashScreen; 