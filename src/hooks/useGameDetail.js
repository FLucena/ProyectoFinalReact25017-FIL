import { useState, useEffect } from 'react';

export const useGameDetail = (gameId) => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetail = async () => {
      const MAX_RETRIES = 3;
      const TIMEOUT_MS = 15000;
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
          const proxyUrl = "https://api.allorigins.win/raw?url=";
          const targetUrl = `https://www.freetogame.com/api/game?id=${gameId}`;
          const url = `${proxyUrl}${encodeURIComponent(targetUrl)}`;
          
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
            console.error(`Fetch attempt ${retryCount} failed:`, err.message);
            
            if (retryCount === MAX_RETRIES) {
              const errorMessage = err.message === "La solicitud ha excedido el tiempo de espera"
                ? "La solicitud tardó demasiado en completarse. Por favor, inténtalo de nuevo más tarde."
                : `Error al cargar los detalles del juego después de ${MAX_RETRIES} intentos. Pruebe nuevamente en unos minutos.`;
              
              setError(errorMessage);
              console.error("Todos los intentos fallaron:", errorMessage);
            } else {
              const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 10000);
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          }
        }
      };

      if (gameId) {
        retryFetch();
      } else {
        setLoading(false);
        setError("ID de juego no proporcionado");
      }
    };

    fetchGameDetail();
  }, [gameId]);

  return { game, loading, error };
}; 