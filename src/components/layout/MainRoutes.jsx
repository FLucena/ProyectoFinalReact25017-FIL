import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from '../../pages/Admin';
import Perfil from '../../pages/Perfil';
import SobreProyecto from '../../pages/SobreProyecto';
import Contacto from '../../pages/Contacto';
import ProductDetail from '../products/ProductDetail';
import ProductList from '../products/ProductList';
import Offers from '../products/Offers';
import MustHave from '../products/MustHave';
import GameFilters from '../products/GameFilters';
import ProtectedRoute from '../auth/ProtectedRoute';
import NotFound from '../../pages/404';

const MainRoutes = (props) => {
  const hideFiltersPaths = ['/login', '/perfil', '/admin', '/sobre-proyecto', '/contacto', '/product'];
  const showFilters = !hideFiltersPaths.some(path => window.location.pathname.startsWith(path));

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
        <Route path="/product/:id" element={<ProductDetail 
          games={props.games}
          loading={props.loading}
          error={props.error}
          addToCart={props.addToCart}
          removeFromCart={props.removeFromCart}
          updateQuantity={props.updateQuantity}
          cartItems={props.cartItems}
        />} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil {...props} /></ProtectedRoute>} />
        <Route path="/admin" element={<Admin {...props} />} />
        <Route path="/sobre-proyecto" element={<SobreProyecto {...props} />} />
        <Route path="/contacto" element={<Contacto {...props} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default MainRoutes; 