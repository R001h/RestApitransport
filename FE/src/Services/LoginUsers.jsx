// Login de Usuarios
async function LoginUsers(username, password) {
    const usuario = {
        username,
        password,
    };


    console.log(usuario);
    

    try {
        const response = await fetch('http://127.0.0.1:8000/token/', { // IP
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });

        if (!response.ok) {
            throw new Error('Error fetching users');
        }

        const users = await response.json();
        console.log(users);
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

// Crear un nuevo usuario
async function CreateUser(username, password, email) {
    const newUser = {
        username,
        password,
        email,
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            throw new Error('Error creating user');
        }

        const createdUser = await response.json();
        console.log('User created:', createdUser);
        return createdUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

// Obtener todos los usuarios
async function GetUsers() {
    try {
        const response = await fetch('http://127.0.0.1:8000/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching users');
        }

        const users = await response.json();
        console.log('Fetched users:', users);
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

// Actualizar un usuario
async function UpdateUser(userId, updatedData) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/users/${userId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Error updating user');
        }

        const updatedUser = await response.json();
        console.log('User updated:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

// Eliminar un usuario
async function DeleteUser(userId) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/users/${userId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error deleting user');
        }

        console.log(`User with ID ${userId} deleted successfully`);
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export { LoginUsers, CreateUser, GetUsers, UpdateUser, DeleteUser };
