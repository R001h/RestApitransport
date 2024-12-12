const API_URL = 'http://192.168.1.81:8000/orders/';

const OrderHistoryService = {
  // Obtener todo el historial de pedidos
  obtenerHistorial: async () => {
    try {
      const token = localStorage.getItem('authToken'); 
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener el historial de pedidos.');
      }

      return await response.json();
    } catch (err) {
      console.error('Error en obtenerHistorial:', err.message);
      throw new Error(err.message);
    }
  },

  // Crear un nuevo registro de historial
  crearHistorial: async (historial) => {
    try {
      const token = localStorage.getItem('authToken'); 
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(historial),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Error al crear el historial: ${JSON.stringify(errorDetails)}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error en crearHistorial:', err.message);
      throw new Error(err.message);
    }
  },
};

export default OrderHistoryService;
