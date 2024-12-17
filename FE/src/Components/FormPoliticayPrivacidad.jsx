import React, { useState } from 'react';
import '../Style/PoliticasPrivacidad.css'; // Asegúrate de tener un archivo CSS para los estilos

function PoliticasPrivacidad() {
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!accepted) {
      alert('Debes aceptar las políticas de privacidad para continuar.');
      return;
    }

    alert('Gracias por aceptar nuestras políticas de privacidad.');
  };

  return (
    <main className="main-container">
      <div className="politicas-privacidad">
        <h1>Políticas de Privacidad</h1>
        <p className="intro">
          En Transportes R&G, nos comprometemos a proteger la privacidad y seguridad de nuestros clientes. Esta política de privacidad explica cómo recopilamos, usamos, compartimos y protegemos la información personal que recibimos de los usuarios de nuestro sitio web y servicios. Al utilizar nuestros servicios, aceptas las prácticas descritas en esta política.
        </p>

        <section>
          <h2>1. Información que Recopilamos</h2>
          <p>
            Recopilamos diferentes tipos de información de nuestros usuarios, que incluyen:
          </p>
          <ul>
            <li><strong>Información Personal:</strong> Nombre, dirección de correo electrónico, número de teléfono y cualquier otra información que nos proporciones al registrarte o utilizar nuestros servicios.</li>
            <li><strong>Información de Uso:</strong> Información sobre cómo interactúas con nuestros servicios, como el tiempo de acceso, las páginas visitadas y las preferencias.</li>
            <li><strong>Cookies y Tecnologías Similares:</strong> Utilizamos cookies para mejorar la experiencia de usuario, personalizar el contenido y analizar el uso del sitio web.</li>
          </ul>
        </section>

        <section>
          <h2>2. Cómo Usamos Tu Información</h2>
          <p>
            Utilizamos la información recopilada para diversas finalidades, entre las que se incluyen:
          </p>
          <ul>
            <li>Proporcionar y personalizar nuestros servicios.</li>
            <li>Mejorar la calidad de nuestros productos y servicios.</li>
            <li>Comunicarte sobre actualizaciones, promociones y ofertas especiales.</li>
            <li>Realizar análisis estadísticos para optimizar la experiencia del usuario.</li>
          </ul>
        </section>

        <section>
          <h2>3. Cómo Protegemos Tu Información</h2>
          <p>
            La seguridad de tu información es muy importante para nosotros. Implementamos medidas técnicas y organizativas para proteger tus datos personales, como el uso de cifrado y autenticación en los accesos a nuestros servicios.
          </p>
          <p>
            Sin embargo, debes tener en cuenta que ninguna medida de seguridad es 100% infalible, y aunque tomamos todas las precauciones posibles, no podemos garantizar la seguridad absoluta de tu información.
          </p>
        </section>

        <section>
          <h2>4. Compartir Tu Información</h2>
          <p>
            No vendemos ni alquilamos tu información personal a terceros. Sin embargo, podemos compartir tu información con:
          </p>
          <ul>
            <li><strong>Proveedores de Servicios:</strong> Con empresas que nos ayudan a operar nuestros servicios, como proveedores de almacenamiento de datos o servicios de correo electrónico.</li>
            <li><strong>Requerimientos Legales:</strong> Si estamos obligados por ley o por un proceso judicial a divulgar tu información.</li>
          </ul>
        </section>

        <section>
          <h2>5. Tus Derechos</h2>
          <p>
            Tienes ciertos derechos sobre tu información personal, entre ellos:
          </p>
          <ul>
            <li><strong>Acceso:</strong> Puedes solicitar acceso a la información que hemos recopilado sobre ti.</li>
            <li><strong>Corrección:</strong> Puedes solicitar la corrección de cualquier información incorrecta o incompleta.</li>
            <li><strong>Eliminación:</strong> Puedes solicitar la eliminación de tus datos personales, sujeto a ciertos requisitos legales.</li>
            <li><strong>Optar por No Recibir Comunicaciones:</strong> Puedes optar por no recibir correos electrónicos de marketing o comunicaciones promocionales.</li>
          </ul>
        </section>

        <section>
          <h2>6. Cambios en esta Política</h2>
          <p>
            Podemos actualizar nuestra política de privacidad en cualquier momento. Cuando lo hagamos, publicaremos la versión actualizada en este sitio web. Te recomendamos que revises esta política periódicamente para mantenerte informado sobre cómo estamos protegiendo tu información.
          </p>
        </section>

        <section>
          <h2>7. Aceptación de las Políticas</h2>
          <p>
            Al utilizar nuestros servicios, aceptas las políticas descritas en este documento. Si no estás de acuerdo con alguna de las condiciones, te recomendamos que no utilices nuestros servicios.
          </p>
        </section>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={accepted}
                onChange={() => setAccepted(!accepted)}
              />
              He leído y acepto las <a href="/politicas-de-privacidad" target="_blank" rel="noopener noreferrer">Políticas de Privacidad</a>
            </label>
          </div>

          <button type="submit" disabled={!accepted}>
            Aceptar y Continuar
          </button>
        </form>
      </div>
    </main>
  );
}

export default PoliticasPrivacidad;
