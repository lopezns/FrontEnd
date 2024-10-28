// Footer.js
import React from 'react';
import './Footer.css'; 
import logoU from '../assets/LOGOUDEC.png'; // Asegúrate de usar la ruta correcta

const Footer = () => {
    return (
        <footer className="footer">
            <img src={logoU} alt="Logo Universidad" className="logoU" />
            <div className="group-info">
                
  
                <p>Ingeniería de Sistemas y Computaci&oacute;n</p>
                <p>Universidad de Cundinamarca</p>


            </div>
        </footer>
    );
};

export default Footer;
/*
  <p>CADI: Desarrollo de Software Seguro</p>
                <p>----------------------------------------------</p>
                <p>Daniel Alejandro Albarracín Vargas</p>
                <p>Juan Sebastián Garzón Gómez</p>
                <p>Nicolás López Sánchez</p>
                <p>Lina Mariana Pinzón Pinzón</p>
                <p>------------------------------------</p>
                
*/