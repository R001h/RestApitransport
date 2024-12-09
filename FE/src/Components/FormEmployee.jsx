import React, { useState } from 'react';
import iziToast from 'izitoast'; // Importamos iziToast para mostrar alertas con estilo.
import 'izitoast/dist/css/iziToast.min.css'; // Importamos el CSS de iziToast.
import '../Style/ClientsList.css';
import RegisterEmployee from '../Services/RegisterEmployee'; // Ajustar ruta si es necesario

const FormEmployee = () => {
    const [newUser, setNewUser] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: '',
        role: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newUser.password !== newUser.password_confirm) {
            iziToast.error({
                title: 'Error',
                message: 'Las contraseñas no coinciden.',
                position: 'topRight',
            });
            return;
        }

        try {
            await RegisterEmployee(
                newUser.username,
                newUser.first_name,
                newUser.last_name,
                newUser.email,
                newUser.password,
                newUser.password_confirm,
                newUser.role,
            );

            iziToast.success({
                title: 'Éxito',
                message: 'Usuario registrado correctamente.',
                position: 'topRight',
            });

            setNewUser({
                username: '',
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirm: '',
                role: '',
            });
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: 'Hubo un problema al registrar el usuario. Intente nuevamente.',
                position: 'topRight',
            });
        }
    };

    return (
        <div className="form-container">
            <h1>Registrar Nuevo Usuario</h1>
            <form className="employee-form" onSubmit={handleSubmit}>
                <label>
                    Nombre de Usuario:
                    <input
                        type="text"
                        name="username"
                        value={newUser.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="first_name"
                        value={newUser.first_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Apellido:
                    <input
                        type="text"
                        name="last_name"
                        value={newUser.last_name}
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
                    Confirmar Contraseña:
                    <input
                        type="password"
                        name="password_confirm"
                        value={newUser.password_confirm}
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
                        <option value="employee">Empleado</option>
                        <option value="driver">Conductor</option>
                        <option value="codriver">Ayudante</option>
                    </select>
                </label>
                <button type="submit" className="submit-btn">
                    Registrar Usuario
                </button>
            </form>
        </div>
    );
};

export default FormEmployee;
