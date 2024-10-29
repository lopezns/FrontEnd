import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 
import backgroundImage from '../assets/Fondo.jpg'; 

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'student',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userTypeID = formData.role === 'teacher' ? 2 : 3;

    
        try {
            // Construir la URL con los parámetros adecuados
            const url = https://electronicspace.somee.com/api/User_?First_Name=${encodeURIComponent(formData.firstName)}&Last_Name=${encodeURIComponent(formData.lastName)}&Email=${encodeURIComponent(formData.email)}&Password=${encodeURIComponent(formData.password)}&User_Type_ID=${userTypeID};
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'text/plain', // Asegúrate de que este header es necesario
                },
            });
    
            if (response.ok) {
                navigate('/login'); // Redirigir a la página de login
            } else {
                const errorData = await response.text(); // Obtener el mensaje de error
                setErrorMessage(Error en el registro: ${errorData});
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            setErrorMessage('Ocurrió un error inesperado. Inténtalo nuevamente.');
        }
    };
    
    
    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Registro</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Nombre"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Apellido"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo Electrónico"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        required
                        onChange={handleChange}
                    />
                    <select name="role" onChange={handleChange}>
                        <option value="student">Estudiante</option>
                        <option value="teacher">Profesor</option>
                    </select>
                    <button type="submit">Registrar</button>
                </form>
                <p>
                    ¿Ya tienes cuenta? <a href="/login">Iniciar Sesión</a>
                </p>
            </div>
            <div className="auth-image" style={{ backgroundImage: url(${backgroundImage}) }}></div>
        </div>
    );
};

export default Register;
