export const obtenerTareas = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/tasks/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
    const response = await fetch('http://127.0.0.1:8000/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export const editarTarea = async (id, titulo) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/tasks/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: titulo }),
    });

    if (!response.ok) {
      throw new Error('Error al editar la tarea');
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const eliminarTarea = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/tasks/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
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
