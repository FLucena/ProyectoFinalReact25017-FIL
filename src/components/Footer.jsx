import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaGamepad, FaInfoCircle } from 'react-icons/fa';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <footer className="bg-dark text-white py-5 mt-5" style={{ marginTop: 'auto' }}>
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <h3 className="fs-4 fw-bold mb-3">
              <FaGamepad className="me-2" />
              Mi nuevo vicio
            </h3>
            <p className="text-secondary-accessible">
              <strong>Proyecto Educativo:</strong> Plataforma de demostración para mostrar habilidades de desarrollo web. 
              Todos los juegos mostrados son gratuitos y provienen de la API pública de FreeToGame.
            </p>
            <div className="alert alert-info alert-sm" role="alert">
              <FaInfoCircle className="me-2" />
              <small>Este es un proyecto de aprendizaje, no un ecommerce real.</small>
            </div>
          </div>

          <div className="col-md-4">
            <h3 className="fs-4 fw-bold mb-3">Enlaces</h3>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-secondary-accessible text-decoration-none hover-text-white">
                  Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/sobre-proyecto" className="text-secondary-accessible text-decoration-none hover-text-white">
                  Sobre el Proyecto
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto" className="text-secondary-accessible text-decoration-none hover-text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h3 className="fs-4 fw-bold mb-3">Información del Proyecto</h3>
            <div className="text-secondary-accessible mb-0">
              <p className="mb-1">
                <FaGraduationCap className="me-2" />
                <strong>Propósito:</strong> Educativo
              </p>
              <p className="mb-1">
                <FaGamepad className="me-2" />
                <strong>Contenido:</strong> Juegos gratuitos
              </p>
              <p className="mb-1">
                <strong>API:</strong> FreeToGame
              </p>
              <p className="mb-1">
                <strong>Tecnología:</strong> React + Vite
              </p>
            </div>
          </div>
        </div>

        <div className="border-top border-secondary mt-4 pt-4 text-center text-secondary-accessible">
          <p className="mb-2">&copy; {new Date().getFullYear()} Mi nuevo vicio - Proyecto Educativo. Todos los derechos reservados.</p>
          <Button 
            variant="link" 
            onClick={handleShow} 
            className="text-secondary-accessible text-decoration-none p-0"
          >
            Aviso Legal y Propósito Educativo
          </Button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaGraduationCap className="me-2" />
            Aviso Legal y Propósito Educativo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-info" role="alert">
            <h6><strong>Propósito Educativo</strong></h6>
            <p>Esta aplicación web ha sido desarrollada exclusivamente con fines educativos y de aprendizaje como parte del programa Talento Tech.</p>
          </div>
          
          <h6><strong>Características del Proyecto:</strong></h6>
          <ul>
            <li>Es un ejemplo de ecommerce para demostrar habilidades de desarrollo web</li>
            <li>Utiliza la API pública de FreeToGame para mostrar juegos gratuitos</li>
            <li>No tiene ningún propósito comercial ni busca generar ingresos</li>
            <li>Todo el contenido es únicamente para demostrar habilidades de programación</li>
            <li>Los juegos mostrados son realmente gratuitos y están disponibles públicamente</li>
          </ul>
          
          <div className="alert alert-warning" role="alert">
            <strong>Importante:</strong> Esta es una aplicación de demostración. No se realizan transacciones reales ni se venden productos.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  )
}

export default Footer
