import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const ProductContext = createContext();

// MockAPI URL - puedes cambiar esto por tu propia URL de MockAPI
const MOCKAPI_URL = 'https://mockapi.io/projects/your-project-id';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar productos desde localStorage al iniciar (fallback)
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Guardar productos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulación de llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Por ahora usamos datos mock locales
      const mockProducts = [
        {
          id: 1,
          title: "The Legend of Zelda: Breath of the Wild",
          price: 59.99,
          description: "Un juego de aventura épico que redefine el género open-world.",
          genre: "Aventura",
          platform: "Nintendo Switch",
          image: "https://via.placeholder.com/300x200?text=Zelda",
          rating: 4.8,
          releaseDate: "2017-03-03"
        },
        {
          id: 2,
          title: "Red Dead Redemption 2",
          price: 49.99,
          description: "Una épica historia del Oeste americano en la era del declive del Salvaje Oeste.",
          genre: "Acción",
          platform: "PlayStation 4",
          image: "https://via.placeholder.com/300x200?text=RDR2",
          rating: 4.9,
          releaseDate: "2018-10-26"
        }
      ];
      
      setProducts(mockProducts);
    } catch (err) {
      setError('Error al cargar los productos');
      toast.error('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validaciones
      if (!productData.title || productData.title.trim().length === 0) {
        throw new Error('El nombre del producto es obligatorio');
      }
      
      if (!productData.price || productData.price <= 0) {
        throw new Error('El precio debe ser mayor a 0');
      }
      
      if (!productData.description || productData.description.length < 10) {
        throw new Error('La descripción debe tener al menos 10 caracteres');
      }

      // Simulación de llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newProduct = {
        ...productData,
        id: Date.now(),
        rating: 0,
        releaseDate: productData.releaseDate || new Date().toISOString().split('T')[0]
      };
      
      setProducts(prev => [...prev, newProduct]);
      toast.success('Producto agregado exitosamente');
      return newProduct;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validaciones
      if (!productData.title || productData.title.trim().length === 0) {
        throw new Error('El nombre del producto es obligatorio');
      }
      
      if (!productData.price || productData.price <= 0) {
        throw new Error('El precio debe ser mayor a 0');
      }
      
      if (!productData.description || productData.description.length < 10) {
        throw new Error('La descripción debe tener al menos 10 caracteres');
      }

      // Simulación de llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProducts(prev => prev.map(product => 
        product.id === id ? { ...product, ...productData } : product
      ));
      
      toast.success('Producto actualizado exitosamente');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulación de llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProducts(prev => prev.filter(product => product.id !== id));
      toast.success('Producto eliminado exitosamente');
    } catch (err) {
      setError('Error al eliminar el producto');
      toast.error('Error al eliminar el producto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      fetchProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById
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