import mockGamesData from './mockGames.json';

// Datos mock centralizados importados desde JSON
export const MOCK_GAMES = mockGamesData.games;

// Log para verificar que los datos se cargan correctamente
console.log("MockData cargado:", {
  totalGames: MOCK_GAMES.length,
  sampleGame: MOCK_GAMES[0],
  meta: mockGamesData.meta
});

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

// Función para simular una API call con delay
export const fetchMockGames = async (delay = 1000) => {
  console.log("fetchMockGames llamado con delay:", delay);
  await new Promise(resolve => setTimeout(resolve, delay));
  console.log("fetchMockGames retornando:", MOCK_GAMES.length, "juegos");
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