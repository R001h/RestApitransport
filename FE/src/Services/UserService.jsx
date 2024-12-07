// Servicios de API para manejar CRUD
export const CrearServicio = async (servicio) => {
    const response = await fetch('http://192.168.1.81:8000/service/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(servicio),
    });
    if (!response.ok) throw new Error('Error al crear el servicio');
    return await response.json();
  };
  
  export const ObtenerServicios = async () => {
    const response = await fetch('http://192.168.1.81:8000/api/users/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al obtener los servicios');
    return await response.json();
  };
  
  export const ActualizarServicio = async (id, servicio) => {
    const response = await fetch(`http://192.168.1.81:8000/service/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(servicio),
    });
    if (!response.ok) throw new Error('Error al actualizar el servicio');
    return await response.json();
  };
  
  export const EliminarServicio = async (id) => {
    const response = await fetch(`http://192.168.1.81:8000/service/${id}/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al eliminar el servicio');
    return true;
  };
  