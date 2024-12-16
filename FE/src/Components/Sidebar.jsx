import React, { useState } from 'react';  // Importamos React y el hook useState
import { FaSearch, FaHome, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';  // Importamos los íconos de FontAwesome
import '../Style/Sidebar.css';  // Importamos los estilos CSS para el Sidebar
import CrearServicios from './CrearServicios';  // Componente para crear servicios
import GestionarTareas from './GestionarTareas';  // Componente para gestionar tareas
import FormEmployee from './FormEmployee';  // Componente para registrar empleados
import FormRegister from './FormRegister';  // Componente para registrar clientes
import TiendaServicios from './TiendaServicios';  // Componente para mostrar servicios
import AdministracionVehiculos from './AdministracionVehiculos';  // Componente para administrar vehículos
import FormFeedback from './FormFeedback';  // Componente para feedback
import FormOrderHistory from './FormOrderHistory';  // Componente para mostrar historial de órdenes
import AsignarFlete from './AsignarFlete';  // Componente para asignar flete

const Sidebar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);  // Estado para modo oscuro/claro
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);  // Estado para controlar si el sidebar está abierto
    const [activeItem, setActiveItem] = useState('dashboard');  // Estado para el ítem activo del menú

    // Función para alternar entre modo oscuro y claro
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);  // Cambia el estado de isDarkMode
    };

    // Función para manejar el clic en los ítems del menú
    const handleItemClick = (item) => {
        setActiveItem(item);  // Establece el ítem activo según el clic
    };

    // Función para renderizar el contenido basado en el ítem activo
    const renderContent = () => {
        switch (activeItem) {
            case 'CrearServicios':
                return <CrearServicios />;  // Renderiza el componente CrearServicios
            case 'MostrarServicios':
                return <TiendaServicios />;  // Renderiza el componente TiendaServicios
            case 'CrearTarea':
                return <GestionarTareas />;  // Renderiza el componente GestionarTareas
            case 'AsignarFlete':
                return <AsignarFlete />;  // Renderiza el componente AsignarFlete
            case 'CrearEmpleado':
                return <FormEmployee />;  // Renderiza el componente FormEmployee
            case 'CrearVehiculo':
                return <AdministracionVehiculos />;  // Renderiza el componente AdministracionVehiculos
            case 'Feedback':
                return <FormFeedback />;  // Renderiza el componente FormFeedback
            case 'OrdersHistory':
                    return <FormOrderHistory />;  // Renderiza el componente FormOrderHistory
            case 'Register':
                return <FormRegister />;  // Renderiza el componente FormRegister
            default:
                return <h1>Welcome</h1>;  // Si no se encuentra el ítem, muestra un mensaje por defecto
        }
    };

    return (
        <div className={`sidebar-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}> {/* Aplica clase dependiendo del modo */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}> {/* Aplica clase dependiendo del estado del sidebar */}
                <div className="sidebar-header">
                    <h2 className="sidebar-title">Transportes <br /> R&G</h2> {/* Título del sidebar */}
                    <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <span className="menu-icon">&#9776;</span> {/* Ícono de menú */}
                    </button>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                    />
                    <FaSearch className="search-icon" /> {/* Ícono de búsqueda */}
                </div>
                <ul className="sidebar-menu">
                    {/* Lista de ítems del menú */}
                    <li
                        className={`menu-item ${activeItem === 'CrearServicios' ? 'active' : ''}`}
                        onClick={() => handleItemClick('CrearServicios')}
                    >
                        <FaHome className="menu-icon" />
                        Crear Servicio
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'MostrarServicios' ? 'active' : ''}`}
                        onClick={() => handleItemClick('MostrarServicios')}
                    >
                        <FaHome className="menu-icon" />
                        Mostrar Servicio
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'CrearTarea' ? 'active' : ''}`}
                        onClick={() => handleItemClick('CrearTarea')}
                    >
                        <FaChartBar className="menu-icon" />
                        Crear Tarea
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'AsignarFlete' ? 'active' : ''}`}
                        onClick={() => handleItemClick('AsignarFlete')}
                    >
                        <FaChartBar className="menu-icon" />
                        Asignar Flete
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'CrearEmpleado' ? 'active' : ''}`}
                        onClick={() => handleItemClick('CrearEmpleado')}
                    >
                        <FaHome className="menu-icon" />
                        Crear Empleado
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'CrearVehiculo' ? 'active' : ''}`}
                        onClick={() => handleItemClick('CrearVehiculo')}
                    >
                        <FaHome className="menu-icon" />
                        Crear Vehículo
                    </li>
                    
                    <li
                        className={`menu-item ${activeItem === 'Feedback' ? 'active' : ''}`}
                        onClick={() => handleItemClick('Feedback')}
                    >
                        <FaCog className="menu-icon" />
                        Feedback
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'Register' ? 'active' : ''}`}
                        onClick={() => handleItemClick('Register')}
                    >
                        <FaSignOutAlt className="menu-icon" />
                        Registrar Cliente
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'OrdersHistory' ? 'active' : ''}`}
                        onClick={() => handleItemClick('OrdersHistory')}
                    >
                        <FaSignOutAlt className="menu-icon" />
                        Historial Registro
                    </li>
                </ul>
                <div className="dark-mode-toggle">
                    <label className="switch">
                        <input type="checkbox" onChange={toggleDarkMode} checked={isDarkMode} />
                        <span className="slider"></span> {/* Estilo para el interruptor de modo oscuro */}
                    </label>
                    <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span> {/* Muestra el texto dependiendo del modo */}
                </div>
            </div>
            <div className={`content ${isDarkMode ? 'dark-mode' : 'light-mode'}`}> {/* Muestra el contenido dependiendo del modo */}
                {renderContent()}  {/* Renderiza el componente basado en el ítem activo */}
            </div>
        </div>
    );
};

export default Sidebar;  // Exporta el componente Sidebar para usarlo en otras partes de la aplicación
