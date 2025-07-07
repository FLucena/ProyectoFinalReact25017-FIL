import { useState, useEffect } from 'react';
import { X, Save, Plus, AlertCircle } from 'lucide-react';
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
  const [touched, setTouched] = useState({});

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
    setTouched({});
  }, [product, show]);

  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        if (!value.trim()) {
          return 'El nombre del producto es obligatorio';
        }
        if (value.trim().length < 3) {
          return 'El nombre debe tener al menos 3 caracteres';
        }
        return '';
      
      case 'price':
        if (!value) {
          return 'El precio es obligatorio';
        }
        if (isNaN(value) || parseFloat(value) <= 0) {
          return 'El precio debe ser mayor a 0';
        }
        if (parseFloat(value) > 999.99) {
          return 'El precio no puede ser mayor a $999.99';
        }
        return '';
      
      case 'description':
        if (!value.trim()) {
          return 'La descripción es obligatoria';
        }
        if (value.trim().length < 10) {
          return 'La descripción debe tener al menos 10 caracteres';
        }
        if (value.trim().length > 500) {
          return 'La descripción no puede exceder 500 caracteres';
        }
        return '';
      
      case 'genre':
        if (!value) {
          return 'El género es obligatorio';
        }
        return '';
      
      case 'platform':
        if (!value) {
          return 'La plataforma es obligatoria';
        }
        return '';
      
      case 'image':
        return '';
      
      default:
        return '';
    }
  };



  const validateForm = () => {
    const newErrors = {};
    const fields = ['title', 'price', 'description', 'genre', 'platform'];
    
    fields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });



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
    
    // Validar campo en tiempo real si ya ha sido tocado
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const isFormValid = () => {
    return !Object.values(errors).some(error => error) &&
           formData.title.trim() &&
           formData.price &&
           formData.description.trim() &&
           formData.genre &&
           formData.platform;
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
                  onBlur={handleBlur}
                  isInvalid={!!errors.title}
                  placeholder="Ej: The Legend of Zelda"
                  aria-describedby="title-help"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
                <Form.Text id="title-help" className="text-muted">
                  Mínimo 3 caracteres
                </Form.Text>
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
                  onBlur={handleBlur}
                  isInvalid={!!errors.price}
                  placeholder="59.99"
                  step="0.01"
                  min="0"
                  max="999.99"
                  aria-describedby="price-help"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
                <Form.Text id="price-help" className="text-muted">
                  Máximo $999.99
                </Form.Text>
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
              onBlur={handleBlur}
              isInvalid={!!errors.description}
              placeholder="Describe el juego en al menos 10 caracteres..."
              aria-describedby="description-help"
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
            <Form.Text id="description-help" className="text-muted">
              {formData.description.length}/500 caracteres (mínimo 10)
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
                  onBlur={handleBlur}
                  isInvalid={!!errors.genre}
                  aria-describedby="genre-help"
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
                  <option value="Plataformas">Plataformas</option>
                  <option value="FPS">FPS</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.genre}
                </Form.Control.Feedback>
                <Form.Text id="genre-help" className="text-muted">
                  Selecciona el género principal del juego
                </Form.Text>
              </Form.Group>
            </div>
            
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Plataforma *</Form.Label>
                <Form.Select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.platform}
                  aria-describedby="platform-help"
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
                <Form.Text id="platform-help" className="text-muted">
                  Selecciona la plataforma principal
                </Form.Text>
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
                  onBlur={handleBlur}
                  isInvalid={!!errors.image}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  aria-describedby="image-help"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.image}
                </Form.Control.Feedback>
                <Form.Text id="image-help" className="text-muted">
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
                  aria-describedby="release-help"
                />
                <Form.Text id="release-help" className="text-muted">
                  Opcional. Si no se especifica, se usará la fecha actual.
                </Form.Text>
              </Form.Group>
            </div>
          </div>

          {Object.keys(errors).length > 0 && (
            <Alert variant="warning" className="mt-3">
              <AlertCircle size={16} className="me-2" />
              Por favor corrige los errores antes de continuar.
            </Alert>
          )}
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isLoading}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            type="submit" 
            disabled={isLoading || !isFormValid()}
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