import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <h3 className="fs-4 fw-bold mb-3">Mi nuevo vicio</h3>
            <p className="text-secondary">
              Tu plataforma de confianza para descubrir y coleccionar los mejores juegos gratuitos.
            </p>
          </div>

          <div className="col-md-4">
            <h3 className="fs-4 fw-bold mb-3">Enlaces</h3>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-secondary text-decoration-none hover-text-white">
                  Inicio
                </a>
              </li>
              <li className="mb-2">
                <a href="/juegos" className="text-secondary text-decoration-none hover-text-white">
                  Juegos
                </a>
              </li>
              <li className="mb-2">
                <a href="/sobre-nosotros" className="text-secondary text-decoration-none hover-text-white">
                  Sobre Nosotros
                </a>
              </li>
              <li className="mb-2">
                <a href="/contacto" className="text-secondary text-decoration-none hover-text-white">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h3 className="fs-4 fw-bold mb-3">Contacto</h3>
            <address className="text-secondary mb-0">
              <p className="mb-1">Calle Ejemplo 123</p>
              <p className="mb-1">Ciudad, País</p>
              <p className="mb-1">Email: info@minuevovicio.com</p>
              <p className="mb-1">Teléfono: +123 456 7890</p>
            </address>
          </div>
        </div>

        <div className="border-top border-secondary mt-4 pt-4 text-center text-secondary">
          <p className="mb-2">&copy; {new Date().getFullYear()} Mi nuevo vicio. Todos los derechos reservados.</p>
          <Button 
            variant="link" 
            onClick={handleShow} 
            className="text-secondary text-decoration-none p-0"
          >
            Aviso Legal
          </Button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Aviso Legal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Esta página web ha sido creada exclusivamente con fines educativos y de aprendizaje. No tiene ningún propósito comercial ni busca generar ingresos.</p>
          <p>Todo el contenido presentado es únicamente para demostrar habilidades de desarrollo y aprendizaje en el ámbito de la programación web.</p>
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
