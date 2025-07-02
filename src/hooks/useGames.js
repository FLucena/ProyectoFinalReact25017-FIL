import { useState, useEffect, useCallback } from 'react';
import { fetchMockGames } from '../data/mockData';

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

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

  // Carga de juegos con estrategia de desarrollo vs producción
  const loadGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    // Temporalmente forzar modo producción para probar API real
    const isDevelopment = false; // Cambiado de import.meta.env.DEV a false
    
    if (isDevelopment) {
      try {
        const mockResponse = await fetchMockGames(800);
        setGames(mockResponse.data);
        setUsingMockData(true);
        setError("🛠️ Modo desarrollo: usando datos de demostración");
      } catch (mockErr) {
        console.error("Error al cargar datos mock:", mockErr);
        setError("❌ Error al cargar datos de demostración");
        setGames([]);
      } finally {
        setLoading(false);
      }
      return;
    }
    
    // En producción, intentar API real primero
    try {
      const data = await attemptFetchFromProxies();
      setGames(data);
      setUsingMockData(false);
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
        setGames([]);
      }
    } finally {
      setLoading(false);
    }
  }, [attemptFetchFromProxies]);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  // Función para recargar datos manualmente
  const refetchGames = useCallback(() => {
    loadGames();
  }, [loadGames]);

  // Función para forzar uso de datos mock (útil para testing)
  const forceMockData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const mockResponse = await fetchMockGames(500);
      setGames(mockResponse.data);
      setUsingMockData(true);
      setError("🛠️ Forzado: usando datos de demostración");
    } catch (mockErr) {
      setError("❌ Error al cargar datos mock");
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    games, 
    loading, 
    error, 
    usingMockData, 
    refetchGames,
    forceMockData
  };
}; 