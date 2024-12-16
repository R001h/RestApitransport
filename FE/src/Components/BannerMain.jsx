import React from "react";
import "../Style/BannerMain.css"; // Asegúrate de crear un archivo CSS para estilos específicos
import Esperanza from '../img/puente_nosara2.jpg';
import ostional from '../img/ostional.jpg'
import garza from '../img/garza.jpg'
import guionnes from '../img/guionnes.jpeg'
import nosara from '../img/nosara.jpg'
import santamarta from '../img/santamarta.jpg'
import arenales from '../img/arenales.jpg'
import delicias from '../img/delicias.jpg'
import santacruz from '../img/santacruz.jpg'

const Bannermain = () => {


  
  return (
    <div className="home-container">
      {/* Banner */}
      <section className="banner">
        <img
          src="https://rgbucketfwd.s3.us-east-2.amazonaws.com/camiongmc.png"
          alt="Mudanzas en Costa Rica"
          className="banner-image"
        />
        <div className="banner-content">
          <h1>Contrata el mejor servicio de mudanza en Costa Rica</h1>
        
        </div>
        <div className="banner-content">
        <button className="banner-button">Solicita una cotización</button>
        </div>
      </section>

     {/* Cards */}
<section className="cards-section">
  <h2>Nuestros servicios destacados</h2>
  <div className="cards-container">
    <div className="card">
      <h3>Basura Orgánica</h3>
      <p>Recolección y transporte de residuos orgánicos para su disposición responsable.</p>
    </div>
    <div className="card">
      <h3>Materiales de Construcción</h3>
      <p>Transporte de arena, grava, cemento y otros materiales de construcción.</p>
    </div>
    <div className="card">
      <h3>Mudanzas</h3>
      <p>Servicio seguro y eficiente para el traslado de tus bienes y muebles.</p>
    </div>
    <div className="card">
      <h3>Tanquetas de Agua</h3>
      <p>Distribución de agua en tanques para proyectos y necesidades específicas.</p>
    </div>
    <div className="card">
      <h3>Escombros</h3>
      <p>Recolección y transporte de escombros para su correcta disposición.</p>
    </div>
    <div className="card">
      <h3>Otro Servicio</h3>
      <p>Ofrecemos soluciones personalizadas según tus necesidades.</p>
    </div>
  </div>
</section> 

<section className="info-section">
  <div className="info-banner">
    <h2>Por que elegirnos</h2>
    <div className="info-card">
      <p className="info-paragraph">
        Ofrecemos una amplia gama de servicios de transporte: mudanzas, materiales de construcción, recolección de basura orgánica, tanquetas de agua, y retiro de escombros. Nuestros camiones están equipados con la tecnología necesaria para garantizar un traslado seguro y eficiente, cuidando cada detalle en el proceso.
      </p>
    </div>
    <p className="experience-paragraph">
      Contamos con más de 15 años de experiencia. Deja tu transporte en manos de profesionales responsables y comprometidos con un servicio de calidad.
    </p>
    <h3>Servicio de mudanza en todas las Zonas de Nosara:</h3>
    <div className="provinces-container">
      {[ 
        { name: "Esperanza", url: Esperanza },
        { name: "Guiones", url: guionnes },
        { name: "Arenales", url: arenales },
        { name: "Garza", url: garza },
        { name: "Ostional", url: ostional },
        { name: "Nosara", url: nosara },
        { name: "Santa Marta", url: santamarta },
        { name: "Delicias", url: delicias },
        { name: "Santa Cruz", url: santacruz }
      ].map((Guanacaste, index) => (
        <div key={index} className="province-card">
          <img src={Guanacaste.url} alt={Guanacaste.name} className="Guanacaste-image" />
          <p className="province-name">{Guanacaste.name}</p>
        </div>
      ))}
    </div>
  </div>
</section>

    </div>
  );
};

export default Bannermain;
