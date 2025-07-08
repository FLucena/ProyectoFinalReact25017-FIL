# Mi Nuevo Vicio - Proyecto Educativo de Ecommerce

## 🎮 Descripción

Proyecto educativo de ecommerce desarrollado con React que muestra juegos gratuitos de la API FreeToGame. Este proyecto está diseñado para fines de aprendizaje y demostración de conceptos de desarrollo web moderno.

## 🚀 Características

- **Catálogo de Juegos**: Muestra juegos gratuitos de la API FreeToGame
- **Filtros Avanzados**: Por plataforma, género y búsqueda por texto
- **Carrito de Compras**: Funcionalidad completa de carrito con persistencia
- **Autenticación**: Sistema de login/registro con roles (admin/usuario)
- **Responsive Design**: Optimizado para todos los dispositivos
- **PWA Ready**: Service Worker y manifest para funcionalidad offline
- **Performance**: Optimizaciones de LCP, CLS y FID
- **Accesibilidad**: Cumple con estándares WCAG 2.1

## 🛠️ Tecnologías

- **Frontend**: React 18, Vite, Bootstrap 5
- **Estado**: Context API, Custom Hooks
- **Routing**: React Router DOM
- **Estilos**: Styled Components, CSS Modules
- **Iconos**: Lucide React, React Icons
- **Notificaciones**: React Toastify
- **Deployment**: Vercel

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd ProyectoFinalReact25017-FIL
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

4. **Construir para producción**
   ```bash
   npm run build
   ```

## 🌐 Solución CORS

### Problema
La aplicación utiliza la API pública de FreeToGame que no permite solicitudes CORS desde dominios de producción. Esto causa errores en el navegador cuando se despliega en Vercel.

### Solución Implementada
Se ha implementado una **función serverless** en Vercel que actúa como proxy para las solicitudes a la API de FreeToGame:

#### Archivos Creados:
- `api/games.js` - Función serverless que maneja las solicitudes a la API
- `vercel.json` - Configuración de Vercel para las rutas API
- `scripts/dev-server.js` - Servidor de desarrollo para probar la API localmente

#### Cómo Funciona:
1. **En Desarrollo**: La aplicación intenta conectarse directamente a la API de FreeToGame
2. **En Producción**: Las solicitudes se redirigen a `/api/games` que ejecuta nuestra función serverless
3. **La función serverless**: Hace la solicitud a FreeToGame desde el servidor y devuelve los datos con headers CORS apropiados

#### Configuración:
```javascript
// src/config/api.js
export const API_CONFIG = {
  FREETOGAME: {
    BASE_URL: process.env.NODE_ENV === 'production' 
      ? '/api/games' // Proxy serverless en producción
      : 'https://www.freetogame.com/api', // Directo en desarrollo
    // ...
  }
};
```

### Ventajas de esta Solución:
- ✅ **Sin errores CORS** en producción
- ✅ **Mejor rendimiento** con caché en el servidor
- ✅ **Más confiable** que proxies públicos
- ✅ **Control total** sobre las solicitudes
- ✅ **Fácil mantenimiento** y debugging

## 🚀 Deployment

### Vercel (Recomendado)

1. **Conectar repositorio a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu repositorio de GitHub
   - Vercel detectará automáticamente la configuración

2. **Configuración automática**
   - El archivo `vercel.json` configura automáticamente las rutas API
   - Las funciones serverless se despliegan automáticamente

3. **Variables de entorno** (si es necesario)
   ```bash
   # En el dashboard de Vercel
   NODE_ENV=production
   ```

### Otros Proveedores

Para otros proveedores que no soporten funciones serverless, considera:
- Usar un servicio de proxy CORS como Cloudflare Workers
- Implementar un backend simple con Express
- Usar servicios como Netlify Functions

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo Vite
npm run dev:server       # Servidor con API proxy local

# Construcción
npm run build           # Construir para producción
npm run preview         # Previsualizar build

# Análisis
npm run analyze         # Analizar bundle
npm run test:all        # Ejecutar todas las pruebas

# Performance
npm run test:performance    # Pruebas de rendimiento
npm run test:compatibility # Pruebas de compatibilidad
npm run test:load          # Pruebas de carga
```

## 📊 Credenciales de Prueba

### Usuario Admin
- **Email**: admin@test.com
- **Password**: admin123

### Usuario Normal
- **Email**: user@test.com
- **Password**: user123

## 🎯 Funcionalidades Principales

### 1. Catálogo de Juegos
- Lista de juegos gratuitos de FreeToGame
- Filtros por plataforma, género y búsqueda
- Paginación optimizada
- Vista detallada de cada juego

### 2. Carrito de Compras
- Agregar/remover productos
- Modificar cantidades
- Persistencia en localStorage
- Cálculo automático de totales

### 3. Sistema de Autenticación
- Login/Registro de usuarios
- Roles diferenciados (admin/usuario)
- Rutas protegidas
- Gestión de sesiones

### 4. Optimizaciones de Performance
- Lazy loading de componentes
- Optimización de imágenes
- Service Worker para caché
- Preload de recursos críticos

## 🐛 Troubleshooting

### Error CORS en Producción
Si sigues viendo errores CORS después del deployment:

1. **Verificar configuración de Vercel**
   ```bash
   # Asegúrate de que vercel.json esté en la raíz
   ls vercel.json
   ```

2. **Verificar función serverless**
   ```bash
   # Probar endpoint directamente
   curl https://tu-dominio.vercel.app/api/games
   ```

3. **Revisar logs de Vercel**
   - Ve al dashboard de Vercel
   - Revisa los logs de la función serverless

### Problemas de Build
```bash
# Limpiar caché
rm -rf node_modules package-lock.json
npm install

# Reconstruir
npm run build
```

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias y mejoras.

## 📞 Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.

---

**Nota**: Este es un proyecto educativo. Los juegos mostrados son realmente gratuitos y provienen de la API pública de [FreeToGame](https://www.freetogame.com/). 