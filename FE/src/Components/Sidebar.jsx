import React, { useState } from 'react';
import { FaSearch, FaHome, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import '../Style/Sidebar.css';
import CrearServicios from './CrearServicios';
import GestionarTareas from './GestionarTareas';
import FormConductor from './FormConductor';
import FormEmployee from './FormEmployee';
import FormRegister from './FormRegister';
import TiendaServicios from './TiendaServicios';
import AdministracionVehiculos from './AdministracionVehiculos';

const Sidebar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeItem, setActiveItem] = useState('dashboard');

    // Cambiar entre modo oscuro y claro
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Cambiar de vista activa en el sidebar
    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const renderContent = () => {
        switch (activeItem) {
            case 'CrearServicios':
                return <CrearServicios />;
            case 'MostrarServicios':
                return <TiendaServicios />;
            case 'CrearTarea':
                return <GestionarTareas />;
            case 'CrearEmpleado':
                return <FormEmployee />;
            case 'CrearVehiculo':
                return <AdministracionVehiculos />;
            case 'Conductor':
                return <FormConductor />;
            case 'Register':
                return <FormRegister />;
            default:
                return <h1>Welcome</h1>;
        }
    };

    return (
        <div className={`sidebar-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <h2 className="sidebar-title">Transportes <br /> R&G</h2>
                    <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <span className="menu-icon">&#9776;</span>
                    </button>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                    />
                    <FaSearch className="search-icon" />
                </div>
                <ul className="sidebar-menu">
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
                        className={`menu-item ${activeItem === 'CrearEmpleado' ? 'active' : ''}`}
                        onClick={() => handleItemClick('CrearEmpleado')}
                    >
                        <FaHome className="menu-icon" />
                        Crear Empleados
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'Register' ? 'active' : ''}`}
                        onClick={() => handleItemClick('Register')}
                    >
                        <FaSignOutAlt className="menu-icon" />
                        Crear Cliente
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'CrearVehiculo' ? 'active' : ''}`}
                        onClick={() => handleItemClick('CrearVehiculo')}
                    >
                        <FaHome className="menu-icon" />
                        Crear Vehiculo
                    </li>
                    <li
                        className={`menu-item ${activeItem === 'Login' ? 'active' : ''}`}
                        onClick={() => handleItemClick('Login')}
                    >
                        <FaSignOutAlt className="menu-icon" />
                        Login
                    </li>
                </ul>
                <div className="dark-mode-toggle">
                    <label className="switch">
                        <input type="checkbox" onChange={toggleDarkMode} checked={isDarkMode} />
                        <span className="slider"></span>
                    </label>
                    <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                </div>
            </div>
            <div className={`content ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                {renderContent()}
            </div>
        </div>
    );
};

export default Sidebar;
