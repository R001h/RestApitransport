import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png'; // Asegúrate de que la ruta sea correcta
import '../Style/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Efecto para verificar si el usuario está autenticado al cargar el componente
  useEffect(() => {
    const authStatus = localStorage.getItem('Autenticado');
    setIsAuthenticated(!!authStatus); // Si hay algo en "Autenticado", se considera true
  }, []);

  // Manejar cierre de sesión
  const botonCerrarSesion = () => {
    localStorage.removeItem('Autenticado'); // Eliminar la autenticación
    setIsAuthenticated(false); // Actualizar el estado
    navigate('/'); // Redirigir al inicio
  };

  return (
    <div className="main-container">
      <header className="header">
        <div className="logo">
          {/* Hacer que el logo sea un enlace */}
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>
        </div>
        <nav className="nav">
          <ul className="nav-links">
            <Link to="/Servicios">Servicios</Link>
            <Link to="/Tienda">Viajes</Link>
            <Link to="/Contactos">Contáctenos</Link>
          </ul>
          {/* Mostrar botones según el estado de autenticación */}
          {!isAuthenticated && (
            <button className="btn_contact">
              <Link to="/Login">Iniciar Sesión</Link>
            </button>
          )}
          {isAuthenticated && (
            <button onClick={botonCerrarSesion} className="btn_contact">
              Cerrar Sesión
            </button>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
