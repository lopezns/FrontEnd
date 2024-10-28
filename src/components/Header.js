import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Asegúrate de tener estilos para el Header

const Header = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleSettingsRedirect = () => {
        navigate('/settings'); // Redirigir a la página de configuraciones
    };



    return (
        <header className="header">
            <h1>Sistema de Gestion de Recursos y Aulas </h1>
            <div className="header-buttons">
                <button onClick={handleSettingsRedirect}>Configuraciones</button>
                <button onClick={onLogout}>Cerrar Sesi&oacute;n</button>
            </div>
        </header>
    );
};

export default Header;

