import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles/globals.css'
import App from './App.jsx'
import { GlobalStyles } from './styles/GlobalStyles'
import { ThemeProvider } from './styles/ThemeProvider'

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
