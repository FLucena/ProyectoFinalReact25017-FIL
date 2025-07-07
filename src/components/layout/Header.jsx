"use client"

import { Link, useNavigate } from "react-router-dom"
import { FaShoppingCart, FaUser, FaSignOutAlt, FaCog, FaCrown, FaHome, FaTags, FaStar, FaBars, FaGraduationCap } from "react-icons/fa"
import { useAuth } from '../../context/AuthContext';
import { Dropdown } from "react-bootstrap"

const Header = ({ cartCount, toggleCart, toggleLogin }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (!isAuthenticated) {
      toggleLogin();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Banner educativo sticky - Información del proyecto */}
      <div 
        className="fixed-top bg-primary text-white py-2 px-3 text-center" 
        style={{ 
          fontSize: '0.85rem', 
          zIndex: 1031,
          lineHeight: '1.4'
        }}
        role="banner"
        aria-label="Información del proyecto educativo"
      >
        <FaGraduationCap className="me-2" aria-hidden="true" />
        <strong>Proyecto Educativo:</strong> 
        <span className="d-none d-sm-inline"> Este es un ejemplo de ecommerce desarrollado para fines de aprendizaje.</span>
        <span className="d-sm-none"> Ecommerce educativo.</span>
        <span className="d-none d-md-inline"> Todos los juegos mostrados son gratuitos y provienen de la API pública de FreeToGame.</span>
      </div>
      
      {/* Header principal con navegación */}
      <header 
        className="fixed-top bg-dark text-white" 
        style={{ top: '32px', zIndex: 1030 }}
        role="banner"
        aria-label="Navegación principal"
      >
        <nav className="navbar navbar-expand-lg navbar-dark" role="navigation" aria-label="Navegación principal">
          <div className="container">
            {/* Logo/Brand - Responsive (MNV en móvil, texto completo en desktop) */}
            <Link 
              className="navbar-brand d-flex align-items-center flex-grow-1" 
              to="/"
              aria-label="Ir a la página de inicio"
              style={{ textDecoration: "none" }}
            >
              <FaHome className="me-2" aria-hidden="true" />
              <span className="d-none d-sm-inline">Mi Nuevo Vicio</span>
              <span className="d-sm-none">MNV</span>
            </Link>

            {/* Acciones móviles - Siempre visibles en pantallas pequeñas */}
            <div className="d-flex align-items-center d-lg-none" role="group" aria-label="Acciones móviles">
              <button
                className="btn btn-outline-light me-2 position-relative"
                onClick={toggleCart}
                aria-label={`Carrito de compras con ${cartCount} artículos`}
                aria-describedby="cart-count-mobile"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <FaShoppingCart size={18} aria-hidden="true" />
                {cartCount > 0 && (
                  <span
                    id="cart-count-mobile"
                    className="position-absolute top-0 start-100 badge rounded-pill bg-primary cart-badge cart-badge-float"
                    aria-label={`${cartCount} artículos en el carrito`}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Dropdown de usuario para móvil */}
              {isAuthenticated ? (
                <Dropdown>
                  <Dropdown.Toggle 
                    variant="outline-light" 
                    id="dropdown-user-mobile"
                    className="d-flex align-items-center"
                    aria-label={`Menú de usuario para ${user?.name || user?.email}`}
                    aria-expanded="false"
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  >
                    <FaUser size={16} aria-hidden="true" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu role="menu" aria-label="Opciones de usuario" className="dropdown-menu-end">
                    <Dropdown.Header role="presentation">
                      <small className="text-muted">
                        <span aria-label={`Email: ${user?.email}`}>
                          {user?.email}
                        </span>
                        {user?.role === 'admin' && (
                          <span 
                            className="badge bg-warning text-dark ms-2" 
                            aria-label="Rol de administrador"
                          >
                            Admin
                          </span>
                        )}
                      </small>
                    </Dropdown.Header>
                    <Dropdown.Divider role="separator" />
                    <Dropdown.Item 
                      as={Link} 
                      to="/perfil"
                      role="menuitem"
                      aria-label="Ir a mi perfil"
                      style={{ color: "#212529", opacity: 1, pointerEvents: "auto", textDecoration: "none" }}
                    >
                      <FaUser size={16} className="me-2" aria-hidden="true" />
                      Mi Perfil
                    </Dropdown.Item>
                    {user?.role === 'admin' && (
                      <Dropdown.Item 
                        as={Link} 
                        to="/admin"
                        role="menuitem"
                        aria-label="Ir al panel de administración"
                        style={{ color: "#212529", opacity: 1, pointerEvents: "auto", textDecoration: "none" }}
                      >
                        <FaCog size={16} className="me-2" aria-hidden="true" />
                        Panel Admin
                      </Dropdown.Item>
                    )}
                    <Dropdown.Divider role="separator" />
                    <Dropdown.Item 
                      onClick={handleLogout}
                      role="menuitem"
                      aria-label="Cerrar sesión"
                      style={{ color: "#212529", opacity: 1, pointerEvents: "auto", textDecoration: "none" }}
                    >
                      <FaSignOutAlt size={16} className="me-2" aria-hidden="true" />
                      Cerrar Sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <button
                  className="btn btn-outline-light"
                  onClick={handleLoginClick}
                  aria-label="Iniciar sesión"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <FaUser size={18} aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Botón hamburger para navegación móvil */}
            <button
              className="navbar-toggler ms-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Alternar navegación"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <span className="navbar-toggler-icon" aria-hidden="true"></span>
            </button>

            {/* Navegación colapsable - Menú principal */}
            <div className="collapse navbar-collapse" id="navbarNav" role="menubar">
              <ul className="navbar-nav me-auto" role="menubar">
                <li className="nav-item" role="none">
                  <Link 
                    className="nav-link d-flex align-items-center justify-content-center" 
                    to="/"
                    role="menuitem"
                    aria-label="Ir a la página de inicio"
                    style={{ minHeight: '44px' }}
                  >
                    <FaHome size={18} className="me-1" aria-hidden="true" />
                    <span className="d-none d-md-inline">Inicio</span>
                  </Link>
                </li>
                <li className="nav-item" role="none">
                  <Link 
                    className="nav-link d-flex align-items-center justify-content-center" 
                    to="/ofertas"
                    role="menuitem"
                    aria-label="Ver ofertas de juegos"
                    style={{ minHeight: '44px' }}
                  >
                    <FaTags size={18} className="me-1" aria-hidden="true" />
                    <span className="d-none d-md-inline">Ofertas</span>
                  </Link>
                </li>
                <li className="nav-item" role="none">
                  <Link 
                    className="nav-link d-flex align-items-center justify-content-center" 
                    to="/infaltables"
                    role="menuitem"
                    aria-label="Ver juegos infaltables"
                    style={{ minHeight: '44px' }}
                  >
                    <FaStar size={18} className="me-1" aria-hidden="true" />
                    <span className="d-none d-md-inline">Infaltables</span>
                  </Link>
                </li>
              </ul>

              {/* Acciones de escritorio - Ocultas en móvil */}
              <div className="d-none d-lg-flex align-items-center" role="group" aria-label="Acciones de escritorio">
                <button
                  className="btn btn-outline-light me-3 position-relative d-flex align-items-center"
                  onClick={toggleCart}
                  aria-label={`Carrito de compras con ${cartCount} artículos`}
                  aria-describedby="cart-count-desktop"
                  style={{ minHeight: '44px' }}
                >
                  <FaShoppingCart size={20} aria-hidden="true" />
                  {cartCount > 0 && (
                    <span
                      id="cart-count-desktop"
                      className="position-absolute top-0 start-100 badge rounded-pill bg-primary cart-badge cart-badge-float"
                      aria-label={`${cartCount} artículos en el carrito`}
                    >
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Dropdown de usuario para escritorio */}
                {isAuthenticated ? (
                  <Dropdown>
                    <Dropdown.Toggle 
                      variant="outline-light" 
                      id="dropdown-user-desktop"
                      className="d-flex align-items-center justify-content-center"
                      aria-label={`Menú de usuario para ${user?.name || user?.email}`}
                      aria-expanded="false"
                      style={{ minHeight: '44px' }}
                    >
                      <FaUser size={16} className="me-1" aria-hidden="true" />
                      {user?.role === 'admin' && (
                        <FaCrown 
                          size={14} 
                          className="ms-1 text-warning-accessible" 
                          aria-hidden="true"
                          title="Usuario administrador"
                        />
                      )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu role="menu" aria-label="Opciones de usuario" className="dropdown-menu-end">
                      <Dropdown.Header role="presentation">
                        <small className="text-muted">
                          <span aria-label={`Email: ${user?.email}`}>
                            {user?.email}
                          </span>
                          {user?.role === 'admin' && (
                            <span 
                              className="badge bg-warning text-dark ms-2" 
                              aria-label="Rol de administrador"
                            >
                              Admin
                            </span>
                          )}
                        </small>
                      </Dropdown.Header>
                      <Dropdown.Divider role="separator" />
                      <Dropdown.Item 
                        as={Link} 
                        to="/perfil"
                        role="menuitem"
                        aria-label="Ir a mi perfil"
                        style={{ color: "#212529", opacity: 1, pointerEvents: "auto", textDecoration: "none" }}
                      >
                        <FaUser size={16} className="me-2" aria-hidden="true" />
                        Mi Perfil
                      </Dropdown.Item>
                      {user?.role === 'admin' && (
                        <Dropdown.Item 
                          as={Link} 
                          to="/admin"
                          role="menuitem"
                          aria-label="Ir al panel de administración"
                          style={{ color: "#212529", opacity: 1, pointerEvents: "auto", textDecoration: "none" }}
                        >
                          <FaCog size={16} className="me-2" aria-hidden="true" />
                          Panel Admin
                        </Dropdown.Item>
                      )}
                      <Dropdown.Divider role="separator" />
                      <Dropdown.Item 
                        onClick={handleLogout}
                        role="menuitem"
                        aria-label="Cerrar sesión"
                        style={{ color: "#212529", opacity: 1, pointerEvents: "auto", textDecoration: "none" }}
                      >
                        <FaSignOutAlt size={16} className="me-2" aria-hidden="true" />
                        Cerrar Sesión
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <button
                    className="btn btn-outline-light d-flex align-items-center"
                    onClick={handleLoginClick}
                    aria-label="Iniciar sesión"
                    style={{ minHeight: '44px' }}
                  >
                    <FaUser size={20} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
