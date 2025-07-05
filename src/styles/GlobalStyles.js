import { createGlobalStyle } from 'styled-components';

// Variables CSS para temas consistentes
const theme = {
  colors: {
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    warning: '#ffc107',
    danger: '#dc3545',
    info: '#0dcaf0',
    light: '#f8f9fa',
    dark: '#212529',
    white: '#fff',
    gray: {
      100: '#f8f9fa',
      200: '#e9ecef',
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#6c757d',
      700: '#495057',
      800: '#343a40',
      900: '#212529'
    }
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem'
  },
  shadows: {
    sm: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
    md: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
    lg: '0 1rem 3rem rgba(0, 0, 0, 0.175)'
  }
};

export const GlobalStyles = createGlobalStyle`
  /* Variables CSS para temas */
  :root {
    --bs-primary: ${theme.colors.primary};
    --bs-secondary: ${theme.colors.secondary};
    --bs-success: ${theme.colors.success};
    --bs-info: ${theme.colors.info};
    --bs-warning: ${theme.colors.warning};
    --bs-danger: ${theme.colors.danger};
    --bs-light: ${theme.colors.light};
    --bs-dark: ${theme.colors.dark};
  }

  /* Estilos base */
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    line-height: 1.5;
    color: ${theme.colors.dark};
    background-color: ${theme.colors.white};
    font-display: swap;
    font-synthesis: none;
  }

  .App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Asegurar que se apliquen los estilos de Bootstrap */
  .navbar {
    background-color: var(--bs-dark) !important;
  }

  .btn-primary {
    background-color: var(--bs-primary) !important;
    border-color: var(--bs-primary) !important;
  }

  .btn-primary:hover {
    background-color: #0a58ca !important;
    border-color: #0a58ca !important;
  }

  .card {
    border-radius: ${theme.borderRadius.md};
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md} !important;
  }

  /* Estilos de foco para accesibilidad */
  :focus {
    outline: 2px solid ${theme.colors.primary} !important;
    outline-offset: 2px !important;
  }

  .btn:focus,
  .nav-link:focus,
  .form-control:focus {
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25) !important;
  }
`;

export default theme; 