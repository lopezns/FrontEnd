import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './StudentHome.css'; // Asegúrate de que este archivo contenga los estilos correctos
import logoP from '../assets/LOGOPROJECT.png'; // Asegúrate de usar la ruta correcta

import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import TeacherDashboard from './TeacherDashboard';


const StudentHome = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeTable, setActiveTable] = useState(null); // Solo una tabla activa
// GET STATUS EQUIPMENT
const [status, setstatus] = useState([]);

const [StatusEquipment, setStatusEquipment] = useState([]);
const [StatusReservation, setStatusReservation] = useState([]);
const [editingEquipmentId, setEditingEquipmentId] = useState(null);


// GET STATUS RESERVATION
const handleOpenEditPopup = (lab) => {
    setEditingLaboratoryId(lab.laboratory_ID);       // ID del laboratorio a editar
    setEditingLaboratoryNum(lab.laboratory_Num);      // Número del laboratorio
    setEditingCapacity(lab.capacity);                 // Capacidad del laboratorio
    setShowEditPopup(true);                           // Muestra el modal de edición
};



//ACA ESTA
const handleOpenEditUserPopup = (user) => {
    if (user) {
        setUserToEdit(user); // Guardamos el usuario que vamos a editar

        // Configuración de cada campo con los nombres exactos del objeto
        setfirstName(user.First_Name || ''); 
        setlastName(user.Last_Name || '');
        setemail(user.Email || '');
        setpassword(''); // Deja el campo de contraseña vacío para la edición
        setuserTypeID(user.User_Type_ID || '');

        setShowEditUserPopup(true); // Muestra el modal de edición
    } else {
        console.error("No se encontró el usuario a editar.");
    }
};



const handleOpenEditStatusReservationPopup = () => {
    // Lógica para abrir el modal de edición
};



const [editingStatusReservationId, setEditingStatusReservationId] = useState(null);
const [editingStatusReservation, setEditingStatusReservation] = useState('');

const handleCloseEditStatusReservationPopup = () => {
    setEditingStatusReservationId(null);
    setEditingStatusReservation('');
};

const [showStudentPopup, setShowStudentPopup] = useState(false);
    const [showLabPopup, setShowLabPopup] = useState(false);

    const handleOpenStudentPopup = () => {
        setShowStudentPopup(true);
        setShowLabPopup(false); // Cierra el otro popup si está abierto
    };

    const handleOpenLabPopup = () => {
        setShowLabPopup(true);
        setShowStudentPopup(false); // Cierra el otro popup si está abierto
    };

    const handleClosePopupE = () => {
        setShowStudentPopup(false);
        setShowLabPopup(false);
    };


const [equipmentToDelete, setEquipmentToDelete] = useState(null); // Añadir esto


const [editingReservationId, setEditingReservationId] = useState(null);
const [editingUserId, setEditingUserId] = useState('');

const [editingReservationEquipments, setEditingReservationEquipments] = useState('');
const [editingReservationDate, setEditingReservationDate] = useState('');
const [editingStartTime, setEditingStartTime] = useState('');
const [editingEndTime, setEditingEndTime] = useState('');
const [editingStatusRId, setEditingStatusRId] = useState('');
const [showCreateReservationPopup, setShowCreateReservationPopup] = useState(false);
const [showDeleteReservationPopup, setShowDeleteReservationPopup] = useState(false);
const [reservationToDelete, setReservationToDelete] = useState(null);

// Lógica para abrir/cerrar ventanas emergentes
const handleOpenCreatePopup = () => setShowCreatePopup(true);
const handleCloseCreatePopup = () => setShowCreatePopup(false);

    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [laboratoryToDelete, setLaboratoryToDelete] = useState(null);

    // Lógica para abrir/ cerrar ventanas emergentes
// Estados para manejar los permisos
const [showCreatePermissionPopup, setShowCreatePermissionPopup] = useState(false);
const [editingPermissionId, setEditingPermissionId] = useState(null);
const [editingPermissionName, setEditingPermissionName] = useState('');
const [permissionToDelete, setPermissionToDelete] = useState(null);
const [showDeletePermissionPopup, setShowDeletePermissionPopup] = useState(false);




// Función para actualizar permisos (debes implementar la lógica de actualización)
const [userToEdit, setUserToEdit] = useState(null);
const [userToDelete, setUserToDelete] = useState(null);
const [showCreateUserPopup, setShowCreateUserPopup] = useState(false);
const [showEditUserPopup, setShowEditUserPopup] = useState(false);


const [loading, setLoading] = useState(true);
const [showPopup, setShowPopup] = useState(false); // Estado para controlar el popup
const [showPopupE, setShowPopupE] = useState(false); // Estado para controlar el popup

// Función para abrir el popup
const handleOpenPopup = () => {
    setShowPopup(true); // Cambia el estado para mostrar el popup
};

// Función para cerrar el popup
const handleClosePopup = () => {
    setShowPopup(false); // Cambia el estado para ocultar el popup
};

const handleCloseDeleteUserPopup = () => setShowDeleteUserPopup(false);
const handleCloseEditUserPopup = () => setShowEditUserPopup(false);

// Función para crear un permiso (debes implementar la lógica de creación)


const handleOpenEditReservationPopup = () => {/* lógica para abrir el modal */};
const handleCloseEditReservationPopup = () => {/* lógica para cerrar el modal */};
const handleOpenDeleteReservationPopup = () => setShowDeleteReservationPopup(true);
const handleCloseDeleteReservationPopup = () => setShowDeleteReservationPopup(false);

const [showCreateStatusPopup, setShowCreateStatusPopup] = useState(false);
const [showDeleteStatusPopup, setShowDeleteStatusPopup] = useState(false);
const [statusToDelete, setStatusToDelete] = useState(null);
const [editingStatusId, setEditingStatusId] = useState(null);
const [editingStatus, setEditingStatus] = useState('');

const [reservationEquipmentToDelete, setReservationEquipmentToDelete] = useState(null);


// Variables de estado para el formulario de creación y edición
const handleOpenCreateReservationPopup = () => {
    setShowCreateReservationPopup(true);
};

const handleCloseCreateReservationPopup = () => {
    setShowCreateReservationPopup(false);
    // Reiniciar valores del formulario si es necesario
    setequipmentID(0);
    setquantity(0);
    setuserId(0);
    setlaboratoryID(0);
    setreservationDate('');
    setstartTime('');
    setendTime('');
    setstatusRId(0);
};



// Ejemplo de cómo podrías implementar la función de actualización
const handleUpdateReservationEquipment = () => {
    // Lógica para actualizar la reserva
};

// Ejemplo de cómo podrías implementar la función de eliminación



const handleOpenCreateStatusPopup = () => {
    setShowCreateStatusPopup(true);
};

const handleCloseCreateStatusPopup = () => {
    setShowCreateStatusPopup(false);
};

const handleOpenDeleteStatusPopup = () => {
    setShowDeleteStatusPopup(true);
};

const handleCloseDeleteStatusPopup = () => {
    setShowDeleteStatusPopup(false);
};








const handleOpenDeleteUserPopup = (userId) => {
    if (userId) {
        setUserIdToDelete(userId); // Guardamos el userId en el estado
        setShowDeleteUserPopup(true); // Muestra el popup de confirmación
    } else {
        console.error("No se encontró el userId para eliminar.");
    }
};

const [userIdToDelete, setUserIdToDelete] = useState(null);
const [showDeleteUserPopup, setShowDeleteUserPopup] = useState(false);

const handleOpenEditStatusPopup = () => {
    // Lógica para abrir el modal de edición si es necesario
};


const [showEditStatusPopup, setShowEditStatusPopup] = useState(false); // Controla la visibilidad del popup de edición

// Función para abrir el popup de creación



// Función para abrir y cerrar el popup de edición

const handleCloseEditStatusPopup = () => setShowEditStatusPopup(false);


    const handleCloseEditPopup = () => setShowEditPopup(false);

    const handleOpenDeletePopup = (labId) => {
        setLaboratoryToDelete(labId);
        setShowDeletePopup(true);
    };
    const handleCloseDeletePopup = () => setShowDeletePopup(false);

    const [laboratoryNum, setLaboratoryNum] = useState(''); // inicializado como cadena vacía
    const [capacity, setCapacity] = useState(0); // puedes usar 0 o algún valor inicial
    
    // Estado para almacenar los datos de cada tabla
    const [laboratories, setLaboratories] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [reservationE, setReservationE] = useState([]);

    const [users, setUsers] = useState([]);
    const [userPermissions, setUserPermissions] = useState([]);
    const [userTypes, setUserTypes] = useState([]);


    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // Controla la visibilidad del popup

    // Función para abrir el popup de edición
//POST 1
const [editingReservationEquipmentId, setEditingReservationEquipmentId] = useState(null);
const [editingQuantity, setEditingQuantity] = useState('');
const handleOpenEditReservationEquipmentPopup = () => {
    console.log('Popup de edición abierto');
    setIsEditPopupOpen(true); // Activa la visibilidad del popup
};

// Función para cerrar el popup de edición
const handleCloseEditReservationEquipmentPopup = () => {
    setIsEditPopupOpen(false); // Desactiva la visibilidad del popup
};
//POST 2
    const [equipmentName, setequipmentName] = useState([]);
    const [description, setdescription] = useState([]);
    const [statusE_ID, setstatusE_ID] = useState([]);
    const [acquisitionDate, setacquisitionDate] = useState([]);
//POST 3
    const [equipmentID, setequipmentID] = useState(); 
    const [availableQuantity, setavailableQuantity] = useState(); 
    const [laboratoryID, setlaboratoryID] = useState(); 
//POST 4
    const [permissionName, setpermissionName] = useState(); 
 //POST 5
    const [userId, setuserId] = useState(); 
    const [reservationEquipments, setreservationEquipments] = useState(); 
    const [reservationDate, setreservationDate] = useState(); 
    const [startTime, setstartTime] = useState(); 
    const [endTime, setendTime] = useState(); 
    const [statusRId, setstatusRId] = useState(); 
 //POST 6 o 7
 const [statusR, setstatusR] = useState(); 
  //POST 6 o 7
  const [firstName, setfirstName] = useState(); 
  const [lastName, setlastName] = useState(); 
  const [email, setemail] = useState(); 
  const [quantity, setquantity  ] = useState(); 
  const [password, setpassword] = useState(); 
  const [userTypeID, setuserTypeID] = useState([]);
// ULTIMO POST QUE NO SE CUAL ES PERO AHI VAMOS MUCHACHOS MUCHAS GRACIAS POR CONFIAR EN EL PROCESO PUES HERMANO

const [userType, setUserType] = useState('');
//POST NI IDEA CUAL ES PERO NO ES EL ULTIMO USER PERMISSION?

const [permissionId, setpermissionId] = useState('');

//DEFINIR CONST PARA UPDATE

const [editingInventoryId, setEditingInventoryId] = useState(null);
const [editingAvailableQuantity, setEditingAvailableQuantity] = useState('');
const [editingLaboratoryId, setEditingLaboratoryId] = useState('');

const [editingEquipmentName, setEditingEquipmentName] = useState('');
const [editingDescription, setEditingDescription] = useState('');
const [editingStatusEId, setEditingStatusEId] = useState(null);
const [editingAcquisitionDate, setEditingAcquisitionDate] = useState('');

const [editingLaboratoryNum, setEditingLaboratoryNum] = useState('');
const [editingCapacity, setEditingCapacity] = useState('');
const handleOpenCreateUserPopup = () => setShowCreateUserPopup(true);
const handleCloseCreateUserPopup = () => setShowCreateUserPopup(false);
//Filter Ayuda

const [filterId, setFilterId] = useState('');
const [filteredUserTypes, setFilteredUserTypes] = useState(userTypes); // Estado para almacenar los tipos de usuario filtrados


const [showCreateInventoryPopup, setShowCreateInventoryPopup] = useState(false);
const [showDeleteInventoryPopup, setShowDeleteInventoryPopup] = useState(false);
const [inventoryToDelete, setInventoryToDelete] = useState(null);

const handleOpenCreateInventoryPopup = () => setShowCreateInventoryPopup(true);
const handleCloseCreateInventoryPopup = () => setShowCreateInventoryPopup(false);

const handleOpenEditInventoryPopup = () => {/* Puedes implementar lógica adicional si es necesario */};
const handleCloseEditInventoryPopup = () => setEditingInventoryId(null);

const handleOpenDeleteInventoryPopup = () => setShowDeleteInventoryPopup(true);
const handleCloseDeleteInventoryPopup = () => setShowDeleteInventoryPopup(false);

    const navigate = useNavigate();

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleLogout = () => {
        navigate('/login'); // Dirige al login
    };

    const handleTableClick = (tableName) => {
        if (activeTable === tableName) {
            setActiveTable(null); // Si ya está activa, la cerramos
        } else {
            setActiveTable(tableName); // Abrimos la tabla seleccionada
            fetchData(tableName); // Llamamos a fetchData al abrir la tabla
        }
    };

    // Función para obtener datos de diferentes endpoints
    const fetchData = async (tableName) => {
        try {
            let response;
            switch (tableName) {
                case 'laboratory':
                    response = await axios.get('https://electronicspace.somee.com/api/Laboratory_', {
                        headers: { accept: 'text/plain' }
                    });
                    setLaboratories(response.data);
                    break;
                case 'equipments':
                    response = await axios.get('https://electronicspace.somee.com/api/Equipment_', {
                        headers: { accept: 'text/plain' }
                    });
                    setEquipments(response.data);
                    break;
                case 'inventory':
                    response = await axios.get('https://electronicspace.somee.com/api/Inventory_', {
                        headers: { accept: 'text/plain' }
                    });
                    setInventory(response.data);
                    break;
                case 'permission':
                    response = await axios.get('https://electronicspace.somee.com/api/Permission_', {
                        headers: { accept: 'text/plain' }
                    });
                    setPermissions(response.data);
                    break;
                case 'reservation':
                    response = await axios.get('https://electronicspace.somee.com/api/Reservation_', {
                        headers: { accept: 'text/plain' }
                    });
                    setReservations(response.data);
                    break;
                case 'reservationequipment':
                        response = await axios.get('https://electronicspace.somee.com/api/Reservation_Equipment_', {
                            headers: { accept: 'text/plain' }
                        });
                        setReservationE(response.data);
                    break;
                case 'statusequipment':
                    response = await axios.get('https://electronicspace.somee.com/api/Status_Equipment_', {
                        headers: { accept: 'text/plain' }
                    });
                    setStatusEquipment(response.data);
                    break;

                 case 'statusreservation':
                        response = await axios.get('https://electronicspace.somee.com/api/Status_Reservation_', {
                            headers: { accept: 'text/plain' }
                        });
                        setStatusReservation(response.data);
                    break;
                    
                    case 'user':
                        response = await axios.get('https://electronicspace.somee.com/api/User_', {
                            headers: { accept: 'text/plain' }
                        });
                        console.log(response.data); // Imprime la respuesta en consola
                        setUsers(response.data);
                        break;
                    
                case 'userPermission':
                    response = await axios.get('https://electronicspace.somee.com/api/User_Permission_', {
                        headers: { accept: 'text/plain' }
                    });
                    setUserPermissions(response.data);
                    break;
                case 'userType':
                    response = await axios.get('https://electronicspace.somee.com/api/User_Type_', {
                        headers: { accept: 'text/plain' }
                    });
                    setUserTypes(response.data);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };






    // AQUI COMIENZA EL POST OJO AL PIOJO




                // POST para crear un laboratorio
                const handleCreateLaboratory = async () => {
                    try {
                        if (!laboratoryNum || !capacity) {
                            console.error('Error: Laboratory_Num y Capacity son requeridos.');
                            return; // Salir de la función si los valores son inválidos
                        }
                
                        const response = await axios.post(
                            `https://electronicspace.somee.com/api/Laboratory_?Laboratory_Num=${laboratoryNum}&Capacity=${capacity}`,
                            null,
                            { headers: { accept: 'text/plain' } }
                        );
                
                        console.log('Laboratorio creado:', response.data);
                        fetchData('laboratory'); // Refresca la lista de laboratorios
                    } catch (error) {
                        console.error('Error creando laboratorio:', error);
                    }
                };
                

                // POST para crear un equipo
                const handleCreateEquipment = async (equipmentName, description, statusE_ID = 1, acquisitionDate, laboratory_ID) => {
                    try {
                        const response = await axios.post(
                            `https://electronicspace.somee.com/api/Equipment_?Equipment_Name=${equipmentName}&Description=${description}&StatusE_ID=${statusE_ID}&Acquisition_date=${acquisitionDate}&Laboratory_ID=${laboratory_ID}`,
                            null,
                            { headers: { accept: 'text/plain' } }
                        );
                        console.log('Equipo creado:', response.data);
                        fetchData('equipments'); // Refresca la lista de equipos
                    } catch (error) {
                        console.error('Error creando equipo:', error);
                    }
                };
                

                // POST para crear un inventario
                const handleCreateInventory = async (equipmentID, availableQuantity, laboratoryID) => {
                    try {
                        const response = await axios.post(
                            `https://electronicspace.somee.com/api/Inventory_?Equipment_ID=${equipmentID}&Available_quantity=${availableQuantity}&Laboratory_ID=${laboratoryID}`,
                            null,
                            { headers: { accept: 'text/plain' } }
                        );
                        console.log('Inventario creado:', response.data);
                        fetchData('inventory'); // Refresca la lista de inventarios
                    } catch (error) {
                        console.error('Error creando inventario:', error);
                    }
                };


// POST para crear un permiso
            const handleCreatePermission = async (permissionName) => {
                try {
                    const response = await axios.post(
                        `https://electronicspace.somee.com/api/Permission_?PermissionName=${permissionName}`,
                        null,
                        { headers: { accept: 'text/plain' } }
                    );
                    console.log('Permiso creado:', response.data);
                    fetchData('permission'); // Refresca la lista de permisos
                } catch (error) {
                    console.error('Error creando permiso:', error);
                }
            };


// POST para crear una reserva
            const handleCreateReservation = async (
                userId,
                laboratoryId,
                reservationEquipments,
                reservationDate,
                startTime,
                endTime,
                statusRId
            ) => {
                try {
                    const response = await axios.post(
                        `https://electronicspace.somee.com/api/Reservation_?User_ID=${userId}&Laboratory_ID=${laboratoryId}&Reservation_Equipments=${reservationEquipments}&Reservation_date=${reservationDate}&Start_time=${startTime}&End_time=${endTime}&StatusR_ID=${statusRId}`,
                        null,
                        { headers: { accept: 'text/plain' } }
                    );
                    console.log('Reserva creada:', response.data);
                    fetchData('reservation'); // Refresca la lista de reservas
                } catch (error) {
                    console.error('Error creando reserva:', error);
                }
            };

// POST para crear una reserva de equipo
            const handleCreateReservationEquipment = async (
                equipmentId, // Nuevo parámetro para ID del equipo
                quantity, // Nuevo parámetro para cantidad

            ) => {
                try {
                    const response = await axios.post(
                        `https://electronicspace.somee.com/api/Reservation_Equipment_?Equipment_ID=${equipmentId}&Quantity=${quantity}`,
                        null,
                        { headers: { accept: 'text/plain' } }
                    );
                    console.log('Reserva de equipo creada:', response.data);
                    fetchData('reservation'); // Refresca la lista de reservas
                } catch (error) {
                    console.error('Error creando reserva de equipo:', error);
                }
            };





// POST para crear un estado de equipo STATUS EQUIPMENT
                    const handleCreateStatusEquipment = async (status) => {
                        try {
                            const response = await axios.post(
                                `https://electronicspace.somee.com/api/Status_Equipment_?Status=${encodeURIComponent(status)}`,
                                null,
                                { headers: { accept: 'text/plain' } }
                            );
                            console.log('Estado de equipo creado:', response.data);
                            fetchData('statusEquipment'); // Refresca la lista de estados de equipo
                        } catch (error) {
                            console.error('Error creando estado de equipo:', error);
                        }
                    };

//POST STATUS RESERVATION
                const handleCreateStatusReservation = async (statusR) => {
                    try {
                        const response = await axios.post(
                            `https://electronicspace.somee.com/api/Status_Reservation_?StatusR=${statusR}`, // Cambiado para usar StatusR
                            null,
                            { headers: { accept: 'text/plain' } }
                        );
                        console.log('Estado de Reserva creado:', response.data);
                        fetchData('statusReservation'); // Refresca la lista de estados
                    } catch (error) {
                        console.error('Error creando estado de reserva:', error);
                    }
                };


// POST para crear un nuevo usuario
                const handleCreateUser = async (firstName, lastName, email, password, userTypeId) => {
                    try {
                        const response = await axios.post(
                            `https://electronicspace.somee.com/api/User_?First_Name=${firstName}&Last_Name=${lastName}&Email=${email}&Password=${password}&User_Type_ID=${userTypeId}`,
                            null,
                            { headers: { accept: 'text/plain' } }
                        );
                        console.log('Usuario creado:', response.data);
                        fetchData('user'); // Refresca la lista de usuarios
                    } catch (error) {
                        console.error('Error creando usuario:', error);
                    }
                    handleCloseCreateUserPopup();
                };


                // POST para crear un permiso de usuario
                const handleCreateUserPermission = async (userId, permissionId) => {
                    try {
                        const response = await axios.post(
                            `https://electronicspace.somee.com/api/User_Permission_?User_Id=${userId}&Permission_Id=${permissionId}`,
                            null,
                            { headers: { accept: 'text/plain' } }
                        );
                        console.log('Permiso de usuario creado:', response.data);
                        fetchData('userPermission'); // Refresca la lista de permisos de usuarios
                    } catch (error) {
                        console.error('Error creando permiso de usuario:', error);
                    }
                };

                // POST para crear un tipo de usuario
                const handleCreateUserType = async (userType) => {
                    try {
                        const response = await axios.post(
                            `https://electronicspace.somee.com/api/User_Type_?UserType=${userType}`, // Cambiado a UserType
                            null,
                            { headers: { accept: 'text/plain' } }
                        );
                        console.log('Tipo de usuario creado:', response.data);
                        fetchData('userType'); // Refresca la lista de tipos de usuario
                    } catch (error) {
                        console.error('Error creando tipo de usuario:', error);
                    }
                };
                
// AQUI TERMINA LOS POST OJO AL PIOJO

//filter
const handleFilterUserType = () => {
    if (filterId) {
        const filtered = userTypes.filter(user => user.user_Type_ID === Number(filterId));
        setFilteredUserTypes(filtered);
    } else {
        setFilteredUserTypes(userTypes); // Si no hay filtro, mostrar todos los tipos de usuario
    }
};


// acá acaba el filter


//AQUI COMIENZA EL EDIT

//EDITAR LABORATORY
                const handleUpdateLaboratory = async () => {
                    try {
                        const response = await axios.put(
                            `https://electronicspace.somee.com/api/Laboratory_/${editingLaboratoryId}?Laboratory_Num=${editingLaboratoryNum}&Capacity=${editingCapacity}`,
                            null, // No se envía un cuerpo en este PUT request
                            { headers: { accept: 'text/plain' } }
                        );
                        console.log('Laboratorio actualizado:', response.data);
                        fetchData('laboratory'); // Refresca la lista de laboratorios
                        // Limpia el formulario de edición
                        setEditingLaboratoryId(null);
                        setEditingLaboratoryNum('');
                        setEditingCapacity('');
                    } catch (error) {
                        console.error('Error actualizando laboratorio:', error);
                    }
                };

//EDITAR EQUIPMENTS
                    const handleUpdateEquipment = async () => {
                        try {
                            const response = await axios.put(
                                `https://electronicspace.somee.com/api/Equipment_/${editingEquipmentId}?Equipment_Name=${editingEquipmentName || ''}&Description=${editingDescription || ''}&StatusE_ID=${editingStatusEId || 1}&Acquisition_date=${editingAcquisitionDate || ''}&Laboratory_ID=${editingLaboratoryId || ''}`,
                                null,
                                { headers: { accept: 'text/plain' } }
                            );
                            console.log('Equipo actualizado:', response.data);
                            fetchData('equipments'); // Refresca la lista de equipos
                            // Limpia el formulario de edición
                            setEditingEquipmentId(null);
                            setEditingEquipmentName('');
                            setEditingDescription('');
                            setEditingStatusEId('');
                            setEditingAcquisitionDate('');
                            setEditingLaboratoryId('');
                        } catch (error) {
                            console.error('Error actualizando equipo:', error);
                        }
                    };

//EDITAR INVENTORY
                const handleUpdateInventory = async () => {
                    try {
                        const response = await axios.put(
                            `https://electronicspace.somee.com/api/Inventory_/${editingInventoryId}?Equipment_ID=${editingEquipmentId}&Available_quantity=${editingAvailableQuantity}&Laboratory_ID=${editingLaboratoryId}`,
                            null, // No se envía un cuerpo en este PUT request
                            { headers: { accept: 'text/plain' } }
                        );
                        console.log('Inventario actualizado:', response.data);
                        fetchData('inventory'); // Refresca la lista de inventarios
                        
                        // Limpia el formulario de edición
                        setEditingInventoryId(null);
                        setEditingEquipmentId('');
                        setEditingAvailableQuantity('');
                        setEditingLaboratoryId('');
                    } catch (error) {
                        console.error('Error actualizando inventario:', error);
                    }
                };

//EDITAR PERMISSION

const handleUpdatePermission = async () => {
    // Verificar que se cuenta con el ID y nombre del permiso
    const id = Number(editingPermissionId); // Convertir a número
    if (isNaN(id) || !editingPermissionName) {
        console.error('ID del permiso o nombre del permiso no es válido');
        return;
    }

    try {
        const response = await axios.put(`https://electronicspace.somee.com/api/Permission_/${id}?PermissionName=${encodeURIComponent(editingPermissionName)}`,
            null, // No se envía un cuerpo en este PUT request
            { headers: { accept: 'text/plain' } }
        );
        console.log('Permiso actualizado:', response.data);
        fetchData('permission'); // Refresca la lista de permisos

        // Limpia el formulario de edición
        setEditingPermissionId(null);
        setEditingPermissionName('');
    } catch (error) {
        console.error('Error actualizando permiso:', error);
    }
};



//EDITAR RESERVATION

                    const handleUpdateReservation = async () => {
                        // Verificar que se cuenta con el ID de la reserva y los campos necesarios
                        if (
                            typeof editingReservationId !== 'number' ||
                            !editingUserId ||
                            !editingLaboratoryId ||
                            !editingReservationEquipments ||
                            !editingReservationDate ||
                            !editingStartTime ||
                            !editingEndTime ||
                            !editingStatusRId
                        ) {
                            console.error('ID de reserva o uno o más campos de reserva no son válidos');
                            return;
                        }

                        try {
                            const response = await axios.put(
                                `https://electronicspace.somee.com/api/Reservation_/${editingReservationId}?User_ID=${editingUserId}&Laboratory_ID=${editingLaboratoryId}&Reservation_Equipments=${editingReservationEquipments}&Reservation_date=${editingReservationDate}&Start_time=${editingStartTime}&End_time=${editingEndTime}&StatusR_ID=${editingStatusRId}`,
                                null, // No se envía un cuerpo en este PUT request
                                { headers: { accept: 'text/plain' } }
                            );
                            console.log('Reserva actualizada:', response.data);
                            fetchData('reservation'); // Refresca la lista de reservas

                            // Limpia el formulario de edición
                            setEditingReservationId(null);
                            setEditingUserId('');
                            setEditingLaboratoryId('');
                            setEditingReservationEquipments('');
                            setEditingReservationDate('');
                            setEditingStartTime('');
                            setEditingEndTime('');
                            setEditingStatusRId('');
                        } catch (error) {
                            console.error('Error actualizando reserva:', error);
                        }
                    };

//PUT STATUS EQUIPMENTS

                    const handleUpdateStatusEquipment = async (statusId, newStatus) => {
                        try {
                            const response = await axios.put(
                                `https://electronicspace.somee.com/api/Status_Equipment_/${statusId}?Status=${encodeURIComponent(newStatus)}`,
                                null, // No se envía un cuerpo en este PUT request
                                { headers: { accept: 'text/plain' } }
                            );
                            console.log('Estado de equipo actualizado:', response.data);
                            fetchData('statusEquipment'); // Refresca la lista de estados de equipo
                            
                            // Limpia el formulario de edición si es necesario
                            setEditingStatusId(null);
                            setEditingStatus('');
                        } catch (error) {
                            console.error('Error actualizando estado de equipo:', error);
                        }
                    };

//PUT STATUS RESERVATION
                    const handleUpdateStatusReservation = async (statusReservationId, newStatus) => {
                        try {
                            const response = await axios.put(
                                `https://electronicspace.somee.com/api/Status_Reservation_/${statusReservationId}?StatusR=${encodeURIComponent(newStatus)}`,
                                null, // No se envía un cuerpo en este PUT request
                                { headers: { accept: 'text/plain' } }
                            );
                            console.log('Estado de reserva actualizado:', response.data);
                            fetchData('statusReservation'); // Refresca la lista de estados de reserva

                            // Limpia el formulario de edición si es necesario
                            setEditingStatusReservationId(null);
                            setEditingStatusReservation('');
                        } catch (error) {
                            console.error('Error actualizando estado de reserva:', error);
                        }
                    };

//PUT USERS

                const handleUpdateUser = async (userId, firstName, lastName, email, password, userTypeId) => {
                    if (!userId) {
                        console.error("No se encontró el usuario a editar.");
                        return;
                    }

                    try {
                        const response = await axios.put(
                            `https://electronicspace.somee.com/api/User_/${userId}?First_Name=${encodeURIComponent(firstName)}&Last_Name=${encodeURIComponent(lastName)}&Email=${encodeURIComponent(email)}&Password=${encodeURIComponent(password)}&User_Type_ID=${userTypeId}`,
                            {},
                            { headers: { accept: 'text/plain' } }
                        );
                        console.log('Usuario actualizado:', response.data);
                        fetchData('user'); // Refresca la lista de usuarios
                    } catch (error) {
                        console.error('Error actualizando usuario:', error);
                    }
                };



//ALGO QUE FUNCIONA POR ACÁ


                // Función para abrir el popup de edición de laboratorios
                const handleOpenEditLaboratoryPopup = (lab) => {
                    setEditingLaboratoryId(lab.laboratory_ID);
                    setEditingLaboratoryNum(lab.laboratory_Num);
                    setEditingCapacity(lab.capacity);
                    setShowEditPopup(true); // Abre el popup de edición de laboratorios
                };








//AQUI TERMINA EL EDIT

//---------------------------------------------------------------------------------------------------

//AQUI COMIENZA EL DELETE
            //DELETE LABORATORY
            const handleDeleteLaboratory = async (id) => {
                try {
                    const response = await axios.delete(`https://electronicspace.somee.com/api/Laboratory_/${id}`, {
                        timeout: 5000, // 5 segundos de timeout
                    });
                    console.log('Laboratorio eliminado:', response.data);
                    fetchData('laboratory');
                } catch (error) {
                    console.error('Error eliminando laboratorio:', error);
                }
            };
            //DELETE EQUIPMENT
            const handleDeleteEquipment = async (equipment_ID) => {
                try {
                    const response = await axios.delete(`https://electronicspace.somee.com/api/Equipment_/${equipment_ID}`);
                    console.log('Equipo eliminado:', response.data);
                    fetchData('equipments'); // Asegúrate de que esta función esté bien definida y actualice el estado de los equipos
                    handleCloseDeletePopup(); // Cerrar el popup después de eliminar
                } catch (error) {
                    console.error('Error eliminando equipo:', error);
                }
            };
            //DELETE INVENTORY
            const handleDeleteInventory = async (inventory_ID) => {
                try {
                    const response = await axios.delete(`https://electronicspace.somee.com/api/Inventory_/${inventory_ID}`, {
                        //timeout: 5000, // 5 segundos de timeout
                    });
                    console.log('Inventario eliminado:', response.data);
                    fetchData('inventory');
                } catch (error) {
                    console.error('Error eliminando Inventario:', error);
                }
            };
            //DELETE PERMISSION
            const handleDeletePermission = async (permission_ID) => {
                try {
                    const response = await axios.delete(`https://electronicspace.somee.com/api/Permission_/${permission_ID}`, {
                        //timeout: 5000, // 5 segundos de timeout
                    });
                    console.log('Permiso eliminado:', response.data);
                    fetchData('permission');
                } catch (error) {
                    console.error('Error eliminando Permiso:', error);
                }
            };
            //DELETE RESERVATION
            const handleDeleteReservation = async (reservation_ID) => {
                try {
                    const response = await axios.delete(`https://electronicspace.somee.com/api/Reservation_/${reservation_ID}`, {
                        //timeout: 5000, // 5 segundos de timeout
                    });
                    console.log('Reserva eliminada:', response.data);
                    fetchData('reservation');
                } catch (error) {
                    console.error('Error eliminando Reserva:', error);
                }
            };
            //DELETE RESERVATION EQUIPMENT
            const handleDeleteReservationEquipment = async (reservationE_ID) => {
                try {
                    const response = await axios.delete(`https://electronicspace.somee.com/api/Reservation_Equipment_/${reservationE_ID}`, {
                        //timeout: 5000, // 5 segundos de timeout
                    });
                    console.log('Reserva del Equipo eliminada:', response.data);
                    fetchData('reservationequipment');
                } catch (error) {
                    console.error('Error eliminando Reserva del Equipo:', error);
                }
            };
            //DELETE STATUS EQUIPMENT
            const handleDeleteStatusEquipment = async (statusE_ID) => {
                try {
                    const response = await axios.delete(`https://electronicspace.somee.com/api/Status_Equipment_/${statusE_ID}`, {
                        //timeout: 5000, // 5 segundos de timeout
                    });
                    console.log('Reserva del Equipo eliminada:', response.data);
                    fetchData('statusequipment');
                } catch (error) {
                    console.error('Error eliminando Reserva del Equipo:', error);
                }
            };
            //DELETE STATUS RESERVATION
            const handleDeleteStatusReservation = async (statusR_ID) => {
                try {
                    const response = await axios.delete(`https://electronicspace.somee.com/api/Status_Reservation_/${statusR_ID}`, {
                        //timeout: 5000, // 5 segundos de timeout
                    });
                    console.log('Estado de la Reserva eliminada:', response.data);
                    fetchData('statusreservation');
                } catch (error) {
                    console.error('Error eliminando Estado de la Reserva:', error);
                }
            };
       //DELETE USER
       const handleDeleteUser = async () => {
        if (!userIdToDelete) {
            console.error("No se encontró el userId para eliminar.");
            return;
        }
    
        try {
            const response = await axios.delete(`https://electronicspace.somee.com/api/User_/${userIdToDelete}`, {
                headers: { accept: 'text/plain' }
            });
            console.log('Usuario eliminado:', response.data);
            fetchData('user'); // Refresca la lista de usuarios
            setShowDeleteUserPopup(false); // Oculta el popup después de eliminar
            setUserIdToDelete(null); // Resetea el userIdToDelete
        } catch (error) {
            console.error('Error eliminando usuario:', error);
        }
    };
            
            
            //DELETE USER PERMISSION
            const handleDeleteUserPermission = async (userP_ID) => {
                try {
                    const response = await axios.delete(`https://electronicspace.somee.com/api/User_Permission_/${userP_ID}`, {
                        //timeout: 5000, // 5 segundos de timeout
                    });
                    console.log('Permiso de Usuario Eliminado:', response.data);
                    fetchData('userPermission');
                } catch (error) {
                    console.error('Error eliminando Permiso de Usuario: ', error);
                }
            };
            //DELETE USER TYPE
            const handleDeleteUserType = async (user_Type_ID) => {
                try {
                    const response = await axios.delete(`https://electronicspace.somee.com/api/User_Type_/${user_Type_ID}`, {
                        //timeout: 5000, // 5 segundos de timeout
                    });
                    console.log('Tipo de Usuario Eliminado:', response.data);
                    fetchData('userType');
                } catch (error) {
                    console.error('Error eliminando Tipo de Usuario: ', error);
                }
            };
//AQUI TERMINA EL DELETE
//AQUI COMIENZA LAS GRAFICAS

                // Configuración de datos para el gráfico de barras
                const chartData = {
                    labels: laboratories.map((lab) => `Laboratorio ${lab.laboratory_Num}`),
                    datasets: [
                        {
                            label: 'Capacidad de cada laboratorio',
                            data: laboratories.map((lab) => lab.capacity),
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                };

                const chartOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Laboratorios',
                            },
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Capacidad',
                            },
                        },
                    },
                };

//2DO

                const equipmentStatusCount = equipments.reduce((acc, equip) => {
                    const status = equip.status_Equipment ? equip.status_Equipment.status : 'N/A';
                    acc[status] = (acc[status] || 0) + 1;
                    return acc;
                }, {});

                const EchartData = {
                    labels: Object.keys(equipmentStatusCount),
                    datasets: [
                        {
                            data: Object.values(equipmentStatusCount),
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                            ],
                            borderColor: 'rgba(255, 255, 255, 1)',
                            borderWidth: 1,
                        },
                    ],
                };

                const EchartOptions = {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                };
//3RO



                const inventoryCountByLab = inventory.reduce((acc, item) => {
                    const labId = item.laboratory ? item.laboratory.laboratory_Num : 'N/A';
                    acc[labId] = acc[labId] || {};
                    const itemName = item.equipment ? item.equipment.equipment_Name : 'N/A';
                    acc[labId][itemName] = (acc[labId][itemName] || 0) + item.available_quantity;
                    return acc;
                }, {});

                // Preparar los datos para el gráfico
                const labels = Object.keys(inventoryCountByLab[Object.keys(inventoryCountByLab)[0]] || {}); // Nombres de los items

                // Crear un conjunto de datos para cada laboratorio
                const datasets = [];
                const colors = [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(201, 203, 207, 0.6)',
                    'rgba(255, 20, 147, 0.6)',
                    'rgba(255, 215, 0, 0.6)',
                    'rgba(0, 255, 127, 0.6)',
                    'rgba(75, 0, 130, 0.6)',
                ];

                let colorIndex = 0; // Índice para los colores

                // Crear un conjunto de datos para cada laboratorio
                for (const lab in inventoryCountByLab) {
                    const items = inventoryCountByLab[lab];
                    const itemData = Object.keys(items).map(itemName => items[itemName]); // Obtener las cantidades como un arreglo

                    datasets.push({
                        label: lab, // Etiqueta del laboratorio
                        data: itemData, // Cantidad de items
                        backgroundColor: itemData.map(() => colors[colorIndex++ % colors.length]), // Asignar un color único a cada barra
                        borderColor: 'rgba(255, 255, 255, 1)', // Color del borde
                        borderWidth: 1,
                    });
                }

                const IEchartData = {
                    labels: labels, // Nombres de los items
                    datasets: datasets,
                };

                const IEchartOptions = {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                };


//ACÁ TERMINAN LAS GRAFICAS

    return (
        <div className={`admin-home ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <header className="header">
                <img src={logoP} alt="Logo Proyecto" className="logoP" />
                <h1>Gestión de Recursos de Laboratorio</h1>
                <div className="header-buttons">
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                    <button onClick={() => navigate('/Unity')}>Simulador Unity</button>

                </div>
                
            </header>

            <div className="main-container">
                <div className="table-buttons-left">
                    {['Dashboards','laboratory', 'equipments', 'inventory', 'reservation', 'user'].map((table) => (
                        <button key={table} onClick={() => handleTableClick(table)}>
                            {table.charAt(0).toUpperCase() + table.slice(1)} <span>{activeTable === table ? '▲' : '▼'}</span>
                        </button>
                    ))}
                </div>
                

                <div className="table-details-right">
                    
                    {activeTable && (
                        <>
                            <h2>{activeTable.charAt(0).toUpperCase() + activeTable.slice(1)} Details</h2>
                                

                            {activeTable === 'Dashboards' && (
                <div>
                    {/* Botón para abrir el popup de Rol Estudiante */}
                    <button onClick={handleOpenStudentPopup}>Explicación del Rol Estudiante</button>
                    {showStudentPopup && (
                        <div className="popup">
                            <div className="popup-content">
                                <h2>Explicación del Sistema de Gestión</h2>
                                <div className="popup-text">
                                    <h5>Rol de Estudiante</h5>
                                    <p>
                                    <p>
                                                El rol estudiante en el sistema de gestión permite acceder a diversas funcionalidades que facilitan su
                                                 experiencia educativa. Una de las características más destacadas es la visualización de dashboards, 
                                                 donde los estudiantes pueden evaluar su rendimiento de manera integral en el Simulador de Manejo de
                                                  Instrumentos Electrónicos "DigiLab", proporcionando una perspectiva clara sobre su progreso. Además,
                                                   los estudiantes pueden informarse sobre cómo ubicarse en la sede de Chía y conocer los laboratorios
                                                    disponibles, lo que les ayuda a orientarse mejor en su entorno académico. La plataforma también
                                                     brinda la posibilidad de consultar información sobre los equipos, inventarios y laboratorios,
                                                      facilitando el acceso a recursos esenciales para su aprendizaje. Asimismo, los estudiantes
                                                       tienen la capacidad de realizar reservaciones de equipos, así como editarlas o eliminarlas
                                                        según sea necesario, lo que optimiza la gestión de recursos. Finalmente, el sistema permite
                                                         a los estudiantes visualizar una lista de sus compañeros de clase, promoviendo la interacción
                                                          y colaboración entre pares dentro del entorno educativo.
                                                </p>
                                    </p>
                                </div>
                                <button onClick={handleClosePopupE}>Cerrar</button>
                            </div>
                            <div className="popup-overlay" onClick={handleClosePopupE}></div>
                        </div>
                    )}

                    {/* Botón para abrir el popup de Guia Laboratorios */}
                    <button onClick={handleOpenLabPopup}>Cómo llegar a los Laboratorios</button>
                    {showLabPopup && (
                        <div className="popup">
                            <div className="popup-content">
                                <h2>Guía Laboratorios Sede Chía</h2>
                                <div className="popup-text">
                                    <h5>Salones / Laboratorios</h5>
                                    <p>Los laboratorios de la extensión Chía de la Universidad de Cundinamarca están organizados de manera sistemática y fácilmente identificable. Cada laboratorio cuenta con un número de tres dígitos que indica su ubicación específica en el edificio. Los laboratorios del primer piso están numerados en el rango de 100 a 114, los del segundo piso de 200 a 214, y los del tercer piso de 300 a 314. 

La disposición dentro de cada piso sigue un orden lógico. En el segundo piso, por ejemplo, el laboratorio 201 se encuentra a la derecha al inicio del pasillo, mientras que el 208 está ubicado al fondo, en la esquina derecha. A partir de ese punto, los laboratorios continúan del lado izquierdo del fondo, desde el 209 hasta el 214. Esta organización facilita a los estudiantes y al personal encontrar rápidamente los laboratorios, optimizando así el acceso a los recursos y equipos necesarios para las actividades académicas y de investigación.</p>
                                </div>
                                <button onClick={handleClosePopupE}>Cerrar</button>
                            </div>
                            <div className="popup-overlay" onClick={handleClosePopupE}></div>
                        </div>
                    )}

                    <div>
                        <TeacherDashboard users={users} />
                    </div>

                    <div className="spacing"></div> {/* Espaciador */}
                </div>
            )}
{/* LABORATORY */}
                                    {activeTable === 'laboratory' && laboratories.length > 0 && (
                            <div>
                                                                   {/* Dashboard con gráfico */}
                                                                   <div style={{ width: '100%', height: '300px', marginBottom: '20px' }}>
                                            <h4>Capacidad en cada Laboratorio</h4>
                                            <Bar data={chartData} options={chartOptions} />
                                        </div>
                                        <div className="spacing"></div> {/* Espaciador */}
                                <div className="data-list">
                                    <h3>Datos Encontrados:</h3>
                                    <table className="styled-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Laboratorio</th>
                                                <th>Capacidad</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                        {laboratories.map((lab) => (
                                            <tr key={lab.laboratoryID}>
                                                <td>{lab.laboratory_ID}</td>
                                                <td>{lab.laboratory_Num}</td>
                                                <td>{lab.capacity}</td>

                                            </tr>
                                        ))}
                                    </tbody>

                                    </table>
                                    <div className="spacing"></div> {/* Espaciador */}
                                </div>
                            </div>
                        )}


{/* EQUIPMENT */}
                            {activeTable === 'equipments' && equipments.length > 0 && (
                                <div>
                                                        {/* Gráfico circular de estado de los equipos */}
                    <h3>Estado de los Equipos:</h3>
                    <div style={{ width: '100%', height: '400px' }}>
                        <Pie data={EchartData} options={EchartOptions} />
                    </div>
                                    <h3>Crear Equipment:</h3>
                                    <button onClick={handleOpenCreatePopup}>CREAR</button>


                                    {/* Tabla de equipos existentes */}
                                    <h3>Datos Encontrados:</h3>

                                    <table className="styled-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Equipo</th>
                                                <th>Descripción</th>
                                                <th>Estado</th>
                                                <th>Laboratorio</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {equipments.map(equip => (
                                                <tr key={equip.equipment_ID || equip.id || equip.Equipment_ID}>
                                                    <td>{equip.equipment_ID || equip.id || equip.Equipment_ID || 'Sin ID'}</td>
                                                    <td>{equip.equipment_Name || 'N/A'}</td>
                                                    <td>{equip.description || 'N/A'}</td>
                                                    <td>{equip.status_Equipment ? equip.status_Equipment.status : 'N/A'}</td>
                                                    <td>{equip.laboratory ? equip.laboratory.laboratory_Num || 'N/A' : 'N/A'}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="spacing"></div> {/* Espaciador */}
                                </div>
                            )}


   {/* INVENTORY */}
                {activeTable === 'inventory' && inventory.length > 0 && (
                    <div>
                                                        <div>
            <h3>Gráfico de Inventario por Laboratorio</h3>
            <Bar data={IEchartData} options={IEchartOptions} />
        </div>
                        {/* Tabla de inventario existente */}
                        <h3>Datos Encontrados:</h3>
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Item</th>
                                    <th>Cantidad Disponible</th>
                                    <th>Laboratorio</th>

                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map(item => (
                                    <tr key={item.inventory_ID}>
                                        <td>{item.inventory_ID}</td>
                                        <td>{item.equipment ? item.equipment.equipment_Name : 'N/A'}</td>
                                        <td>{item.available_quantity}</td>
                                        <td>{item.laboratory ? item.laboratory.laboratory_Num : 'N/A'}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="spacing"></div> {/* Espaciador */}
                    </div>
                )}



 {/* RESERVATION*/}                      

                                {activeTable === 'reservation' && reservations.length > 0 && (
                                    <div>
                                        {/* Botón para crear una nueva reserva */}
                                        <h3>Crear Reserva:</h3>
                                        <button onClick={handleOpenCreateReservationPopup}>CREAR</button>

                                        {/* Modal de Crear Reserva */}
                                        {showCreateReservationPopup && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <span className="close" onClick={handleCloseCreateReservationPopup}>&times;</span>
                                                    <h3>Crear Nueva Reserva</h3>
                                                    <input
                                                        type="number"
                                                        value={userId}
                                                        onChange={(e) => setuserId(Number(e.target.value))}
                                                        placeholder="ID del Usuario"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={laboratoryID}
                                                        onChange={(e) => setlaboratoryID(Number(e.target.value))}
                                                        placeholder="ID del Laboratorio"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={reservationEquipments}
                                                        onChange={(e) => setreservationEquipments(Number(e.target.value))}
                                                        placeholder="ID del Equipo de Reserva"
                                                    />
                                                    <input
                                                        type="date"
                                                        value={reservationDate}
                                                        onChange={(e) => setreservationDate(e.target.value)}
                                                        placeholder="Fecha de Reserva (YYYY-MM-DD)"
                                                    />
                                                    <input
                                                        type="time"
                                                        value={startTime}
                                                        onChange={(e) => setstartTime(e.target.value)}
                                                        placeholder="Hora de Inicio (HH:MM:SS)"
                                                    />
                                                    <input
                                                        type="time"
                                                        value={endTime}
                                                        onChange={(e) => setendTime(e.target.value)}
                                                        placeholder="Hora de Fin (HH:MM:SS)"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={statusRId}
                                                        onChange={(e) => setstatusRId(Number(e.target.value))}
                                                        placeholder="ID del Estado de Reserva"
                                                    />
                                                    <button onClick={() => { handleCreateReservation(userId, laboratoryID, reservationEquipments, reservationDate, startTime, endTime, statusRId); handleCloseCreateReservationPopup(); }}>
                                                        CREAR
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Modal de Editar Reserva */}
                                        {editingReservationId && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <span className="close" onClick={handleCloseEditReservationPopup}>&times;</span>
                                                    <h3>Editar Reserva</h3>
                                                    <input
                                                        type="number"
                                                        value={editingUserId}
                                                        onChange={(e) => setEditingUserId(Number(e.target.value))}
                                                        placeholder="ID del Usuario"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={editingLaboratoryId}
                                                        onChange={(e) => setEditingLaboratoryId(Number(e.target.value))}
                                                        placeholder="ID del Laboratorio"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={editingReservationEquipments}
                                                        onChange={(e) => setEditingReservationEquipments(Number(e.target.value))}
                                                        placeholder="ID del Equipo de Reserva"
                                                    />
                                                    <input
                                                        type="date"
                                                        value={editingReservationDate}
                                                        onChange={(e) => setEditingReservationDate(e.target.value)}
                                                        placeholder="Fecha de Reserva (YYYY-MM-DD)"
                                                    />
                                                    <input
                                                        type="time"
                                                        value={editingStartTime}
                                                        onChange={(e) => setEditingStartTime(e.target.value)}
                                                        placeholder="Hora de Inicio (HH:MM:SS)"
                                                    />
                                                    <input
                                                        type="time"
                                                        value={editingEndTime}
                                                        onChange={(e) => setEditingEndTime(e.target.value)}
                                                        placeholder="Hora de Fin (HH:MM:SS)"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={editingStatusRId}
                                                        onChange={(e) => setEditingStatusRId(Number(e.target.value))}
                                                        placeholder="ID del Estado de Reserva"
                                                    />
                                                    <button onClick={() => { handleUpdateReservation(); handleCloseEditReservationPopup(); }}>
                                                        GUARDAR CAMBIOS
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Modal de Confirmación para Eliminar */}
                                        {showDeleteReservationPopup && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <span className="close" onClick={handleCloseDeleteReservationPopup}>&times;</span>
                                                    <h3>¿Estás seguro de que deseas eliminar esta reserva?</h3>
                                                    <button onClick={() => { handleDeleteReservation(reservationToDelete); handleCloseDeleteReservationPopup(); }}>
                                                        Confirmar
                                                    </button>
                                                    <button onClick={handleCloseDeleteReservationPopup}>Cancelar</button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Tabla de reservas existentes */}
                                        <h3>Datos Encontrados:</h3>
                                        <table className="styled-table">
                                            <thead>
                                                <tr>
                                                    <th>ID de Usuario</th>
                                                    <th>Nombre de Usuario</th>
                                                    <th>ID de Laboratorio</th>
                                                    <th>Número de Laboratorio</th>
                                                    <th>Capacidad</th>

                                                    <th>Fecha de Reserva</th>
                                                    <th>Hora de Inicio</th>
                                                    <th>Hora de Fin</th>
                                                    <th>ID de Estado</th>
                                                    <th>Estado de Reserva</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reservations.map(res => (
                                                    <tr key={res.reservation_ID}>
                                                        {/* ID y Nombre del Usuario */}
                                                        <td>{res.user ? res.user.user_ID : 'N/A'}</td>
                                                        <td>{res.user ? `${res.user.first_Name} ${res.user.last_Name}` : 'N/A'}</td>
                                                        
                                                        {/* ID, Número y Capacidad del Laboratorio */}
                                                        <td>{res.laboratory ? res.laboratory.laboratory_ID : 'N/A'}</td>
                                                        <td>{res.laboratory ? res.laboratory.laboratory_Num : 'N/A'}</td>
                                                        <td>{res.laboratory ? res.laboratory.capacity : 'N/A'}</td>
                                                        

                                                        
                                                        {/* Fecha, Hora de Inicio y Hora de Fin */}
                                                        <td>{res.reservation_date || 'N/A'}</td>
                                                        <td>{res.start_time || 'N/A'}</td>
                                                        <td>{res.end_time || 'N/A'}</td>
                                                        
                                                        {/* ID y Estado de la Reserva */}
                                                        <td>{res.status_Reservation ? res.status_Reservation.statusR_ID : 'N/A'}</td>
                                                        <td>{res.status_Reservation ? res.status_Reservation.statusR : 'N/A'}</td>
                                                        
                                                        {/* Botones de Acciones */}
                                                        <td>
                                                            <button onClick={() => {
                                                                setEditingReservationId(res.reservation_ID);
                                                                setEditingUserId(res.user ? res.user.user_ID : null); // Cargar el ID del usuario para editar
                                                                setEditingLaboratoryId(res.laboratory ? res.laboratory.laboratory_ID : null);
                                                                setEditingReservationEquipments(
                                                                    res.reservation_Equipments.length > 0 ? res.reservation_Equipments.map(eq => eq.equipment_ID) : []
                                                                ); // Cargar IDs de equipos para editar
                                                                setEditingReservationDate(res.reservation_date);
                                                                setEditingStartTime(res.start_time);
                                                                setEditingEndTime(res.end_time);
                                                                setEditingStatusRId(res.status_Reservation ? res.status_Reservation.statusR_ID : null);
                                                                handleOpenEditReservationPopup();
                                                            }}>Editar</button>
                                                            
                                                            <button onClick={() => {
                                                                setReservationToDelete(res.reservation_ID);
                                                                handleOpenDeleteReservationPopup();
                                                            }}>Eliminar</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="spacing"></div> {/* Espaciador */}
                                    </div>
                                )}



                            {/* USER*/}     
                                                        {/* USER */}
                            {activeTable === 'user' && users.length > 0 && (
                                <div>
                                    {/* Tabla de usuarios existentes */}
                                    <h3>Datos Encontrados: (Compañeros de Clase)</h3>
                                    <table className="styled-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Apellido</th>
                                                <th>Email</th>
                                                <th>Tipo de Usuario</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users
                                                .filter(user => user.user_Type?.userType === 'Student') // Filtra los usuarios por tipo
                                                .map(user => (
                                                    <tr key={user.user_ID}>
                                                        <td>{user.user_ID}</td>
                                                        <td>{user.first_Name || 'Sin nombre'}</td>
                                                        <td>{user.last_Name || 'Sin apellido'}</td>
                                                        <td>{user.email || 'N/A'}</td>
                                                        <td>{user.user_Type?.userType || 'N/A'}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>

                                    <div className="spacing"></div> {/* Espaciador */}
                                </div>
                            )}



                         {/*AQUI TERMINA EL CODIGO REVISAR QUE NO ESTÉ EL ERROR*/} 
                        </>

                    )}
                </div>
            </div>
        </div>
    );
};


export default StudentHome;
