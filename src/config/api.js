// Configuración de APIs
export const API_CONFIG = {
  // MockAPI.io - Siempre usar MockAPI.io
  MOCKAPI: {
    BASE_URL: 'https://6865687b5b5d8d0339810fd1.mockapi.io/api/v1/products',
    ENDPOINTS: {
      PRODUCTS: ''
    }
  },
  
  // FreeToGame API (para datos de juegos) - Usando nuestro proxy serverless
  FREETOGAME: {
    BASE_URL: process.env.NODE_ENV === 'production' 
      ? '/api/games' // Usar nuestro proxy serverless en producción
      : 'https://www.freetogame.com/api', // Usar directamente en desarrollo
    ENDPOINTS: {
      GAMES: '',
      GAME_DETAIL: ''
    }
  }
};

// Función helper para construir URLs de MockAPI
export const buildMockAPIUrl = (endpoint = '') => {
  return `${API_CONFIG.MOCKAPI.BASE_URL}${endpoint}`;
};

// Función helper para construir URLs de FreeToGame
export const buildFreeToGameUrl = (endpoint, params = {}) => {
  const baseUrl = API_CONFIG.FREETOGAME.BASE_URL;
  
  if (process.env.NODE_ENV === 'production') {
    // En producción, usar nuestro proxy serverless
    const queryParams = new URLSearchParams(params).toString();
    return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
  } else {
    // En desarrollo, usar la API directamente
    return `${baseUrl}${endpoint}`;
  }
};

// Configuración de headers por defecto
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}; 