const AssignmentService = {
    async getAssignments() {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://127.0.0.1:8000/assignments/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener las asignaciones.');
        }

        return response.json();
    },

    async createAssignment(orderId, driverId) {
        const token = localStorage.getItem('authToken');


        console.log(orderId, driverId);

        const data={
                assigned_to:driverId,
                order:orderId 
            }
    
        
        
        const response = await fetch('http://127.0.0.1:8000/assignments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error al crear la asignación.');
        }

        return response.json();
    },

    async updateAssignment(id, updatedData) {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://127.0.0.1:8000/assignments/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la asignación.');
        }

        return response.json();
    },

    async deleteAssignment(id) {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://127.0.0.1:8000/assignments/${id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la asignación.');
        }

        return { message: 'Asignación eliminada correctamente.' };
    }
};

export default AssignmentService;
