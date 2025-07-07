const CACHE_NAME = 'mi-nuevo-vicio-v1';
const CRITICAL_RESOURCES = [
  '/',
  '/game-placeholder.webp'
];

const STATIC_CACHE = [
  '/logo.png',
  '/manifest.json'
];

// Evento de instalación - cachear recursos críticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
    
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
    
        return self.skipWaiting();
      })
  );
});

// Evento de activación - limpiar caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
        
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
  
      return self.clients.claim();
    })
  );
});

// Evento de fetch - servir desde cache cuando sea posible
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Omitir solicitudes que no sean GET
  if (request.method !== 'GET') {
    return;
  }

  // Manejar recursos críticos
  if (CRITICAL_RESOURCES.includes(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          return response || fetch(request).catch(() => {
    
            return new Response('Recurso no disponible', { status: 404 });
          });
        })
    );
    return;
  }

  // Manejar activos estáticos
  if (STATIC_CACHE.includes(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          }).catch((error) => {
    
            return new Response('Recurso estático no disponible', { status: 404 });
          });
        })
    );
    return;
  }

  // Manejar solicitudes de API - red primero, luego cache
  if (url.pathname.includes('/api/') || url.hostname.includes('freetogame.com')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch((error) => {
  
          return caches.match(request).catch(() => {
            return new Response('API no disponible', { status: 503 });
          });
        })
    );
    return;
  }

  // Manejar solicitudes de imágenes - cache primero, luego red
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          }).catch((error) => {
    
            // Intentar servir placeholder si es una imagen
            return caches.match('/placeholder.svg').catch(() => {
              return new Response('Imagen no disponible', { status: 404 });
            });
          });
        })
    );
    return;
  }

  // Estrategia de fallback para otras solicitudes
  event.respondWith(
    fetch(request).catch((error) => {
      
      return new Response('Recurso no disponible', { status: 404 });
    })
  );
}); 