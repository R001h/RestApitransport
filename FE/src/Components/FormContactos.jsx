import React, { useRef } from 'react'; // Importamos React y el hook useRef de React.
import emailjs from '@emailjs/browser'; // Importamos la biblioteca emailjs para enviar correos electrónicos.
import '../Style/FormContactos.css'; // Importamos los estilos CSS específicos para el formulario de contacto.

export const FormContactos = () => {
  
  const form = useRef(); // useRef nos permite crear una referencia al formulario que luego usaremos para obtener sus datos.

  // Función que se ejecuta cuando el formulario es enviado.
  const sendEmail = (e) => {
    e.preventDefault(); // Prevenimos que el formulario recargue la página al enviarse.

    // Llamada a la función sendForm de emailjs, que envía el formulario a través de un servicio de email.
    emailjs
      .sendForm('service_auzi7vd', 'template_8wp4g3h', form.current, { // Enviamos el formulario usando el servicio 'service_auzi7vd' y la plantilla 'template_8wp4g3h'.
        publicKey: 'EUG0qGMJe5zeYmGAW', // Usamos la clave pública para autenticar la solicitud.
      })
      .then(
        () => {
          console.log('SUCCESS!'); // Si el envío fue exitoso, mostramos un mensaje en la consola.
        },
        (error) => {
          console.log('FAILED...', error.text); // Si ocurre un error, lo mostramos en la consola.
        },
      );
      
  };


  // El JSX que renderiza el formulario de contacto.
  return (


<div className="form-contact-container">
  <div className="form">
    <form>
      <label>Nombre</label>
      <input type="text" name="user_name" className="form-input" placeholder="Ingresa tu nombre" required />
      
      <label>Correo</label>
      <input type="email" name="user_email" className="form-input" placeholder="Ingresa tu correo" required />
      
      <label>Mensaje</label>
      <textarea name="message" className="form-textarea" placeholder="Redacta tu mensaje"></textarea>
      
      <input type="submit" value="Enviar" className="form-submit" />
    </form>
  </div>
  <div className="move">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31435.823233888957!2d-85.67499190727742!3d9.977324235117372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f9e5390861f64b9%3A0xfdc77634e4481c5f!2sProvincia%20de%20Guanacaste%2C%20Nosara!5e0!3m2!1ses-419!2scr!4v1726583662511!5m2!1ses-419!2scr"
      title="Google Map"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>






  

     
    
  

    

    
  );
};

export default FormContactos; // Exportamos el componente para que pueda ser usado en otras partes de la aplicación.
