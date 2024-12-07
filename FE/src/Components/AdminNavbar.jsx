import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/AdminNavbar.css';
import logo from '../img/logo.png'; // Ajusta la ruta si es necesario

const AdminNavbar = ({ isAuthenticated, botonCerrarSesion }) => {
    return (
        <header className="header">
            {/* Logo alineado a la izquierda */}
            <img src={logo} alt="Logo" className="logo-img" />
            <nav className="nav">
                {/* Enlaces de navegación */}
                <ul className="nav-links">
                    
                    <li>
                        <Link to="/Admin" className="nav-link">Viajes</Link>
                    </li>
                    <li>
                        <Link to="/ClientsList" className="nav-link">Contáctenos</Link>
                    </li>
                </ul>
                {/* Botón según autenticación */}
               
            </nav>
        </header>
    );
};

export default AdminNavbar;
