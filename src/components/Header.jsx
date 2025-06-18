"use client"

import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart, User, LogOut, Settings, Crown } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { Dropdown } from "react-bootstrap"

const Header = ({ cartCount, toggleCart, toggleLogin }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

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
    <header className="fixed-top bg-dark text-white">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            🎮 Mi Nuevo Vicio
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ofertas">
                  Ofertas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/infaltables">
                  Infaltables
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-light me-2 position-relative"
                onClick={toggleCart}
                title="Carrito de compras"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {isAuthenticated ? (
                <Dropdown>
                  <Dropdown.Toggle 
                    variant="outline-light" 
                    id="dropdown-user"
                    className="d-flex align-items-center"
                  >
                    <User size={16} className="me-2" />
                    {user?.name || user?.email}
                    {user?.role === 'admin' && (
                      <Crown size={14} className="ms-2 text-warning" />
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Header>
                      <small className="text-muted">
                        {user?.email}
                        {user?.role === 'admin' && (
                          <span className="badge bg-warning text-dark ms-2">Admin</span>
                        )}
                      </small>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item as={Link} to="/perfil">
                      <User size={16} className="me-2" />
                      Mi Perfil
                    </Dropdown.Item>
                    {user?.role === 'admin' && (
                      <Dropdown.Item as={Link} to="/admin">
                        <Settings size={16} className="me-2" />
                        Panel Admin
                      </Dropdown.Item>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className="text-danger">
                      <LogOut size={16} className="me-2" />
                      Cerrar Sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <button
                  className="btn btn-outline-light"
                  onClick={handleLoginClick}
                  title="Iniciar sesión"
                >
                  <User size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
