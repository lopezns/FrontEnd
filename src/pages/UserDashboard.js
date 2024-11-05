import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const UserDashboard = () => {
    const [activeTable, setActiveTable] = useState('user');
    const [users, setUsers] = useState([]);
    const [laboratories, setLaboratories] = useState([]); 
    const [loading, setLoading] = useState(true);

  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, laboratoriesResponse] = await Promise.all([
                    axios.get('https://electronicspace.somee.com/api/User_', {
                        headers: { accept: 'text/plain' }
                    }),
                    axios.get('https://electronicspace.somee.com/api/Laboratory_', {
                        headers: { accept: 'text/plain' }
                    })
                ]);
                
                setUsers(usersResponse.data); 
                setLaboratories(laboratoriesResponse.data); 
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData(); 
    }, []); // El array vacío asegura que solo se ejecute al montar el componente

    // Calcular el total de estudiantes y profesores
    const totalStudents = users.filter(user => user.user_Type && user.user_Type.userType === 'Student').length;
    const totalTeachers = users.filter(user => user.user_Type && user.user_Type.userType === 'Teacher').length;

    // Configuración del gráfico
    const data = {
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
                                {/* Gráfico de usuarios */}
                                <h3>Distribución de Usuarios:</h3>
                                <div style={{ width: '400px', height: '300px' }}> {/* Ajusta el tamaño aquí */}
                                    <Bar data={data} options={options} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default UserDashboard;
