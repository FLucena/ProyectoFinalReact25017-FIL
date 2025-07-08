import { Link } from "react-router-dom";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

export default function NotFound() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0">
            <Card.Body className="text-center p-5">
              {/* Icono de error */}
              <div className="mb-4">
                <AlertTriangle size={80} className="text-warning" />
              </div>
              
              {/* Título y mensaje */}
              <h1 className="display-1 text-muted mb-3">404</h1>
              <h2 className="h3 mb-3">Página no encontrada</h2>
              <p className="text-muted mb-4">
                Lo sentimos, la página que buscas no existe o no tienes permisos para acceder a ella.
              </p>
              
              {/* Botones de acción */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button 
                  variant="primary" 
                  as={Link} 
                  to="/"
                  className="d-flex align-items-center gap-2"
                >
                  <Home size={16} />
                  Ir al Inicio
                </Button>
                <Button 
                  variant="outline-secondary" 
                  onClick={() => window.history.back()}
                  className="d-flex align-items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Volver Atrás
                </Button>
              </div>
              
              {/* Información adicional */}
              <div className="mt-4 pt-4 border-top">
                <small className="text-muted">
                  Si crees que esto es un error, contacta al administrador del sitio.
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
} 