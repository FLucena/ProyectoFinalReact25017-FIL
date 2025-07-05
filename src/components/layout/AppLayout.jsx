import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';
import SkipLink from './SkipLink';
import LCPMonitor from './LCPMonitor';
import { ToastContainer } from 'react-toastify';

const AppLayout = ({ children, cartCount, toggleCart, toggleLogin }) => (
  <>
    <SEO />
    <SkipLink />
    <LCPMonitor />
    <Header cartCount={cartCount} toggleCart={toggleCart} toggleLogin={toggleLogin} />
    <main id="main-content" className="flex-grow-1" style={{ paddingTop: '130px' }}>
      {children}
    </main>
    <Footer />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </>
);

export default AppLayout; 