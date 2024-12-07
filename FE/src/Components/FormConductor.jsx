import React, { useState } from 'react';
import '../Style/FormAdmin.css';

function FormConductor() {
  return (
    <div>

      <AsignarTarea />
    </div>
  );
}

function AsignarTarea() {
  const [servicio, setServicio] = useState('Fletes');
  const [descripcion, setDescripcion] = useState('');
  const [conductor, setConductor] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [prioridad, setPrioridad] = useState('Media');

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log('Tarea Asignada:', { servicio, descripcion, conductor, fechaLimite, prioridad });
    alert('¡Tarea asignada con éxito!');
    setServicio('Fletes');
    setDescripcion('');
    setConductor('');
    setFechaLimite('');
    setPrioridad('Media');
  };

  return (
    <div className="contenedor-tarea">
      <h2 className="encabezado-tarea">Asignar Tarea a un Conductor</h2>
      <form className="formulario-tarea" onSubmit={manejarEnvio}>
        <div className="grupo-formulario">
          <label>Servicios:</label>
          <select
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
            required
          >
            <option value="Fletes">Fletes</option>
            <option value="Mudanzas">Mudanzas</option>
            <option value="Almacenamiento">Almacenamiento</option>
          </select>
        </div>

        <div className="grupo-formulario">
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            placeholder="Describe los detalles del servicio"
          />
        </div>

        <div className="grupo-formulario">
          <label>Asignar a Conductor:</label>
          <input
            type="text"
            value={conductor}
            onChange={(e) => setConductor(e.target.value)}
            required
          />
        </div>

        <div className="grupo-formulario">
          <label>Fecha Límite:</label>
          <input
            type="date"
            value={fechaLimite}
            onChange={(e) => setFechaLimite(e.target.value)}
            required
          />
        </div>

        <div className="grupo-formulario">
          <label>Prioridad:</label>
          <select
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
            required
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        <button type="submit" className="boton-tarea">Asignar Tarea</button>
      </form>
    </div>
  );
}

export default FormConductor;
