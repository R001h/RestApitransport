import React, { useEffect, useState } from 'react';
import { GetDrivers } from '../Services/DriverService'; // Asegúrate de que la ruta sea correcta
import '../Style/DriverList.css'; // Importamos los estilos CSS para el Sidebar

const DriverList = () => {
  const [drivers, setDrivers] = useState([]); // Definir el estado correctamente
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchDriversData = async () => {
      try {
        const fetchedDrivers = await GetDrivers(); // Llamar a la función GetDrivers
        setDrivers(fetchedDrivers); // Asignar los datos obtenidos al estado
      } catch (err) {
        setError('Failed to fetch drivers'); // Si ocurre un error, mostrarlo
      } finally {
        setLoading(false); // Cuando termine la carga, desactivar el loading
      }
    };

    fetchDriversData(); // Ejecutar la función para obtener los datos
  }, []); // Solo se ejecutará una vez cuando el componente se monte

  if (loading) {
    return <p>Loading drivers...</p>; // Mensaje de carga mientras se obtienen los datos
  }

  if (error) {
    return <p>{error}</p>; // Mensaje de error si algo salió mal
  }

  return (
    <div>
      <h2>Lista de Choferes</h2>
      {drivers.length > 0 ? (
        <table className="driver-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={index}>
                <td>{driver.first_name} {driver.last_name}</td>
                <td>{driver.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron choferes</p>
      )}
    </div>
  );
};

export default DriverList;
