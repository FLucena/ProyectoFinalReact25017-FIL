"use client"

import { useAuth } from "../context/AuthContext"
import { useProducts } from "../context/ProductContext"
import ProtectedRoute from "../components/ProtectedRoute"
import ProductForm from "../components/ProductForm"
import { useState, useEffect } from "react"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  SortAsc,
  SortDesc
} from "lucide-react"
import { 
  Button, 
  Modal, 
  Table, 
  Badge, 
  InputGroup, 
  Form,
  Alert,
  Spinner,
  Card,
  Row,
  Col
} from "react-bootstrap"

const Admin = () => {
  const { user } = useAuth();
  const { 
    products, 
    loading, 
    error, 
    fetchProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct 
  } = useProducts();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (productData) => {
    try {
      await addProduct(productData);
      setShowProductForm(false);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const handleEditProduct = async (productData) => {
    try {
      await updateProduct(editingProduct.id, productData);
      setShowProductForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error al editar producto:', error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(productToDelete.id);
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const filteredAndSortedProducts = products
    .filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.platform.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const stats = {
    totalProducts: products.length,
    totalUsers: 0, // Mock data
    totalOrders: 0, // Mock data
    totalRevenue: products.reduce((sum, product) => sum + (product.price || 0), 0)
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-md-3 col-lg-2">
            <div className="list-group">
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                Usuarios
              </button>
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'games' ? 'active' : ''}`}
                onClick={() => setActiveTab('games')}
              >
                Juegos
              </button>
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Órdenes
              </button>
            </div>
          </div>

          <div className="col-md-9 col-lg-10">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="card-title mb-0">
                    {activeTab === 'dashboard' && 'Dashboard'}
                    {activeTab === 'users' && 'Gestión de Usuarios'}
                    {activeTab === 'games' && 'Gestión de Juegos'}
                    {activeTab === 'orders' && 'Gestión de Órdenes'}
                  </h2>
                  {activeTab === 'games' && (
                    <Button 
                      variant="danger" 
                      onClick={() => setShowProductForm(true)}
                    >
                      <Plus size={16} className="me-2" />
                      Agregar Juego
                    </Button>
                  )}
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                {activeTab === 'dashboard' && (
                  <div className="row">
                    <div className="col-md-3 mb-4">
                      <Card bg="primary" text="white">
                        <Card.Body>
                          <Card.Title>Total Usuarios</Card.Title>
                          <Card.Text className="display-6">{stats.totalUsers}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="col-md-3 mb-4">
                      <Card bg="success" text="white">
                        <Card.Body>
                          <Card.Title>Total Juegos</Card.Title>
                          <Card.Text className="display-6">{stats.totalProducts}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="col-md-3 mb-4">
                      <Card bg="info" text="white">
                        <Card.Body>
                          <Card.Title>Total Órdenes</Card.Title>
                          <Card.Text className="display-6">{stats.totalOrders}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                    <div className="col-md-3 mb-4">
                      <Card bg="warning" text="white">
                        <Card.Body>
                          <Card.Title>Ingresos Totales</Card.Title>
                          <Card.Text className="display-6">${stats.totalRevenue.toFixed(2)}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                )}

                {activeTab === 'users' && (
                  <Alert variant="info">
                    No hay usuarios registrados.
                  </Alert>
                )}

                {activeTab === 'games' && (
                  <div>
                    {loading ? (
                      <div className="text-center py-5">
                        <Spinner animation="border" variant="danger" />
                        <p className="mt-3">Cargando productos...</p>
                      </div>
                    ) : (
                      <>
                        <div className="row mb-4">
                          <div className="col-md-6">
                            <InputGroup>
                              <InputGroup.Text>
                                <Search size={16} />
                              </InputGroup.Text>
                              <Form.Control
                                placeholder="Buscar juegos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                            </InputGroup>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex gap-2">
                              <Form.Select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{ width: 'auto' }}
                              >
                                <option value="title">Nombre</option>
                                <option value="price">Precio</option>
                                <option value="genre">Género</option>
                                <option value="platform">Plataforma</option>
                                <option value="releaseDate">Fecha</option>
                              </Form.Select>
                              <Button
                                variant="outline-secondary"
                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                              >
                                {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
                              </Button>
                            </div>
                          </div>
                        </div>

                        {filteredAndSortedProducts.length === 0 ? (
                          <Alert variant="info">
                            {searchTerm ? 'No se encontraron productos que coincidan con la búsqueda.' : 'No hay productos registrados.'}
                          </Alert>
                        ) : (
                          <Table responsive striped hover>
                            <thead>
                              <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Género</th>
                                <th>Plataforma</th>
                                <th>Acciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredAndSortedProducts.map((product) => (
                                <tr key={product.id}>
                                  <td>
                                    <img
                                      src={product.image || "/placeholder.svg"}
                                      alt={product.title}
                                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                      className="rounded"
                                    />
                                  </td>
                                  <td>
                                    <div>
                                      <strong>{product.title}</strong>
                                      <br />
                                      <small className="text-muted">{product.description?.substring(0, 50)}...</small>
                                    </div>
                                  </td>
                                  <td>
                                    <Badge bg="success">${product.price?.toFixed(2)}</Badge>
                                  </td>
                                  <td>
                                    <Badge bg="primary">{product.genre}</Badge>
                                  </td>
                                  <td>
                                    <Badge bg="secondary">{product.platform}</Badge>
                                  </td>
                                  <td>
                                    <div className="btn-group btn-group-sm">
                                      <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => openEditModal(product)}
                                        title="Editar"
                                      >
                                        <Edit size={14} />
                                      </Button>
                                      <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => openDeleteModal(product)}
                                        title="Eliminar"
                                      >
                                        <Trash2 size={14} />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        )}
                      </>
                    )}
                  </div>
                )}

                {activeTab === 'orders' && (
                  <Alert variant="info">
                    No hay órdenes registradas.
                  </Alert>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal de formulario de producto */}
        <ProductForm
          show={showProductForm}
          onHide={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
          product={editingProduct}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        />

        {/* Modal de confirmación de eliminación */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de que deseas eliminar el juego "{productToDelete?.title}"?
            Esta acción no se puede deshacer.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDeleteProduct}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </ProtectedRoute>
  )
}

export default Admin 