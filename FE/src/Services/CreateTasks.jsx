export const obtenerTareas = async () => {
  try {
    const token = localStorage.getItem('authToken'); // Obtén el token del localStorage
    const response = await fetch('http://127.0.0.1:8000/tasks/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Agrega el token en el encabezado
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las tareas');
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const crearTarea = async (titulo) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch('http://127.0.0.1:8000/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Agrega el token en el encabezado
      },
      body: JSON.stringify({ title: titulo }),
    });

    if (!response.ok) {
      throw new Error('Error al crear la tarea');
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};
export const editarTarea = async (taskId, titulo, assigned_to) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/tasks/${taskId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Si usas JWT
      },
      body: JSON.stringify({
        title: titulo,
        assigned_to,
        status: "In Progress", // Actualiza según lo que quieras enviar
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al editar la tarea: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarTarea = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`http://127.0.0.1:8000/tasks/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Agrega el token en el encabezado
      },
    });

    if (response.status === 204) {
      return { success: true, message: 'La tarea fue eliminada exitosamente.' };
    }

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Error al eliminar la tarea: ${errorDetails}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error al eliminar la tarea:', err.message);
    throw new Error(err.message);
  }
};
