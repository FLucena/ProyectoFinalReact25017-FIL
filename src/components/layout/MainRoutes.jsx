import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from '../../pages/Admin';
import Perfil from '../../pages/Perfil';
import SobreProyecto from '../../pages/SobreProyecto';
import Contacto from '../../pages/Contacto';
// import PaymentSuccess from '../../pages/PaymentSuccess';
// import PaymentFailure from '../../pages/PaymentFailure';
import ProductDetail from '../products/ProductDetail';
import ProductList from '../products/ProductList';
import Offers from '../products/Offers';
import MustHave from '../products/MustHave';
import GameFilters from '../products/GameFilters';
import ProtectedRoute from '../auth/ProtectedRoute';
import NotFound from '../../pages/404';

const MainRoutes = (props) => {
  const showFilters = !['/login', '/perfil', '/admin', '/sobre-proyecto', '/contacto'].includes(window.location.pathname);

  // Paginación para Offers y MustHave
  const paginationProps = {
    currentPage: props.currentPage,
    setCurrentPage: props.setCurrentPage,
    totalPages: props.totalPages,
    totalGames: props.totalGames,
    currentPageGames: props.currentPageGames
  };

  return (
    <>
      {showFilters && <GameFilters {...props} {...paginationProps} />}
      <Routes>
        <Route path="/" element={<ProductList {...props} />} />
        <Route path="/ofertas" element={<Offers {...props} {...paginationProps} games={props.offersFiltered || []} />} />
        <Route path="/infaltables" element={<MustHave {...props} {...paginationProps} games={props.mustHaveFiltered || []} />} />
        <Route path="/product/:id" element={<ProductDetail {...props} />} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil {...props} /></ProtectedRoute>} />
        <Route path="/admin" element={<Admin {...props} />} />
        <Route path="/sobre-proyecto" element={<SobreProyecto {...props} />} />
        <Route path="/contacto" element={<Contacto {...props} />} />
        {/* <Route path="/payment/success" element={<PaymentSuccess {...props} />} /> */}
        {/* <Route path="/payment/failure" element={<PaymentFailure {...props} />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default MainRoutes; 