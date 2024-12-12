// FeedbackService.js
const BASE_URL = 'http://192.168.1.81:8000';
const API_URL = `${BASE_URL}/feedback/`;

// Helper para obtener encabezados con token (si existe)
const getHeaders = () => {
  const token = localStorage.getItem('token'); // Ajusta esto según dónde almacenes el token
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

const FeedbackService = {
  // Obtener todas las reseñas
  obtenerFeedback: async () => {
    try {
      const token = localStorage.getItem('authToken'); 
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: getHeaders(),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error al obtener las reseñas: ${response.status} - ${errorDetails}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error en obtenerFeedback:', err.message);
      throw new Error(err.message);
    }
  },

  // Crear una nueva reseña
  crearFeedback: async (feedback) => {
    try {
      const token = localStorage.getItem('authToken'); 
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(feedback),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error al crear la reseña: ${response.status} - ${errorDetails}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error en crearFeedback:', err.message);
      throw new Error(err.message);
    }
  },

  // Editar una reseña existente
  editarFeedback: async (id, feedback) => {
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(feedback),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error al editar la reseña: ${response.status} - ${errorDetails}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error en editarFeedback:', err.message);
      throw new Error(err.message);
    }
  },

  // Eliminar una reseña
  eliminarFeedback: async (id) => {
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      if (response.status === 204) {
        return { success: true, message: 'La reseña fue eliminada exitosamente.' };
      }

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error al eliminar la reseña: ${response.status} - ${errorDetails}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error en eliminarFeedback:', err.message);
      throw new Error(err.message);
    }
  },

  // Obtener detalles de una reseña específica
  detallesFeedback: async (id) => {
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: 'GET',
        headers: getHeaders(),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error al obtener los detalles de la reseña: ${response.status} - ${errorDetails}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error en detallesFeedback:', err.message);
      throw new Error(err.message);
    }
  },
};

export default FeedbackService;
