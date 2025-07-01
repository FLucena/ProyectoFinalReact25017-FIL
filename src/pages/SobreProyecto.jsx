import { FaGraduationCap, FaGamepad, FaCode, FaInfoCircle, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { Card, Container, Row, Col, Alert, Badge } from 'react-bootstrap';

const SobreProyecto = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold mb-3">
              <FaGraduationCap className="me-3 text-primary" />
              Sobre Este Proyecto
            </h1>
            <p className="lead text-muted">
              Una aplicación educativa para demostrar habilidades de desarrollo web
            </p>
          </div>

          <Alert variant="info" className="mb-4">
            <FaInfoCircle className="me-2" />
            <strong>Propósito Educativo:</strong> Este proyecto fue desarrollado como parte del programa Talento Tech 
            para practicar y demostrar habilidades en desarrollo frontend con React.
          </Alert>

          <Row className="mb-5">
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <FaGamepad className="display-4 text-primary mb-3" />
                  <Card.Title>¿Qué es?</Card.Title>
                  <Card.Text>
                    Un ejemplo de ecommerce que simula una tienda de videojuegos, pero utiliza únicamente 
                    juegos gratuitos de la API pública de FreeToGame.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <FaCode className="display-4 text-success mb-3" />
                  <Card.Title>Tecnologías</Card.Title>
                  <Card.Text>
                    Desarrollado con React 18, Vite, Bootstrap, y otras tecnologías modernas 
                    para crear una experiencia de usuario completa.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="border-0 shadow-sm mb-5">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">
                <FaExclamationTriangle className="me-2" />
                Información Importante
              </h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6 className="text-danger mb-3">
                    <FaExclamationTriangle className="me-2" />
                    Lo que NO es:
                  </h6>
                  <ul className="text-muted">
                    <li>Un ecommerce real</li>
                    <li>Una tienda de videojuegos comercial</li>
                    <li>Una plataforma de ventas</li>
                    <li>Un sitio web con fines de lucro</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6 className="text-success mb-3">
                    <FaCheckCircle className="me-2" />
                    Lo que SÍ es:
                  </h6>
                  <ul className="text-muted">
                    <li>Un proyecto educativo</li>
                    <li>Una demostración de habilidades</li>
                    <li>Un catálogo de juegos gratuitos</li>
                    <li>Un ejemplo de desarrollo web</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mb-5">
            <Card.Header className="bg-success text-white">
              <h4 className="mb-0">
                <FaGamepad className="me-2" />
                Sobre los Juegos
              </h4>
            </Card.Header>
            <Card.Body>
              <p>
                Todos los juegos mostrados en esta aplicación son <strong>realmente gratuitos</strong> y provienen de la 
                API pública de <a href="https://www.freetogame.com/" target="_blank" rel="noopener noreferrer">FreeToGame</a>.
              </p>
              <div className="row">
                <Col md={6}>
                  <h6>Características de los juegos:</h6>
                  <ul>
                    <li>Completamente gratuitos para jugar</li>
                    <li>Sin costos ocultos</li>
                    <li>Disponibles en múltiples plataformas</li>
                    <li>Diferentes géneros y categorías</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6>Información proporcionada:</h6>
                  <ul>
                    <li>Títulos y descripciones</li>
                    <li>Imágenes y thumbnails</li>
                    <li>Géneros y plataformas</li>
                    <li>Fechas de lanzamiento</li>
                  </ul>
                </Col>
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-warning text-dark">
              <h4 className="mb-0">
                <FaGraduationCap className="me-2" />
                Funcionalidades de Aprendizaje
              </h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4} className="mb-3">
                  <div className="text-center">
                    <Badge bg="primary" className="mb-2">Frontend</Badge>
                    <ul className="list-unstyled text-start">
                      <li>React Hooks</li>
                      <li>Context API</li>
                      <li>React Router</li>
                      <li>Componentes reutilizables</li>
                    </ul>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="text-center">
                    <Badge bg="success" className="mb-2">UI/UX</Badge>
                    <ul className="list-unstyled text-start">
                      <li>Bootstrap responsive</li>
                      <li>Diseño mobile-first</li>
                      <li>Accesibilidad</li>
                      <li>Experiencia de usuario</li>
                    </ul>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="text-center">
                    <Badge bg="info" className="mb-2">Integración</Badge>
                    <ul className="list-unstyled text-start">
                      <li>APIs externas</li>
                      <li>Manejo de estado</li>
                      <li>Autenticación</li>
                      <li>CRUD operations</li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SobreProyecto; 