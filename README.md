# 🎮 Mi Nuevo Vicio - E-commerce de Videojuegos

Este proyecto es parte del programa Talento Tech y consiste en una aplicación de e-commerce moderna y funcional. **Este proyecto es únicamente con fines educativos y de práctica.**

## 📚 Propósito Educativo

Este proyecto fue desarrollado como parte del programa Talento Tech para practicar y demostrar habilidades en:
- Desarrollo Frontend con React
- Integración con APIs
- Manejo de estado y efectos
- Diseño responsivo y UI/UX
- Buenas prácticas de desarrollo
- Control de versiones con Git

## 🎓 Aprendizajes en Clase

### React Router y Navegación
- ✅ Aprendimos sobre Router - Rutas Estáticas y Dinámicas
- ✅ Vimos la instalación y configuración de React Router
- ✅ Creamos rutas estáticas (inicio, lista de productos)
- ✅ Utilizamos Link para navegar entre componentes
- ✅ Implementamos manejo de rutas protegidas

### Estado y Efectos
- ✅ Implementamos hooks personalizados
- ✅ Manejo de estado global
- ✅ Efectos secundarios con useEffect
- ✅ Optimización de rendimiento

## 🔌 API Utilizada

El proyecto utiliza la API pública de [FreeToGame](https://www.freetogame.com/api-doc) para obtener datos de videojuegos. Esta API proporciona información sobre juegos gratuitos, incluyendo:
- Títulos y descripciones
- Imágenes y thumbnails
- Géneros y categorías
- Plataformas soportadas
- Fechas de lanzamiento
- Editores y desarrolladores

## 🚀 Tech Stack

### Frontend
- **React 18** - Biblioteca principal para la construcción de la interfaz de usuario
- **Vite** - Herramienta de build y desarrollo
- **React Router DOM** - Manejo de rutas y navegación
- **Bootstrap & React Bootstrap** - Framework CSS y componentes UI
- **Lucide React** - Iconos modernos
- **Sonner** - Notificaciones toast
- **Date-fns** - Manipulación de fechas
- **React Helmet Async** - SEO y manejo de meta tags

## 🛠️ Instalación y Configuración

1. Clona el repositorio
```bash
git clone [URL del repositorio]
cd mi-nuevo-vicio
```

2. Instala las dependencias
```bash
npm install
```

3. Inicia el servidor de desarrollo
```bash
npm run dev
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la versión de producción localmente

## 🎯 Características Principales

### ✅ Requerimiento #1: Gestión del Carrito y Autenticación de Usuarios
- **Carrito de Compras con Context API**
  - Implementado un CarritoContext que gestiona los productos agregados
  - Permite agregar, eliminar y vaciar el carrito
  - Mantiene el estado global con Context API
  - **Acceso restringido**: Solo usuarios autenticados pueden acceder al carrito

- **Autenticación de Usuarios**
  - AuthContext para manejar el estado de autenticación
  - Login simulado con localStorage para persistencia
  - Rutas protegidas que restringen acceso al carrito y secciones privadas
  - Sistema de roles (admin/user) con diferentes permisos

### ✅ Requerimiento #2: CRUD de Productos con MockAPI
- **Formulario para Agregar Productos**
  - Formulario controlado con useState y validaciones
  - Validaciones implementadas:
    - Nombre obligatorio
    - Precio mayor a 0
    - Descripción mínima de 10 caracteres
  - Envío de datos a MockAPI mediante solicitudes POST

- **Edición y Eliminación de Productos**
  - Edición de productos utilizando MockAPI y Context API
  - Mensajes de error y confirmaciones al usuario
  - Modal de confirmación antes de eliminar un producto

- **Manejo de Errores**
  - Mensajes de error en pantalla para problemas con la API
  - Estados de carga y error al obtener los productos

### ✅ Requerimiento #3: Optimización de Diseño y Responsividad
- **Diseño Responsivo con Bootstrap**
  - Sistema de grillas de Bootstrap para adaptar contenido a distintos dispositivos
  - Componentes UI modernos y accesibles

- **Interactividad Mejorada**
  - Iconos en botones y elementos interactivos con Lucide React
  - Notificaciones de éxito y error con Sonner
  - Animaciones y transiciones suaves

- **SEO y Accesibilidad con React Helmet**
  - Títulos y meta tags dinámicos para mejorar el SEO
  - Etiquetas ARIA para accesibilidad
  - Open Graph y Twitter Card meta tags

### ✅ Requerimiento #4: Preparación para el Despliegue
- **Pruebas de Compatibilidad**
  - Verificado funcionamiento en móviles, tablets y escritorios
  - Revisados tiempos de carga y experiencia de usuario

- **Optimización del Código**
  - Código revisado y elementos innecesarios eliminados
  - Estado global bien gestionado con Context API

- **Documentación Básica**
  - Instrucciones completas en el README.md sobre instalación y uso

## 🔐 Credenciales de Prueba

Para probar la aplicación, puedes usar estas credenciales:

### Usuario Administrador
- **Email**: admin@test.com
- **Contraseña**: admin123
- **Permisos**: Acceso completo al panel de administración

### Usuario Regular
- **Email**: user@test.com
- **Contraseña**: user123
- **Permisos**: Acceso al carrito y perfil

## 🎮 Funcionalidades del E-commerce

### Catálogo de Productos
- Lista de videojuegos con filtros por plataforma y género
- Búsqueda en tiempo real
- Paginación para mejor rendimiento
- Vista detallada de cada producto

### Carrito de Compras
- Agregar/eliminar productos
- Modificar cantidades
- Cálculo automático del total
- Persistencia en localStorage
- **Acceso restringido a usuarios autenticados**

### Panel de Administración
- Dashboard con estadísticas
- CRUD completo de productos
- Gestión de usuarios (mock)
- Gestión de órdenes (mock)
- **Acceso restringido a administradores**

### Sistema de Autenticación
- Login/Registro de usuarios
- Persistencia de sesión
- Rutas protegidas
- Diferentes niveles de acceso
- Logout seguro

## 📱 Características Técnicas

### Arquitectura
- **Context API** para estado global
- **Hooks personalizados** para lógica reutilizable
- **Componentes modulares** y reutilizables
- **Rutas protegidas** con React Router

### UI/UX
- **Diseño responsivo** con Bootstrap 5
- **Iconos modernos** con Lucide React
- **Notificaciones toast** con Sonner
- **Modales y confirmaciones** para acciones importantes

### SEO y Accesibilidad
- **Meta tags dinámicos** con React Helmet
- **Etiquetas ARIA** para accesibilidad
- **Open Graph** para redes sociales
- **Canonical URLs** para SEO

## 🚀 Despliegue

La aplicación está lista para ser desplegada en cualquier plataforma de hosting estático como:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

Para construir la aplicación para producción:
```bash
npm run build
```

## 🤝 Contribución

Este es un proyecto educativo, pero si deseas contribuir o sugerir mejoras:
1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/FuncionalidadIncreible`)
3. Commit tus cambios (`git commit -m 'Add some FuncionalidadIncreible'`)
4. Push a la rama (`git push origin feature/FuncionalidadIncreible`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado por Francisco Lucena como parte del programa Talento Tech.

## 🎯 Estado del Proyecto

**✅ COMPLETADO** - Todos los requerimientos de la entrega final han sido implementados:

- ✅ Gestión del Carrito y Autenticación de Usuarios
- ✅ CRUD de Productos con MockAPI
- ✅ Optimización de Diseño y Responsividad
- ✅ Preparación para el Despliegue

El proyecto está listo para la presentación final y demuestra un e-commerce funcional y completo con todas las características solicitadas. 