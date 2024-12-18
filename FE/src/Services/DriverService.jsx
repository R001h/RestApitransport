async function GetDrivers() {
    try {
        const token = localStorage.getItem('authToken'); 
        const response = await fetch('http://127.0.0.1:8000/drivers/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching drivers');
        }

        const drivers = await response.json();
        console.log('Fetched drivers:', drivers);
        return drivers;
    } catch (error) {
        console.error('Error fetching drivers:', error);
        throw error;
    }
}

export { GetDrivers };
