import React, { useState, useEffect } from 'react';
import './Settings.css'; // Asegúrate de tener un archivo CSS para los estilos

const Settings = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Cargar el tema guardado en localStorage al montar el componente
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.classList.add('dark-mode'); // Aplicar el tema oscuro
        }
    }, []);

    const handleThemeToggle = () => {
        setIsDarkMode((prevMode) => !prevMode);
        if (isDarkMode) {
            localStorage.setItem('theme', 'light');
            document.body.classList.remove('dark-mode'); // Cambia a tema claro
        } else {
            localStorage.setItem('theme', 'dark');
            document.body.classList.add('dark-mode'); // Cambia a tema oscuro
        }
    };

    const handleBack = () => {
        window.history.back(); // Volver a la página anterior
    };

    return (
        <div className="settings-container">
            <h1>Ajustes</h1>
            <div className="theme-toggle">
                <label htmlFor="theme-switch">
                    Modo {isDarkMode ? 'Claro' : 'Oscuro'}
                </label>
                <button id="theme-switch" onClick={handleThemeToggle}>
                    {isDarkMode ? 'Cambiar a Claro' : 'Cambiar a Oscuro'}
                </button>
            </div>
            <button className="back-button" onClick={handleBack}>
                Volver
            </button>
        </div>
    );
};

export default Settings;
