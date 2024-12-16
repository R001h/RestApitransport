import React, { useEffect, useState } from 'react';
import { GetClients } from '../Services/ClientService'; // Asegúrate de que la ruta sea correcta
import '../Style/ClientList.css'; // Importamos los estilos CSS para el Sidebar

const ClientList = () => {
  const [clients, setClients] = useState([]); // Definir el estado correctamente
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
      const fetchClientsData = async () => {
          try {
              const fetchedClients = await GetClients(); // Llamar a la función GetClients
              setClients(fetchedClients); // Asignar los datos obtenidos al estado
          } catch (err) {
              setError('Failed to fetch clients'); // Si ocurre un error, mostrarlo
          } finally {
              setLoading(false); // Cuando termine la carga, desactivar el loading
          }
      };

      fetchClientsData(); // Ejecutar la función para obtener los datos
  }, []); // Solo se ejecutará una vez cuando el componente se monte

  if (loading) {
      return <p>Loading clients...</p>; // Mensaje de carga mientras se obtienen los datos
  }

  if (error) {
      return <p>{error}</p>; // Mensaje de error si algo salió mal
  }

  return (
      <div>
          <h2>Lista de Clientes</h2>
          {clients.length > 0 ? (
              <table className="client-table">
                  <thead>
                      <tr>
                          <th>Nombre</th>
                          <th>Correo</th>
                      </tr>
                  </thead>
                  <tbody>
                      {clients.map((client, index) => (
                          <tr key={index}>
                              <td>{client.first_name} {client.last_name}</td>
                              <td>{client.email}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          ) : (
              <p>No clients found</p>
          )}
      </div>
  );
};

export default ClientList;
