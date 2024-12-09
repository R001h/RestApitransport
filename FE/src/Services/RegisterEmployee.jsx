async function RegisterEmployee(username, firstName, lastName, email, password, password_confirm, role) {
    const newUser = {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirm,
        role,
    };

    console.log('Usuario enviado:', newUser);

    try {
        const response = await fetch('http://127.0.0.1:8000/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error en el servidor:', errorData);
            throw new Error(errorData.detail || 'Error al crear usuario');
        }

        const createdUser = await response.json();
        console.log('Usuario creado:', createdUser);
        return createdUser;
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error;
    }
}

export default RegisterEmployee;
