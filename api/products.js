const MOCKAPI_BASE_URL = 'https://6865687b5b5d8d0339810fd1.mockapi.io/api/v1/products';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  let url = MOCKAPI_BASE_URL;
  if (req.query.id) {
    url += `/${req.query.id}`;
  }

  const options = {
    method: req.method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (['POST', 'PUT'].includes(req.method)) {
    options.body = JSON.stringify(req.body);
  }

  try {
    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type');
    res.status(response.status);
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      res.json(data);
    } else {
      const text = await response.text();
      res.send(text);
    }
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', message: error.message });
  }
} 