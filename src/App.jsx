"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useGames } from "./hooks/useGames"
import { useGameFilters } from "./hooks/useGameFilters"
import { useCart } from "./hooks/useCart"
import { AuthProvider } from "./context/AuthContext"
import { ProductProvider } from "./context/ProductContext"
import { usePagination } from "./hooks/usePagination"
import { FavoritesProvider } from "./context/FavoritesContext"
import { useLCPOptimization } from "./hooks/useLCPOptimization"
import AppLayout from './components/layout/AppLayout';
import MainRoutes from './components/layout/MainRoutes';
import CartManager from './components/cart/CartManager';
import LoginManager from './components/auth/LoginManager';
import SplashScreen from "./components/splash/SplashScreen";

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

  // Splash Screen state - sincronizado con la carga real de datos
  const [showSplash, setShowSplash] = useState(true);
  const [splashProgress, setSplashProgress] = useState(0);
  const [splashText, setSplashText] = useState('Iniciando...');

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

  // LCP Optimization hook
  const { preloadCriticalImages } = useLCPOptimization(
    games.map(game => game.thumbnail).filter(Boolean),
    { preloadCount: 4, timeout: 10000 }
  );

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

  const handleCartExited = () => setCartShouldRender(false);

  const toggleLogin = () => {
    setIsLoginOpen(true);
    if (isCartOpen) closeCart();
  };

  const showFilters = useMemo(() => 
    !['/login', '/perfil', '/admin', '/sobre-proyecto', '/contacto'].includes(location.pathname),
    [location.pathname]
  );

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

  useEffect(() => {
    
    if (loading || isInitialLoad) {
      // Cargando datos - progreso intermedio
      setSplashProgress(45);
      setSplashText('Conectando con el servidor...');
      
      // Simular progreso durante la carga
      const progressInterval = setInterval(() => {
        setSplashProgress(prev => {
          if (prev < 85) {
            setSplashText('Cargando catálogo de juegos...');
            return prev + 10;
          } else {
            setSplashText('Preparando interfaz...');
            return prev;
          }
        });
      }, 500);
      
      return () => clearInterval(progressInterval);
    } else if (games.length > 0) {
      // Datos cargados - completar y ocultar
      setSplashProgress(100);
      setSplashText('¡Bienvenido a Mi Nuevo Vicio!');
      
      // Ocultar splash screen después de mostrar el mensaje final
      setTimeout(() => {
        setShowSplash(false);
      }, 1500);
    } else if (error) {
      // Error - mostrar mensaje y ocultar
      setSplashProgress(100);
      setSplashText('Cargando datos de respaldo...');
      
      setTimeout(() => {
        setShowSplash(false);
      }, 2000);
    }
  }, [isInitialLoad, loading, games.length, error]);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);



  return (
    <>
      {showSplash && (
        <SplashScreen 
          onComplete={handleSplashComplete}
          progress={splashProgress}
          loadingText={splashText}
        />
      )}
    <AuthProvider>
      <ProductProvider>
        <FavoritesProvider>
            <AppLayout cartCount={cartCount} toggleCart={toggleCart} toggleLogin={toggleLogin}>
              <MainRoutes
                showSplash={showSplash}
                games={games}
                filteredGames={filteredGames}
                offersPagination={offersPagination}
                mustHavePagination={mustHavePagination}
                // Props para filtros
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
                // Props para paginación
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        totalGames={totalGames}
                        currentPageGames={currentPageGames}
                // Props para carrito
                      addToCart={addToCart} 
                      removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                      cartItems={cartItems}
                // Props para estado de carga
                      loading={loading}
                      error={error}
                      usingMockData={usingMockData}
                      isInitialLoad={isInitialLoad}
                refetchGames={refetchGames}
                forceMockData={forceMockData}
                    />
              <LoginManager isLoginOpen={isLoginOpen} closeLogin={() => setIsLoginOpen(false)} />
              <CartManager
                cartShouldRender={cartShouldRender}
                    cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  closeCart={closeCart}
                  updateQuantity={updateQuantity}
                  clearCart={clearCart}
                  isOpen={isCartOpen}
                  onExited={handleCartExited}
                  toggleLogin={toggleLogin}
                />
            </AppLayout>
        </FavoritesProvider>
      </ProductProvider>
    </AuthProvider>
    </>
  );
}

export default App