import { useState, useEffect } from 'react';
import { buildFreeToGameUrl } from '../config/api';

export const useGameDetail = (gameId) => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetail = async () => {
      const MAX_RETRIES = 5;
      const TIMEOUT_MS = 25000;
      let retryCount = 0;

      const validateGameData = (data) => {
        
        if (!data || typeof data !== 'object') {
          console.error("Invalid response format, expected object:", data);
          throw new Error("Formato de respuesta inválido: se esperaba un objeto");
        }

        const isValid = (
          data !== null &&
          typeof data.id === 'number' &&
          typeof data.title === 'string' &&
          typeof data.thumbnail === 'string' &&
          typeof data.genre === 'string' &&
          typeof data.platform === 'string' &&
          typeof data.publisher === 'string' &&
          typeof data.release_date === 'string'
        );
        
        if (!isValid) {
          console.warn("Invalid game data:", data);
          throw new Error("Datos del juego inválidos o incompletos");
        }
        
        return data;
      };

      const fetchWithTimeout = async (url, timeout) => {
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
          
          const isDevelopment = process.env.NODE_ENV === 'development';
          let url;
          
          if (isDevelopment) {
            // En desarrollo, intentar directamente con la API
            url = `https://www.freetogame.com/api/game?id=${gameId}`;
          } else {
            // En producción, usar nuestro proxy serverless
            url = buildFreeToGameUrl('', { id: gameId });
          }
          
          const data = await fetchWithTimeout(url, TIMEOUT_MS);
          setGame(data);
          setError(null);
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
            console.warn(`Intento ${retryCount} falló:`, err.message);
            
            if (retryCount >= MAX_RETRIES) {
              setError(`Error al cargar detalles del juego después de ${MAX_RETRIES} intentos: ${err.message}`);
              setLoading(false);
              return;
            }
            
            // Esperar antes del siguiente intento (backoff exponencial)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
          }
        }
      };

      retryFetch();
    };

    if (gameId) {
      fetchGameDetail();
    }
  }, [gameId]);

  return { game, loading, error };
}; 