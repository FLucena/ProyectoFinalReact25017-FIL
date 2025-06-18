import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar estado de autenticación desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAuth = localStorage.getItem('isAuthenticated');
    
    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulación de validación de credenciales
    if (email === 'admin@test.com' && password === 'admin123') {
      const userData = { 
        email, 
        name: 'Administrador',
        role: 'admin',
        id: 1
      };
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      return { success: true, message: 'Inicio de sesión exitoso' };
    } else if (email === 'user@test.com' && password === 'user123') {
      const userData = { 
        email, 
        name: 'Usuario',
        role: 'user',
        id: 2
      };
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      return { success: true, message: 'Inicio de sesión exitoso' };
    }
    return { success: false, message: 'Credenciales inválidas' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  const register = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return { success: false, message: 'Las contraseñas no coinciden' };
    }
    
    if (password.length < 6) {
      return { success: false, message: 'La contraseña debe tener al menos 6 caracteres' };
    }

    // Simulación de registro exitoso
    const userData = { 
      email, 
      name: email.split('@')[0],
      role: 'user',
      id: Date.now()
    };
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    return { success: true, message: 'Registro exitoso' };
  };

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>;
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      register,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 