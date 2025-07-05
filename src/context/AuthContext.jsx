import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

const TEST_CREDENTIALS = {
  admin: { email: 'admin@test.com', password: 'admin123', name: 'Administrador', role: 'admin', id: 1 },
  user: { email: 'user@test.com', password: 'user123', name: 'Usuario', role: 'user', id: 2 }
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveToStorage = useCallback((userData, authStatus) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', authStatus.toString());
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, []);

  const clearStorage = useCallback(() => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const savedAuth = localStorage.getItem('isAuthenticated');
      
      if (savedUser && savedAuth === 'true') {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      clearStorage();
    } finally {
      setLoading(false);
    }
  }, [clearStorage]);

  const validateCredentials = useCallback((email, password) => {
    const credentials = Object.values(TEST_CREDENTIALS);
    return credentials.find(cred => cred.email === email && cred.password === password);
  }, []);

  const login = useCallback((email, password) => {
    if (!email || !password) {
      return { success: false, message: 'Email y contraseña son requeridos' };
    }

    if (!email.includes('@')) {
      return { success: false, message: 'Email inválido' };
    }

    const validCredential = validateCredentials(email, password);
    
    if (validCredential) {
      const userData = { 
        email: validCredential.email, 
        name: validCredential.name,
        role: validCredential.role,
        id: validCredential.id
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      saveToStorage(userData, true);
      
      return { success: true, message: 'Inicio de sesión exitoso' };
    }
    
    return { success: false, message: 'Credenciales inválidas' };
  }, [validateCredentials, saveToStorage]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    clearStorage();
  }, [clearStorage]);

  const register = useCallback((email, password, confirmPassword) => {
    if (!email || !password || !confirmPassword) {
      return { success: false, message: 'Todos los campos son requeridos' };
    }

    if (!email.includes('@')) {
      return { success: false, message: 'Email inválido' };
    }

    if (password !== confirmPassword) {
      return { success: false, message: 'Las contraseñas no coinciden' };
    }
    
    if (password.length < 6) {
      return { success: false, message: 'La contraseña debe tener al menos 6 caracteres' };
    }

    const existingUser = Object.values(TEST_CREDENTIALS).find(cred => cred.email === email);
    if (existingUser) {
      return { success: false, message: 'El email ya está registrado' };
    }

    const userData = { 
      email, 
      name: email.split('@')[0],
      role: 'user',
      id: Date.now()
    };
    
    setIsAuthenticated(true);
    setUser(userData);
    saveToStorage(userData, true);
    
    return { success: true, message: 'Registro exitoso' };
  }, [saveToStorage]);

  const contextValue = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
    loading
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}; 