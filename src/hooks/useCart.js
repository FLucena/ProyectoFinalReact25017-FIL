import { useReducer, useCallback } from 'react';

const initialState = {
  items: [],
  isOpen: false
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1, price: action.payload.price || 29.99 }]
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        )
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export const useCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = useCallback((item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const updateQuantity = useCallback((itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const total = state.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return {
    items: state.items,
    isOpen: state.isOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleCart,
    closeCart,
    clearCart,
    total,
    itemCount: state.items.reduce((sum, item) => sum + (item.quantity || 1), 0)
  };
}; 