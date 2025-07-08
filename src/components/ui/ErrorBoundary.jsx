import React from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente render muestre la UI de error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes registrar el error en un servicio de logging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container className="py-5">
          <div className="text-center">
            <Alert variant="danger" className="border-0 shadow-sm">
              <div className="py-4">
                <AlertTriangle size={48} className="text-danger mb-3" />
                <h2 className="h4 mb-3">Algo salió mal</h2>
                <p className="text-muted mb-4">
                  Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado.
                </p>
                
                <div className="d-flex gap-2 justify-content-center">
                  <Button 
                    variant="outline-primary" 
                    onClick={this.handleReload}
                    className="d-flex align-items-center gap-2"
                  >
                    <RefreshCw size={16} />
                    Recargar página
                  </Button>
                  <Link to="/">
                    <Button 
                      variant="outline-secondary"
                      className="d-flex align-items-center gap-2"
                    >
                      <Home size={16} />
                      Ir al inicio
                    </Button>
                  </Link>
                </div>

                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="mt-4 text-start">
                    <summary className="text-muted cursor-pointer">
                      Detalles del error (solo desarrollo)
                    </summary>
                    <pre className="mt-2 p-3 bg-light rounded small">
                      {this.state.error && this.state.error.toString()}
                      <br />
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            </Alert>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 