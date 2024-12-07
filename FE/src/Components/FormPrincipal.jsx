import React from 'react'; // Importamos React ya que es un componente funcional.
import '../Style/FormPrincipal.css'; // Importamos el archivo CSS para los estilos de este componente.

function FormPrincipal() { // Definimos el componente funcional FormPrincipal
  return (
    <div> {/* Contenedor principal que envuelve todo el contenido */}
    
      {/* Sección del banner principal */}
      <section className="banner"> 
        <div className="banner-content"> {/* Contenedor del contenido del banner */}
          <h1>PÁGINA WEB PARA TRANSPORTE</h1> {/* Título principal de la página */}
          <p>Soluciones personalizadas para cada necesidad</p> {/* Subtítulo que describe el propósito del sitio */}
        </div>
      </section>

      {/* Sección sobre la empresa */}
      <section className="about-section"> 
        <h2>Sobre Nuestra Empresa</h2> {/* Título de la sección que describe la empresa */}
        <p>
          {/* Descripción de la empresa y sus servicios, con un énfasis en el fundador */}
          En <strong>Transportes R&G</strong>, nos especializamos en ofrecer soluciones de transporte para
          materiales, basura orgánica, mudanzas y mucho más. Nuestro objetivo es facilitar el transporte
          eficiente y seguro, con un equipo altamente calificado y comprometido. Fundada por <strong>Roy Gerardo Avila</strong>, 
          nuestra empresa se enorgullece de su larga trayectoria y el servicio personalizado que ofrecemos a nuestros clientes.
        </p>

        {/* Sección de servicios, que muestra diferentes tipos de transporte ofrecidos */}
        <div className="services"> 
          
          {/* Primera tarjeta de servicio: Transporte de Materiales */}
          <div className="service-card">
            <h3>Transporte de Materiales</h3> {/* Título del servicio */}
            <p>Transportamos todo tipo de materiales con seguridad y rapidez.</p> {/* Descripción del servicio */}
          </div>
          
          {/* Segunda tarjeta de servicio: Transporte de Basura Orgánica */}
          <div className="service-card">
            <h3>Basura Orgánica</h3> {/* Título del servicio */}
            <p>Soluciones responsables y ecológicas para el transporte de desechos.</p> {/* Descripción del servicio */}
          </div>
          
          {/* Tercera tarjeta de servicio: Servicio de Mudanzas */}
          <div className="service-card">
            <h3>Mudanzas</h3> {/* Título del servicio */}
            <p>Servicios de mudanza eficientes, cuidando cada detalle de su traslado.</p> {/* Descripción del servicio */}
          </div>
        </div>
      </section>

    </div>
  ); // Fin del return, que devuelve el JSX que se va a renderizar
}

export default FormPrincipal; // Exportamos el componente para que pueda ser usado en otros archivos
