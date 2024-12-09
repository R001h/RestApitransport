import React, { useState } from 'react';
import '../Style/FormRegister.css';
import { useNavigate } from 'react-router-dom';
import RegisterUsers from '../Services/RegisterUsers';
import iziToast from 'izitoast'; // Importamos iziToast para mostrar alertas con estilo.
import 'izitoast/dist/css/iziToast.min.css'; // Importamos el CSS de iziToast.

function FormRegister() {
    const [formData, setFormData] = useState({
        Username: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async () => {
        if (formData.Password !== formData.ConfirmPassword) {
            iziToast.error({
                title: 'Error',
                message: 'Las contraseñas no coinciden. Por favor, verifique.',
                position: 'topRight',
            });
            return;
        }

        try {
            // Llamamos al servicio para crear el usuario
            await RegisterUsers(
                formData.Username,
                formData.FirstName,
                formData.LastName,
                formData.Email,
                formData.Password,
                formData.ConfirmPassword
            );

            iziToast.success({
                title: 'Éxito',
                message: 'Usuario registrado correctamente.',
                position: 'topRight',
            });

            navigate('/login'); // Redirige al login después de registrar
        } catch (error) {
            console.error('Error durante el registro:', error);
            iziToast.error({
                title: 'Error',
                message: 'Hubo un problema al registrar el usuario. Intente nuevamente.',
                position: 'topRight',
            });
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-title"></h2>
                {/* Campos de formulario */}
                <div className="register-input-container">
                    <label className="register-label">Nombre de Usuario</label>
                    <input
                        className="register-input"
                        type="text"
                        name="Username"
                        value={formData.Username}
                        onChange={handleChange}
                        placeholder="Ingrese su nombre de usuario"
                        required
                    />
                </div>
                <div className="register-input-container">
                    <label className="register-label">Nombre</label>
                    <input
                        className="register-input"
                        type="text"
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handleChange}
                        placeholder="Ingrese su nombre"
                        required
                    />
                </div>
                <div className="register-input-container">
                    <label className="register-label">Apellido</label>
                    <input
                        className="register-input"
                        type="text"
                        name="LastName"
                        value={formData.LastName}
                        onChange={handleChange}
                        placeholder="Ingrese su apellido"
                        required
                    />
                </div>
                <div className="register-input-container">
                    <label className="register-label">Correo Electrónico</label>
                    <input
                        className="register-input"
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        placeholder="Ingrese su correo electrónico"
                        required
                    />
                </div>

                <div className="register-input-container">
                    <label className="register-label">Contraseña</label>
                    <input
                        className="register-input"
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        placeholder="Ingrese su contraseña"
                        required
                    />
                </div>
                <div className="register-input-container">
                    <label className="register-label">Confirmar Contraseña</label>
                    <input
                        className="register-input"
                        type="password"
                        name="ConfirmPassword"
                        value={formData.ConfirmPassword}
                        onChange={handleChange}
                        placeholder="Confirme su contraseña"
                        required
                    />
                </div>
                <div></div>
                <button className="register-button" onClick={handleRegister}>
                    Registrarse
                </button>
            </div>
        </div>
    );
}

export default FormRegister;
