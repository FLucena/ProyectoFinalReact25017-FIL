import { useState, useEffect, useCallback } from 'react';
import { fetchMockGames } from '../data/mockData';

// Productos mock instantáneos para el primer render
const INSTANT_MOCK = [
  {
    id: 1,
    title: 'Mock Game 1',
    thumbnail: '/placeholder-logo.png',
    genre: 'Acción',
    platform: 'PC',
    publisher: 'Demo Publisher',
    release_date: '2023-01-01',
    price: 0,
    discount: 0,
    rating: 4.5
  },
  {
    id: 2,
    title: 'Mock Game 2',
    thumbnail: '/placeholder-logo.png',
    genre: 'Aventura',
    platform: 'PC',
    publisher: 'Demo Publisher',
    release_date: '2023-01-02',
    price: 0,
    discount: 0,
    rating: 4.6
  },
  {
    id: 3,
    title: 'Mock Game 3',
    thumbnail: '/placeholder-logo.png',
    genre: 'Estrategia',
    platform: 'PC',
    publisher: 'Demo Publisher',
    release_date: '2023-01-03',
    price: 0,
    discount: 0,
    rating: 4.7
  },
  {
    id: 4,
    title: 'Mock Game 4',
    thumbnail: '/placeholder-logo.png',
    genre: 'RPG',
    platform: 'PC',
    publisher: 'Demo Publisher',
    release_date: '2023-01-04',
    price: 0,
    discount: 0,
    rating: 4.8
  }
];

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Validación de datos de juegos
  const validateGameData = useCallback((data) => {
    if (!Array.isArray(data)) {
      throw new Error("Formato de respuesta inválido: se esperaba un array");
    }

    return data.filter(game => {
      return (
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
    });
  }, []);

  // Fetch con timeout y manejo de errores mejorado
  const fetchWithTimeout = useCallback(async (url, timeout = 3000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return validateGameData(data);
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }, [validateGameData]);

  // Proxies CORS más confiables y actualizados
  const attemptFetchFromProxies = useCallback(async () => {
    const proxies = [
      "https://api.allorigins.win/raw?url=",
      "https://thingproxy.freeboard.io/fetch/",
      "https://corsproxy.io/?",
      "https://api.codetabs.com/v1/proxy?quest="
    ];
    
    const targetUrl = "https://www.freetogame.com/api/games";
    
    for (const proxy of proxies) {
      try {
        let url;
        
        if (proxy.includes("corsproxy.io")) {
          url = `${proxy}${targetUrl}`;
        } else if (proxy.includes("codetabs.com")) {
          url = `${proxy}${targetUrl}`;
        } else {
          url = `${proxy}${encodeURIComponent(targetUrl)}`;
        }
        
        const data = await fetchWithTimeout(url, 3000);
        
        if (data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn(`Proxy falló: ${proxy}`, err.message);
        continue;
      }
    }
    
    throw new Error("Todos los proxies CORS fallaron");
  }, [fetchWithTimeout]);

  // Carga completa de datos en segundo plano
  const loadFullData = useCallback(async () => {
    setLoading(true);
    setIsInitialLoad(true);
    
    // Temporalmente forzar modo producción para probar API real
    const isDevelopment = false;
    if (isDevelopment) {
      try {
        const mockResponse = await fetchMockGames(800);
        setGames(mockResponse.data);
        setUsingMockData(true);
        setError("🛠️ Modo desarrollo: usando datos de demostración");
      } catch (mockErr) {
        setError("❌ Error al cargar datos de demostración");
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
      return;
    }
    
    try {
      const data = await attemptFetchFromProxies();
      setGames(data);
      setUsingMockData(false);
      setError(null);
    } catch (err) {
      console.warn("API no disponible, usando datos mock:", err.message);
      
      // Fallback a datos mock en producción también
      try {
        const mockResponse = await fetchMockGames(1000);
        setGames(mockResponse.data);
        setUsingMockData(true);
        setError("⚠️ Usando datos de demostración - API FreeToGame no disponible");
      } catch (mockErr) {
        console.error("Error al cargar datos mock:", mockErr);
        setError("❌ Error al cargar datos de demostración");
      }
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, [attemptFetchFromProxies]);

  useEffect(() => {
    // Cargar datos reales inmediatamente al montar
    loadFullData();
  }, [loadFullData]);

  // Función para recargar datos manualmente
  const refetchGames = useCallback(() => {
    loadFullData();
  }, [loadFullData]);

  // Función para forzar uso de datos mock (útil para testing)
  const forceMockData = useCallback(() => {
    setGames(INSTANT_MOCK);
  }, []);

  return { 
    games, 
    loading, 
    error, 
    usingMockData, 
    isInitialLoad,
    refetchGames,
    forceMockData
  };
}; 