import React, { useState, useEffect } from 'react';
import '../Style/TiendaGaleria.css';
import GetMateriales from '../Services/GetMateriales';

function TiendaGaleria() {
  // Estados para almacenar los materiales y manejar errores
  const [Materiales, setMateriales] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  // Función para obtener los materiales y cargarlos en la pantalla
  const fetchMateriales = async () => {
    try {
      const data = await GetMateriales();
      setMateriales(data);
    } catch (error) {
      setError('Error al obtener materiales.');
    }
  };

  // Obtener los materiales cuando se carga el componente
  useEffect(() => {
    fetchMateriales();
  }, []);

  // Función para actualizar el término de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar materiales según el término de búsqueda
  const filteredMateriales = Materiales.filter((material) =>
    material.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Campo de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar material..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Mostrar la lista de materiales */}
      <div className="materiales-container">
        <h2>Lista de viajes</h2>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          filteredMateriales.length > 0 ? (
            <div className="materiales-list">
              {filteredMateriales.map((material, index) => (
                <div key={index} className="material-card">
                  <img src={material.Img} alt={material.Nombre} style={{ width: '200px' }} className="material-img" />
                  <h3>{material.Nombre}</h3>
                  <p>{material.Descripcion}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No se encontraron Viajes </p>
          )
        )}
      </div>
    </div>
  );
}

export default TiendaGaleria;
