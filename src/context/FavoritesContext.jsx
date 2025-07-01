import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos del usuario desde localStorage
  useEffect(() => {
    if (user?.email) {
      const saved = localStorage.getItem(`favorites_${user.email}`);
      setFavorites(saved ? JSON.parse(saved) : []);
    } else {
      setFavorites([]);
    }
  }, [user]);

  // Guardar favoritos en localStorage cuando cambian
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`favorites_${user.email}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const isFavorite = useCallback(
    (id) => favorites.some((fav) => fav.id === id),
    [favorites]
  );

  const addFavorite = useCallback(
    (product) => {
      if (!isFavorite(product.id)) {
        setFavorites((prev) => [...prev, product]);
      }
    },
    [isFavorite]
  );

  const removeFavorite = useCallback(
    (id) => {
      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    },
    []
  );

  const toggleFavorite = useCallback(
    (product) => {
      isFavorite(product.id) ? removeFavorite(product.id) : addFavorite(product);
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext); 