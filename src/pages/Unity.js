import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './Unity.css';
import logoP from '../assets/LOGOPROJECT.png'; // Asegúrate de usar la ruta correcta

// Registrar las escalas y elementos necesarios de Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Unity = () => {
    const [matchData, setMatchData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetching match data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://electronicspace.somee.com/api/Match_');
                const data = await response.json();
                setMatchData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching match data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Prepare data for charts
    const scores = matchData.map(match => match.currentScore);
    const daysPlaying = matchData.map(match => {
        const startDate = new Date(match.startDate);
        const currentDate = new Date();
        const differenceInTime = currentDate - startDate;
        const days = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
        return days;
    });
    const userNames = matchData.map(match => ${match.user.first_Name} ${match.user.last_Name});

    // Data for score comparison chart
    const scoreData = {
        labels: userNames,
        datasets: [
            {
                label: 'Current Score',
                data: scores,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Data for days playing chart
    const daysData = {
        labels: userNames,
        datasets: [
            {
                label: 'Days Playing',
                data: daysPlaying,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Function to get level based on current score
    const getLevel = (score) => {
        if (score === 1) return 'Protoboard';
        if (score === 2) return 'Jumpers';
        if (score === 3) return 'Multímetro';
        if (score === 4) return 'Fuente de Poder';
        if (score === 5 || score === 6) return 'LEDs';
        if (score === 7) return 'Resistencias';
        if (score === 8) return 'Capacitores';
        if (score >= 10 && score <= 14) return 'Compuertas Lógicas';
        if (score >= 15 && score <= 20) return 'Modo Libre';
        if (score === 20) return 'Simulador Terminado';
        return 'Nivel Desconocido';
    };

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        // Aquí puedes implementar la lógica para cerrar sesión
        console.log('Cerrar sesión');
    };

    return (
        <div className="unity-container">
            <header className="header">
                <img src={logoP} alt="Logo Proyecto" className="logoP" />
                <h1>DigiLab - Education Simulator</h1>
                <div className="header-buttons">
                    <button onClick={handleLogout}>Cerrar Sesión</button>

                    <button onClick={() => window.history.back()}>Regresar</button> {/* Botón para regresar */}
                </div>
            </header>

            <h2>Match Information</h2>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Match ID</th>
                                <th>User Name</th>
                                <th>Start Date</th>
                                <th>Is Finished</th>
                                <th>Current Score</th>
                                <th>Nivel</th> {/* Nueva columna para nivel */}
                            </tr>
                        </thead>
                        <tbody>
                            {matchData.map((match) => (
                                <tr key={match.match_ID}>
                                    <td>{match.match_ID}</td>
                                    <td>{${match.user.first_Name} ${match.user.last_Name}}</td>
                                    <td>{new Date(match.startDate).toLocaleDateString()}</td>
                                    <td>{match.isFinished ? 'Yes' : 'No'}</td>
                                    <td>{match.currentScore}</td>
                                    <td>{getLevel(match.currentScore)}</td> {/* Mostrar el nivel */}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="chart-container">
                        <div className="chart">
                            <h3>Current Score Comparison</h3>
                            <Bar data={scoreData} options={{ responsive: true }} />
                        </div>
                        <div className="chart">
                            <h3>Days Playing Since Start</h3>
                            <Line data={daysData} options={{ responsive: true }} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Unity;
