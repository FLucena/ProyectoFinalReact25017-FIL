import { useReducer, useMemo, useCallback, useEffect } from 'react';
import { usePagination } from './usePagination';

const initialState = {
  filteredGames: [],
  searchTerm: "",
  selectedPlatform: "",
  selectedGenre: "",
  sortBy: "title"
};

function gameFiltersReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_PLATFORM':
      return { ...state, selectedPlatform: action.payload };
    case 'SET_GENRE':
      return { ...state, selectedGenre: action.payload };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    case 'SET_FILTERED_GAMES':
      return { ...state, filteredGames: action.payload };
    case 'CLEAR_FILTERS':
      return { ...initialState, filteredGames: state.filteredGames };
    default:
      return state;
  }
}

export const useGameFilters = (games) => {
  const [state, dispatch] = useReducer(gameFiltersReducer, initialState);

  const platforms = useMemo(() => 
    [...new Set(games.map(game => game.platform))].sort(),
    [games]
  );

  const genres = useMemo(() => 
    [...new Set(games.map(game => game.genre))].sort(),
    [games]
  );

  const filterGames = useCallback(() => {
    if (!games || games.length === 0) {
      dispatch({ type: 'SET_FILTERED_GAMES', payload: [] });
      return;
    }

    let result = [...games];

    if (state.searchTerm) {
      const searchLower = state.searchTerm.toLowerCase();
      result = result.filter(game => 
        game.title.toLowerCase().includes(searchLower) ||
        game.genre.toLowerCase().includes(searchLower) ||
        game.platform.toLowerCase().includes(searchLower)
      );
    }

    if (state.selectedPlatform && state.selectedPlatform !== 'Todas las Plataformas') {
      result = result.filter(game => game.platform === state.selectedPlatform);
    }

    if (state.selectedGenre && state.selectedGenre !== 'Todos los Géneros') {
      result = result.filter(game => game.genre === state.selectedGenre);
    }

    result.sort((a, b) => {
      switch (state.sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "release_date":
          return new Date(b.release_date) - new Date(a.release_date);
        case "genre":
          return a.genre.localeCompare(b.genre);
        case "platform":
          return a.platform.localeCompare(b.platform);
        case "price":
          return (a.price || 0) - (b.price || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    dispatch({ type: 'SET_FILTERED_GAMES', payload: result });
  }, [games, state.searchTerm, state.selectedPlatform, state.selectedGenre, state.sortBy]);

  useEffect(() => {
    filterGames();
  }, [filterGames]);

  // Usar el hook unificado de paginación
  const pagination = usePagination(state.filteredGames, 12);

  const hasActiveFilters = useMemo(() => 
    state.searchTerm || 
    (state.selectedPlatform && state.selectedPlatform !== 'Todas las Plataformas') || 
    (state.selectedGenre && state.selectedGenre !== 'Todos los Géneros') || 
    state.sortBy !== "title",
    [state.searchTerm, state.selectedPlatform, state.selectedGenre, state.sortBy]
  );

  const setSearchTerm = useCallback((value) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: value });
    pagination.resetToFirstPage();
  }, [pagination]);

  const setSelectedPlatform = useCallback((value) => {
    dispatch({ type: 'SET_PLATFORM', payload: value });
    pagination.resetToFirstPage();
  }, [pagination]);

  const setSelectedGenre = useCallback((value) => {
    dispatch({ type: 'SET_GENRE', payload: value });
    pagination.resetToFirstPage();
  }, [pagination]);

  const setSortBy = useCallback((value) => {
    dispatch({ type: 'SET_SORT', payload: value });
    pagination.resetToFirstPage();
  }, [pagination]);

  const clearFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_FILTERS' });
    pagination.resetToFirstPage();
  }, [pagination]);

  return {
    filteredGames: pagination.paginatedItems,
    totalGames: pagination.totalItems,
    currentPageGames: pagination.currentPageItems,
    searchTerm: state.searchTerm,
    setSearchTerm,
    selectedPlatform: state.selectedPlatform,
    setSelectedPlatform,
    selectedGenre: state.selectedGenre,
    setSelectedGenre,
    sortBy: state.sortBy,
    setSortBy,
    currentPage: pagination.currentPage,
    setCurrentPage: pagination.setCurrentPage,
    totalPages: pagination.totalPages,
    hasNextPage: pagination.hasNextPage,
    hasPrevPage: pagination.hasPrevPage,
    platforms,
    genres,
    hasActiveFilters,
    clearFilters
  };
}; 