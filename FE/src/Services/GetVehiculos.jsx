// VehiculosService.js

// Obtener todos los vehículos
async function GetVehicles() {
    try {
        const token = localStorage.getItem('authToken'); 
        const response = await fetch('http://192.168.1.81:8000/vehicle/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching vehicles');
        }

        const vehicles = await response.json();
        console.log('Fetched vehicles:', vehicles);
        return vehicles;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
}

// Crear un nuevo vehículo
async function CreateVehicle(vehicleData) {
    try {
        const token = localStorage.getItem('authToken'); 
        const response = await fetch('http://192.168.1.81:8000/vehicle/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehicleData),
        });

        if (!response.ok) {
            throw new Error('Error creating vehicle');
        }

        const createdVehicle = await response.json();
        console.log('Vehicle created:', createdVehicle);
        return createdVehicle;
    } catch (error) {
        console.error('Error creating vehicle:', error);
        throw error;
    }
}

// Actualizar un vehículo
async function UpdateVehicle(vehicleId, updatedData) {
    try {
        const response = await fetch(`http://192.168.1.81:8000/vehicle/${vehicleId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Error updating vehicle');
        }

        const updatedVehicle = await response.json();
        console.log('Vehicle updated:', updatedVehicle);
        return updatedVehicle;
    } catch (error) {
        console.error('Error updating vehicle:', error);
        throw error;
    }
}

// Eliminar un vehículo
async function DeleteVehicle(vehicleId) {
    try {
        const response = await fetch(`http://192.168.1.81:8000/vehicle/${vehicleId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error deleting vehicle');
        }

        console.log(`Vehicle with ID ${vehicleId} deleted successfully`);
        return true;
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        throw error;
    }
}

export { GetVehicles, CreateVehicle, UpdateVehicle, DeleteVehicle };
