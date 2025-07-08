export default async function handler(req, res) {
  // Habilitar CORS para todos los orígenes
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Manejar solicitudes preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Solo permitir solicitudes GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, platform, category, sortBy } = req.query;
    
    // Construir la URL para la API de FreeToGame
    let url = 'https://www.freetogame.com/api/games';
    
    if (id) {
      url = `https://www.freetogame.com/api/game?id=${id}`;
    } else {
      const params = new URLSearchParams();
      if (platform) params.append('platform', platform);
      if (category) params.append('category', category);
      if (sortBy) params.append('sort-by', sortBy);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
    }

    // Obtener datos de la API de FreeToGame
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; GameStore/1.0)'
      },
      timeout: 10000
    });

    if (!response.ok) {
      throw new Error(`FreeToGame API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Devolver los datos con encabezados apropiados
    res.setHeader('Cache-Control', 'public, max-age=300'); // Cache por 5 minutos
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Error de API:', error);
    res.status(500).json({ 
      error: 'Failed to fetch games data',
      message: error.message 
    });
  }
} 