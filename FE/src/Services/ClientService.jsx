async function GetClients() {
    try {
        const token = localStorage.getItem('authToken'); 
        const response = await fetch('http://127.0.0.1:8000/clients/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching clients');
        }

        const drivers = await response.json();
        console.log('Fetched drivers:', clients);
        return clients;
    } catch (error) {
        console.error('Error fetching drivers:', error);
        throw error;
    }
}

export { GetClients };
