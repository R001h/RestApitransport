import React from 'react';
import '../Style/Footer.css';
import 'boxicons';
import logo from '../img/logo.png'; // Asumiendo que el logo está en formato transparente

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Columna 1: Logo */}
        <div className="footer-logo-container">
          <img src={logo} alt="Logo" className="footer-logo" />
        </div>

        {/* Columna 2: Contacto */}
        <div className="footer-contact">
          <h4>Contacto</h4>
          <div className="contact-info">
            <div>
              <box-icon type="solid" name="phone"></box-icon>
              <span>8552-0106</span>
            </div>
            <div>
              <box-icon name="envelope"></box-icon>
              <span>info@transportesR&G.com</span>
            </div>
            <div>
              <box-icon name="location-plus" type="solid"></box-icon>
              <span>Nosara, Costa Rica</span>
            </div>
          </div>
        </div>

        {/* Columna 3: Redes sociales */}
        <div className="footer-social">
          <h4>Redes Sociales</h4>
          <div className="social-icons">
            <a href="http://www.google.com" target="_blank" rel="noopener noreferrer">
              <box-icon name="whatsapp" type="logo"></box-icon>
            </a>
            <a
              href="https://www.instagram.com/tra_nsporterg?igsh=NmdtOWt0d2t4MmZu&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <box-icon name="instagram-alt" type="logo"></box-icon>
            </a>
            <a href="http://www.google.com" target="_blank" rel="noopener noreferrer">
              <box-icon name="facebook" type="logo"></box-icon>
            </a>
            <a href="http://www.google.com" target="_blank" rel="noopener noreferrer">
              <box-icon name="tiktok" type="logo"></box-icon>
            </a>
          </div>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="footer-bottom">
        <p>© 2024 Transportes R&G. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
