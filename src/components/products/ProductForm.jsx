import { useState, useEffect, useRef } from 'react';
import { Save, Plus, AlertCircle } from 'lucide-react';
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
  const [submitted, setSubmitted] = useState(false);

  const fieldRefs = {
    title: useRef(null),
    price: useRef(null),
    description: useRef(null),
    genre: useRef(null),
    platform: useRef(null),
  };

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
    setSubmitted(false);
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

  const FIELD_LABELS = {
    title: "Nombre del Producto",
    price: "Precio",
    description: "Descripción",
    genre: "Género",
    platform: "Plataforma",
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
    setSubmitted(true);
    if (!validateForm()) {
      // Scroll to the first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField && fieldRefs[firstErrorField]?.current) {
        fieldRefs[firstErrorField].current.focus();
        fieldRefs[firstErrorField].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
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
      // Mostrar error al usuario
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Error al guardar el producto. Por favor, inténtalo de nuevo.'
      }));
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

    // Solo valida y actualiza errores si el formulario ya fue enviado
    if (submitted) {
      const error = validateField(name, value);
      setErrors(prev => {
        const newErrors = { ...prev, [name]: error };
        if (!error) delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    // Solo valida y actualiza errores si el formulario ya fue enviado
    if (submitted) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
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
          {/* Error summary at the top */}
          {submitted && Object.keys(errors).length > 0 && (
            <Alert variant="danger" className="mb-3">
              <AlertCircle size={16} className="me-2" />
              <strong>Corrige los siguientes errores:</strong>
              <ul className="mb-0 mt-2">
                {Object.entries(errors).map(([field, msg]) => {
                  // No mostrar errores de envío en la lista de campos
                  if (field === 'submit') return null;
                  return (
                    <li key={field}><strong>{FIELD_LABELS[field] || field}:</strong> {msg || 'Este campo es obligatorio'}</li>
                  );
                })}
              </ul>
            </Alert>
          )}
          
          {/* Error de envío específico */}
          {errors.submit && (
            <Alert variant="danger" className="mb-3">
              <AlertCircle size={16} className="me-2" />
              <strong>Error al guardar:</strong> {errors.submit}
            </Alert>
          )}
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
                  isInvalid={submitted && !!errors.title}
                  placeholder="Ej: The Legend of Zelda"
                  aria-describedby="title-help"
                  ref={fieldRefs.title}
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
                  isInvalid={submitted && !!errors.price}
                  placeholder="59.99"
                  step="0.01"
                  min="0"
                  max="999.99"
                  aria-describedby="price-help"
                  ref={fieldRefs.price}
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
              isInvalid={submitted && !!errors.description}
              placeholder="Describe el juego en al menos 10 caracteres..."
              aria-describedby="description-help"
              ref={fieldRefs.description}
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
                  isInvalid={submitted && !!errors.genre}
                  aria-describedby="genre-help"
                  ref={fieldRefs.genre}
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
                  isInvalid={submitted && !!errors.platform}
                  aria-describedby="platform-help"
                  ref={fieldRefs.platform}
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
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  aria-describedby="image-help"
                />
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