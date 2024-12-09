import React, { useEffect, useState } from "react";
import '../Style/AdministracionVehiculos.css';
import { GetVehicles, CreateVehicle, UpdateVehicle, DeleteVehicle } from '../Services/GetVehiculos';

function AdministracionVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    vehicle_type: "",
    model: "",
    year: "",
  });
  const [vehiculoEditando, setVehiculoEditando] = useState(null);

  useEffect(() => {
    // Cargar vehículos desde el backend
    GetVehicles()
      .then((data) => setVehiculos(data))
      .catch((error) => console.error("Error cargando vehículos:", error));
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (vehiculoEditando) {
      setVehiculoEditando({ ...vehiculoEditando, [name]: value });
    } else {
      setNuevoVehiculo({ ...nuevoVehiculo, [name]: value });
    }
  };

  const agregarVehiculo = (e) => {
    e.preventDefault();
    CreateVehicle(nuevoVehiculo)
      .then((data) => {
        setVehiculos([...vehiculos, { ...data, nuevo: true }]);
        setNuevoVehiculo({ vehicle_type: "", model: "", year: "" });
        setTimeout(() => {
          setVehiculos((vehiculos) =>
            vehiculos.map((v) => ({ ...v, nuevo: false }))
          );
        }, 2000); // Transición a gris claro después de 2 segundos
      })
      .catch((error) => console.error("Error al agregar vehículo:", error));
  };

  const editarVehiculo = (vehiculo) => {
    setVehiculoEditando(vehiculo);
  };

  const guardarCambios = (e) => {
    e.preventDefault();
    UpdateVehicle(vehiculoEditando.id, vehiculoEditando, "PATCH")
      .then((data) => {
        setVehiculos(
          vehiculos.map((vehiculo) => (vehiculo.id === data.id ? data : vehiculo))
        );
        setVehiculoEditando(null);
      })
      .catch((error) => console.error("Error al actualizar vehículo:", error));
  };

  const cancelarEdicion = () => {
    setVehiculoEditando(null);
  };

  const eliminarVehiculo = (id) => {
    DeleteVehicle(id)
      .then(() => {
        setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id));
      })
      .catch((error) => console.error("Error al eliminar vehículo:", error));
  };

  return (
    <div className="vehiculos-admin-container">
      <h1>Administración de Vehículos</h1>

      {vehiculoEditando ? (
        <form onSubmit={guardarCambios} className="vehiculos-form">
          <h2>Editar Vehículo</h2>
          <input
            type="text"
            name="vehicle_type"
            placeholder="Tipo de Vehículo"
            value={vehiculoEditando.vehicle_type}
            onChange={manejarCambio}
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Modelo"
            value={vehiculoEditando.model}
            onChange={manejarCambio}
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Año"
            value={vehiculoEditando.year}
            onChange={manejarCambio}
            required
          />
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={cancelarEdicion} className="cancel-button">
            Cancelar
          </button>
        </form>
      ) : (
        <form onSubmit={agregarVehiculo} className="vehiculos-form">
          <h2>Agregar Vehículo</h2>
          <input
            type="text"
            name="vehicle_type"
            placeholder="Tipo de Vehículo"
            value={nuevoVehiculo.vehicle_type}
            onChange={manejarCambio}
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Modelo"
            value={nuevoVehiculo.model}
            onChange={manejarCambio}
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Año"
            value={nuevoVehiculo.year}
            onChange={manejarCambio}
            required
          />
          <button type="submit">Agregar Vehículo</button>
        </form>
      )}

      <div className="vehiculos-lista">
        {vehiculos.map((vehiculo) => (
          <div key={vehiculo.id} className={`vehiculo-item ${vehiculo.nuevo ? 'nuevo' : ''}`}>
            <p><strong>Tipo:</strong> {vehiculo.vehicle_type}</p>
            <p><strong>Modelo:</strong> {vehiculo.model}</p>
            <p><strong>Año:</strong> {vehiculo.year}</p>
            <button onClick={() => editarVehiculo(vehiculo)}>Editar</button>
            <button onClick={() => eliminarVehiculo(vehiculo.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdministracionVehiculos;
