import { lazy, Suspense } from 'react';
import ProductCardSkeleton from './ui/ProductCardSkeleton';

// Lazy load non-critical components
const WebVitalsMonitor = lazy(() => import('./WebVitalsMonitor'));
const Admin = lazy(() => import('../pages/Admin'));
const Perfil = lazy(() => import('../pages/Perfil'));
const SobreProyecto = lazy(() => import('../pages/SobreProyecto'));
const Contacto = lazy(() => import('../pages/Contacto'));
const ProductDetail = lazy(() => import('./products/ProductDetail'));
const Cart = lazy(() => import('./cart/Cart'));
const Login = lazy(() => import('./auth/Login'));
const SplashScreen = lazy(() => import('./splash/SplashScreen'));

// Loading component for lazy-loaded routes
export const LazyRouteLoader = ({ children }) => (
  <Suspense fallback={
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  }>
    {children}
  </Suspense>
);

// Lazy-loaded route components
export const LazyAdmin = () => (
  <LazyRouteLoader>
    <Admin />
  </LazyRouteLoader>
);

export const LazyPerfil = () => (
  <LazyRouteLoader>
    <Perfil />
  </LazyRouteLoader>
);

export const LazySobreProyecto = () => (
  <LazyRouteLoader>
    <SobreProyecto />
  </LazyRouteLoader>
);

export const LazyContacto = () => (
  <LazyRouteLoader>
    <Contacto />
  </LazyRouteLoader>
);

export const LazyProductDetail = () => (
  <LazyRouteLoader>
    <ProductDetail />
  </LazyRouteLoader>
);

export const LazyCart = ({ cart, removeFromCart, closeCart, updateQuantity, clearCart, isOpen, onExited, toggleLogin }) => (
  <LazyRouteLoader>
    <Cart 
      cart={cart}
      removeFromCart={removeFromCart}
      closeCart={closeCart}
      updateQuantity={updateQuantity}
      clearCart={clearCart}
      isOpen={isOpen}
      onExited={onExited}
      toggleLogin={toggleLogin}
    />
  </LazyRouteLoader>
);

export const LazyLogin = ({ closeLogin }) => (
  <LazyRouteLoader>
    <Login closeLogin={closeLogin} />
  </LazyRouteLoader>
);

export const LazySplashScreen = () => (
  <LazyRouteLoader>
    <SplashScreen />
  </LazyRouteLoader>
);

// Lazy WebVitalsMonitor for development only
export const LazyWebVitalsMonitor = () => {
  if (import.meta.env.DEV) {
    return (
      <Suspense fallback={null}>
        <WebVitalsMonitor />
      </Suspense>
    );
  }
  return null;
}; 