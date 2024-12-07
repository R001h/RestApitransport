import React from 'react';
import '../Style/Footer.css';
import 'boxicons';
import logo from '../img/logo.png'; // Asumiendo que el logo está en formato transparente
import FormContactos from './FormContactos';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Sección del logo y detalles de contacto */}
        <div className="footer-contact">
          <img src={logo} alt="Logo" className="footer-logo" />
          <div className="contact-info">
            <div>
              <box-icon type='solid' name='phone'></box-icon>
              <span>8552-0106</span>
            </div>
            <div>
              <box-icon name='envelope'></box-icon>
              <span>info@transportesR&G.com</span>
            </div>
            <div>
              <box-icon name='location-plus' type='solid'></box-icon>
              <span>Nosara, Costa Rica</span>
            </div>
          </div>
        </div>

       

        {/* Sección de redes sociales */}
        <div className="footer-social">
  <h4>Redes Sociales</h4>
  <div className="social-icons">
    <a href="http://www.google.com" target="_blank" rel="noopener noreferrer">
      <box-icon name='whatsapp' type='logo'></box-icon>
    </a>

    <a href="https://www.instagram.com/tra_nsporterg?igsh=NmdtOWt0d2t4MmZu&utm_source=qr" target="_blank" rel="noopener noreferrer">
    <box-icon name='instagram-alt' type='logo'></box-icon>
    </a>

    <a href="http://www.google.com" target="_blank" rel="noopener noreferrer">
    <box-icon name='facebook' type='logo'></box-icon>
    </a>

    <a href="http://www.google.com" target="_blank" rel="noopener noreferrer">
    <box-icon name='tiktok' type='logo'></box-icon>
    </ a>
     
  </div>
</div>

        {/* Sección de Newsletter */}
        <div className="footer-newsletter">
          
          
           
        
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Transportes R&G. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
