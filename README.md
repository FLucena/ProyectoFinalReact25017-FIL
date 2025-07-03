# 🎮 Mi Nuevo Vicio - Proyecto Educativo de E-commerce

Este proyecto es parte del programa Talento Tech y consiste en una aplicación de e-commerce moderna y funcional desarrollada para fines educativos. **Este proyecto es únicamente con fines educativos y de práctica.**

## ⚠️ Importante: Propósito Educativo

**Este NO es un ecommerce real.** Es un proyecto de demostración que:
- Utiliza únicamente juegos gratuitos de la API pública de FreeToGame
- No realiza transacciones reales
- No vende productos
- Es exclusivamente para demostrar habilidades de desarrollo web

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
- **React-Toastify** - Notificaciones toast
- **Date-fns** - Manipulación de fechas
- **React Helmet Async** - SEO y manejo de meta tags

### Performance & Optimization
- **Service Worker** - Caching y offline functionality
- **Lazy Loading** - Code splitting para componentes no críticos
- **Bundle Splitting** - Optimización de chunks de JavaScript
- **Critical CSS** - CSS inline para render-blocking prevention
- **Resource Hints** - DNS prefetch y preconnect para conexiones externas

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

3. **Configura MockAPI.io (Opcional pero recomendado)**
   - Sigue las instrucciones en `MOCKAPI_SETUP.md`
   - Esto permitirá que el formulario de productos funcione con solicitudes POST reales

4. Inicia el servidor de desarrollo
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
  - Interfaz mejorada con mejor UX y accesibilidad
  - Contador de artículos en tiempo real
  - Modales de confirmación para acciones destructivas

- **Autenticación de Usuarios**
  - AuthContext para manejar el estado de autenticación
  - Login simulado con localStorage para persistencia
  - Rutas protegidas que restringen acceso al carrito y secciones privadas
  - Sistema de roles (admin/user) con diferentes permisos
  - Validación de credenciales en tiempo real

### ✅ Requerimiento #2: CRUD de Productos con MockAPI
- **Formulario para Agregar Productos**
  - Formulario controlado con useState y validaciones avanzadas
  - Validaciones implementadas:
    - Nombre obligatorio (mínimo 3 caracteres)
    - Precio mayor a 0 (máximo $999.99)
    - Descripción mínima de 10 caracteres (máximo 500)
    - Género y plataforma obligatorios
    - Validación de URL de imagen
  - **Envío de datos a MockAPI mediante solicitudes POST** ✅ IMPLEMENTADO
  - Validación en tiempo real con feedback visual
  - **Configuración de MockAPI.io**: Ver archivo `MOCKAPI_SETUP.md` para instrucciones

- **Edición y Eliminación de Productos**
  - Edición de productos utilizando MockAPI y Context API ✅ IMPLEMENTADO
  - Mensajes de error y confirmaciones al usuario
  - Modal de confirmación antes de eliminar un producto
  - Búsqueda y filtrado avanzado en el panel de administración
  - Ordenamiento por múltiples criterios

- **Manejo de Errores**
  - Mensajes de error en pantalla para problemas con la API ✅ IMPLEMENTADO
  - Estados de carga y error al obtener los productos
  - Validación robusta con manejo de excepciones
  - Feedback visual para todas las operaciones
  - **Fallback automático**: Si MockAPI no está disponible, usa datos locales

### ✅ Requerimiento #3: Optimización de Diseño y Responsividad
- **Diseño Responsivo con Bootstrap**
  - Sistema de grillas de Bootstrap para adaptar contenido a distintos dispositivos
  - Componentes UI modernos y accesibles
  - Diseño mobile-first con breakpoints optimizados
  - Layout flexible que se adapta a diferentes tamaños de pantalla

- **Interactividad Mejorada**
  - Iconos en botones y elementos interactivos con Lucide React
  - Notificaciones de éxito y error con React-Toastify
  - Animaciones y transiciones suaves
  - Estados de carga con spinners
  - Tooltips y mensajes informativos

- **SEO y Accesibilidad con React Helmet**
  - Títulos y meta tags dinámicos para mejorar el SEO
  - Etiquetas ARIA para accesibilidad
  - Open Graph y Twitter Card meta tags
  - Structured Data (JSON-LD) para motores de búsqueda
  - Meta tags específicos por página
  - Manifest.json para PWA

### ✅ Requerimiento #4: Funcionalidades de Búsqueda y Paginación
- **Barra de Búsqueda**
  - Búsqueda en tiempo real por nombre o categoría
  - Filtros avanzados por plataforma y género
  - Ordenamiento por múltiples criterios
  - Búsqueda eficiente con debouncing

- **Paginador de Productos**
  - Paginación que divide los productos en varias páginas
  - Navegación fluida entre páginas
  - Contador de resultados y páginas
  - Experiencia de usuario optimizada

### ✅ Requerimiento #5: Preparación para el Despliegue
- **Pruebas de Compatibilidad**
  - Verificado funcionamiento en móviles, tablets y escritorios
  - Revisados tiempos de carga y experiencia de usuario
  - Optimización de rendimiento con lazy loading
  - Manejo de errores robusto

- **Optimización del Código**
  - Código revisado y elementos innecesarios eliminados
  - Estado global bien gestionado con Context API
  - Hooks personalizados para lógica reutilizable
  - Componentes modulares y mantenibles
  - **Performance Optimizations**:
    - LCP (Largest Contentful Paint) optimization con fetchpriority="high"
    - Progressive loading con datos mock iniciales
    - Service Worker para caching de recursos críticos
    - Bundle splitting para reducir el tamaño inicial
    - Lazy loading de componentes no críticos
    - Critical CSS inlining para prevenir render-blocking
    - Resource hints (DNS prefetch, preconnect) para conexiones externas
    - Third-party cookie prevention con image proxy

- **Documentación Básica**
  - Instrucciones completas en el README.md sobre instalación y uso
  - Comentarios en código para funciones complejas
  - Estructura de archivos organizada

## ⚡ Performance Optimizations

### Critical Path Optimization
- **Progressive Loading**: Carga inicial rápida con datos mock (12 productos) para LCP, seguida de carga completa en segundo plano
- **LCP Image Optimization**: 
  - `fetchpriority="high"` en imágenes críticas
  - `loading="eager"` para evitar lazy loading en LCP
  - Preload hints dinámicos para la primera imagen
  - Dimensiones fijas para prevenir layout shifts
- **Bundle Splitting**: Separación de chunks para vendor, router, UI, icons, utils y pages
- **Lazy Loading**: Componentes no críticos cargados bajo demanda

### Caching Strategy
- **Service Worker**: Cache-first para recursos estáticos, network-first para APIs
- **Critical Resources**: Cache inmediato de recursos críticos (logo, placeholders)
- **Image Caching**: Cache-first para imágenes con fallback a network
- **API Caching**: Network-first para datos de API con fallback a cache

### Resource Loading
- **DNS Prefetch**: Para dominios externos críticos
- **Preconnect**: Conexiones anticipadas a APIs y CDNs
- **Critical CSS**: CSS inline para prevenir render-blocking
- **Font Loading**: Font-display: swap para fuentes web

### Third-Party Cookie Prevention
- **Image Proxy**: Uso de images.weserv.nl para evitar cookies de terceros
- **CORS Handling**: crossorigin="anonymous" en imágenes externas
- **CSP Headers**: Content Security Policy para control de recursos

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

## 🍪 Prevención de Cookies de Terceros

Este proyecto implementa varias medidas para prevenir la creación de cookies de terceros y proteger la privacidad del usuario:

### ✅ Medidas Implementadas

1. **Atributo `crossorigin="anonymous"`**
   - Aplicado a todas las imágenes externas
   - Previene el envío de cookies al cargar recursos externos
   - Implementado en componentes: ProductCard, ProductDetail, Admin

2. **Proxy de Imágenes**
   - Utiliza `images.weserv.nl` como proxy para imágenes externas
   - Evita la carga directa desde dominios de terceros
   - Optimiza automáticamente las imágenes (formato WebP, compresión)

3. **Content Security Policy (CSP)**
   - Meta tag CSP configurado en `index.html`
   - Controla qué recursos pueden cargarse
   - Previene la ejecución de scripts no autorizados

4. **Hooks Personalizados**
   - `useImageLoader`: Maneja la carga de imágenes con CORS
   - `useMultipleImageLoader`: Carga múltiples imágenes de forma eficiente
   - Detección automática de imágenes externas

5. **Utilidades de Imagen**
   - `imageProxy.js`: Funciones para manejar imágenes externas
   - Preload optimizado con manejo de CORS
   - Fallback automático a imágenes locales

### 🔧 Configuración Técnica

```javascript
// Ejemplo de uso del proxy de imágenes
import { getProxiedImageUrl } from './utils/imageProxy';

const imageUrl = getProxiedImageUrl('https://freetogame.com/image.jpg');
// Resultado: https://images.weserv.nl/?url=https%3A//freetogame.com/image.jpg
```

### 📊 Beneficios

- **Privacidad**: No se crean cookies de terceros
- **Rendimiento**: Imágenes optimizadas automáticamente
- **Seguridad**: CSP previene ataques XSS
- **Compatibilidad**: Funciona en navegadores con restricciones de cookies
- **SEO**: Mejora el Core Web Vitals al optimizar imágenes

### 🚨 Dominios Permitidos

El CSP permite conexiones a estos dominios específicos:
- `freetogame.com` - API de juegos
- `images.weserv.nl` - Proxy de imágenes
- `fonts.googleapis.com` - Fuentes de Google
- `fonts.gstatic.com` - Fuentes estáticas de Google
- Varios proxies CORS para la API

### 🔧 Componentes Actualizados

- **GameFilters**: Paginación con mejor contraste
- **ProductDetail**: Rating con colores accesibles
- **Header**: Icono de admin con contraste mejorado
- **Footer**: Todos los enlaces y textos con contraste adecuado

### 📊 Beneficios de Accesibilidad

- ✅ **Contraste WCAG AA**: Todos los textos cumplen con 4.5:1 mínimo
- ✅ **Contraste WCAG AAA**: La mayoría cumple con 7:1 para mejor legibilidad
- ✅ **Navegación por teclado**: Todos los elementos son accesibles
- ✅ **Screen readers**: Etiquetas ARIA y estructura semántica
- ✅ **Enfoque visual**: Indicadores de foco claros y visibles

### 🎨 Paleta de Colores Accesible

```css
/* Colores principales con buen contraste */
--bs-primary-dark: #b02a37;      /* 4.5:1 ratio */
--bs-secondary-dark: #495057;    /* 7:1 ratio */
--bs-warning-dark: #e0a800;      /* 3:1 ratio */

/* Texto en fondos oscuros */
--bs-dark-text: #ffffff;         /* 21:1 ratio */
--bs-light-text: #495057;        /* 7:1 ratio */
```

### 🔍 Elementos Corregidos

1. **Paginación** (`GameFilters.jsx`)
   - ✅ Números de página con contraste mejorado
   - ✅ Advertencias con colores accesibles

2. **Footer** (`Footer.jsx`)
   - ✅ Enlaces con contraste adecuado
   - ✅ Texto descriptivo legible
   - ✅ Botones con estados hover claros

3. **ProductDetail** (`ProductDetail.jsx`)
   - ✅ Rating con contraste mejorado
   - ✅ Información del producto legible

4. **Header** (`Header.jsx`)
   - ✅ Iconos de usuario con contraste adecuado
   - ✅ Indicadores de rol claros

## 🎮 Funcionalidades del E-commerce

### Catálogo de Productos
- Lista de videojuegos con filtros por plataforma y género
- Búsqueda en tiempo real
- Paginación para mejor rendimiento
- Vista detallada de cada producto
- Secciones especiales: Ofertas e Infaltables

### Carrito de Compras
- Agregar/eliminar productos
- Modificar cantidades
- Cálculo automático del total
- Persistencia en localStorage
- **Acceso restringido a usuarios autenticados**
- Interfaz mejorada con mejor UX
- **Integración con MercadoPago** para procesamiento de pagos

### Panel de Administración
- Dashboard con estadísticas
- CRUD completo de productos
- Gestión de usuarios (mock)
- Gestión de órdenes (mock)
- **Acceso restringido a administradores**
- Búsqueda y filtrado avanzado

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
- **Validación robusta** en formularios

### UI/UX
- **Diseño responsivo** con Bootstrap 5
- **Iconos modernos** con Lucide React
- **Notificaciones toast** con React Toastify
- **Modales y confirmaciones** para acciones importantes
- **Estados de carga** con spinners
- **Accesibilidad** con ARIA labels

### SEO y Accesibilidad
- **Meta tags dinámicos** con React Helmet
- **Etiquetas ARIA** para accesibilidad
- **Open Graph** para redes sociales
- **Canonical URLs** para SEO
- **Structured Data** para motores de búsqueda
- **Manifest.json** para PWA

## 🚀 Despliegue

La aplicación está lista para ser desplegada en cualquier plataforma de hosting estático como:
- Vercel

## 🔧 Configuración de APIs

### MockAPI.io
Para que el formulario de productos funcione con solicitudes POST reales:

1. **Lee la documentación**: Consulta `MOCKAPI_SETUP.md` para instrucciones detalladas
2. **Crea un proyecto**: Regístrate en [MockAPI.io](https://mockapi.io/) y crea un proyecto
3. **Configura el código**: Actualiza `src/config/api.js` con tu Project ID
4. **Prueba la funcionalidad**: Agrega productos y verifica las solicitudes en DevTools

**Nota**: Sin MockAPI.io configurado, la aplicación funciona con datos locales como fallback.

### MercadoPago
Para que el sistema de pagos funcione:

1. **Lee la documentación**: Consulta `MERCADOPAGO_SETUP.md` para instrucciones detalladas
2. **Crea una cuenta**: Regístrate en [MercadoPago Developers](https://www.mercadopago.com/developers)
3. **Configura el código**: Actualiza `src/config/mercadopago.js` con tus credenciales
4. **Prueba los pagos**: Usa las tarjetas de prueba proporcionadas

**Nota**: Sin MercadoPago configurado, el botón de pago mostrará un error.

Para construir la aplicación para producción:
```bash
npm run build
```

## 🧪 Pruebas y Validación

### Funcionalidades Probadas
- ✅ Autenticación de usuarios
- ✅ Gestión del carrito
- ✅ CRUD de productos
- ✅ Búsqueda y filtrado
- ✅ Paginación
- ✅ Responsividad
- ✅ Accesibilidad
- ✅ SEO

### Compatibilidad
- ✅ Chrome (última versión)
- ✅ Firefox (última versión)
- ✅ Safari (última versión)
- ✅ Edge (última versión)
- ✅ Móviles (iOS/Android)

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

**✅ COMPLETADO** - Todos los requerimientos de la entrega final han sido implementados y mejorados:

- ✅ **Requerimiento #1**: Gestión del Carrito y Autenticación de Usuarios
  - Carrito funcional con Context API
  - Autenticación con localStorage
  - Rutas protegidas
  - Sistema de roles

- ✅ **Requerimiento #2**: CRUD de Productos con MockAPI
  - Formulario con validaciones avanzadas
  - Edición y eliminación con confirmaciones
  - Manejo robusto de errores

- ✅ **Requerimiento #3**: Optimización de Diseño y Responsividad
  - Bootstrap responsivo
  - Iconos y notificaciones
  - SEO avanzado con React Helmet
  - Accesibilidad completa

- ✅ **Requerimiento #4**: Funcionalidades de Búsqueda y Paginación
  - Búsqueda en tiempo real
  - Filtros avanzados
  - Paginación optimizada

- ✅ **Requerimiento #5**: Preparación para el Despliegue
  - Código optimizado
  - Documentación completa
  - Pruebas de compatibilidad

## 🏆 Logros Destacados

- **Experiencia de Usuario**: Interfaz intuitiva y responsiva
- **Accesibilidad**: Cumple con estándares WCAG
- **SEO**: Optimizado para motores de búsqueda
- **Rendimiento**: Carga rápida y eficiente
- **Mantenibilidad**: Código limpio y bien estructurado
- **Escalabilidad**: Arquitectura preparada para crecimiento

El proyecto está listo para la presentación final y demuestra un e-commerce funcional y completo con todas las características solicitadas y mejoras adicionales que elevan la calidad del producto. 