import React, { useState, useEffect } from 'react';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css'; // Estilos de iziToast
import { useNavigate } from 'react-router-dom';
import { eliminarTarea, obtenerTareas, crearTarea, editarTarea } from '../Services/CreateTasks';

function CrearTareas() {
    // Aqui se guardan las tareas y lo que escribe el usuario
    const [tareas, setTareas] = useState([]);
    const [newTarea, setNewTarea] = useState('');
    const [editTarea, setEditTarea] = useState({ id: null, title: '' });
    const navigate = useNavigate();

    // Funcion para cargar las tareas desde el backend
    const cargarTareas = async () => {
        try {
            const tareasObtenidas = await obtenerTareas();
            setTareas(tareasObtenidas); // Guardamos las tareas en el estado
        } catch (err) {
            // Si algo sale mal, mostramos un mensaje bonito
            iziToast.error({
                title: 'Error',
                message: 'Hubo un problema al cargar las tareas.',
                position: 'topRight',
            });
        }
    };

    // Funcion para crear una nueva tarea
    const handleCrearTarea = async () => {
        if (!newTarea.trim()) {
            // Si el campo esta vacio, avisamos que lo llenen
            iziToast.error({
                title: 'Error',
                message: 'No se puede crear una tarea vacia.',
                position: 'topRight',
            });
            return;
        }

        try {
            // Mandamos a crear la tarea
            const tareaCreada = await crearTarea(newTarea);
            const nuevasTareas = [...tareas, tareaCreada]; // Agregamos la nueva tarea
            setTareas(nuevasTareas); // Actualizamos el estado
            setNewTarea(''); // Limpiamos el input
            iziToast.success({
                title: 'Listo!',
                message: 'Tarea creada exitosamente.',
                position: 'topRight',
            });
        } catch (err) {
            iziToast.error({
                title: 'Error',
                message: 'Hubo un problema al crear la tarea.',
                position: 'topRight',
            });
        }
    };

    // Funcion para editar una tarea
    const handleEditarTarea = async () => {
        if (!editTarea.title.trim()) {
            // Si el titulo esta vacio, mostramos error
            iziToast.error({
                title: 'Error',
                message: 'El titulo de la tarea no puede estar vacio.',
                position: 'topRight',
            });
            return;
        }

        try {
            const tareaEditada = await editarTarea(editTarea.id, editTarea.title);

            // Actualizamos la tarea en la lista
            const tareasActualizadas = tareas.map((tarea) => {
                if (tarea.id === tareaEditada.id) {
                    return tareaEditada; // Reemplazamos la tarea editada
                }
                return tarea; // Dejamos el resto igual
            });

            setTareas(tareasActualizadas);
            setEditTarea({ id: null, title: '' }); // Limpiamos el formulario de edicion
            iziToast.success({
                title: 'Listo!',
                message: 'Tarea editada exitosamente.',
                position: 'topRight',
            });
        } catch (err) {
            iziToast.error({
                title: 'Error',
                message: 'No se pudo editar la tarea.',
                position: 'topRight',
            });
        }
    };

    // Funcion para eliminar una tarea
    const handleEliminarTarea = async (id) => {
        try {
            await eliminarTarea(id); // Mandamos a eliminar
            const tareasRestantes = tareas.filter((tarea) => {
                if (tarea.id !== id) {
                    return true; // Dejamos las tareas que no fueron eliminadas
                }
                return false; // Eliminamos esta tarea
            });
            setTareas(tareasRestantes); // Actualizamos el estado
            iziToast.success({
                title: 'Chao!',
                message: 'Tarea eliminada exitosamente.',
                position: 'topRight',
            });
        } catch (err) {
            iziToast.error({
                title: 'Error',
                message: 'No se pudo eliminar la tarea.',
                position: 'topRight',
            });
        }
    };

    // Esto se ejecuta al principio, cuando el componente se carga
    useEffect(() => {
        cargarTareas();
    }, []);

    return (
        <div>
            <h2>Gestor de Tareas</h2>
            {/* Input para escribir nuevas tareas */}
            <input
                type="text"
                placeholder="Escribe una nueva tarea aqui"
                value={newTarea}
                onChange={(e) => setNewTarea(e.target.value)}
            />
            <button onClick={handleCrearTarea}>Crear tarea</button>

            {/* Lista de tareas */}
            <ul>
                {tareas.map((tarea) => (
                    <li key={tarea.id}>
                        {tarea.title}
                        <button onClick={() => setEditTarea({ id: tarea.id, title: tarea.title })}>
                            Editar
                        </button>
                        <button onClick={() => handleEliminarTarea(tarea.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            {/* Formulario para editar tareas */}
            {editTarea.id && (
                <div>
                    <input
                        type="text"
                        value={editTarea.title}
                        onChange={(e) => setEditTarea({ ...editTarea, title: e.target.value })}
                    />
                    <button onClick={handleEditarTarea}>Guardar cambios</button>
                </div>
            )}
        </div>
    );
}

export default CrearTareas;
