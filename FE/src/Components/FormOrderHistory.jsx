import React, { useState, useEffect } from 'react';
import OrderHistoryService from '../Services/OrderHistoryService.jsx';

const FormOrderHistory = () => {
  const [historial, setHistorial] = useState([]);
  const [status, setStatus] = useState('');
  const [orderId, setOrderId] = useState('');
  const [changedBy, setChangedBy] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar el historial al montar el componente
  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        setLoading(true);
        const data = await OrderHistoryService.obtenerHistorial();
        setHistorial(data);
      } catch (err) {
        setError('Error al cargar el historial.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistorial();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoHistorial = {
      order: parseInt(orderId),
      status,
      changed_by: parseInt(changedBy),
    };

    try {
      setLoading(true);
      const response = await OrderHistoryService.crearHistorial(nuevoHistorial);
      setHistorial([...historial, response]);
      setStatus('');
      setOrderId('');
      setChangedBy('');
      alert('Registro de historial creado con éxito');
    } catch (err) {
      setError('Error al crear el registro de historial.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Historial de Pedidos</h2>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>ID de Pedido:</label>
          <input
            type="number"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ID del Usuario que Cambió el Estado:</label>
          <input
            type="number"
            value={changedBy}
            onChange={(e) => setChangedBy(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>Crear Registro</button>
      </form>

      <h3>Lista del Historial</h3>
      {historial.length > 0 ? (
        <ul>
          {historial.map((item) => (
            <li key={item.id}>
              <p>Pedido #{item.order}</p>
              <p>Estado: {item.status}</p>
              <p>Cambiado por: Usuario #{item.changed_by}</p>
              <p>Fecha: {new Date(item.changed_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay registros de historial aún.</p>
      )}
    </div>
  );
};

export default FormOrderHistory;
