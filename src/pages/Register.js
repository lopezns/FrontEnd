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
        confirmPassword: '',
        role: 'student',
        termsAccepted: false
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        number: false,
        upperCase: false,
        specialChar: false
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        // Actualizar requisitos de contraseña en tiempo real
        if (name === 'password') {
            setPasswordRequirements({
                length: value.length >= 8,
                number: /\d/.test(value),
                upperCase: /[A-Z]/.test(value),
                specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value)
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Limpiar mensajes de error previos

        // Validaciones de contraseña
        if (!passwordRequirements.length || !passwordRequirements.number || !passwordRequirements.upperCase || !passwordRequirements.specialChar) {
            setErrorMessage('Por favor, asegúrate de que la contraseña cumpla con todos los requisitos.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden. Por favor, verifica que ambas contraseñas sean idénticas.');
            return;
        }

        // Validación de aceptación de términos
        if (!formData.termsAccepted) {
            setErrorMessage('Debes aceptar los términos y condiciones para continuar. Por favor, marca la casilla de aceptación.');
            return;
        }

        const userTypeID = formData.role === 'teacher' ? 2 : 3;

        try {
            const url = `https://electronicspace.somee.com/api/User_?First_Name=${encodeURIComponent(formData.firstName)}&Last_Name=${encodeURIComponent(formData.lastName)}&Email=${encodeURIComponent(formData.email)}&Password=${encodeURIComponent(formData.password)}&User_Type_ID=${userTypeID}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Accept': 'text/plain' }
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const errorData = await response.text();
                setErrorMessage(`Error en el registro: ${errorData}`);
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
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar Contraseña"
                        required
                        onChange={handleChange}
                    />
                    <select name="role" onChange={handleChange}>
                        <option value="student">Estudiante</option>
                        <option value="teacher">Profesor</option>
                    </select>
                    <div className="password-requirements">
                        <h4>Requisitos de la Contraseña:</h4>
                        <ul>
                            <li style={{ textDecoration: passwordRequirements.length ? 'line-through' : 'none' }}>
                                La contraseña debe tener al menos 8 caracteres.
                            </li>
                            <li style={{ textDecoration: passwordRequirements.number ? 'line-through' : 'none' }}>
                                Incluir al menos un número.
                            </li>
                            <li style={{ textDecoration: passwordRequirements.upperCase ? 'line-through' : 'none' }}>
                                Incluir al menos una letra mayúscula.
                            </li>
                            <li style={{ textDecoration: passwordRequirements.specialChar ? 'line-through' : 'none' }}>
                                Incluir al menos un carácter especial.
                            </li>
                        </ul>
                    </div>
                    <div className="terms">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            required
                        />
                        <label>
                            Acepto los <a href="https://globalt4e.com/politicas-de-seguridad-en-un-sistema-sgsi/" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a> y las <a href="https://www.normaiso27001.es/a5-politicas-de-seguridad-de-la-informacion/" target="_blank" rel="noopener noreferrer">Políticas de Seguridad</a>.
                        </label>
                    </div>
                    <button type="submit">Registrar</button>
                </form>
                <p>¿Ya tienes cuenta? <a href="/login">Iniciar Sesión</a></p>
            </div>
            <div className="auth-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        </div>
    );
};

export default Register;

