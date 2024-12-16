// ClientService.js
async function GetClients() {
    try {
        const token = localStorage.getItem('authToken'); // Obtener token del localStorage
        const response = await fetch('http://127.0.0.1:8000/clients/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar token a los headers
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching clients');
        }

        const clients = await response.json(); // Obtener los datos de clientes
        console.log('Fetched clients:', clients); // Loguear los clientes
        return clients; // Devolver los clientes
    } catch (error) {
        console.error('Error fetching clients:', error); // Manejo de errores
        throw error; // Lanza el error para que sea capturado por quien llame la función
    }
}

export { GetClients }; // Exportar la función
