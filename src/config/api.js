// Configuración de APIs
export const API_CONFIG = {
  // MockAPI.io - Reemplazar con tu proyecto ID real
  MOCKAPI: {
    BASE_URL: 'https://6865687b5b5d8d0339810fd1.mockapi.io/api/v1',
    ENDPOINTS: {
      PRODUCTS: '/products'
    }
  },
  
  // FreeToGame API (para datos de juegos)
  FREETOGAME: {
    BASE_URL: 'https://www.freetogame.com/api',
    ENDPOINTS: {
      GAMES: '/games',
      GAME_DETAIL: '/game'
    }
  }
};

// Función helper para construir URLs de MockAPI
export const buildMockAPIUrl = (endpoint) => {
  return `${API_CONFIG.MOCKAPI.BASE_URL}${endpoint}`;
};

// Función helper para construir URLs de FreeToGame
export const buildFreeToGameUrl = (endpoint) => {
  return `${API_CONFIG.FREETOGAME.BASE_URL}${endpoint}`;
};

// Configuración de headers por defecto
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}; 