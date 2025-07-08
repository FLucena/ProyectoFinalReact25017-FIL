import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-3 mb-3">404</h1>
      <h2 className="mb-4">Página no encontrada</h2>
      <p className="mb-4">La página que buscas no existe o fue movida.</p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
} 