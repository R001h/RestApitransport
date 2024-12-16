import React, { useEffect, useState } from 'react';
import { GetDrivers } from '../Services/DriverService';

function OrderAssignmentComponent() {
    const [drivers, setDrivers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedOrder, setSelectedOrder] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetchDriversAndOrders = async () => {
            try {
                const driverData = await GetDrivers();
                setDrivers(driverData);

                const ordersResponse = await fetch(`http://127.0.0.1:8000/order/`);
                if (!ordersResponse.ok) {
                    throw new Error('Error fetching orders');
                }

                const orderData = await ordersResponse.json();
                setOrders(orderData);
            } catch (err) {
                setError('Error al obtener los drivers y órdenes');
            }
        };

        fetchDriversAndOrders();
    }, []);

    const handleDriverChange = (e) => {
        setSelectedDriver(e.target.value);
    };

    const handleOrderChange = (e) => {
        setSelectedOrder(e.target.value);
    };

    const handleAssignDriver = async () => {
        setError(null); // Resetea el error al iniciar la asignación
        setSuccessMessage(null); // Resetea el mensaje de éxito

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No se encontró el token de autenticación.');
            }

            const response = await fetch(`http://127.0.0.1:8000/driverassignment/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ driver: selectedDriver, order: selectedOrder }),
            });

            if (!response.ok) {
                throw new Error('Error al asignar driver a la orden');
            }

            const result = await response.json();
            setSuccessMessage('Driver asignado con éxito.');
            console.log('Driver asignado:', result);

            // Actualiza las órdenes después de la asignación
            const updatedOrdersResponse = await fetch(`http://127.0.0.1:8000/order/`);
            if (updatedOrdersResponse.ok) {
                const updatedOrders = await updatedOrdersResponse.json();
                setOrders(updatedOrders);
            }
        } catch (error) {
            console.error('Error al asignar driver:', error);
            setError(error.message || 'Error al asignar el conductor');
        }
    };

    return (
        <div>
            <h3>Asignar Driver a Orden</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <div>
                <label>Selecciona un Driver</label>
                <select value={selectedDriver} onChange={handleDriverChange}>
                    <option value="">Selecciona un Driver</option>
                    {drivers.map((driver) => (
                        <option key={driver.id} value={driver.id}>
                            {driver.username}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Selecciona una Orden</label>
                <select value={selectedOrder} onChange={handleOrderChange}>
                    <option value="">Selecciona una Orden</option>
                    {orders.map((order) => {
                        const clientDetails = order.client_details || {};
                        const firstName = clientDetails.first_name || "Nombre no disponible";
                        const lastName = clientDetails.last_name || "Apellido no disponible";
                        const contactNumber = order.contact_number || "Sin contacto";

                        return (
                            <option key={order.id} value={order.id}>
                                Orden ID: {order.id} | Estado: {order.status} | 
                                Cliente: {firstName} {lastName} | Contacto: {contactNumber}
                            </option>
                        );
                    })}
                </select>
            </div>

            <button
                onClick={handleAssignDriver}
                disabled={!selectedDriver || !selectedOrder}
            >
                Asignar
            </button>
        </div>
    );
}

export default OrderAssignmentComponent;
