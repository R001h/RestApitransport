async function GetOrders() {

        const token = localStorage.getItem('authToken');
        const response = await fetch('http://127.0.0.1:8000/order/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener las órdenes.');
        }

        return response.json();
}


export default GetOrders;
