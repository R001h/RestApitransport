import React, { useState } from 'react';
import '../Style/ClientsList.css';

const FormEmployee = () => {
    // Estado para el formulario
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    // Maneja el cambio de los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            if (response.ok) {
                alert('Usuario creado con éxito');
                setNewUser({ name: '', email: '', password: '', role: '' });
            } else {
                alert('Hubo un error al crear el usuario');
            }
        } catch (error) {
            alert('Error al enviar los datos');
        }
    };

    return (
        <div className="form-container">
            <h1>Registrar Nuevo Empleado</h1>
            <form className="employee-form" onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={newUser.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Correo Electrónico:
                    <input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Contraseña:
                    <input
                        type="password"
                        name="password"
                        value={newUser.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Rol:
                    <select
                        name="role"
                        value={newUser.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un rol</option>
                        <option value="admin">Administrador</option>
                        <option value="employee">Empleado</option>
                        <option value="codriver">Ayudante</option>
                        <option value="driver">Conductor</option>
                    </select>
                </label>
                <button type="submit" className="submit-btn">Registrar Cliente</button>
            </form>
        </div>
    );
};


export default FormEmployee;

