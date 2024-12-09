import React, { useEffect, useState } from 'react';
import { GetDrivers } from '../Services/DriverService';

function DriverSelect({ onSelectDriver }) {
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const driverData = await GetDrivers();
                setDrivers(driverData);
            } catch (err) {
                setError('Error al obtener los drivers');
            }
        };

        fetchDrivers();
    }, []);

    const handleDriverChange = (e) => {
        const selectedId = e.target.value;
        setSelectedDriver(selectedId);
        onSelectDriver(selectedId); // Pasar el ID del driver seleccionado al componente padre
    };

    return (
        <div>
            <h3>Selecciona un Driver</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <select value={selectedDriver} onChange={handleDriverChange}>
                <option value="">Selecciona un Driver</option>
                {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                        {driver.username}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DriverSelect;
