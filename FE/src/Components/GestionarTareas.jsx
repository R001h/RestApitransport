import React, { useState, useEffect } from 'react'; // Importa React y hooks para manejar estado y efectos
import '../Style/GestionarTareas.css'; // Importa los estilos para el componente
import { obtenerTareas, crearTarea, editarTarea, eliminarTarea } from '../Services/CreateTasks'; // Importa las funciones de la API
import iziToast from 'izitoast'; // Importa iziToast para alertas estilizadas
import 'izitoast/dist/css/iziToast.min.css'; // Estilos de iziToast
import { GetDrivers as obtenerDrivers } from '../Services/DriverService'; // Importa funcion para obtener lista de drivers

function GestionarTareas() {
  // Estados para manejar diferentes aspectos del componente
  const [titulo, setTitulo] = useState(''); // Estado para el titulo de la tarea
  const [descripcion, setDescripcion] = useState(''); // Estado para la descripcion de la tarea
  const [driverId, setDriverId] = useState(''); // Estado para el ID del driver seleccionado
  const [drivers, setDrivers] = useState([]); // Lista de drivers disponibles
  const [tareas, setTareas] = useState([]); // Lista de tareas
  const [error, setError] = useState(null); // Manejo de errores
  const [selectedTareaId, setSelectedTareaId] = useState(null); // ID de la tarea seleccionada para edicion

  // Maneja el cambio de texto en el input del titulo
  const handleTituloChange = (e) => setTitulo(e.target.value);

  // Maneja el cambio de texto en el input de descripcion
  const handleDescripcionChange = (e) => setDescripcion(e.target.value);

  // Maneja el cambio de seleccion en el dropdown de drivers
  const handleDriverChange = (e) => setDriverId(e.target.value);

  // Funcion para obtener todas las tareas de la API
  const fetchTareas = async () => {
    try {
      const data = await obtenerTareas(); // Llama a la API
      setTareas(data); // Guarda las tareas en el estado
    } catch (err) {
      setError('Error al obtener las tareas'); // Maneja errores
    }
  };

  // Funcion para obtener la lista de drivers
  const fetchDrivers = async () => {
    try {
      const data = await obtenerDrivers(); // Llama a la API
      setDrivers(data); // Guarda los drivers en el estado
    } catch (err) {
      setError('Error al obtener los drivers'); // Maneja errores
    }
  };

  // Maneja el envio del formulario para crear o actualizar una tarea
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Valida que un driver haya sido seleccionado
      if (!driverId) {
        iziToast.error({ title: 'Error', message: 'Debes asignar un Driver' });
        return;
      }

      // Si hay una tarea seleccionada, actualiza la tarea
      if (selectedTareaId) {
        await editarTarea(selectedTareaId, {
          title: titulo,
          description: descripcion,
          assigned_to: driverId,
          status: "Pending"
        });
        iziToast.success({ title: 'Exito', message: 'Tarea actualizada correctamente' });
        setSelectedTareaId(null); // Reinicia el estado de seleccion
      } else {
        // Crea una nueva tarea
        await crearTarea({
          title: titulo,
          description: descripcion,
          assigned_to: driverId,
          assigned_to_name: driverId,
          status: "Pending"
        });
        iziToast.success({ title: 'Exito', message: 'Tarea creada correctamente' });
      }

      fetchTareas(); // Actualiza la lista de tareas
      setTitulo(''); // Reinicia el titulo
      setDescripcion(''); // Reinicia la descripcion
      setDriverId(''); // Reinicia el driver
    } catch (err) {
      iziToast.error({ title: 'Error', message: 'Hubo un problema al guardar la tarea' });
    }
  };

  // Maneja la eliminacion de una tarea
  const handleDelete = async (id) => {
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: 'once',
      id: 'question',
      zindex: 999,
      title: '¿Estas seguro?',
      message: '¿Quieres eliminar esta tarea?',
      position: 'center',
      buttons: [
        [
          '<button><b>Si</b></button>',
          async function (instance, toast) {
            try {
              await eliminarTarea(id); // Llama a la API para eliminar la tarea
              iziToast.success({ title: 'Eliminado', message: 'La tarea ha sido eliminada' });
              fetchTareas(); // Refresca la lista de tareas
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

  // Maneja la edicion de una tarea
  const handleEdit = (tarea) => {
    setSelectedTareaId(tarea.id); // Guarda la ID de la tarea seleccionada
    setTitulo(tarea.title); // Carga el titulo de la tarea
    setDescripcion(tarea.description); // Carga la descripcion de la tarea
    setDriverId(tarea.assigned_to || ''); // Carga el ID del driver asignado
  };

  // Efectos para cargar las tareas y drivers al montar el componente
  useEffect(() => {
    fetchTareas();
    fetchDrivers();
  }, []);

  return (
    <div className="main-container">
      <h2>Gestion de Tareas</h2>
      {error && <p className="error">{error}</p>}

      {/* Formulario para crear o editar tareas */}
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Titulo de la Tarea</label>
          <input
            type="text"
            value={titulo}
            onChange={handleTituloChange}
            required
          />
        </div>
        <div>
          <label>Descripcion</label>
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
                <p><strong>Descripcion:</strong> {tarea.description || 'Sin descripcion'}</p>
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
