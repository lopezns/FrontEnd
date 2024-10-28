/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import backgroundImage from '../assets/Fondo.jpg'; 


const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const users = [
        { email: 'estudiante@example.com', password: 'estudiante123' },
        { email: 'profesor@example.com', password: 'profesor123' },
        { email: 'admin@example.com', password: 'admin123' },
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            onLogin(user.email);
            navigate(`/${user.email.split('@')[0]}Home`);
        } else {
            setErrorMessage('Correo o contraseña incorrectos.');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Iniciar Sesi&oacute;n</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Correo Electr&oacute;nico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contrase&ntilde;a"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Iniciar Sesi&oacute;n</button>
                </form>
                <p>
                    &iquest;    No tienes una cuenta? <span className="register-link" onClick={handleRegisterRedirect}>Reg&iacute;strate aqu&iacute;</span>
                </p>
            </div>
            <div className="auth-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>

        </div>
    );
};

export default Login;
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../assets/Fondo.jpg'; 

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Hacer la solicitud de inicio de sesión
            const loginResponse = await axios.post(`https://electronicspace.somee.com/api/User_/login`, null, {
                params: {
                    Email: email,
                    Password: password
                },
                headers: { 
                    'Content-Type': 'application/json' 
                }
            });

            console.log("Respuesta de inicio de sesión:", loginResponse.data);
            if (loginResponse.data.message === 'Login successful') {
                // Si el inicio de sesión es exitoso, solicitar detalles del usuario
                const userResponse = await axios.get(`https://electronicspace.somee.com/api/User_`, {
                    headers: { accept: 'text/plain' }
                });

                console.log("Respuesta de usuarios:", userResponse.data);

                const users = userResponse.data;

                // Buscar el usuario en la respuesta según el correo ingresado
                const user = users.find(u => u.email === email);

                console.log("Usuario encontrado:", user);
                
                if (user) {
                    // Acceder al user_Type_ID
                    const userTypeId = user.user_Type.user_Type_ID; // Accedemos a user_Type_ID

                    // Redirigir según el tipo de usuario
                    switch (userTypeId) {
                        case 3: // Estudiante
                            navigate('/StudentHome');
                            break;
                        case 2: // Teacher
                            navigate('/TeacherHome');
                            break;
                        case 1: // Admin
                            navigate('/AdminHome');
                            break;
                        default:
                            setErrorMessage('Rol de usuario no reconocido.');
                            return;
                    }

                    onLogin(email); // Registrar el inicio de sesión
                } else {
                    setErrorMessage('Usuario no encontrado.');
                }
            } else {
                setErrorMessage('Correo o contraseña incorrectos.');
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setErrorMessage('Hubo un problema al verificar las credenciales. Inténtalo de nuevo más tarde.');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Iniciar Sesión</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Iniciar Sesión</button>
                </form>
                <p>
                    ¿No tienes una cuenta? <span className="register-link" onClick={handleRegisterRedirect}>Regístrate aquí</span>
                </p>
            </div>
            <div className="auth-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        </div>
    );
};

export default Login;
