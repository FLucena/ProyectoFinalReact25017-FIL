"use client"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Cart from "./components/Cart"
import Login from "./components/Login"
import AppRouter from "./components/AppRouter"
import SEO from "./components/SEO"
import SkipLink from "./components/SkipLink"
import { AuthProvider } from "./context/AuthContext"
import { ProductProvider } from "./context/ProductContext"
import { FavoritesProvider } from "./context/FavoritesContext"
import { useAppState } from "./hooks/useAppState"
import { LazyWebVitalsMonitor } from "./components/LazyComponents"

function App() {
  const appState = useAppState();

  return (
    <AuthProvider>
      <ProductProvider>
        <FavoritesProvider>
          <SEO />
          <SkipLink />
          <div className="d-flex flex-column min-vh-100" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
            
            <Header
              cartCount={appState.cartCount}
              toggleCart={appState.toggleCart}
              toggleLogin={appState.toggleLogin}
            />

            <main 
              id="main-content"
              className="flex-grow-1" 
              style={{ paddingTop: '8rem' }}
              role="main"
              aria-label="Contenido principal"
            >
              <AppRouter {...appState} />

              {appState.isLoginOpen && (
                <Login closeLogin={() => appState.setIsLoginOpen(false)} />
              )}

              {appState.cartShouldRender && (
                <Cart
                  cart={appState.cartItems}
                  removeFromCart={appState.removeFromCart}
                  closeCart={appState.closeCart}
                  updateQuantity={appState.updateQuantity}
                  clearCart={appState.clearCart}
                  isOpen={appState.isCartOpen}
                  onExited={appState.handleCartExited}
                  toggleLogin={appState.toggleLogin}
                />
              )}
            </main>

            <Footer />
            <LazyWebVitalsMonitor />
          </div>
        </FavoritesProvider>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App
