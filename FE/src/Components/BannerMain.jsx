import React from "react";
import "../Style/BannerMain.css"; // Asegúrate de crear un archivo CSS para estilos específicos

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
          <button className="banner-button">Solicita una cotización</button>
        </div>
      </section>

      {/* Cards */}
      <section className="cards-section">
        <h2>Nuestros servicios destacados</h2>
        <div className="cards-container">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="card">
              <h3>Servicio {index + 1}</h3>
              <p>Descripción breve del servicio {index + 1}.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Formulario */}
      <section className="form-section">
        <h2>Solicita una cotización</h2>
        <form className="quotation-form">
          <label>
            Nombre *<br />
            <input type="text" placeholder="Nombre y apellidos" required />
          </label>
          <label>
            Teléfono *<br />
            <input type="tel" placeholder="0000-0000" required />
          </label>
          <label>
            Correo electrónico<br />
            <input type="email" placeholder="ejemplo@mail.com" required />
          </label>
          <label>
            Detalles de la mudanza *<br />
            <textarea placeholder="Escribe aquí todos los detalles relevantes..." required></textarea>
          </label>
          <label>
            Requerimientos adicionales<br />
            <select multiple>
              <option>Se requiere ayudantes</option>
              <option>Se requiere embalaje</option>
              <option>Se requiere desmontaje</option>
              <option>Se requiere desinstalación</option>
              <option>Se requiere instalación</option>
              <option>Se requiere mudanza nocturna</option>
            </select>
          </label>
          <label>
            <input type="checkbox" required /> Acepto la Política de Privacidad
          </label>
          <button type="submit">Enviar</button>
        </form>
      </section>

      {/* Información adicional */}
      <section className="info-section">
        <h2>Por qué elegirnos</h2>
        <p>
          Nuestros camiones de mudanzas cuentan con el equipamiento adecuado para cada tipo de mudanza. Esto garantiza que tus pertenencias sean transportadas de manera segura y lleguen a su destino en perfectas condiciones.
        </p>
        <p>
          Contamos con más de 15 años de experiencia. Deja tu transporte en manos de profesionales responsables.
        </p>
        <h3>Servicio de mudanza en todas las provincias:</h3>
        <div className="provinces-container">
          {["Alajuela", "Heredia", "San José", "Guanacaste", "Puntarenas", "Limón", "Cartago"].map((province, index) => (
            <div key={index} className="province-card">
              <img src={`/path-to-image-${province.toLowerCase()}.jpg`} alt={province} className="province-image" />
              <p>{province}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Opiniones */}
      <section className="reviews-section">
        <h2>Las opiniones de nuestros clientes</h2>
        <div className="reviews-carousel">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="review">
              <p>"Testimonio de cliente {index + 1}."</p>
              <h4>- Cliente {index + 1}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Solicita tu presupuesto */}
      <section className="cta-section">
        <h2>Solicita tu presupuesto en la mejor empresa de mudanzas en Costa Rica</h2>
        <button className="cta-button">Solicitar cotización</button>
      </section>
    </div>
  );
};

export default Bannermain;
