import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/globals.css'
import App from './App.jsx'
import { GlobalStyles } from './styles/GlobalStyles'
import { ThemeProvider } from './styles/ThemeProvider'

// Registrar service worker para caché
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Importar JS de Bootstrap solo después de que la app haya montado
if (typeof window !== 'undefined') {
  import('bootstrap/dist/js/bootstrap.bundle.min.js');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <ThemeProvider>
      <HelmetProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <GlobalStyles />
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  
)
