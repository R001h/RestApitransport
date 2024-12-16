import React, { useState, useEffect } from 'react';
import { GetDrivers } from '../Services/DriverService'; // Servicio para obtener los conductores.
import GetOrders  from '../Services/OrderService'        ; // Servicio para obtener las ordenes.
import AssignmentService from '../Services/AssignmentService'; // Servicio para asignar conductores a ordenes.
import '../Style/AsignarFlete.css';  // Importamos los estilos CSS para el Sidebar

const OrderAssignmentComponent = () => {
    const [drivers, setDrivers] = useState([]); // Lista de conductores.
    const [orders, setOrders] = useState([]); // Lista de ordenes.
    const [selectedDriver, setSelectedDriver] = useState(''); // Conductor seleccionado.
    const [selectedOrder, setSelectedOrder] = useState(''); // Orden seleccionada.
    const [error, setError] = useState(''); // Estado para manejar mensajes de error.
    const [success, setSuccess] = useState(''); // Estado para manejar mensajes de exito.
    const [isLoading, setIsLoading] = useState(false); // Estado para manejar el estado de carga.

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const driversData = await GetDrivers();
                console.log('Datos de conductores:', driversData);
                setDrivers(driversData);
              const ordersData = await GetOrders();
              console.log(ordersData[1].contact_number);
              
            setOrders(ordersData);
            } catch (error) {
                setError('Error al cargar conductores u ordenes.');
            }
        };

        fetchInitialData();
    }, []);



    const handleAssignDriver = async () => {
        setError('');
        setSuccess('');
        setIsLoading(true);

        if (!selectedDriver || !selectedOrder) {
            setError('Debe seleccionar un conductor y una orden.');
            setIsLoading(false);
            return;
        }

        try {

        
            
            const response = await AssignmentService.createAssignment(selectedOrder, selectedDriver);
            setSuccess('Conductor asignado correctamente.');

            const updatedOrders = await OrderService.getOrders();
            setOrders(updatedOrders);
        } catch (error) {
            setError(error.message || 'Error al asignar el conductor.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderError = () => {
        if (error) {
            return <div style={{ color: 'red' }}>{error}</div>;
        }
        return null;
    };

    const renderSuccess = () => {
        if (success) {
            return <div style={{ color: 'green' }}>{success}</div>;
        }
        return null;
    };
    const renderDriverOptions = () => {
        return drivers.map((driver) => {
           
                return (
                    <option key={driver.id} value={driver.id}>
                        {driver.email} {driver.username}
                    </option>
                );
            
            return null; // No renderizar si los datos están incompletos
        });
    };
    
    const renderOrderOptions = () => {
        return orders.map((order) => {
            
                return (
                    <option key={order.id} value={order.id}>
                        {order.client_details.first_name}{order.contact_number}
                        
                    </option>
                );
            
            return null; // No renderizar si los datos están incompletos
        });
    };


    return (
        <div>
            <h2>Asignacion de Fletes</h2>

       
            {renderSuccess()}

            <div>
                <label>Seleccione un Conductor:</label>
                <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}>
                    <option value="">--Seleccione--</option>
                    {renderDriverOptions()}
                </select>
            </div>

            <div>
                <label>Seleccione una Orden:</label>
                <select value={selectedOrder} onChange={(e) => setSelectedOrder(e.target.value)}>
                    <option value="">--Seleccione--</option>
                    {renderOrderOptions()}
                </select>
            </div>

            <button onClick={handleAssignDriver} disabled={isLoading || !selectedDriver || !selectedOrder}>
                {isLoading ? 'Asignando...' : 'Asignar'}
            </button>
        </div>
    );
};

export default OrderAssignmentComponent;
