import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/FormPrincipal.css'; // Importamos los estilos de la página principal

function FormServicios() {
  const navigate = useNavigate();

  const cargar = () => {
    navigate('/Mapa');
  };

  return (
    <div > 

      <section className="banner">
        <div className="banner-content">
          <h1>Transportes R&G</h1>
          <p>
            En Transportes R&G, nos especializamos en ofrecer soluciones de transporte eficientes y confiables para una variedad de necesidades. Nuestro compromiso es proporcionar un servicio de alta calidad, adaptado a las diferentes demandas de nuestros clientes. A continuación, te presentamos los principales servicios que ofrecemos:
          </p>
        </div> 
      </section>

      <section className="about-section">
        <div className="services">
          <div className="service-card">
            <h3>1. Transporte de Basura Orgánica</h3>
            <p>
              Nos encargamos de la recolección y transporte de basura orgánica de manera segura y eficiente. Nuestro equipo de camión está diseñado para manejar residuos orgánicos de forma adecuada, asegurando que se cumplan las normativas ambientales y se minimice el impacto ecológico.
            </p>
          </div>

          <div className="service-card">
            <h3>2. Transporte de Materiales de Construcción</h3>
            <p>
              Desde arena y grava hasta cemento y ladrillos, nuestro camión está equipado para el transporte de una amplia gama de materiales de construcción.
            </p>
          </div>

          <div className="service-card">
            <h3>3. Transporte de Tanquetas de Agua</h3>
            <p>
              Ofrecemos el transporte de tanquetas de agua para satisfacer las necesidades de abastecimiento en áreas residenciales, comerciales e industriales.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FormServicios;

