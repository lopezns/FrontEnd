/*
import React, { useState } from 'react';
import './Register.css'; 
import backgroundImage from '../assets/Fondo.jpg'; 


const Register = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'student',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(formData.role);
        // Aqu� manejar el registro, como a una API.
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="Nombre" required onChange={handleChange} />
                    <input type="text" name="lastName" placeholder="Apellido" required onChange={handleChange} />
                    <input type="email" name="email" placeholder="Correo Electronico" required onChange={handleChange} />
                    <input type="password" name="password" placeholder="Contrase&ntilde;a" required onChange={handleChange} />
                    <select name="role" onChange={handleChange}>
                        <option value="student">Estudiante</option>
                        <option value="teacher">Profesor</option>
                    </select>
                    <button type="submit">Registrar</button>
                </form>
                <p>
                    &iquest;Ya tienes cuenta? <a href="/login">Iniciar Sesi&oacute;n</a>
                </p>
            </div>
            <div className="auth-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        </div>
    );
};

export default Register;
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import backgroundImage from '../assets/Fondo.jpg';
import logoP from '../assets/LOGOPROJECT.png';

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

    const [showPopup, setShowPopup] = useState(false); // Estado para controlar el popup
    const [errorMessage, setErrorMessage] = useState('');
    const [nameError, setNameError] = useState(''); // Estado para el mensaje de error de nombre
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        number: false,
        upperCase: false,
        specialChar: false
    });
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Validación para campos de nombre y apellido
        if ((name === 'firstName' || name === 'lastName') && !/^[a-zA-Z\s]*$/.test(value)) {
            setNameError('Solo puedes ingresar letras en este campo.'); // Mensaje de error
            return; // No actualiza el estado si el valor contiene caracteres no permitidos
        } else {
            setNameError(''); // Limpia el mensaje de error si el valor es válido
        }

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
                specialChar: /[!@#$/%^&*(),.?":{}|<>]/.test(value)
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
            const url = https://electronicspace.somee.com/api/User_?First_Name=${encodeURIComponent(formData.firstName)}&Last_Name=${encodeURIComponent(formData.lastName)}&Email=${encodeURIComponent(formData.email)}&Password=${encodeURIComponent(formData.password)}&User_Type_ID=${userTypeID};
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Accept': 'text/plain' }
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const errorData = await response.text();
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
    <img src={logoP} alt="Logo del Proyecto" style={{ width: '50px', height: '50px',marginRight: '20px' }} />

    <h1 style={{ marginTop: '20px' }}>DigiLab Management System</h1>

                </div>
                <h2>Registro</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Nombre"
                    value={formData.firstName}
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    value={formData.lastName}
                    required
                    onChange={handleChange}
                />
                 {nameError && <p className="error-message">{nameError}</p>} {/* Muestra el mensaje de error */}
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
                            Política de Tratamiento de Datos
                        </label>
                        <button type="button" className="policy-button" onClick={() => setShowPopup(true)}>
                            Ver Política
                        </button>
                    </div>
                    <button type="submit">Registrar</button>
                </form>
                <p>¿Ya tienes cuenta? <a href="#" onClick={() => navigate('/login')}>Iniciar Sesión</a></p>
            </div>
            <div className="auth-image" style={{ backgroundImage: url(${backgroundImage}) }}></div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Política de Tratamiento de Datos</h3>
                        <p>
                        Nuestra política de tratamiento de datos define los procedimientos y principios aplicables al manejo, 
                        almacenamiento y protección de la información personal que los usuarios nos proporcionan. Esta política
                         se encuentra alineada con los últimos estándares de la norma ISO 27001:2022, específicamente en lo que
                          respecta a la protección y retención de registros según el Anexo A 5.33, que exige proteger los registros
                           contra manipulaciones, accesos no autorizados y pérdidas. Cumplir con estos lineamientos implica establecer
                            pautas rigurosas para el almacenamiento y eliminación de registros, así como implementar medidas de 
                            seguridad avanzadas, como el control de accesos y la encriptación, para asegurar la confidencialidad e
                            integridad de los datos personales en todas las etapas de su ciclo de vida.

                        La política contempla la clasificación de los datos en función de su sensibilidad y utilidad, incluyendo información 
                        como datos de contacto, documentos de identidad, datos financieros y transacciones, además de cualquier dato
                         requerido para cumplir con requisitos legales y regulatorios específicos. Esto implica mantener un cronograma
                          de retención que establece el tiempo durante el cual cada tipo de dato debe conservarse en función de su
                           utilidad comercial, cumplimiento de regulaciones, o expectativas de clientes y la sociedad. Asimismo,
                            nuestra política establece procesos claros para la disposición segura de los registros una vez finalizado
                             su periodo de retención, lo cual puede incluir la eliminación segura o destrucción física de los mismos.

                        Al aceptar esta política, el usuario autoriza el tratamiento de sus datos bajo estrictas normas de seguridad
                         y privacidad. Esto incluye acciones de recopilación, almacenamiento, uso y, eventualmente, eliminación segura,
                          siempre bajo métodos de protección específicos como la anonimización, tokenización, y el cifrado de datos sensibles.
                           Además, la política prevé una adecuada categorización de datos, abarcando registros de empleados, proveedores,
                            clientes, y cualquier información relevante para la operativa comercial, manteniendo un manejo seguro y accesible
                             de los registros en caso de solicitud por terceros autorizados.

                        Para asegurar una gestión responsable, la política se revisará de manera periódica, al menos una vez al año, y se actualizará 
                        según cambien los requisitos legales, regulatorios y contractuales. La aceptación de esta política implica que los usuarios
                         comprenden y aceptan que sus datos serán manejados de acuerdo con estos estándares de seguridad y responsabilidad, con la
                          posibilidad de solicitar la disposición oportuna y segura de los mismos una vez cumplidos los fines específicos para los
                           que fueron recolectados.


                        </p>
                        <p>
                Para más información de ¿Cuáles son las actualizaciones de la ISO 27001 y cómo cumplirlas?, consulte el siguiente enlace: <a href="https://secureframe.com/blog/iso-27001-2022" target="_blank" rel="noopener noreferrer">ISO 27001:2022 sobre Retención de Datos</a>.
            </p>
            <p>
                Para más información acerca de RGPD e ISO 27001, consulte el siguiente enlace: <a href="https://www.nqa.com/es-co/certification/standards/iso-27001/gdpr-and-iso-27001" target="_blank" rel="noopener noreferrer">ISO 27001:2022 sobre Retención de Datos</a>.
            </p>
                        <button onClick={() => setShowPopup(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
