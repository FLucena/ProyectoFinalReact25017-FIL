import { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const ProductForm = ({ show, onHide, product = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    genre: '',
    platform: '',
    image: '',
    releaseDate: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!product;

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        price: product.price || '',
        description: product.description || '',
        genre: product.genre || '',
        platform: product.platform || '',
        image: product.image || '',
        releaseDate: product.releaseDate || ''
      });
    } else {
      setFormData({
        title: '',
        price: '',
        description: '',
        genre: '',
        platform: '',
        image: '',
        releaseDate: ''
      });
    }
    setErrors({});
  }, [product, show]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El nombre del producto es obligatorio';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    if (!formData.description || formData.description.length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }

    if (!formData.genre.trim()) {
      newErrors.genre = 'El género es obligatorio';
    }

    if (!formData.platform.trim()) {
      newErrors.platform = 'La plataforma es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit({
        ...formData,
        price: parseFloat(formData.price)
      });
      onHide();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Producto *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                  placeholder="Ej: The Legend of Zelda"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Precio *</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  isInvalid={!!errors.price}
                  placeholder="59.99"
                  step="0.01"
                  min="0"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Descripción *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
              placeholder="Describe el juego en al menos 10 caracteres..."
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Mínimo 10 caracteres
            </Form.Text>
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Género *</Form.Label>
                <Form.Select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  isInvalid={!!errors.genre}
                >
                  <option value="">Seleccionar género</option>
                  <option value="Acción">Acción</option>
                  <option value="Aventura">Aventura</option>
                  <option value="RPG">RPG</option>
                  <option value="Estrategia">Estrategia</option>
                  <option value="Deportes">Deportes</option>
                  <option value="Carreras">Carreras</option>
                  <option value="Puzzle">Puzzle</option>
                  <option value="Simulación">Simulación</option>
                  <option value="Terror">Terror</option>
                  <option value="Indie">Indie</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.genre}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Plataforma *</Form.Label>
                <Form.Select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  isInvalid={!!errors.platform}
                >
                  <option value="">Seleccionar plataforma</option>
                  <option value="PC">PC</option>
                  <option value="PlayStation 5">PlayStation 5</option>
                  <option value="PlayStation 4">PlayStation 4</option>
                  <option value="Xbox Series X">Xbox Series X</option>
                  <option value="Xbox One">Xbox One</option>
                  <option value="Nintendo Switch">Nintendo Switch</option>
                  <option value="Mobile">Mobile</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.platform}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>URL de la Imagen</Form.Label>
                <Form.Control
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                <Form.Text className="text-muted">
                  Opcional. Si no se proporciona, se usará una imagen por defecto.
                </Form.Text>
              </Form.Group>
            </div>
            
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Lanzamiento</Form.Label>
                <Form.Control
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  Opcional
                </Form.Text>
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isLoading}>
            Cancelar
          </Button>
          <Button 
            variant="danger" 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Guardando...
              </>
            ) : (
              <>
                {isEditing ? <Save size={16} className="me-2" /> : <Plus size={16} className="me-2" />}
                {isEditing ? 'Guardar Cambios' : 'Agregar Producto'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProductForm; 