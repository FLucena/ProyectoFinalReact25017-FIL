import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Mi Nuevo Vicio - E-commerce de Videojuegos", 
  description = "Descubre los mejores videojuegos al mejor precio. Catálogo completo de juegos para PC, PlayStation, Xbox y Nintendo Switch.",
  keywords = "videojuegos, gaming, juegos, PC, PlayStation, Xbox, Nintendo Switch, e-commerce",
  image = "/logo.png",
  url = window.location.href
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Mi Nuevo Vicio" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Mi Nuevo Vicio" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" href="/logo.png" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO; 