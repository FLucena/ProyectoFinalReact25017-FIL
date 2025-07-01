import { FaEnvelope, FaGithub, FaLinkedin, FaGraduationCap, FaInfoCircle, FaGlobe } from 'react-icons/fa';
import { Card, Container, Row, Col, Alert } from 'react-bootstrap';

const Contacto = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold mb-3">
              <FaEnvelope className="me-3 text-primary" />
              Contacto
            </h1>
            <p className="lead text-muted">
              Información de contacto para este proyecto educativo
            </p>
          </div>

          <Alert variant="info" className="mb-4">
            <FaInfoCircle className="me-2" />
            <strong>Proyecto Educativo:</strong> Este es un proyecto de demostración desarrollado como parte del programa Talento Tech.
          </Alert>

          <Row className="mb-5">
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <FaGraduationCap className="display-4 text-primary mb-3" />
                  <Card.Title>Propósito del Proyecto</Card.Title>
                  <Card.Text>
                    Este proyecto fue desarrollado para demostrar habilidades en desarrollo web frontend, 
                    utilizando React y otras tecnologías modernas.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <FaGithub className="display-4 text-dark mb-3" />
                  <Card.Title>Repositorio</Card.Title>
                  <Card.Text>
                    El código fuente de este proyecto está disponible en GitHub para fines educativos 
                    y de aprendizaje.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="border-0 shadow-sm mb-5">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">
                <FaEnvelope className="me-2" />
                Información de Contacto
              </h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6 className="text-primary mb-3">Desarrollador</h6>
                  <p className="mb-2">
                    <strong>Programa:</strong> Talento Tech
                  </p>
                  <p className="mb-2">
                    <strong>Proyecto:</strong> Ecommerce Educativo
                  </p>
                  <p className="mb-2">
                    <strong>Tecnologías:</strong> React, Vite, Bootstrap
                  </p>
                </Col>
                <Col md={6}>
                  <h6 className="text-primary mb-3">Enlaces Útiles</h6>
                  <p className="mb-2">
                    <FaGlobe className="me-2" />
                    <strong>Portfolio:</strong> 
                    <a 
                      href="https://flucena.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-decoration-none ms-1"
                    >
                      Sitio web personal
                    </a>
                  </p>
                  <p className="mb-2">
                    <FaGithub className="me-2" />
                    <strong>GitHub:</strong> 
                    <a 
                      href="https://github.com/FLucena/ProyectoFinalReact25017-FIL" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-decoration-none ms-1"
                    >
                      Repositorio del proyecto
                    </a>
                  </p>
                  <p className="mb-2">
                    <FaLinkedin className="me-2" />
                    <strong>LinkedIn:</strong> 
                    <a 
                      href="https://www.linkedin.com/in/franciscoivanlucena/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-decoration-none ms-1"
                    >
                      Perfil profesional
                    </a>
                  </p>
                  <p className="mb-2">
                    <FaEnvelope className="me-2" />
                    <strong>Email:</strong> 
                    <a 
                      href="mailto:franciscolucena90@gmail.com"
                      className="text-decoration-none ms-1"
                    >
                      franciscolucena90@gmail.com
                    </a>
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-success text-white">
              <h4 className="mb-0">
                <FaInfoCircle className="me-2" />
                Nota Importante
              </h4>
            </Card.Header>
            <Card.Body>
              <p>
                Este proyecto es exclusivamente educativo y no tiene fines comerciales. 
                Si tienes preguntas sobre el desarrollo, las tecnologías utilizadas o 
                quieres ver el código fuente, puedes contactar al desarrollador a través 
                de los enlaces proporcionados.
              </p>
              <p className="mb-0">
                <strong>Recuerda:</strong> Todos los juegos mostrados en esta aplicación 
                son gratuitos y provienen de la API pública de FreeToGame.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto; 