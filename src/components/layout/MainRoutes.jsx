import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from '../../pages/Admin';
import Perfil from '../../pages/Perfil';
import SobreProyecto from '../../pages/SobreProyecto';
import Contacto from '../../pages/Contacto';
import PaymentSuccess from '../../pages/PaymentSuccess';
import PaymentFailure from '../../pages/PaymentFailure';
import ProductDetail from '../products/ProductDetail';
import ProductList from '../products/ProductList';
import Offers from '../products/Offers';
import MustHave from '../products/MustHave';
import GameFilters from '../products/GameFilters';
import ProtectedRoute from '../auth/ProtectedRoute';

const MainRoutes = (props) => {
  const showFilters = !['/login', '/perfil', '/admin', '/sobre-proyecto', '/contacto', '/payment/success', '/payment/failure'].includes(window.location.pathname);

  // Determinar qué props de paginación usar según la ruta
  const getPaginationProps = () => {
    const pathname = window.location.pathname;
    
    if (pathname === '/ofertas') {
      return {
        currentPage: props.offersPagination?.currentPage || 1,
        setCurrentPage: props.offersPagination?.setCurrentPage || (() => {}),
        totalPages: props.offersPagination?.totalPages || 1,
        totalGames: props.offersPagination?.totalItems || 0,
        currentPageGames: props.offersPagination?.currentPageItems || 0
      };
    } else if (pathname === '/infaltables') {
      return {
        currentPage: props.mustHavePagination?.currentPage || 1,
        setCurrentPage: props.mustHavePagination?.setCurrentPage || (() => {}),
        totalPages: props.mustHavePagination?.totalPages || 1,
        totalGames: props.mustHavePagination?.totalItems || 0,
        currentPageGames: props.mustHavePagination?.currentPageItems || 0
      };
    } else {
      // Homepage y otras rutas usan la paginación principal
      return {
        currentPage: props.currentPage || 1,
        setCurrentPage: props.setCurrentPage || (() => {}),
        totalPages: props.totalPages || 1,
        totalGames: props.totalGames || 0,
        currentPageGames: props.currentPageGames || 0
      };
    }
  };

  const paginationProps = getPaginationProps();

  return (
    <>
      {showFilters && <GameFilters {...props} {...paginationProps} />}
      <Routes>
        <Route path="/" element={<ProductList {...props} />} />
        <Route path="/ofertas" element={<Offers {...props} games={props.offersPagination?.paginatedItems || []} />} />
        <Route path="/infaltables" element={<MustHave {...props} games={props.mustHavePagination?.paginatedItems || []} />} />
        <Route path="/product/:id" element={<ProductDetail {...props} />} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil {...props} /></ProtectedRoute>} />
        <Route path="/admin" element={<Admin {...props} />} />
        <Route path="/sobre-proyecto" element={<SobreProyecto {...props} />} />
        <Route path="/contacto" element={<Contacto {...props} />} />
        <Route path="/payment/success" element={<PaymentSuccess {...props} />} />
        <Route path="/payment/failure" element={<PaymentFailure {...props} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default MainRoutes; 