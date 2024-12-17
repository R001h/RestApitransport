import { FaPlusCircle, FaEye, FaTasks, FaTruck, FaUserPlus, FaCar, FaComment, FaIdCard, FaUsers, FaHistory } from 'react-icons/fa'; // Importamos los íconos de FontAwesome
import '../Style/Sidebar.css'; // Importamos los estilos CSS para el Sidebar
import { useState } from "react";

import CrearServicios from './CrearServicios'; // Componente para crear servicios
import GestionarTareas from './GestionarTareas'; // Componente para gestionar tareas
import FormEmployee from './FormEmployee'; // Componente para registrar empleados
import FormRegister from './FormRegister'; // Componente para registrar clientes
import TiendaServicios from './TiendaServicios'; // Componente para mostrar servicios
import AdministracionVehiculos from './AdministracionVehiculos'; // Componente para administrar vehículos
import FormFeedback from './FormFeedback'; // Componente para feedback
import FormOrderHistory from './FormOrderHistory'; // Componente para mostrar historial de órdenes
import AsignarFlete from './AsignarFlete'; // Componente para asignar flete
import ClientsList from './ClientList'; // Componente para lista de clientes
import DriverList from './DriverList'; // Componente para lista de clientes

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para controlar si el sidebar está abierto
    const [activeItem, setActiveItem] = useState('dashboard'); // Estado para el ítem activo del menú

    // Función para manejar el clic en los ítems del menú
    const handleItemClick = (item) => {
        setActiveItem(item); // Establece el ítem activo según el clic
    };

    // Función para renderizar el contenido basado en el ítem activo
    const renderContent = () => {
        switch (activeItem) {
            case 'CrearServicios':
                return <CrearServicios />;
            case 'MostrarServicios':
                return <TiendaServicios />;
            case 'CrearTarea':
                return <GestionarTareas />;
            case 'AsignarFlete':
                return <AsignarFlete />;
            case 'CrearEmpleado':
                return <FormEmployee />;
            case 'DriversList':
                return < DriverList/>;
            case 'CrearVehiculo':
                return <AdministracionVehiculos />;
            case 'Feedback':
                return <FormFeedback />;
            case 'OrdersHistory':
                return <FormOrderHistory />;
            case 'Register':
                return <FormRegister />;
            case 'ClientList':
                return <ClientsList />;
            default:
                return <h1>Welcome</h1>;
        }
    };

    return (
        <div className="sidebar-container">
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <h2 className="sidebar-title">Transportes <br /> R&G</h2>
                </div>
                
                <ul className="sidebar-menu">
                    <li
                        className={`menu-item ${activeItem === 'CrearServicios' ? 'active' : ''}`}
                        onClick={() => handleItemClick('CrearServicios')}
                    >
                        <FaPlusCircle className="menu-icon" />
                        Crear Servicio
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'MostrarServicios' ? 'active' : ''}`}
                        onClick={() => handleItemClick('MostrarServicios')}
                    >
                        <FaEye className="menu-icon" />
                        Mostrar Servicio
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'CrearTarea' ? 'active' : ''}`}
                        onClick={() => handleItemClick('CrearTarea')}
                    >
                        <FaTasks className="menu-icon" />
                        Crear Tarea
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'AsignarFlete' ? 'active' : ''}`}
                        onClick={() => handleItemClick('AsignarFlete')}
                    >
                        <FaTruck className="menu-icon" />
                        Asignar Flete
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'CrearEmpleado' ? 'active' : ''}`}
                        onClick={() => handleItemClick('CrearEmpleado')}
                    >
                        <FaUserPlus className="menu-icon" />
                        Crear Empleado
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'DriverList' ? 'active' : ''}`}
                        onClick={() => handleItemClick('DriverList')}
                    >
                        <FaUsers className="menu-icon" />
                        Lista de Conductores
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'CrearVehiculo' ? 'active' : ''}`}
                        onClick={() => handleItemClick('CrearVehiculo')}
                    >
                        <FaCar className="menu-icon" />
                        Crear Vehículo
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'Feedback' ? 'active' : ''}`}
                        onClick={() => handleItemClick('Feedback')}
                    >
                        <FaComment className="menu-icon" />
                        Feedback
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'Register' ? 'active' : ''}`}
                        onClick={() => handleItemClick('Register')}
                    >
                        <FaIdCard className="menu-icon" />
                        Registrar Cliente
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'ClientList' ? 'active' : ''}`}
                        onClick={() => handleItemClick('ClientList')}
                    >
                        <FaUsers className="menu-icon" />
                        Lista de Clientes
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'OrdersHistory' ? 'active' : ''}`}
                        onClick={() => handleItemClick('OrdersHistory')}
                    >
                        <FaHistory className="menu-icon" />
                        Historial Registro
                    </li>
                </ul>
            </div>
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Sidebar;
