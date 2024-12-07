import React, { useState, useEffect } from 'react';
import '../Style/TiendaServicios.css'; 
import { ObtenerServicios } from '../Services/CrearServicioServices';
import 'izitoast/dist/css/iziToast.min.css'; // Importamos el CSS de iziToast.

function TiendaServicios() {
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState(null);

  // Obtener servicios desde la API
  const fetchServicios = async () => {
    try {
      const data = await ObtenerServicios();
      setServicios(data); // Guardar los servicios en el estado
    } catch (error) {
      setError('Error al obtener los servicios');
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  return (
    <div className="main-container">
      <h2>Gestión de Servicios</h2>
      {error && <p className="error">{error}</p>}

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
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                )}
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

export default TiendaServicios;
