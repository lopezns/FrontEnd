import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ role, onLogout }) => {
    return (
        <div className="sidebar">
            <div className="logo">LOGO</div>
            <nav>
                {role === 'student' && (
                    <>
                        <Link to="/student">Inicio Estudiante</Link>
                    </>
                )}
                {role === 'teacher' && (
                    <>
                        <Link to="/teacher">Inicio Profesor</Link>
                    </>
                )}
                {role === 'admin' && (
                    <>
                        <Link to="/admin">Inicio Admin</Link>
                    </>
                )}
                <Link to="/settings">Settings</Link>
                <button onClick={onLogout}>Logout</button>
            </nav>
        </div>
    );
};

export default Sidebar;

