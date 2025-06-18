import { useState, useEffect } from 'react';

// Datos mock locales como fallback
const MOCK_GAMES = [
  {
    id: 1,
    title: "The Legend of Zelda: Breath of the Wild",
    thumbnail: "https://via.placeholder.com/300x200?text=Zelda",
    short_description: "Un juego de aventura épico que redefine el género open-world.",
    genre: "Aventura",
    platform: "Nintendo Switch",
    publisher: "Nintendo",
    release_date: "2017-03-03",
    price: 59.99,
    discount: 15,
    rating: 4.8
  },
  {
    id: 2,
    title: "Red Dead Redemption 2",
    thumbnail: "https://via.placeholder.com/300x200?text=RDR2",
    short_description: "Una épica historia del Oeste americano en la era del declive del Salvaje Oeste.",
    genre: "Acción",
    platform: "PlayStation 4",
    publisher: "Rockstar Games",
    release_date: "2018-10-26",
    price: 49.99,
    discount: 25,
    rating: 4.9
  },
  {
    id: 3,
    title: "Cyberpunk 2077",
    thumbnail: "https://via.placeholder.com/300x200?text=Cyberpunk",
    short_description: "Un RPG de acción y aventura en mundo abierto ambientado en Night City.",
    genre: "RPG",
    platform: "PC",
    publisher: "CD Projekt",
    release_date: "2020-12-10",
    price: 69.99,
    discount: 30,
    rating: 4.2
  },
  {
    id: 4,
    title: "God of War Ragnarök",
    thumbnail: "https://via.placeholder.com/300x200?text=GodOfWar",
    short_description: "Kratos y Atreus deben viajar a cada uno de los nueve reinos.",
    genre: "Acción",
    platform: "PlayStation 5",
    publisher: "Sony Interactive Entertainment",
    release_date: "2022-11-09",
    price: 79.99,
    discount: 10,
    rating: 4.7
  },
  {
    id: 5,
    title: "Elden Ring",
    thumbnail: "https://via.placeholder.com/300x200?text=EldenRing",
    short_description: "Un nuevo RPG de acción y fantasía ambientado en un mundo creado por Hidetaka Miyazaki.",
    genre: "RPG",
    platform: "PC",
    publisher: "Bandai Namco",
    release_date: "2022-02-25",
    price: 59.99,
    discount: 20,
    rating: 4.8
  },
  {
    id: 6,
    title: "Super Mario Odyssey",
    thumbnail: "https://via.placeholder.com/300x200?text=Mario",
    short_description: "Únete a Mario en una aventura épica a través de mundos desconocidos.",
    genre: "Plataformas",
    platform: "Nintendo Switch",
    publisher: "Nintendo",
    release_date: "2017-10-27",
    price: 54.99,
    discount: 5,
    rating: 4.6
  },
  {
    id: 7,
    title: "Spider-Man: Miles Morales",
    thumbnail: "https://via.placeholder.com/300x200?text=SpiderMan",
    short_description: "Miles Morales descubre poderes explosivos que lo distinguen de su mentor, Peter Parker.",
    genre: "Acción",
    platform: "PlayStation 5",
    publisher: "Sony Interactive Entertainment",
    release_date: "2020-11-12",
    price: 49.99,
    discount: 35,
    rating: 4.5
  },
  {
    id: 8,
    title: "Animal Crossing: New Horizons",
    thumbnail: "https://via.placeholder.com/300x200?text=AnimalCrossing",
    short_description: "Escape a una isla desierta y cree su propio paraíso mientras explora, crea y personaliza.",
    genre: "Simulación",
    platform: "Nintendo Switch",
    publisher: "Nintendo",
    release_date: "2020-03-20",
    price: 59.99,
    discount: 0,
    rating: 4.4
  },
  {
    id: 9,
    title: "Halo Infinite",
    thumbnail: "https://via.placeholder.com/300x200?text=Halo",
    short_description: "El Jefe Maestro regresa en la aventura más épica de Halo hasta la fecha.",
    genre: "FPS",
    platform: "Xbox Series X",
    publisher: "Xbox Game Studios",
    release_date: "2021-12-08",
    price: 59.99,
    discount: 15,
    rating: 4.3
  },
  {
    id: 10,
    title: "The Witcher 3: Wild Hunt",
    thumbnail: "https://via.placeholder.com/300x200?text=Witcher",
    short_description: "Geralt de Rivia, un cazador de monstruos, busca a su hija adoptiva.",
    genre: "RPG",
    platform: "PC",
    publisher: "CD Projekt",
    release_date: "2015-05-19",
    price: 39.99,
    discount: 40,
    rating: 4.9
  }
];

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      const MAX_RETRIES = 2; // Reducido para fallback más rápido
      const TIMEOUT_MS = 10000; // Reducido el timeout
      let retryCount = 0;

      const validateGameData = (data) => {
        console.log("API returned data:", data ? data.length : 0, "items");
        
        if (!Array.isArray(data)) {
          console.error("Invalid response format, expected array:", data);
          throw new Error("Formato de respuesta inválido: se esperaba un array");
        }

        const filteredData = data.filter(game => {
          const isValid = (
            typeof game === 'object' &&
            game !== null &&
            typeof game.id === 'number' &&
            typeof game.title === 'string' &&
            typeof game.thumbnail === 'string' &&
            typeof game.genre === 'string' &&
            typeof game.platform === 'string' &&
            typeof game.publisher === 'string' &&
            typeof game.release_date === 'string'
          );
          
          if (!isValid) {
            console.warn("Filtered out invalid game:", game);
          }
          
          return isValid;
        });
        
        console.log(`Validated ${filteredData.length} of ${data.length} games`);
        return filteredData;
      };

      const fetchWithTimeout = async (url, timeout) => {
        console.log("Fetching from:", url);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
          const response = await fetch(url, {
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            console.error("HTTP Error:", response.status, response.statusText);
            throw new Error(`Error HTTP! estado: ${response.status}`);
          }
          
          const data = await response.json();
          return validateGameData(data);
        } catch (error) {
          clearTimeout(timeoutId);
          console.error("Fetch error:", error);
          throw error;
        }
      };

      const attemptFetch = async () => {
        try {
          setLoading(true);
          const proxyUrl = "https://api.allorigins.win/raw?url=";
          const targetUrl = "https://www.freetogame.com/api/games";
          const url = `${proxyUrl}${encodeURIComponent(targetUrl)}`;
          
          const data = await fetchWithTimeout(url, TIMEOUT_MS);
          setGames(data);
          setError(null);
          setUsingMockData(false);
          console.log("Successfully loaded", data.length, "games from API");
        } catch (err) {
          if (err.name === 'AbortError') {
            throw new Error("La solicitud ha excedido el tiempo de espera");
          }
          throw err;
        } finally {
          setLoading(false);
        }
      };

      const retryFetch = async () => {
        while (retryCount < MAX_RETRIES) {
          try {
            await attemptFetch();
            return;
          } catch (err) {
            retryCount++;
            console.error(`Fetch attempt ${retryCount} failed:`, err.message);
            
            if (retryCount === MAX_RETRIES) {
              // Usar datos mock como fallback
              console.log("Using mock data as fallback");
              setGames(MOCK_GAMES);
              setUsingMockData(true);
              setError(null);
              setLoading(false);
            } else {
              const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 5000);
              console.log(`Retrying in ${delay}ms...`);
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          }
        }
      };

      retryFetch();
    };

    fetchGames();
  }, []);

  return { games, loading, error, usingMockData };
}; 