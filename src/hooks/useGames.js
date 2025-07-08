import { useState, useEffect, useCallback } from 'react';
import { fetchMockGames } from '../data/mockData';
import { buildFreeToGameUrl } from '../config/api';

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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

  const fetchWithTimeout = useCallback(async (url, timeout = 3000) => {
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
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return validateGameData(data);
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }, [validateGameData]);

  // Solo buscar en la API si NO estamos en development
  const attemptFetchFromAPI = useCallback(async () => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment) {
      throw new Error('Modo desarrollo: solo se usan datos de demostración');
    }
    // En producción, usar nuestro proxy serverless
    const url = buildFreeToGameUrl('', {});
    try {
      const data = await fetchWithTimeout(url, 10000);
      if (data && data.length > 0) {
        return data;
      }
      throw new Error("El proxy no devolvió datos válidos");
    } catch (err) {
      throw new Error("Error al conectar con el proxy serverless");
    }
  }, [fetchWithTimeout]);

  const loadFullData = useCallback(async () => {
    setLoading(true);
    setIsInitialLoad(true);
    const isDevelopment = process.env.NODE_ENV === 'development';
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
    // En producción, intentar la API y fallback a mock
    const apiTimeout = setTimeout(async () => {
      try {
        const mockResponse = await fetchMockGames(500);
        setGames(mockResponse.data);
        setUsingMockData(true);
        setError("⚠️ Usando datos de demostración - API no disponible después de múltiples intentos");
      } catch (mockErr) {
        setError("❌ Error al cargar datos de demostración");
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    }, 25000);
    try {
      const data = await attemptFetchFromAPI();
      clearTimeout(apiTimeout);
      setGames(data);
      setUsingMockData(false);
      setError(null);
    } catch (err) {
      clearTimeout(apiTimeout);
      try {
        const mockResponse = await fetchMockGames(500);
        setGames(mockResponse.data);
        setUsingMockData(true);
        setError("⚠️ Usando datos de demostración - API FreeToGame no disponible después de múltiples intentos");
      } catch (mockErr) {
        setError("❌ Error al cargar datos de demostración");
      }
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, [attemptFetchFromAPI]);

  useEffect(() => {
    loadFullData();
  }, [loadFullData]);

  const refetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment) {
      try {
        const mockResponse = await fetchMockGames(500);
        setGames(mockResponse.data);
        setUsingMockData(true);
        setError("🛠️ Usando datos de demostración");
      } catch (mockErr) {
        setError("❌ Error al cargar datos de demostración");
      } finally {
        setLoading(false);
      }
      return;
    }
    try {
      const data = await attemptFetchFromAPI();
      setGames(data);
      setUsingMockData(false);
      setError(null);
    } catch (err) {
      setError("❌ Error al recargar datos de la API");
    } finally {
      setLoading(false);
    }
  }, [attemptFetchFromAPI]);

  const forceMockData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const mockResponse = await fetchMockGames(500);
      setGames(mockResponse.data);
      setUsingMockData(true);
      setError("🛠️ Usando datos de demostración");
    } catch (mockErr) {
      setError("❌ Error al cargar datos de demostración");
    } finally {
      setLoading(false);
    }
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