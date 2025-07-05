import { Routes, Route, Navigate } from "react-router-dom"
import { useMemo } from "react"
import ProductList from "./ProductList"
import ProductDetail from "./ProductDetail"
import GameFilters from "./GameFilters"
import Offers from "./Offers"
import MustHave from "./MustHave"
import Login from "./Login"
import ProtectedRoute from "./ProtectedRoute"
import { 
  LazyAdmin, 
  LazyPerfil, 
  LazySobreProyecto, 
  LazyContacto, 
  LazyPaymentSuccess, 
  LazyPaymentFailure 
} from "./LazyComponents"

const AppRouter = ({
  // Filters and data
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
  
  // Game data
  games,
  loading,
  error,
  usingMockData,
  isInitialLoad,
  refetchGames,
  forceMockData,
  
  // Offers and must-have
  offersPagination,
  mustHavePagination,
  
  // Cart functions
  addToCart,
  removeFromCart,
  updateQuantity,
  cartItems,
  
  // Login
  isLoginOpen,
  setIsLoginOpen,
  
  // Location
  location
}) => {
  // Memoize filter visibility
  const showFilters = useMemo(() => 
    !['/login', '/perfil', '/admin', '/sobre-proyecto', '/contacto', '/payment/success', '/payment/failure'].includes(location.pathname),
    [location.pathname]
  );

  const renderGameFilters = (paginationData = null) => {
    if (!showFilters) return null;
    
    return (
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
        currentPage={paginationData?.currentPage || currentPage}
        setCurrentPage={paginationData?.setCurrentPage || setCurrentPage}
        totalPages={paginationData?.totalPages || totalPages}
        totalGames={paginationData?.totalItems || totalGames}
        currentPageGames={paginationData?.currentPageItems || currentPageGames}
        pageCounts={pageCounts}
      />
    );
  };

  const commonProductProps = {
    addToCart,
    removeFromCart,
    cartItems,
    updateQuantity,
    loading,
    error,
    usingMockData,
    onRefetch: refetchGames,
    onForceMock: forceMockData
  };

  return (
    <Routes>
      <Route path="/" element={
        <>
          {!(usingMockData && isInitialLoad) && renderGameFilters()}
          <ProductList 
            products={filteredGames.slice(0, 4)}
            {...commonProductProps}
            isInitialLoad={isInitialLoad}
          />
        </>
      } />
      
      <Route path="/ofertas" element={
        <>
          {renderGameFilters(offersPagination)}
          <Offers 
            games={offersPagination.paginatedItems} 
            {...commonProductProps}
          />
        </>
      } />
      
      <Route path="/infaltables" element={
        <>
          {renderGameFilters(mustHavePagination)}
          <MustHave 
            games={mustHavePagination.paginatedItems} 
            {...commonProductProps}
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
  );
};

export default AppRouter;