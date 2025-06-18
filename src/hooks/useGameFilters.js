import { useReducer, useMemo, useCallback, useEffect } from 'react';

const initialState = {
  filteredGames: [],
  searchTerm: "",
  selectedPlatform: "",
  selectedGenre: "",
  sortBy: "title",
  currentPage: 1,
  gamesPerPage: 12
};

function gameFiltersReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload, currentPage: 1 };
    case 'SET_PLATFORM':
      return { ...state, selectedPlatform: action.payload, currentPage: 1 };
    case 'SET_GENRE':
      return { ...state, selectedGenre: action.payload, currentPage: 1 };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload, currentPage: 1 };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
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

  const filterGames = useCallback(() => {
    let result = [...games];

    if (state.searchTerm) {
      result = result.filter(game => 
        game.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        game.genre.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    if (state.selectedPlatform) {
      result = result.filter(game => game.platform === state.selectedPlatform);
    }

    if (state.selectedGenre) {
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
        default:
          return 0;
      }
    });

    dispatch({ type: 'SET_FILTERED_GAMES', payload: result });
  }, [games, state.searchTerm, state.selectedPlatform, state.selectedGenre, state.sortBy]);

  useEffect(() => {
    if (games && games.length > 0) {
      filterGames();
    }
  }, [games, filterGames]);

  const clearFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_FILTERS' });
  }, []);

  const hasActiveFilters = useMemo(() => 
    state.searchTerm || state.selectedPlatform || state.selectedGenre || state.sortBy !== "title",
    [state.searchTerm, state.selectedPlatform, state.selectedGenre, state.sortBy]
  );

  const platforms = useMemo(() => 
    [...new Set(games.map(game => game.platform))],
    [games]
  );

  const genres = useMemo(() => 
    [...new Set(games.map(game => game.genre))],
    [games]
  );

  const totalPages = useMemo(() => 
    Math.ceil(state.filteredGames.length / state.gamesPerPage),
    [state.filteredGames.length, state.gamesPerPage]
  );

  const paginatedGames = useMemo(() => {
    const startIndex = (state.currentPage - 1) * state.gamesPerPage;
    return state.filteredGames.slice(startIndex, startIndex + state.gamesPerPage);
  }, [state.filteredGames, state.currentPage, state.gamesPerPage]);

  return {
    filteredGames: paginatedGames,
    searchTerm: state.searchTerm,
    setSearchTerm: (value) => dispatch({ type: 'SET_SEARCH_TERM', payload: value }),
    selectedPlatform: state.selectedPlatform,
    setSelectedPlatform: (value) => dispatch({ type: 'SET_PLATFORM', payload: value }),
    selectedGenre: state.selectedGenre,
    setSelectedGenre: (value) => dispatch({ type: 'SET_GENRE', payload: value }),
    sortBy: state.sortBy,
    setSortBy: (value) => dispatch({ type: 'SET_SORT', payload: value }),
    clearFilters,
    hasActiveFilters,
    platforms,
    genres,
    currentPage: state.currentPage,
    setCurrentPage: (value) => dispatch({ type: 'SET_PAGE', payload: value }),
    totalPages,
    totalGames: state.filteredGames.length,
    currentPageGames: paginatedGames.length
  };
}; 