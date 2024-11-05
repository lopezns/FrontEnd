import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const TeacherDashboard = () => {
    const [activeTable, setActiveTable] = useState('user');
    const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
    const [laboratories, setLaboratories] = useState([]); // Estado para almacenar los laboratorios
    const [matchData, setMatchData] = useState([]); // Estado para almacenar los datos de matches
    const [loading, setLoading] = useState(true); // Estado para manejar la carga

    // Efecto para obtener los usuarios y laboratorios al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, laboratoriesResponse, matchResponse] = await Promise.all([
                    axios.get('https://electronicspace.somee.com/api/User_', {
                        headers: { accept: 'text/plain' }
                    }),
                    axios.get('https://electronicspace.somee.com/api/Laboratory_', {
                        headers: { accept: 'text/plain' }
                    }),
                    axios.get(`https://electronicspace.somee.com/api/Match_?email=${localStorage.getItem('userEmail')}`)
                ]);
                
                setUsers(usersResponse.data); // Almacenar los datos de usuarios en el estado
                setLaboratories(laboratoriesResponse.data); // Almacenar los datos de laboratorios en el estado
                setMatchData(matchResponse.data); // Almacenar los datos de matches en el estado
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Cambiar el estado de carga a falso una vez que se completa la carga
            }
        };

        fetchData(); // Llamada a la función para obtener datos
    }, []); // El array vacío asegura que solo se ejecute al montar el componente

    // Calcular el total de estudiantes y profesores
    const totalStudents = users.filter(user => user.user_Type && user.user_Type.userType === 'Student').length;
    const totalTeachers = users.filter(user => user.user_Type && user.user_Type.userType === 'Teacher').length;

    // Calcular los puntajes actuales y los días de juego
    const scores = matchData.map(match => match.currentScore);
    const daysPlaying = matchData.map(match => {
        const startDate = new Date(match.startDate);
        const currentDate = new Date();
        const differenceInTime = currentDate - startDate;
        return Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
    });
    const userNames = matchData.map(match => `${match.user.first_Name} ${match.user.last_Name}`);

    // Configuración del gráfico de puntajes
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

    // Configuración del gráfico de días jugando
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

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <>
            {/* USER */}
            {activeTable === 'user' && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
                    <div style={{ textAlign: 'center' }}>
                        {loading ? ( // Muestra el mensaje de carga si está cargando
                            <h3>Cargando...</h3>
                        ) : (
                            <>
                                {/* Gráfico de distribución de usuarios */}
                                <h3>Distribución de Usuarios:</h3>
                                <div style={{ width: '400px', height: '300px' }}>
                                    <Bar data={{
                                        labels: ['Estudiantes', 'Profesores'],
                                        datasets: [
                                            {
                                                label: 'Cantidad de Usuarios',
                                                data: [totalStudents, totalTeachers],
                                                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                                                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }} options={options} />
                                </div>

                                {/* Gráfico de puntajes actuales */}
                                <h3>Comparación de Puntajes Actuales:</h3>
                                <div style={{ width: '600px', height: '400px' }}>
                                    <Bar data={scoreData} options={{ responsive: true }} />
                                </div>

                                {/* Gráfico de días jugando */}
                                <h3>Días Jugando Desde el Inicio:</h3>
                                <div style={{ width: '600px', height: '400px' }}>
                                    <Bar data={daysData} options={{ responsive: true }} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default TeacherDashboard;
