import React, { useState } from "react";
import "../Style/Terminos_Condiciones.css";

const Terminos_Condiciones = () => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Gracias por aceptar los términos y condiciones.");
  };

  return (
    <div className="terms-container">
      <h1>Términos y Condiciones de Uso</h1>
      <p>
        Bienvenido a Transportes R&G. Al acceder y utilizar nuestro sitio web, aceptas los siguientes términos y condiciones. Por favor, léelos detenidamente antes de continuar.
      </p>

      <h2>1. Introducción</h2>
      <p>
        Estos términos y condiciones rigen el uso de este sitio web y los servicios que ofrecemos. Al utilizar este sitio, garantizas que tienes la capacidad legal para aceptar estos términos.
      </p>

      <h2>2. Uso del Sitio Web</h2>
      <ul>
        <li>
          No debes usar este sitio web para fines ilegales o no autorizados.
        </li>
        <li>
          Nos reservamos el derecho de restringir el acceso a ciertas áreas del sitio web o al sitio completo, si consideramos que has violado estos términos.
        </li>
        <li>
          El contenido de este sitio es solo para uso personal. Queda prohibida su distribución sin autorización previa.
        </li>
      </ul>

      <h2>3. Servicios Ofrecidos</h2>
      <p>
        Transportes R&G ofrece servicios como transporte de materiales, mudanzas, recolección de residuos y otros. Todos los servicios están sujetos a disponibilidad y condiciones específicas que serán detalladas al momento de contratar.
      </p>

      <h2>4. Responsabilidad del Usuario</h2>
      <p>
        Es responsabilidad del usuario proporcionar información precisa y completa al momento de realizar solicitudes o contrataciones de servicios. Transportes R&G no se hace responsable por errores derivados de información incorrecta proporcionada por el usuario.
      </p>

      <h2>5. Limitaciones de Responsabilidad</h2>
      <p>
        Transportes R&G no será responsable por daños directos, indirectos, incidentales o consecuenciales que resulten del uso de nuestros servicios o de la imposibilidad de utilizarlos debido a causas fuera de nuestro control.
      </p>

      <h2>6. Propiedad Intelectual</h2>
      <p>
        Todo el contenido disponible en este sitio web, incluyendo textos, imágenes, logos, y diseño, es propiedad de Transportes R&G o de sus licenciantes y está protegido por las leyes de propiedad intelectual. Queda estrictamente prohibida la reproducción o distribución sin autorización expresa.
      </p>

      <h2>7. Cambios en los Términos</h2>
      <p>
        Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Es responsabilidad del usuario revisar periódicamente esta página para estar al tanto de los cambios.
      </p>

      <form onSubmit={handleSubmit} className="terms-form">
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={isAccepted}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="acceptTerms">
            Confirmo que he leído y acepto los términos y condiciones.
          </label>
        </div>
        <button type="submit" disabled={!isAccepted}>
          Aceptar y Continuar
        </button>
      </form>
    </div>
  );
};

export default Terminos_Condiciones;
