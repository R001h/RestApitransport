const API_URL = 'http://192.168.1.81:8000/feedback/';

const FeedbackService = {
  // Obtener todas las reseñas
  obtenerFeedback: async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener las reseñas');
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
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });

      if (!response.ok) {
        throw new Error('Error al crear la reseña');
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });

      if (!response.ok) {
        throw new Error('Error al editar la reseña');
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
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 204) {
        return { success: true, message: 'La reseña fue eliminada exitosamente.' };
      }

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error al eliminar la reseña: ${errorDetails}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error en eliminarFeedback:', err.message);
      throw new Error(err.message);
    }
  },
};

export default FeedbackService;
