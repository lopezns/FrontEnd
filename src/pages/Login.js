import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../assets/Fondo.jpg';
import logoP from '../assets/LOGOPROJECT.png';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const loginResponse = await axios.post(https://electronicspace.somee.com/api/User_/login, null, {
                params: {
                    Email: email,
                    Password: password
                },
                headers: { 
                    'Content-Type': 'application/json' 
                }
            });

            if (loginResponse.data.message === 'Login successful') {
                const userResponse = await axios.get(https://electronicspace.somee.com/api/User_, {
                    headers: { accept: 'text/plain' }
                });

                const users = userResponse.data;
                const user = users.find(u => u.email === email);

                // Después del switch-case donde se navega según el rol del usuario
                if (user) {
                    const userTypeId = user.user_Type.user_Type_ID;

                    switch (userTypeId) {
                        case 3:
                            navigate('/StudentHome');
                            break;
                        case 2:
                            navigate('/TeacherHome');
                            break;
                        case 1:
                            navigate('/AdminHome');
                            break;
                        default:
                            setErrorMessage('Rol de usuario no reconocido.');
                            return;
                    }

                    // Guardar email en localStorage
                    localStorage.setItem('userEmail', email);

                    onLogin(email);
                } else {
                    setErrorMessage('Usuario no encontrado.');
                }

            } else {
                setErrorMessage('Correo o contraseña incorrectos.');
            }
        } catch (error) {
            setErrorMessage('Hubo un problema al verificar las credenciales. Inténtalo de nuevo más tarde.');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="auth-container">
            <header className="project-header">
    
            </header>
            <div className="auth-form">
                <div className="logo-container">
  
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
    <img src={logoP} alt="Logo del Proyecto" style={{ width: '50px', height: '50px',marginRight: '20px' }} />

    <h1 style={{ marginTop: '20px' }}>DigiLab Management System</h1>

                </div>
                </div>
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
            <div className="auth-image" style={{ backgroundImage: url(${backgroundImage}) }}></div>
        </div>
    );
};

export default Login;
