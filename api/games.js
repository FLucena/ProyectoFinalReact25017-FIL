export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, platform, category, sortBy } = req.query;
    
    // Build the URL for the FreeToGame API
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

    // Fetch data from FreeToGame API
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
    
    // Return the data with proper headers
    res.setHeader('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
    res.status(200).json(data);
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch games data',
      message: error.message 
    });
  }
} 