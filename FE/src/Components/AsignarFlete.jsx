import React, { useState, useEffect } from 'react';
import '../Style/GestionarTareas.css'; // Estilos del componente
import { obtenerTareas, crearTarea, editarTarea, eliminarTarea } from '../Services/CreateTasks';
import iziToast from 'izitoast'; // Alertas estilizadas
import 'izitoast/dist/css/iziToast.min.css'; // Estilos para iziToast
import { GetDrivers as obtenerDrivers } from '../Services/DriverService';

function GestionarTareas() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [driverId, setDriverId] = useState(''); // ID del Driver seleccionado
  const [drivers, setDrivers] = useState([]); // Lista de Drivers
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTareaId, setSelectedTareaId] = useState(null); // Para edición

  // Manejar cambios en los inputs
  const handleTituloChange = (e) => setTitulo(e.target.value);
  const handleDescripcionChange = (e) => setDescripcion(e.target.value);
  const handleDriverChange = (e) => setDriverId(e.target.value);

  // Obtener todas las tareas
  const fetchTareas = async () => {
    try {
      const data = await obtenerTareas();
      setTareas(data); // Guardar las tareas en el estado
    } catch (err) {
      setError('Error al obtener las tareas');
    }
  };

  // Obtener la lista de Drivers
  const fetchDrivers = async () => {
    try {
      const data = await obtenerDrivers();
      setDrivers(data);
    } catch (err) {
      setError('Error al obtener los drivers');
    }
  };

  // Crear o actualizar una tarea
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!driverId) {
        iziToast.error({ title: 'Error', message: 'Debes asignar un Driver' });
        return;
      }

      if (selectedTareaId) {
        await editarTarea(selectedTareaId, {
          title: titulo,
          description: descripcion,
          assigned_to: driverId,
          status: "Pending"
        });
        iziToast.success({ title: 'Éxito', message: 'Tarea actualizada correctamente' });
        setSelectedTareaId(null);
      } else {

        
        await crearTarea({
          title: titulo,
          description: descripcion,
          assigned_to: driverId,
          assigned_to_name: driverId,
          status:"Pending"
        });
        iziToast.success({ title: 'Éxito', message: 'Tarea creada correctamente' });
      }

      fetchTareas(); // Refrescar la lista de tareas
      setTitulo('');
      setDescripcion('');
      setDriverId('');
    } catch (err) {
      iziToast.error({ title: 'Error', message: 'Hubo un problema al guardar la tarea' });
    }
  };

  // Eliminar una tarea
  const handleDelete = async (id) => {
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: 'once',
      id: 'question',
      zindex: 999,
      title: '¿Estás seguro?',
      message: '¿Quieres eliminar esta tarea?',
      position: 'center',
      buttons: [
        [
          '<button><b>Sí</b></button>',
          async function (instance, toast) {
            try {
              await eliminarTarea(id);
              iziToast.success({ title: 'Eliminado', message: 'La tarea ha sido eliminada' });
              fetchTareas();
            } catch (err) {
              iziToast.error({ title: 'Error', message: 'Hubo un problema al eliminar la tarea' });
            }

            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          },
          true,
        ],
        [
          '<button>Cancelar</button>',
          function (instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          },
        ],
      ],
    });
  };

  // Editar una tarea
  const handleEdit = (tarea) => {
    setSelectedTareaId(tarea.id);
    setTitulo(tarea.title);
    setDescripcion(tarea.description);
    setDriverId(tarea.assigned_to || '');
  };

  useEffect(() => {
    fetchTareas();
    fetchDrivers();
  }, []);

  return (
    <div className="main-container">
      <h2>Gestión de Tareas</h2>
      {error && <p className="error">{error}</p>}

      {/* Formulario para crear o editar tareas */}
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Título de la Tarea</label>
          <input
            type="text"
            value={titulo}
            onChange={handleTituloChange}
            required
          />
        </div>
        <div>
          <label>Descripción</label>
          <textarea
            value={descripcion}
            onChange={handleDescripcionChange}
            required
          />
        </div>
        <div>
          <label>Asignar Driver</label>
          <select value={driverId} onChange={handleDriverChange}>
            <option value="">Seleccionar un Driver</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name || driver.username || 'Sin Nombre'}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">
          {selectedTareaId === null ? 'Crear Tarea' : 'Actualizar Tarea'}
        </button>
      </form>

      {/* Lista de tareas */}
      <div className="tareas-container">
        <h3>Lista de Tareas</h3>
        {tareas.length === 0 && <p>No hay tareas disponibles</p>}
        {tareas.length > 0 && (
          <div className="tareas-list">
            {tareas.map((tarea) => (
              <div key={tarea.id} className="tarea-card">
                <h4>{tarea.title}</h4>
                <p><strong>Descripción:</strong> {tarea.description || 'Sin descripción'}</p>
                <p><strong>Estado:</strong> {tarea.status}</p>
                <p><strong>Asignado a:</strong> {tarea.assigned_to_name || 'Sin asignar'}</p>
                <button onClick={() => handleEdit(tarea)}>Editar</button>
                <button
                  onClick={() => handleDelete(tarea.id)}
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GestionarTareas;
