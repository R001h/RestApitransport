import React, { useState, useEffect } from 'react';
import '../Style/CrearServicios.css'; // Estilos de la página
import { ObtenerServicios, CrearServicio, ActualizarServicio, EliminarServicio } from '../Services/CrearServicioServices';
import iziToast from 'izitoast'; // Importamos iziToast para mostrar alertas con estilo.
import 'izitoast/dist/css/iziToast.min.css'; // Importamos el CSS de iziToast.

function CrearServicios() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(''); // Estado para la imagen
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState(null);
  const [selectedServicioId, setSelectedServicioId] = useState(null); // Para edición

  // Funciones para manejar los cambios en los inputs
  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleDescripcionChange = (e) => setDescripcion(e.target.value);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  // Obtener servicios desde la API
  const fetchServicios = async () => {
    try {
      const data = await ObtenerServicios();
      setServicios(data); // Guardar los servicios en el estado
    } catch (error) {
      setError('Error al obtener los servicios');
    }
  };

  // Crear o actualizar servicio
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevoServicio = { nombre, descripcion, imagen };

      if (selectedServicioId) {
        await ActualizarServicio(selectedServicioId, nuevoServicio);
        setSelectedServicioId(null);
        iziToast.success({ title: 'Éxito', message: 'Servicio actualizado correctamente' });
      } else {
        await CrearServicio(nuevoServicio);
        iziToast.success({ title: 'Éxito', message: 'Servicio creado correctamente' });
      }

      fetchServicios(); // Refrescar lista
      setNombre('');
      setDescripcion('');
      setImagen('');
    } catch (error) {
      iziToast.error({ title: 'Error', message: 'Hubo un problema al guardar el servicio' });
    }
  };

  // Eliminar un servicio
  const handleDelete = async (id) => {
    const servicioToDelete = servicios.find((s) => s.id === id);
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: 'once',
      id: 'question',
      zindex: 999,
      title: '¿Estás seguro?',
      message: `¿Quieres eliminar el servicio "${servicioToDelete?.name}"?`,
      position: 'center',
      buttons: [
        [
          '<button><b>Sí</b></button>',
          async function (instance, toast) {
            try {
              await EliminarServicio(id);
              iziToast.success({ title: 'Eliminado', message: 'El servicio ha sido eliminado' });
              fetchServicios();
            }
            catch (error) {
              console.error('Error al intentar eliminar el servicio:', error); // Agregar detalle del error
              iziToast.error({ title: 'Error', message: 'Hubo un problema al eliminar el servicio' });
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

  // Editar un servicio
  const handleEdit = (servicio) => {
    setSelectedServicioId(servicio.id);
    setNombre(servicio.name);
    setDescripcion(servicio.description);
    setImagen(servicio.image_url); // Opcional
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  return (
    <div className="main-container">
      <h2>Gestión de Servicios</h2>
      {error && <p className="error">{error}</p>}

      {/* Formulario de creación y edición de servicios */}
      <form onSubmit={handleSubmit} className="input">
        <div>
          <label>Nombre del Servicio</label>
          <input
            type="text"
            value={nombre}
            onChange={handleNombreChange}
            required
          />
        </div>
        <div>
          <label>Descripción del Servicio</label>
          <input
            type="text"
            value={descripcion}
            onChange={handleDescripcionChange}
            required
          />
        </div>
        <div>
          <label>Imagen del Servicio</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">
          {selectedServicioId ? 'Actualizar Servicio' : 'Crear Servicio'}
        </button>
      </form>

      {/* Lista de servicios */}
      <div className="servicios-container">
        <h3>Lista de Servicios</h3>
        {servicios.length > 0 ? (
          <div className="servicios-list">
            {servicios.map((servicio) => (
              <div key={servicio.id} className="servicio-card">
                <h4>{servicio.name}</h4> {/* Asegúrate de que la API devuelve 'name' */}
                <p><strong>Descripción:</strong> {servicio.description}</p>
                {servicio.image_url && (
                  <img
                    src={servicio.image_url}
                    alt={servicio.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                )}
                <button onClick={() => handleEdit(servicio)}>Editar</button>
                <button
                  onClick={() => handleDelete(servicio.id)}
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay servicios disponibles</p>
        )}
      </div>
    </div>
  );
}

export default CrearServicios;
