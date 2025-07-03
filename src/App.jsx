"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProductList from "./components/ProductList"
import ProductDetail from "./components/ProductDetail"
import Cart from "./components/Cart"
import Login from "./components/Login"
import GameFilters from "./components/GameFilters"
import Offers from "./components/Offers"
import MustHave from "./components/MustHave"

import ProtectedRoute from "./components/ProtectedRoute"
import SEO from "./components/SEO"
import { useGames } from "./hooks/useGames"
import { useGameFilters } from "./hooks/useGameFilters"
import { useCart } from "./hooks/useCart"
import { AuthProvider } from "./context/AuthContext"
import { ProductProvider } from "./context/ProductContext"
import SkipLink from "./components/SkipLink"
import { usePagination } from "./hooks/usePagination"
import { FavoritesProvider } from "./context/FavoritesContext"
import { isExternalImage, getProxiedImageUrl } from "./utils/imageProxy"
import { 
  LazyAdmin, 
  LazyPerfil, 
  LazySobreProyecto, 
  LazyContacto, 
  LazyPaymentSuccess, 
  LazyPaymentFailure,
  LazyWebVitalsMonitor 
} from "./components/LazyComponents"

function App() {
  const { games, loading, error, usingMockData, isInitialLoad, refetchGames, forceMockData } = useGames();
  const {
    filteredGames,
    searchTerm,
    setSearchTerm,
    selectedPlatform,
    setSelectedPlatform,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    clearFilters,
    hasActiveFilters,
    platforms,
    genres,
    currentPage,
    setCurrentPage,
    totalPages,
    totalGames,
    currentPageGames
  } = useGameFilters(games);

  const {
    items: cartItems,
    isOpen: isCartOpen,
    addToCart: originalAddToCart,
    removeFromCart: originalRemoveFromCart,
    toggleCart,
    closeCart,
    itemCount: cartCount,
    updateQuantity: originalUpdateQuantity,
    clearCart: originalClearCart
  } = useCart();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();
  const [cartShouldRender, setCartShouldRender] = useState(false);

  // Optimización: Memoizar cálculos costosos
  const gamesWithDiscount = useMemo(() => 
    games.map(game => ({
      ...game,
      discount: game.discount ?? Math.floor(Math.random() * 40),
    })), [games]
  );

  const gamesWithRating = useMemo(() => 
    games.map(game => ({
      ...game,
      rating: game.rating ?? (Math.random() * 2 + 3),
    })), [games]
  );

  const offersFiltered = useMemo(() => 
    gamesWithDiscount.filter(game => game.discount > 0), [gamesWithDiscount]
  );

  const mustHaveFiltered = useMemo(() => 
    gamesWithRating.filter(game => game.rating >= 4.5), [gamesWithRating]
  );

  // Hook de paginación unificado
  const offersPagination = usePagination(offersFiltered);
  const mustHavePagination = usePagination(mustHaveFiltered);

  // Optimización: Memoizar filtros aplicados
  const applyFiltersToGames = useCallback((gamesToFilter) => {
    return gamesToFilter.filter(game => {
      let match = true;
      if (searchTerm) {
        match = match && game.title.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (selectedPlatform && selectedPlatform !== 'Todas las Plataformas') {
        match = match && game.platform.toLowerCase().includes(selectedPlatform.toLowerCase());
      }
      if (selectedGenre && selectedGenre !== 'Todos los Géneros') {
        match = match && game.genre.toLowerCase().includes(selectedGenre.toLowerCase());
      }
      return match;
    });
  }, [searchTerm, selectedPlatform, selectedGenre]);

  const offersFilteredCount = useMemo(() => 
    applyFiltersToGames(offersFiltered).length, [applyFiltersToGames, offersFiltered]
  );

  const mustHaveFilteredCount = useMemo(() => 
    applyFiltersToGames(mustHaveFiltered).length, [applyFiltersToGames, mustHaveFiltered]
  );

  // Optimización: Memoizar conteos de página
  const pageCounts = useMemo(() => {
    const baseCounts = {
      filteredCount: filteredGames.length,
      totalCount: games.length
    };

    if (location.pathname === '/ofertas') {
      return {
        filteredCount: offersFilteredCount,
        totalCount: offersFiltered.length
      };
    } else if (location.pathname === '/infaltables') {
      return {
        filteredCount: mustHaveFilteredCount,
        totalCount: mustHaveFiltered.length
      };
    }
    return baseCounts;
  }, [location.pathname, filteredGames.length, games.length, offersFilteredCount, offersFiltered.length, mustHaveFilteredCount, mustHaveFiltered.length]);

  useEffect(() => {
    if (isCartOpen) setCartShouldRender(true);
  }, [isCartOpen]);

  // Precarga dinámica para optimización de LCP
  useEffect(() => {
    if (games && games.length > 0) {
      const firstGame = games[0];
      if (firstGame && firstGame.thumbnail) {
        // Usar proxy para imágenes externas para prevenir cookies de terceros
        const imageUrl = isExternalImage(firstGame.thumbnail) 
          ? getProxiedImageUrl(firstGame.thumbnail)
          : firstGame.thumbnail;
        
        // Crear un enlace de precarga para la primera imagen del producto
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = imageUrl;
        link.fetchpriority = 'high';
        
        // Agregar crossorigin para imágenes externas
        if (isExternalImage(firstGame.thumbnail)) {
          link.crossOrigin = 'anonymous';
        }
        
        document.head.appendChild(link);
        
        // Limpiar el enlace después de un retraso
        setTimeout(() => {
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
        }, 5000);
      }
    }
  }, [games]);

  const handleCartExited = () => setCartShouldRender(false);

  const toggleLogin = () => {
    setIsLoginOpen(true);
    if (isCartOpen) closeCart();
  };

  // Optimización: Memoizar rutas que no muestran filtros
  const showFilters = useMemo(() => 
    !['/login', '/perfil', '/admin', '/sobre-proyecto', '/contacto'].includes(location.pathname),
    [location.pathname]
  );

  // Optimización: Consolidar funciones de carrito con notificaciones
  const addToCart = useCallback((item) => {
    originalAddToCart(item);
    toast.success(`${item.title} agregado al carrito`, {
      autoClose: 2000,
    });
  }, [originalAddToCart]);

  const updateQuantity = useCallback((itemId, quantity, prevQuantity) => {
    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;
    
    originalUpdateQuantity(itemId, quantity);
    
    if (quantity > prevQuantity) {
      toast.success(`${item.title} agregado al carrito`, {
        autoClose: 2000,
      });
    } else if (quantity < prevQuantity) {
      toast.error(`${item.title} reducido en el carrito`, {
        autoClose: 2000,
      });
    }
  }, [cartItems, originalUpdateQuantity]);
  
  const removeFromCart = useCallback((itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      originalRemoveFromCart(itemId);
      toast.error(`${item.title} eliminado del carrito`, {
        autoClose: 2000,
      });
    }
  }, [cartItems, originalRemoveFromCart]);

  const clearCart = useCallback(() => {
    originalClearCart();
    toast.error('Carrito vaciado', {
      autoClose: 2000,
    });
  }, [originalClearCart]);

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
              cartCount={cartCount}
              toggleCart={toggleCart}
              toggleLogin={toggleLogin}
            />

            <main 
              id="main-content"
              className="flex-grow-1" 
              style={{ paddingTop: '8rem' }}
              role="main"
              aria-label="Contenido principal"
            >
              <Routes>
                <Route path="/" element={
                  <>
                    {!(usingMockData && isInitialLoad) && showFilters && (
                      <GameFilters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedPlatform={selectedPlatform}
                        setSelectedPlatform={setSelectedPlatform}
                        selectedGenre={selectedGenre}
                        setSelectedGenre={setSelectedGenre}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        clearFilters={clearFilters}
                        hasActiveFilters={hasActiveFilters}
                        platforms={platforms}
                        genres={genres}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        totalGames={totalGames}
                        currentPageGames={currentPageGames}
                        pageCounts={pageCounts}
                      />
                    )}
                    <ProductList 
                      products={filteredGames.slice(0, 4)}
                      addToCart={addToCart} 
                      removeFromCart={removeFromCart}
                      cartItems={cartItems}
                      updateQuantity={updateQuantity}
                      loading={loading}
                      error={error}
                      usingMockData={usingMockData}
                      isInitialLoad={isInitialLoad}
                      onRefetch={refetchGames}
                      onForceMock={forceMockData}
                    />
                  </>
                } />
                <Route path="/ofertas" element={
                  <>
                    {showFilters && (
                      <GameFilters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedPlatform={selectedPlatform}
                        setSelectedPlatform={setSelectedPlatform}
                        selectedGenre={selectedGenre}
                        setSelectedGenre={setSelectedGenre}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        clearFilters={clearFilters}
                        hasActiveFilters={hasActiveFilters}
                        platforms={platforms}
                        genres={genres}
                        currentPage={offersPagination.currentPage}
                        setCurrentPage={offersPagination.setCurrentPage}
                        totalPages={offersPagination.totalPages}
                        totalGames={offersPagination.totalItems}
                        currentPageGames={offersPagination.currentPageItems}
                        pageCounts={pageCounts}
                      />
                    )}
                    <Offers 
                      games={offersPagination.paginatedItems} 
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                      cartItems={cartItems}
                      updateQuantity={updateQuantity}
                      loading={loading}
                      error={error}
                      usingMockData={usingMockData}
                      onRefetch={refetchGames}
                      onForceMock={forceMockData}
                    />
                  </>
                } />
                <Route path="/infaltables" element={
                  <>
                    {showFilters && (
                      <GameFilters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedPlatform={selectedPlatform}
                        setSelectedPlatform={setSelectedPlatform}
                        selectedGenre={selectedGenre}
                        setSelectedGenre={setSelectedGenre}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        clearFilters={clearFilters}
                        hasActiveFilters={hasActiveFilters}
                        platforms={platforms}
                        genres={genres}
                        currentPage={mustHavePagination.currentPage}
                        setCurrentPage={mustHavePagination.setCurrentPage}
                        totalPages={mustHavePagination.totalPages}
                        totalGames={mustHavePagination.totalItems}
                        currentPageGames={mustHavePagination.currentPageItems}
                        pageCounts={pageCounts}
                      />
                    )}
                    <MustHave 
                      games={mustHavePagination.paginatedItems} 
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                      cartItems={cartItems}
                      updateQuantity={updateQuantity}
                      loading={loading}
                      error={error}
                      usingMockData={usingMockData}
                      onRefetch={refetchGames}
                      onForceMock={forceMockData}
                    />
                  </>
                } />
                <Route path="/product/:id" element={
                  <ProductDetail 
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    cartItems={cartItems}
                    updateQuantity={updateQuantity}
                  />
                } />
                <Route
                  path="/login"
                  element={
                    isLoginOpen ? (
                      <Login closeLogin={() => setIsLoginOpen(false)} />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
                <Route 
                  path="/perfil" 
                  element={
                    <ProtectedRoute>
                      <LazyPerfil />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/admin" element={<LazyAdmin />} />
                <Route path="/sobre-proyecto" element={<LazySobreProyecto />} />
                <Route path="/contacto" element={<LazyContacto />} />
                <Route path="/payment/success" element={<LazyPaymentSuccess />} />
                <Route path="/payment/failure" element={<LazyPaymentFailure />} />
              </Routes>

              {isLoginOpen && (
                <Login closeLogin={() => setIsLoginOpen(false)} />
              )}

              {cartShouldRender && (
                <Cart
                  cart={cartItems}
                  removeFromCart={removeFromCart}
                  closeCart={closeCart}
                  updateQuantity={updateQuantity}
                  clearCart={clearCart}
                  isOpen={isCartOpen}
                  onExited={handleCartExited}
                  toggleLogin={toggleLogin}
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
