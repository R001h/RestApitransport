// RegisterUsers.jsx
async function RegisterUsers(username, firstName, lastName, email, password,password_confirm,) {
    const role = "client"
    
    const newUser = {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirm,
        role
        
    };


    console.log(newUser);
    

    try {
        const token = localStorage.getItem('authToken'); 
        const response = await fetch('http://127.0.0.1:8000/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            throw new Error('Error al crear usuario');
        }

        const createdUser = await response.json();
        console.log('Usuario creado:', createdUser);
        return createdUser;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
}

export default RegisterUsers;