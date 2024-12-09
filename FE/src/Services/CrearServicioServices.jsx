import AWS from 'aws-sdk';

const API_URL = "http://127.0.0.1:8000/service/";

// Configura AWS S3
const S3_BUCKET = import.meta.env.VITE_AWS_BUCKET_NAME;
const REGION = import.meta.env.VITE_AWS_REGION;

const s3 = new AWS.S3({
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: REGION,
});

// Función para subir una imagen a S3
export const uploadImageToS3 = async (file) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: file.name, 
    Body: file,
    ContentType: file.type,
  };

  return s3.upload(params).promise();
};



// Obtener todos los servicios
export const ObtenerServicios = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener los servicios");
    }


  const data = await response.json();
  console.log('Datos de la API:', data); // Verifica la respuesta
  return data;
   
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    throw error;
  }
};

export const CrearServicio = async (nuevoServicio) => {
  let imagenUrl = '';

  // Subir la imagen a S3 si existe
  if (nuevoServicio.imagen) {
    try {
      const result = await uploadImageToS3(nuevoServicio.imagen);
      imagenUrl = result.Location; // Obtén la URL de la imagen subida
    } catch (error) {
      console.error('Error al subir la imagen a S3:', error);
      throw new Error('No se pudo subir la imagen a S3');
    }
  }

  // Construir el objeto de servicio
  const service = {
    name: nuevoServicio.nombre,
    description: nuevoServicio.descripcion,
    image_url: imagenUrl,
    user: 1  // Asegúrate de pasar el ID correcto del usuario
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(service),
    });
    if (!response.ok) {
      throw new Error('Error al crear el servicio');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al crear el servicio:', error);
    throw error;
  }
};

export const ActualizarServicio = async (id, servicio) => {
  let imagenUrl = servicio.imagen; // Usar la imagen si está presente, o la que ya estaba

  // Subir la imagen a S3 si se ha actualizado
  if (servicio.imagen && typeof servicio.imagen !== 'string') {
    try {
      const result = await uploadImageToS3(servicio.imagen);
      imagenUrl = result.Location; // Obtén la URL de la imagen subida
    } catch (error) {
      console.error('Error al subir la imagen a S3:', error);
      throw new Error('No se pudo subir la imagen a S3');
    }
  }

  // Construir el objeto de servicio actualizado
  const updatedService = {
    name: servicio.nombre,
    description: servicio.descripcion,
    image_url: imagenUrl,  // Mantener la imagen actualizada
    user: 1  // Asegúrate de pasar el ID correcto del usuario
  };

  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedService),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el servicio');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al actualizar el servicio:', error);
    throw error;
  }
};


// Eliminar un servicio

export const EliminarServicio = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
    });

    // Verificamos si la respuesta fue exitosa
    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Detalles del error:", errorDetails);
      throw new Error(`Error al eliminar el servicio: ${response.statusText}`);
    }

    // Manejo específico para respuestas 204 No Content
    if (response.status === 204) {
      console.log("Eliminación exitosa (204 No Content).");
      return { message: "El servicio fue eliminado con éxito" }; // Devuelve un mensaje genérico
    }

    // Si la respuesta tiene contenido, regresarlo como JSON
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar el servicio:", error);
    throw error;
  }
};
