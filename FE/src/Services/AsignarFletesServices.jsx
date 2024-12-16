const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error en la solicitud');
  }
  return await response.json();
};

export const obtenerTareas = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/tareas/', { method: 'GET' });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    throw error;
  }
};

export const crearTarea = async (tarea) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/tareas/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarea),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al crear tarea:', error);
    throw error;
  }
};

export const editarTarea = async (id, tarea) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/tareas/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarea),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al editar tarea:', error);
    throw error;
  }
};

export const eliminarTarea = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/tareas/${id}/`, {
      method: 'DELETE',
    });
    await handleResponse(response);
    return true;
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    throw error;
  }
};
