import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { 
  fetchMockGames, 
  fetchProductsFromMockAPI, 
  createProductInMockAPI, 
  updateProductInMockAPI, 
  deleteProductFromMockAPI 
} from '../data/mockData';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar productos desde localStorage al iniciar (fallback)
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (err) {
        console.error('Error parsing saved products:', err);
        // Cargar datos mock como fallback
        loadMockProducts();
      }
    } else {
      // Cargar datos mock iniciales
      loadMockProducts();
    }
  }, []);

  // Función para cargar productos desde MockAPI o fallback a mock local
  const loadMockProducts = useCallback(async () => {
    try {
      // Intentar cargar desde MockAPI primero
      const response = await fetchProductsFromMockAPI();
      if (response.success) {
        setProducts(response.data);
      } else {
        // Fallback a datos mock locales
        const mockResponse = await fetchMockGames(500);
        setProducts(mockResponse.data);
      }
    } catch (err) {
      console.error('Error loading products:', err);
      // Fallback a datos mock locales
      try {
        const mockResponse = await fetchMockGames(500);
        setProducts(mockResponse.data);
      } catch (mockErr) {
        console.error('Error loading mock products:', mockErr);
        setProducts([]);
      }
    }
  }, []);

  // Guardar productos en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem('products', JSON.stringify(products));
    } catch (err) {
      console.error('Error saving products to localStorage:', err);
    }
  }, [products]);

  // Optimización: Función unificada para manejo de errores
  const handleError = useCallback((error, defaultMessage) => {
    const errorMessage = error?.message || defaultMessage;
    setError(errorMessage);
    toast.error(errorMessage);
    console.error('Product operation error:', error);
  }, []);

  // Optimización: Función unificada para operaciones exitosas
  const handleSuccess = useCallback((message) => {
    toast.success(message);
    setError(null);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Intentar cargar desde MockAPI primero
      const response = await fetchProductsFromMockAPI();
      if (response.success) {
        setProducts(response.data);
        handleSuccess('Productos cargados desde MockAPI exitosamente');
      } else {
        // Fallback a datos mock locales
        const mockResponse = await fetchMockGames(1000);
        setProducts(mockResponse.data);
        handleSuccess('Productos cargados desde datos locales');
      }
    } catch (err) {
      // Fallback a datos mock locales
      try {
        const mockResponse = await fetchMockGames(1000);
        setProducts(mockResponse.data);
        handleSuccess('Productos cargados desde datos locales (fallback)');
      } catch (mockErr) {
        handleError(mockErr, 'Error al cargar los productos');
      }
    } finally {
      setLoading(false);
    }
  }, [handleError, handleSuccess]);

  const validateProductData = useCallback((productData) => {
    const errors = [];
    const validations = [
      { field: 'title', condition: !productData.title?.trim(), message: 'El nombre del producto es obligatorio' },
      { field: 'price', condition: !productData.price || productData.price <= 0, message: 'El precio debe ser mayor a 0' },
      { field: 'description', condition: !productData.description || productData.description.length < 10, message: 'La descripción debe tener al menos 10 caracteres' },
      { field: 'genre', condition: !productData.genre?.trim(), message: 'El género es obligatorio' },
      { field: 'platform', condition: !productData.platform?.trim(), message: 'La plataforma es obligatoria' }
    ];

    validations.forEach(({ condition, message }) => {
      if (condition) errors.push(message);
    });

    return errors;
  }, []);

  const addProduct = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validaciones
      const validationErrors = validateProductData(productData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      // Preparar datos del producto
      const productToSend = {
        ...productData,
        rating: 0,
        releaseDate: productData.releaseDate || new Date().toISOString().split('T')[0],
        image: productData.image || "https://via.placeholder.com/300x200?text=Game"
      };

      // Intentar enviar a MockAPI
      try {
        const response = await createProductInMockAPI(productToSend);
        if (response.success) {
          setProducts(prev => [...prev, response.data]);
          handleSuccess('Producto agregado a MockAPI exitosamente');
          return response.data;
        }
      } catch (apiError) {
        console.warn('Error al enviar a MockAPI, usando almacenamiento local:', apiError);
        // Fallback: agregar localmente
        const newProduct = {
          ...productToSend,
          id: Date.now()
        };
        setProducts(prev => [...prev, newProduct]);
        handleSuccess('Producto agregado localmente (MockAPI no disponible)');
        return newProduct;
      }
    } catch (err) {
      handleError(err, 'Error al agregar el producto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [validateProductData, handleError, handleSuccess]);

  const updateProduct = useCallback(async (id, productData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validaciones
      const validationErrors = validateProductData(productData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      // Verificar que el producto existe
      const existingProduct = products.find(p => p.id === id);
      if (!existingProduct) {
        throw new Error('Producto no encontrado');
      }

      // Intentar actualizar en MockAPI
      try {
        const response = await updateProductInMockAPI(id, productData);
        if (response.success) {
          setProducts(prev => prev.map(product => 
            product.id === id ? response.data : product
          ));
          handleSuccess('Producto actualizado en MockAPI exitosamente');
        }
      } catch (apiError) {
        console.warn('Error al actualizar en MockAPI, usando almacenamiento local:', apiError);
        // Fallback: actualizar localmente
        setProducts(prev => prev.map(product => 
          product.id === id ? { ...product, ...productData } : product
        ));
        handleSuccess('Producto actualizado localmente (MockAPI no disponible)');
      }
    } catch (err) {
      handleError(err, 'Error al actualizar el producto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [products, validateProductData, handleError, handleSuccess]);

  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      // Verificar que el producto existe
      const existingProduct = products.find(p => p.id === id);
      if (!existingProduct) {
        throw new Error('Producto no encontrado');
      }

      // Intentar eliminar en MockAPI
      try {
        const response = await deleteProductFromMockAPI(id);
        if (response.success) {
          setProducts(prev => prev.filter(product => product.id !== id));
          handleSuccess('Producto eliminado de MockAPI exitosamente');
        }
      } catch (apiError) {
        console.warn('Error al eliminar en MockAPI, usando almacenamiento local:', apiError);
        // Fallback: eliminar localmente
        setProducts(prev => prev.filter(product => product.id !== id));
        handleSuccess('Producto eliminado localmente (MockAPI no disponible)');
      }
    } catch (err) {
      handleError(err, 'Error al eliminar el producto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [products, handleError, handleSuccess]);

  const getProductById = useCallback((id) => {
    return products.find(product => product.id === parseInt(id));
  }, [products]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      fetchProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      clearError
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductProvider');
  }
  return context;
}; 