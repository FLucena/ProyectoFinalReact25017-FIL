// Configuración de MercadoPago
export const MERCADOPAGO_CONFIG = {
  // Credenciales de prueba - Reemplazar con tus credenciales reales
  PUBLIC_KEY: 'TEST-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  ACCESS_TOKEN: 'TEST-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  
  // URLs de la API
  API_BASE_URL: 'https://api.mercadopago.com',
  SANDBOX: true, // Cambiar a false para producción
};

// Función para crear una preferencia de pago
export const createPaymentPreference = async (items, payer = null) => {
  try {
    const preference = {
      items: items.map(item => ({
        title: item.title,
        unit_price: parseFloat(item.price),
        quantity: item.quantity || 1,
        currency_id: 'ARS',
        picture_url: item.image || '/game-placeholder.webp',
        description: item.description || '',
      })),
      back_urls: {
        success: `${window.location.origin}/payment/success`,
        failure: `${window.location.origin}/payment/failure`,
        pending: `${window.location.origin}/payment/pending`,
      },
      auto_return: 'approved',
      external_reference: `order_${Date.now()}`,
      notification_url: `${window.location.origin}/api/webhook/mercadopago`,
      expires: true,
      expiration_date_to: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos
    };

    if (payer) {
      preference.payer = payer;
    }

    const response = await fetch(`${MERCADOPAGO_CONFIG.API_BASE_URL}/checkout/preferences`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MERCADOPAGO_CONFIG.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      preferenceId: data.id,
      initPoint: data.init_point,
      sandboxInitPoint: data.sandbox_init_point,
    };
  } catch (error) {
    console.error('Error creating payment preference:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Función para obtener información de un pago
export const getPaymentInfo = async (paymentId) => {
  try {
    const response = await fetch(`${MERCADOPAGO_CONFIG.API_BASE_URL}/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MERCADOPAGO_CONFIG.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      payment: data,
    };
  } catch (error) {
    console.error('Error getting payment info:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Función para simular un pago (solo para desarrollo)
export const simulatePayment = async (preferenceId) => {
  try {
    const response = await fetch(`${MERCADOPAGO_CONFIG.API_BASE_URL}/checkout/preferences/${preferenceId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MERCADOPAGO_CONFIG.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      preference: data,
    };
  } catch (error) {
    console.error('Error simulating payment:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}; 