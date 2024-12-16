import React, { useEffect, useState } from 'react';
import { GetClients } from '../Services/ClientService'; // Asegúrate de que la ruta sea correcta

function ClientsList() {
  const [clients, setClients] = useState([]); // Estado para almacenar la lista de clientes
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    async function fetchClients() {
      try {
        const fetchedClients = await GetClients();
        setClients(fetchedClients);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []); // Ejecutar solo al montar el componente

  if (loading) {
    return <p>Cargando clientes...</p>;
  }

  if (error) {
    return <p>Error al cargar clientes: {error}</p>;
  }

  return (
    <div>
      <h2>Lista de Clientes</h2>
      {clients.length === 0 ? (
        <p>No hay clientes disponibles.</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              <strong>{client.name}</strong> - {client.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClientsList;
