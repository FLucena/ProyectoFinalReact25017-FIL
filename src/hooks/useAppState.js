import { useState, useEffect, useMemo, useCallback } from "react"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { useGames } from "./useGames"
import { useGameFilters } from "./useGameFilters"
import { useCart } from "./useCart"
import { usePagination } from "./usePagination"
import { isExternalImage, getProxiedImageUrl } from "../utils/imageProxy"

export const useAppState = () => {
  const location = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [cartShouldRender, setCartShouldRender] = useState(false);

  // Games data
  const { games, loading, error, usingMockData, isInitialLoad, refetchGames, forceMockData } = useGames();

  // Game filters
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

  // Cart management
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

  // Memoized game calculations
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

  // Pagination hooks
  const offersPagination = usePagination(offersFiltered);
  const mustHavePagination = usePagination(mustHaveFiltered);

  // Filter functions
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

  // Page counts
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

  // Cart functions with toast notifications
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

  // Login management
  const toggleLogin = useCallback(() => {
    setIsLoginOpen(true);
    if (isCartOpen) closeCart();
  }, [isCartOpen, closeCart]);

  // Cart visibility management
  useEffect(() => {
    if (isCartOpen) setCartShouldRender(true);
  }, [isCartOpen]);

  const handleCartExited = useCallback(() => {
    setCartShouldRender(false);
  }, []);

  // Image preloading optimization
  useEffect(() => {
    if (games && games.length > 0) {
      const firstGame = games[0];
      if (firstGame && firstGame.thumbnail) {
        const imageUrl = isExternalImage(firstGame.thumbnail) 
          ? getProxiedImageUrl(firstGame.thumbnail)
          : firstGame.thumbnail;
        
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = imageUrl;
        link.fetchpriority = 'high';
        
        if (isExternalImage(firstGame.thumbnail)) {
          link.crossOrigin = 'anonymous';
        }
        
        document.head.appendChild(link);
        
        const cleanup = setTimeout(() => {
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
        }, 5000);

        return () => {
          clearTimeout(cleanup);
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
        };
      }
    }
  }, [games]);

  return {
    // Game data
    games,
    loading,
    error,
    usingMockData,
    isInitialLoad,
    refetchGames,
    forceMockData,
    
    // Filtered games
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
    currentPageGames,
    pageCounts,
    
    // Processed games
    gamesWithDiscount,
    gamesWithRating,
    offersFiltered,
    mustHaveFiltered,
    
    // Pagination
    offersPagination,
    mustHavePagination,
    
    // Cart
    cartItems,
    isCartOpen,
    cartCount,
    cartShouldRender,
    toggleCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    handleCartExited,
    
    // Login
    isLoginOpen,
    setIsLoginOpen,
    toggleLogin,
    
    // Location
    location
  };
};