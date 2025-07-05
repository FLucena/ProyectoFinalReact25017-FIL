import { lazy, Suspense } from 'react';
import ProductCardSkeleton from './ui/ProductCardSkeleton';

// Lazy load non-critical components
const WebVitalsMonitor = lazy(() => import('./WebVitalsMonitor'));
const Admin = lazy(() => import('../pages/Admin'));
const Perfil = lazy(() => import('../pages/Perfil'));
const SobreProyecto = lazy(() => import('../pages/SobreProyecto'));
const Contacto = lazy(() => import('../pages/Contacto'));
const PaymentSuccess = lazy(() => import('../pages/PaymentSuccess'));
const PaymentFailure = lazy(() => import('../pages/PaymentFailure'));
const ProductDetail = lazy(() => import('./ProductDetail'));
const Cart = lazy(() => import('./Cart'));
const Login = lazy(() => import('./Login'));
const SplashScreen = lazy(() => import('./SplashScreen'));

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

export const LazyPaymentSuccess = () => (
  <LazyRouteLoader>
    <PaymentSuccess />
  </LazyRouteLoader>
);

export const LazyPaymentFailure = () => (
  <LazyRouteLoader>
    <PaymentFailure />
  </LazyRouteLoader>
);

export const LazyProductDetail = () => (
  <LazyRouteLoader>
    <ProductDetail />
  </LazyRouteLoader>
);

export const LazyCart = () => (
  <LazyRouteLoader>
    <Cart />
  </LazyRouteLoader>
);

export const LazyLogin = () => (
  <LazyRouteLoader>
    <Login />
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