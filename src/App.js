/*
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentHome from './pages/StudentHome';
import TeacherHome from './pages/TeacherHome';
import AdminHome from './pages/AdminHome';
import Settings from './pages/Settings';

const App = () => {
    const [userEmail, setUserEmail] = useState(null);

    const handleLogin = (email) => {
        setUserEmail(email);
    };

    const handleLogout = () => {
        setUserEmail(null);
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/studentHome" element={<StudentHome onLogout={handleLogout} />} />
                <Route path="/teacherHome" element={<TeacherHome onLogout={handleLogout} />} />
                <Route path="/adminHome" element={<AdminHome onLogout={handleLogout} />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;

*/

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentHome from './pages/StudentHome';
import TeacherHome from './pages/TeacherHome';
import AdminHome from './pages/AdminHome';
import Settings from './pages/Settings';
import Unity from './pages/Unity'; // Importa el componente Unity

const App = () => {
    const [userEmail, setUserEmail] = useState(null);

    const handleLogin = (email) => {
        setUserEmail(email);
    };

    const handleLogout = () => {
        setUserEmail(null);
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/studentHome" element={<StudentHome onLogout={handleLogout} />} />
                <Route path="/teacherHome" element={<TeacherHome onLogout={handleLogout} />} />
                <Route path="/adminHome" element={<AdminHome onLogout={handleLogout} />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/unity" element={<Unity />} /> {/* Nueva ruta para Unity */}
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
