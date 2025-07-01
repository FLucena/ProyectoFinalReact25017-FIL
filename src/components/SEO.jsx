import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title,
  description,
  keywords,
  image,
  url,
  type = "website"
}) => {
  const location = useLocation();
  
  // Metadatos por defecto para el proyecto educativo
  const defaultTitle = "Mi Nuevo Vicio - Proyecto Educativo de Ecommerce";
  const defaultDescription = "Proyecto educativo de ecommerce desarrollado con React. Muestra juegos gratuitos de la API FreeToGame para fines de aprendizaje.";
  const defaultKeywords = "proyecto educativo, react, ecommerce, videojuegos gratuitos, freetogame, desarrollo web, talento tech";
  const defaultImage = "/logo.png";
  const currentUrl = url || `${window.location.origin}${location.pathname}`;

  // Determina metadatos específicos según la ruta actual
  const getPageSpecificMeta = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/':
        return {
          title: defaultTitle,
          description: defaultDescription,
          keywords: defaultKeywords
        };
      case '/ofertas':
        return {
          title: "Ofertas de Juegos Gratuitos - Proyecto Educativo",
          description: "Sección de ofertas del proyecto educativo. Muestra juegos gratuitos con descuentos simulados para demostrar funcionalidades de ecommerce.",
          keywords: "ofertas juegos gratuitos, proyecto educativo, react, ecommerce demo"
        };
      case '/infaltables':
        return {
          title: "Juegos Infaltables - Proyecto Educativo",
          description: "Sección de juegos destacados del proyecto educativo. Muestra los mejores juegos gratuitos con las mejores calificaciones.",
          keywords: "mejores juegos gratuitos, proyecto educativo, juegos destacados"
        };
      case '/admin':
        return {
          title: "Panel de Administración - Proyecto Educativo",
          description: "Panel de administración del proyecto educativo para gestionar productos y demostrar funcionalidades CRUD.",
          keywords: "admin, administración, gestión, panel educativo, crud"
        };
      case '/perfil':
        return {
          title: "Mi Perfil - Proyecto Educativo",
          description: "Página de perfil de usuario del proyecto educativo. Demuestra funcionalidades de autenticación y gestión de usuarios.",
          keywords: "perfil usuario, autenticación, proyecto educativo, react"
        };
      case '/sobre-proyecto':
        return {
          title: "Sobre el Proyecto - Proyecto Educativo",
          description: "Información detallada sobre este proyecto educativo de ecommerce desarrollado con React y tecnologías modernas.",
          keywords: "sobre proyecto, información educativa, desarrollo web, react, talento tech"
        };
      case '/contacto':
        return {
          title: "Contacto - Proyecto Educativo",
          description: "Información de contacto del desarrollador y detalles sobre este proyecto educativo de ecommerce.",
          keywords: "contacto, desarrollador, proyecto educativo, francisco lucena"
        };
      case '/notificaciones':
        return {
          title: "Notificaciones - Proyecto Educativo",
          description: "Demostración de sistema de notificaciones del proyecto educativo. Muestra diferentes tipos de notificaciones.",
          keywords: "notificaciones, demo, proyecto educativo, react"
        };
      default:
        // Manejo especial para páginas de productos individuales
        if (path.startsWith('/product/')) {
          return {
            title: title || "Detalle del Juego - Proyecto Educativo",
            description: description || "Detalles completos de este juego gratuito del proyecto educativo.",
            keywords: keywords || "detalle juego, juego gratuito, proyecto educativo"
          };
        }
        return {
          title: title || defaultTitle,
          description: description || defaultDescription,
          keywords: keywords || defaultKeywords
        };
    }
  };

  const pageMeta = getPageSpecificMeta();
  const finalTitle = title || pageMeta.title;
  const finalDescription = description || pageMeta.description;
  const finalKeywords = keywords || pageMeta.keywords;
  const finalImage = image || defaultImage;

  return (
    <Helmet>
      {/* Metadatos básicos para SEO */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Open Graph para redes sociales */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Mi Nuevo Vicio - Proyecto Educativo" />
      <meta property="og:locale" content="es_ES" />
      
      {/* Twitter Card para Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:site" content="@franciscolucena" />
      <meta name="twitter:creator" content="@franciscolucena" />
      
      {/* Metadatos adicionales para SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Francisco Lucena" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#dc3545" />
      <meta name="msapplication-TileColor" content="#dc3545" />
      <meta name="application-name" content="Mi Nuevo Vicio - Proyecto Educativo" />
      <meta name="generator" content="React, Vite, Bootstrap" />
      <meta name="language" content="es" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Favicon y iconos */}
      <link rel="icon" type="image/png" href="/logo.png" />
      <link rel="apple-touch-icon" href="/logo.png" />
      
      {/* URL canónica para evitar contenido duplicado */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Manifest para PWA */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Datos estructurados para Google - Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Mi Nuevo Vicio - Proyecto Educativo",
          "description": finalDescription,
          "url": currentUrl,
          "author": {
            "@type": "Person",
            "name": "Francisco Lucena",
            "jobTitle": "Desarrollador Web",
            "alumniOf": "Talento Tech"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${window.location.origin}/?search={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
      
      {/* Datos estructurados para proyecto educativo */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "Mi Nuevo Vicio - Ecommerce Educativo",
          "description": "Proyecto educativo de ecommerce desarrollado con React para demostrar habilidades de desarrollo web",
          "author": {
            "@type": "Person",
            "name": "Francisco Lucena"
          },
          "educationalLevel": "Intermediate",
          "learningResourceType": "Project",
          "inLanguage": "es",
          "dateCreated": "2024",
          "genre": "Web Development",
          "keywords": "react, ecommerce, javascript, web development, educational project"
        })}
      </script>
      
      {/* Datos estructurados para organización */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Mi Nuevo Vicio - Proyecto Educativo",
          "url": window.location.origin,
          "logo": `${window.location.origin}/logo.png`,
          "description": "Proyecto educativo de ecommerce desarrollado con React",
          "founder": {
            "@type": "Person",
            "name": "Francisco Lucena"
          },
          "sameAs": [
            "https://github.com/franciscolucena",
            "https://linkedin.com/in/franciscolucena"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO; 