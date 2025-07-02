import mockGamesData from './mockGames.json';
import { buildMockAPIUrl, API_CONFIG, DEFAULT_HEADERS } from '../config/api';

// Datos mock centralizados importados desde JSON
export const MOCK_GAMES = mockGamesData.games;

// Configuración de MockAPI.io
const MOCKAPI_ENDPOINT = buildMockAPIUrl(API_CONFIG.MOCKAPI.ENDPOINTS.PRODUCTS);

// Función helper para convertir juegos a formato de productos
export const convertGameToProduct = (game) => ({
  id: game.id,
  title: game.title,
  price: game.price,
  description: game.description || game.short_description,
  genre: game.genre,
  platform: game.platform,
  image: game.image || game.thumbnail,
  rating: game.rating,
  releaseDate: game.releaseDate || game.release_date,
  discount: game.discount,
  publisher: game.publisher
});

// Función helper para obtener productos desde juegos
export const getMockProducts = () => MOCK_GAMES.map(convertGameToProduct);

// Función helper para obtener juegos con formato específico
export const getMockGames = () => MOCK_GAMES;

// Función para obtener productos de demostración (primeros N juegos)
export const getDemoProducts = (count = 3) => getMockProducts().slice(0, count);

// Función para simular una API call con delay
export const fetchMockGames = async (delay = 1000) => {
  await new Promise(resolve => setTimeout(resolve, delay));
  return {
    data: MOCK_GAMES,
    meta: mockGamesData.meta,
    success: true
  };
};

// Función para simular una API call con error
export const fetchMockGamesWithError = async (delay = 1000, shouldError = false) => {
  await new Promise(resolve => setTimeout(resolve, delay));
  
  if (shouldError) {
    throw new Error('Error simulado de la API');
  }
  
  return {
    data: MOCK_GAMES,
    meta: mockGamesData.meta,
    success: true
  };
};

// ===== NUEVAS FUNCIONES PARA MOCKAPI.IO =====

// Función para obtener productos desde MockAPI.io
export const fetchProductsFromMockAPI = async () => {
  try {
    const response = await fetch(MOCKAPI_ENDPOINT, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      data: data,
      success: true
    };
  } catch (error) {
    console.error('Error fetching from MockAPI:', error);
    // Fallback a datos mock locales
    return {
      data: MOCK_GAMES,
      success: false,
      error: error.message
    };
  }
};

// Función para crear un producto en MockAPI.io
export const createProductInMockAPI = async (productData) => {
  try {
    const response = await fetch(MOCKAPI_ENDPOINT, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newProduct = await response.json();
    return {
      data: newProduct,
      success: true
    };
  } catch (error) {
    console.error('Error creating product in MockAPI:', error);
    throw error;
  }
};

// Función para actualizar un producto en MockAPI.io
export const updateProductInMockAPI = async (id, productData) => {
  try {
    const response = await fetch(`${MOCKAPI_ENDPOINT}/${id}`, {
      method: 'PUT',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedProduct = await response.json();
    return {
      data: updatedProduct,
      success: true
    };
  } catch (error) {
    console.error('Error updating product in MockAPI:', error);
    throw error;
  }
};

// Función para eliminar un producto en MockAPI.io
export const deleteProductFromMockAPI = async (id) => {
  try {
    const response = await fetch(`${MOCKAPI_ENDPOINT}/${id}`, {
      method: 'DELETE',
      headers: DEFAULT_HEADERS,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      success: true
    };
  } catch (error) {
    console.error('Error deleting product from MockAPI:', error);
    throw error;
  }
}; 