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

  return (
    <>
      {showFilters && <GameFilters {...props} />}
      <Routes>
        <Route path="/" element={<ProductList {...props} />} />
        <Route path="/ofertas" element={<Offers {...props} />} />
        <Route path="/infaltables" element={<MustHave {...props} />} />
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