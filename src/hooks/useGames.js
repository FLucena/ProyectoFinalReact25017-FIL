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

  // Proxies CORS más confiables y actualizados con reintentos
  const attemptFetchFromProxies = useCallback(async () => {
    const proxies = [
      "https://api.allorigins.win/raw?url=",
      "https://corsproxy.io/?",
      "https://api.codetabs.com/v1/proxy?quest=",
      "https://cors-anywhere.herokuapp.com/",
      "https://cors.bridged.cc/",
      "https://proxy.cors.sh/",
      "https://corsproxy.io/?",
      "https://api.allorigins.win/raw?url=",
      "https://thingproxy.freeboard.io/fetch/"
    ];
    
    const targetUrl = "https://www.freetogame.com/api/games";
    const maxRetries = 2; // Reintentar cada proxy hasta 2 veces
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      for (const proxy of proxies) {
        try {
          let url;
          
          if (proxy.includes("corsproxy.io")) {
            url = `${proxy}${targetUrl}`;
          } else if (proxy.includes("codetabs.com")) {
            url = `${proxy}${targetUrl}`;
          } else if (proxy.includes("cors-anywhere")) {
            url = `${proxy}${targetUrl}`;
          } else if (proxy.includes("bridged.cc")) {
            url = `${proxy}${targetUrl}`;
          } else if (proxy.includes("proxy.cors.sh")) {
            url = `${proxy}${targetUrl}`;
          } else {
            url = `${proxy}${encodeURIComponent(targetUrl)}`;
          }
          
          console.log(`Intentando proxy: ${proxy} (intento ${attempt + 1}/${maxRetries})`);
          const data = await fetchWithTimeout(url, 8000); // Aumentar timeout
          
          if (data && data.length > 0) {
            console.log(`Proxy exitoso: ${proxy}`);
            return data;
          }
        } catch (err) {
          console.warn(`Proxy falló: ${proxy} (intento ${attempt + 1}/${maxRetries})`, err.message);
          
          // Si es un error de CSP o 404, no reintentar este proxy
          if (err.message.includes('CSP') || err.message.includes('404') || err.message.includes('Failed to fetch')) {
            console.log(`Proxy ${proxy} no disponible, saltando...`);
            continue;
          }
          
          // Si es el último intento para este proxy, continuar al siguiente
          if (attempt === maxRetries - 1) {
            continue;
          }
          
          // Esperar un poco antes del siguiente intento
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      // Si llegamos aquí, todos los proxies fallaron en este intento
      if (attempt < maxRetries - 1) {
        console.log(`Todos los proxies fallaron en el intento ${attempt + 1}, reintentando...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    throw new Error("Todos los proxies CORS fallaron después de múltiples intentos");
  }, [fetchWithTimeout]);

  // Carga completa de datos en segundo plano
  const loadFullData = useCallback(async () => {
    console.log("🔄 Iniciando carga de datos...");
    setLoading(true);
    setIsInitialLoad(true);
    
    // Detectar si estamos en desarrollo o producción
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Temporalmente forzar intento de API real incluso en desarrollo para testing
    const forceApiAttempt = true;
    
    if (isDevelopment && !forceApiAttempt) {
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
    
    // En producción, intentar API real con timeout más largo para dar tiempo a reintentos
    const apiTimeout = setTimeout(async () => {
      console.log("Timeout de API alcanzado después de múltiples intentos, usando datos mock");
      try {
        const mockResponse = await fetchMockGames(500);
        setGames(mockResponse.data);
        setUsingMockData(true);
        setError("⚠️ Usando datos de demostración - API no disponible después de múltiples intentos");
      } catch (mockErr) {
        console.error("Error al cargar datos mock:", mockErr);
        setError("❌ Error al cargar datos de demostración");
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    }, 25000); // 25 segundos de timeout para dar tiempo a reintentos
    
    try {
      console.log("🌐 Intentando obtener datos de la API real...");
      const data = await attemptFetchFromProxies();
      clearTimeout(apiTimeout);
      console.log("✅ Datos de API obtenidos exitosamente:", data.length, "juegos");
      setGames(data);
      setUsingMockData(false);
      setError(null);
    } catch (err) {
      console.warn("Todos los proxies fallaron después de múltiples intentos, usando datos mock:", err.message);
      clearTimeout(apiTimeout);
      
      // Fallback a datos mock después de agotar todos los intentos
      try {
        const mockResponse = await fetchMockGames(500);
        setGames(mockResponse.data);
        setUsingMockData(true);
        setError("⚠️ Usando datos de demostración - API FreeToGame no disponible después de múltiples intentos");
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