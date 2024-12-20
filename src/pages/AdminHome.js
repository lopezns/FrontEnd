 
import { Pie } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Chart from 'chart.js/auto';
import axios from 'axios';
import './AdminHome.css'; // Asegúrate de que este archivo contenga los estilos correctos
import UserDashboard from './UserDashboard'; // Asegúrate de que la ruta sea correcta
import logoP from '../assets/LOGOPROJECT.png'; // Asegúrate de usar la ruta correcta


import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);




const AdminHome = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    //const [activeTable, setActiveTable] = useState(null); // Solo una tabla activa
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

    // Variables de estado para manejar los IDs, modales y datos de usuario
    const [editingUserTypeId, setEditingUserTypeId] = useState(null);
    const [userTypeIdToDelete, setUserTypeIdToDelete] = useState(null);
    const [showDeleteUserTypePopup, setShowDeleteUserTypePopup] = useState(false);
    const [showEditUserTypePopup, setShowEditUserTypePopup] = useState(false);

    const [showPopup, setShowPopup] = useState(false);
    const handleOpenPopup = () => setShowPopup(true);
    const handleClosePopup = () => setShowPopup(false);
    // Funciones para abrir y cerrar los modales
    const handleOpenEditUserTypePopup = () => {
        setShowEditUserTypePopup(true);
    };

    const handleCloseEditUserTypePopup = () => {
        setShowEditUserTypePopup(false);
        setEditingUserTypeId(null); // Restablece el ID de edición
    };

    const handleOpenDeleteUserTypePopup = (id) => {
        setUserTypeIdToDelete(id);
        setShowDeleteUserTypePopup(true);
    };

    const handleCloseDeleteUserTypePopup = () => {
        setShowDeleteUserTypePopup(false);
        setUserTypeIdToDelete(null); // Restablece el ID de eliminación
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

const handleCloseEditStatusPopup = () => {
    console.log("Cerrando modal de edición de estado de equipo"); // Verificación en consola
    setEditingStatusId(null); // Cambia el estado para cerrar el modal
};


const handleOpenEditStatusReservationPopup = () => {
    // Lógica para abrir el modal de edición
};
const handleCloseEditReservationPopup = () => {
    console.log("Intentando cerrar el modal de edición de reserva"); // Verifica en la consola
    setEditingReservationId(null); // Cambia el estado que controla la visibilidad del modal
};



const [editingStatusReservationId, setEditingStatusReservationId] = useState(null);
const [editingStatusReservation, setEditingStatusReservation] = useState('');

const handleCloseEditStatusReservationPopup = () => {
    setEditingStatusReservationId(null);
    setEditingStatusReservation('');
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

const [searchName, setSearchName] = useState('');
const [filteredUsers, setFilteredUsers] = useState([]);
const [showSearchResultsPopup, setShowSearchResultsPopup] = useState(false);

const handleCloseSearchResultsPopup = () => {
    setShowSearchResultsPopup(false);
    setFilteredUsers([]);
};
// Funciones para abrir/cerrar los modales
const handleOpenCreatePermissionPopup = () => setShowCreatePermissionPopup(true);
const handleCloseCreatePermissionPopup = () => setShowCreatePermissionPopup(false);
const handleOpenEditPermissionPopup = () => setEditingPermissionId(true);
const handleCloseEditPermissionPopup = () => setEditingPermissionId(null);
const handleOpenDeletePermissionPopup = () => setShowDeletePermissionPopup(true);
const handleCloseDeletePermissionPopup = () => setShowDeletePermissionPopup(false);

// Función para actualizar permisos (debes implementar la lógica de actualización)
const [userToEdit, setUserToEdit] = useState(null);
const [userToDelete, setUserToDelete] = useState(null);
const [showCreateUserPopup, setShowCreateUserPopup] = useState(false);
const [showEditUserPopup, setShowEditUserPopup] = useState(false);
const [searchTerm, setSearchTerm] = useState('');


const [showCreateUserPermissionPopup, setShowCreateUserPermissionPopup] = useState(false);
const [showEditUserPermissionPopup, setShowEditUserPermissionPopup] = useState(false);
const [showDeleteUserPermissionPopup, setShowDeleteUserPermissionPopup] = useState(false);

const [editingUserPermissionId, setEditingUserPermissionId] = useState(null);
const [userPermissionIdToDelete, setUserPermissionIdToDelete] = useState(null);
const handleCloseEditEEPopup = () => {
    console.log("Intentando cerrar el modal de edición");
    setEditingEquipmentId(null); // O cualquier estado que controle la visibilidad del modal
};


const handleOpenCreateUserPermissionPopup = () => setShowCreateUserPermissionPopup(true);
const handleCloseCreateUserPermissionPopup = () => setShowCreateUserPermissionPopup(false);

const handleOpenEditUserPermissionPopup = () => setShowEditUserPermissionPopup(true);
const handleCloseEditUserPermissionPopup = () => setShowEditUserPermissionPopup(false);

const handleOpenDeleteUserPermissionPopup = (id) => {
    setUserPermissionIdToDelete(id);
    setShowDeleteUserPermissionPopup(true);
};
const handleCloseDeleteUserPermissionPopup = () => setShowDeleteUserPermissionPopup(false);


const handleCloseDeleteUserPopup = () => setShowDeleteUserPopup(false);
const handleCloseEditUserPopup = () => setShowEditUserPopup(false);

// Función para crear un permiso (debes implementar la lógica de creación)


const handleOpenEditReservationPopup = () => {/* lógica para abrir el modal */};

const handleOpenDeleteReservationPopup = () => setShowDeleteReservationPopup(true);
const handleCloseDeleteReservationPopup = () => setShowDeleteReservationPopup(false);

const [showCreateStatusPopup, setShowCreateStatusPopup] = useState(false);
const [showDeleteStatusPopup, setShowDeleteStatusPopup] = useState(false);
const [statusToDelete, setStatusToDelete] = useState(null);
const [editingStatusId, setEditingStatusId] = useState(null);
const [editingStatus, setEditingStatus] = useState('');
const [dashboards, setDashboards] = useState([]);
const [reservationEquipmentToDelete, setReservationEquipmentToDelete] = useState(null);


const handleSearchUsers = () => {
    const results = users.filter(user => 
        user.first_Name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredUsers(results);
    setShowSearchResultsPopup(true); // Abre el popup con los resultados
};

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

const handleOpenEditEquipmentPopup = (equipment) => {
    if (equipment) {
        setEditingEquipmentId(equipment.equipment_ID || equipment.id || equipment.Equipment_ID);
        setEditingEquipmentName(equipment.equipment_Name || '');
        setEditingDescription(equipment.description || '');
        setEditingStatusEId(equipment.statusE_ID || '');
        setEditingAcquisitionDate(equipment.acquisition_date || '');
        
        // Manejo del ID del laboratorio, asegúrate de que laboratory esté definido
        if (equipment.laboratory) {
            setEditingLaboratoryId(equipment.laboratory.laboratory_ID);
        } else {
            console.warn("Laboratorio no encontrado para el equipo:", equipment);
            setEditingLaboratoryId(undefined); // O un valor por defecto
        }
        
        setShowEditPopup(true); // Asegúrate de que esta variable esté definida
    } else {
        console.error("El equipo no está definido");
    }
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




    const handleCloseEditPopup = () => setShowEditPopup(false);

    const handleOpenDeletePopup = (labId) => {
        setLaboratoryToDelete(labId);
        setShowDeletePopup(true);
    };
    const handleCloseDeletePopup = () => setShowDeletePopup(false);

    const [laboratoryNum, setLaboratoryNum] = useState(''); // inicializado como cadena vacía
    const [capacity, setCapacity] = useState(0); // puedes usar 0 o algún valor inicial
    const handleCloseEquipmentClose= () => {
        setIsEditPopupOpen(false); // Desactiva la visibilidad del popup
    };
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
const handleCloseEditReservationEquipmentPopup = () => {
    console.log("Cerrando modal de edición de reserva de equipo"); // Mensaje de verificación en la consola
    setEditingReservationEquipmentId(null); // Actualiza el estado que controla la visibilidad del modal
};

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
//PUT USER PERMISSION

                const handleUpdateUserPermission = async (userPermissionId, userId, permissionId) => {
                    if (!userPermissionId) {
                        console.error("No se encontró el permiso de usuario a editar.");
                        return;
                    }

                    try {
                        const response = await axios.put(
                            `https://electronicspace.somee.com/api/User_Permission_/${userPermissionId}?UserTypeId=${userId}&permissionId=${permissionId}`,
                            {}, 
                            { headers: { accept: 'text/plain' } }
                        );
                        console.log('Permiso de usuario actualizado:', response.data);
                        fetchData('userPermission'); // Refresca la lista de permisos de usuario
                    } catch (error) {
                        console.error('Error actualizando permiso de usuario:', error);
                    }
                };
//PUT USER TYPE

const handleUpdateUserType = async (userTypeId, userType) => {
    if (!userTypeId) {
        console.error("No se encontró el tipo de usuario a editar.");
        return;
    }

    try {
        const response = await axios.put(
            `https://electronicspace.somee.com/api/User_Type_/${userTypeId}?UserType=${userType}`,
            {},
            { headers: { accept: 'text/plain' } }
        );
        console.log('Tipo de usuario actualizado:', response.data);
        fetchData('userType'); // Refresca la lista de tipos de usuario
    } catch (error) {
        console.error('Error actualizando tipo de usuario:', error);
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
                        fetchData(''); // Refresca la lista de inventarios
                    }, {});

                    // Obtener todos los nombres únicos de los items en todos los laboratorios
                    const allItems = new Set();
                    for (const lab in inventoryCountByLab) {
                        Object.keys(inventoryCountByLab[lab]).forEach(itemName => allItems.add(itemName));
                    }
                    const labels = Array.from(allItems); // Nombres de todos los items

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

                    for (const lab in inventoryCountByLab) {
                        const items = inventoryCountByLab[lab];
                        
                        // Asegurarse de que cada conjunto de datos tenga valores para todos los labels (items)
                        const itemData = labels.map(itemName => items[itemName] || 0);

                        datasets.push({
                            label: `Laboratorio ${lab}`, // Etiqueta del laboratorio
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




//NECESITO UN ACTUALIZAR

                const [activeTable, setActiveTable] = useState('user');

                // Efecto para obtener los usuarios al montar el componente
                useEffect(() => {
                    const fetchUsers = async () => {
                        try {
                            const response = await axios.get('https://electronicspace.somee.com/api/User_', {
                                headers: { accept: 'text/plain' }
                            });
                            setUsers(response.data); // Almacenar los datos de usuarios en el estado
                        } catch (error) {
                            console.error("Error fetching users:", error);
                        }
                    };

                    const fetchLaboratories = async () => {
                        try {
                            const response = await axios.get('https://electronicspace.somee.com/api/Laboratory_', {
                                headers: { accept: 'text/plain' }
                            });
                            setLaboratories(response.data); // Almacenar los datos de laboratorios en el estado
                        } catch (error) {
                            console.error("Error fetching laboratories:", error);
                        }
                    };

                    fetchUsers(); // Llamada a la función para obtener usuarios
                    fetchLaboratories(); // Llamada a la función para obtener laboratorios
                }, []); // El array vacío asegura que solo se ejecute el componente


                // Función para manejar clics fuera del contenido del popup
                const handleCloseOnOutsideClick = (e) => {
                    if (e.target.classList.contains('modal')) {
                        setShowCreatePopup(false);
                        setShowEditPopup(false);
                        setShowDeletePopup(false);
                    }
                };



    return (
        <div className={`admin-home ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <header className="header">
                <img src={logoP} alt="Logo Proyecto" className="logoP" />
                <h1>Sistema de Gestión de Recursos y Aulas de Laboratorio</h1>
                <div className="header-buttons">
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                    <button onClick={() => navigate('/Unity')}>Simulador Unity</button>
                </div>
            </header>

            <div className="main-container">
            <div className="table-buttons-left">
                {['Dashboards', 'laboratory', 'equipments', 'inventory', 'permission', 'reservation', 'reservationequipment', 'statusequipment', 'statusreservation', 'user', 'userPermission', 'userType'].map((table) => (
                    <button key={table} onClick={() => handleTableClick(table)}>
                        {table.charAt(0).toUpperCase() + table.slice(1)} <span>{activeTable === table ? '▲' : '▼'}</span>
                    </button>
                ))}
            </div>

                <div className="table-details-right">
                    {activeTable && (
                        <>
                            <h2>{activeTable.charAt(0).toUpperCase() + activeTable.slice(1)} Details</h2>

{/* DASHBOARDS */}

                        {activeTable === 'Dashboards' && (
                                            <div>
                                            <div>
                                            <UserDashboard users={users} />

                                               {/* Búsqueda de usuarios */}
                                                <h3>Buscar Usuario por Nombre:</h3>
                                                <input
                                                    type="text"
                                                    value={searchName}
                                                    onChange={(e) => setSearchName(e.target.value)}
                                                    placeholder="Nombre a buscar"
                                                />
                                                <button onClick={() => {
                                                    const filteredUsers = users.filter(user => 
                                                        user.first_Name && user.first_Name.toLowerCase().includes(searchName.toLowerCase())
                                                    );
                                                    setFilteredUsers(filteredUsers);
                                                    setShowSearchResultsPopup(true);
                                                }}>
                                                    BUSCAR
                                                </button>

                                                 {/* Modal de Resultados de Búsqueda */}
                                            {showSearchResultsPopup && (
                                                <div className="modal">
                                                    <div className="modal-content">
                                                        <span className="close" onClick={handleCloseSearchResultsPopup}>&times;</span>
                                                        <h3>Resultados de Búsqueda:</h3>
                                                        <table className="styled-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>ID</th>
                                                                    <th>Nombre</th>
                                                                    <th>Apellido</th>
                                                                    <th>Email</th>
                                                                    <th>Tipo de Usuario</th>
                                                                    <th>Eliminado</th>
                                                                    <th>Acciones</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {filteredUsers.length > 0 ? (
                                                                    filteredUsers.map(user => (
                                                                        <tr key={user.user_ID}>
                                                                            <td>{user.user_ID}</td>
                                                                            <td>{user.first_Name || 'Sin nombre'}</td>
                                                                            <td>{user.last_Name || 'Sin apellido'}</td>
                                                                            <td>{user.email || 'N/A'}</td>
                                                                            <td>{user.user_Type?.userType || 'N/A'}</td>
                                                                            <td>{user.isDeleted ? 'Sí' : 'No'}</td>
                                                                            <td>
                                                                                {/* Botón de Editar */}
                                                                                <button onClick={() => {
                                                                                    setEditingUserId(user.user_ID);
                                                                                    setfirstName(user.first_Name || '');
                                                                                    setlastName(user.last_Name || '');
                                                                                    setemail(user.email || '');
                                                                                    setpassword(''); // Dejar vacío por motivos de seguridad
                                                                                    setuserTypeID(user.user_Type?.userTypeID || 0);
                                                                                    handleOpenEditUserPopup();
                                                                                }}>Editar</button>

                                                                                {/* Botón de Eliminar con Modal de Confirmación */}
                                                                                <button onClick={() => handleOpenDeleteUserPopup(user.user_ID)}>Eliminar</button>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="7">No se encontraron usuarios.</td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}
                                                
                                                <div className="spacing"></div> {/* Espaciador */}
                                            </div>

                                     
                                            <div className="spacing"></div> {/* Espaciador */}
                                            
                                            <button onClick={handleOpenPopup}>Explicación del Sistema de Gestión</button>
                                
                                            {showPopup && (
                                                <div className="popup">
                                                    <div className="popup-content">
                                                        <h2>Explicación del Sistema de Gestión</h2>
                                                        <div className="popup-text">
                                                            <p>
                                                                El sistema de gestión para el simulador de instrumentos de electrónica, desarrollado en el CADI de Desarrollo de Software Seguro, se centra en mejorar la experiencia educativa y optimizar la administración de recursos en un entorno académico. La plataforma gestiona roles específicos (Estudiante, Profesor y Administrador), y ofrece una interfaz adaptada a las necesidades de cada usuario, incluyendo funcionalidades avanzadas en cuanto a políticas de seguridad y requisitos de autenticación.
                                                            </p>
                                                            <p>
                                                                <strong>Link Netlify (Frontend Desplegado):</strong> <a href="https://digilabmanagmentsystem.netlify.app/login" target="_blank" rel="noopener noreferrer">https://digilabmanagmentsystem.netlify.app/login</a>
                                                            </p>
                                                            <p>
                                                                En caso de que aparezca error dar clic en: Back to our site
                                                            </p>
                                                            <p>
                                                                <strong>Link Repositorio FrontEnd:</strong> <a href="https://github.com/lopezns/FrontEnd" target="_blank" rel="noopener noreferrer">https://github.com/lopezns/FrontEnd</a><br />
                                                                <strong>Link Repositorio Backend:</strong> <a href="https://github.com/Mariana-Pinzon/Electronics-Laboratory-Classroom-and-Resource-Management-System" target="_blank" rel="noopener noreferrer">https://github.com/Mariana-Pinzon/Electronics-Laboratory-Classroom-and-Resource-Management-System</a><br />
                                                                <strong>Link Somee:</strong> <a href="https://electronicspace.somee.com/swagger/index.html" target="_blank" rel="noopener noreferrer">https://electronicspace.somee.com/swagger/index.html</a>
                                                            </p>
                                
                                                            <h4>Estructura y Roles del Sistema</h4>
                                                            <h5>Rol de Administrador</h5>
                                                            <p>
                                                                El Administrador tiene el acceso más amplio dentro del sistema, con funcionalidades que incluyen:
                                                            </p>
                                                            <ul>
                                                                <li><strong>Gestión Completa de Recursos:</strong> Puede consumir todos los endpoints, incluyendo creación, modificación y eliminación de inventarios, permisos, reservas y laboratorios.</li>
                                                                <li><strong>Mantenimiento de la Seguridad:</strong> Protege los datos y la integridad del sistema, limitando accesos según el rol de cada usuario.</li>
                                                            </ul>
                                                            <h5>Rol de Profesor</h5>
                                                            <p>
                                                                El Profesor interactúa principalmente para apoyar la educación de los estudiantes, con funcionalidades como:
                                                            </p>
                                                            <ul>
                                                                <li><strong>Apoyo Educativo:</strong> Ayuda en el uso de equipos y brinda orientación a los estudiantes.</li>
                                                                <li><strong>Acceso a Datos:</strong> Permite a los profesores ver información sobre el rendimiento de los estudiantes y sus reservas de equipos.</li>
                                                            </ul>
                                                            <h5>Rol de Estudiante</h5>
                                                            <p>
                                                                Los Estudiantes son usuarios que interactúan con el sistema para realizar prácticas y actividades de aprendizaje, con funcionalidades como:
                                                            </p>
                                                            <ul>
                                                                <li><strong>Reserva de Equipos:</strong> Pueden reservar los equipos necesarios para sus prácticas en el laboratorio.</li>
                                                                <li><strong>Consulta de Disponibilidad y Visualización de Datos:</strong> Verifica la disponibilidad de implementos y evalúa su progreso en el simulador de instrumentos.</li>
                                                            </ul>
                                
                                                            <h4>Funcionalidades de Programación y Seguridad</h4>
                                                            <h5>2.1 Autenticación de Usuarios y Registro Seguro</h5>
                                                            <p>
                                                                El sistema emplea una autenticación avanzada que asegura que cada usuario acceda según su rol, y el proceso de registro incorpora:
                                                            </p>
                                                            <ul>
                                                                <li><strong>Validación de Contraseñas:</strong> La contraseña debe cumplir con requisitos mínimos de seguridad (8 caracteres, al menos 1 número, 1 mayúscula, y 1 carácter especial).</li>
                                                                <li><strong>Confirmación de Contraseña:</strong> Se agregó un campo de confirmación de contraseña para evitar errores en el registro.</li>
                                                                <li><strong>Aceptación de Términos y Condiciones:</strong> Incluye un checkbox de aceptación de términos alineado con la ISO 27001.</li>
                                                            </ul>
                                                            <h5>2.2 Sistema de Registro y Manejo de Roles</h5>
                                                            <p>
                                                                El proceso de registro en el sistema asigna roles específicos (estudiante o profesor), gestionados desde el backend:
                                                            </p>
                                                            <ul>
                                                                <li><strong>Encriptación de Contraseñas:</strong> Asegura que las contraseñas no sean visibles para otros usuarios.</li>
                                                                <li><strong>Backend Seguro:</strong> Los endpoints gestionan y protegen la información de cada usuario.</li>
                                                            </ul>
                                                            <h5>2.3 Visualización de Información en el Simulador</h5>
                                                            <p>
                                                                En el entorno de Unity, los estudiantes pueden acceder a:
                                                            </p>
                                                            <ul>
                                                                <li><strong>Visualización de Datos de Aprendizaje y Jugabilidad:</strong> Se muestran niveles de aprendizaje, gráficas de progreso y tiempos de inicio.</li>
                                                                <li><strong>Clasificación de Niveles y Progreso:</strong> El simulador divide los niveles de aprendizaje en fases para brindar un análisis detallado.</li>
                                                            </ul>
                                
                                                            <h4>Requisitos y Evaluaciones del Sistema</h4>
                                                            <h5>3.1 Login (Autenticación de Usuarios)</h5>
                                                            <p>Acceso Seguro: Sólo permite el acceso a usuarios con credenciales válidas.</p>
                                                            <h5>3.2 Consulta de Información</h5>
                                                            <p>Carga de Datos desde el Backend: Filtrados dinámicos que permiten una búsqueda eficiente.</p>
                                                            <h5>3.3 Formularios de Creación y Actualización</h5>
                                                            <p>Validaciones Clave: Los formularios obligan a que los campos necesarios sean completados.</p>
                                                            <h5>3.4 Publicación de la Aplicación</h5>
                                                            <p>Entorno Accesible: La aplicación está desplegada en un entorno accesible con instrucciones claras.</p>
                                                            <h5>3.5 Repositorio con Control de Versiones</h5>
                                                            <p>Historial de Desarrollo Documentado: Con frecuencia de commits y mensajes claros que reflejan la evolución del sistema.</p>
                                
                                                            <h4>Funcionalidades Adicionales</h4>
                                                            <p>Interfaz y Visualización de Datos:</p>
                                                            <p>La implementación de Unity permite una visualización detallada del aprendizaje del estudiante, incluyendo:</p>
                                                            <ul>
                                                                <li><strong>Datos de Jugabilidad y Aprendizaje:</strong> Información sobre el progreso de los estudiantes y categorización de niveles.</li>
                                                                <li><strong>Filtros Dinámicos en Endpoints:</strong> Facilitan la búsqueda y categorización, mejorando la eficiencia.</li>
                                                            </ul>
                                                        </div>
                                                        <button onClick={handleClosePopup}>Cerrar</button>
                                                    </div>
                                                    <div className="popup-overlay" onClick={handleClosePopup}></div>
                                                </div>
                                                
                                            )}
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

                                    {/* Botón para crear un nuevo laboratorio */}
                                    <h3>Crear Laboratorio:</h3>
                                    <button onClick={handleOpenCreatePopup}>CREAR</button>

                                    {/* Modal de Crear */}
                                    {showCreatePopup && (
                                        <div className="modal" onClick={handleCloseCreatePopup}>
                                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                                <span className="close" onClick={handleCloseCreatePopup}>&times;</span>
                                                <h3>Crear Nuevo Laboratorio</h3>
                                                <input
                                                    type="number"
                                                    value={laboratoryNum}
                                                    onChange={(e) => setLaboratoryNum(Number(e.target.value))}
                                                    placeholder="Número de Laboratorio"
                                                />
                                                <input
                                                    type="number"
                                                    value={capacity}
                                                    onChange={(e) => setCapacity(Number(e.target.value))}
                                                    placeholder="Capacidad"
                                                />
                                                <button onClick={() => { handleCreateLaboratory(); handleCloseCreatePopup(); }}>
                                                    CREAR
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Modal de Editar */}
                                    {showEditPopup && (
                                        <div className="modal" onClick={handleCloseEditPopup}>
                                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                                <span className="close" onClick={handleCloseEditPopup}>&times;</span>
                                                <h3>Editar Laboratorio</h3>
                                                <input
                                                    type="number"
                                                    value={editingLaboratoryNum}
                                                    onChange={(e) => setEditingLaboratoryNum(Number(e.target.value))}
                                                    placeholder="Número de Laboratorio"
                                                />
                                                <input
                                                    type="number"
                                                    value={editingCapacity}
                                                    onChange={(e) => setEditingCapacity(Number(e.target.value))}
                                                    placeholder="Capacidad"
                                                />
                                                <button onClick={() => { handleUpdateLaboratory(); handleCloseEditPopup(); }}>
                                                    Guardar Cambios
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Modal de Confirmación para Eliminar */}
                                    {showDeletePopup && (
                                        <div className="modal" onClick={handleCloseDeletePopup}>
                                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                                <span className="close" onClick={handleCloseDeletePopup}>&times;</span>
                                                <h3>¿Estás seguro de que deseas eliminar este laboratorio?</h3>
                                                <button onClick={() => { handleDeleteLaboratory(laboratoryToDelete); handleCloseDeletePopup(); }}>
                                                    Confirmar
                                                </button>
                                                <button onClick={handleCloseDeletePopup}>Cancelar</button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="data-list">
                                        <h3>Datos Encontrados:</h3>
                                        <table className="styled-table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Laboratorio</th>
                                                    <th>Capacidad</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {laboratories.map((lab) => (
                                                    <tr key={lab.laboratory_ID}>
                                                        <td>{lab.laboratory_ID}</td>
                                                        <td>{lab.laboratory_Num}</td>
                                                        <td>{lab.capacity}</td>
                                                        <td>
                                                            <button onClick={() => handleOpenEditPopup(lab)}>Editar</button>
                                                            <button onClick={() => handleOpenDeletePopup(lab.laboratory_ID)}>Eliminar</button>
                                                        </td>
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

                                                {/* Modal de Crear */}
                                                {showCreatePopup && (
                                                    <div className="modal">
                                                        <div className="modal-content">
                                                            <span className="close" onClick={handleCloseCreatePopup}>&times;</span>
                                                            <h3>Crear Nuevo Equipo</h3>
                                                            <input
                                                                type="text"
                                                                value={equipmentName}
                                                                onChange={(e) => setequipmentName(e.target.value)}
                                                                placeholder="Nombre del Equipo"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={description}
                                                                onChange={(e) => setdescription(e.target.value)}
                                                                placeholder="Descripción del Equipo"
                                                            />
                                                            <input
                                                                type="number"
                                                                value={statusE_ID}
                                                                onChange={(e) => setstatusE_ID(Number(e.target.value))}
                                                                placeholder="ID del Estado (inicialmente 1)"
                                                            />
                                                            <input
                                                                type="date"
                                                                value={acquisitionDate}
                                                                onChange={(e) => setacquisitionDate(e.target.value)}
                                                                placeholder="Fecha de Adquisición (YYYY-MM-DD)"
                                                            />
                                                            <input
                                                                type="number"
                                                                value={laboratoryID}
                                                                onChange={(e) => setlaboratoryID(Number(e.target.value))}
                                                                placeholder="ID del Laboratorio"
                                                            />
                                                            <button onClick={() => { handleCreateEquipment(equipmentName, description, statusE_ID, acquisitionDate, laboratoryID); handleCloseCreatePopup(); }}>
                                                                CREAR
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                                                                    {/* Modal de Editar */}
                                                        {editingEquipmentId && (
                                                            <div className="modal">
                                                                <div className="modal-content">
                                                                    <span className="close" onClick={handleCloseEditEEPopup}>&times;</span>
                                                                    <h3>Editar Equipo</h3>
                                                                    <input
                                                                        type="text"
                                                                        value={editingEquipmentName}
                                                                        onChange={(e) => setEditingEquipmentName(e.target.value)}
                                                                        placeholder="Nombre del Equipo"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={editingDescription}
                                                                        onChange={(e) => setEditingDescription(e.target.value)}
                                                                        placeholder="Descripción del Equipo"
                                                                    />
                                                                    <input
                                                                        type="number"
                                                                        value={editingStatusEId}
                                                                        onChange={(e) => setEditingStatusEId(Number(e.target.value))}
                                                                        placeholder="ID del Estado"
                                                                    />
                                                                    <input
                                                                        type="date"
                                                                        value={editingAcquisitionDate}
                                                                        onChange={(e) => setEditingAcquisitionDate(e.target.value)}
                                                                        placeholder="Fecha de Adquisición"
                                                                    />
                                                                    <input
                                                                        type="number"
                                                                        value={editingLaboratoryId}
                                                                        onChange={(e) => setEditingLaboratoryId(Number(e.target.value))}
                                                                        placeholder="ID del Laboratorio"
                                                                    />
                                                                    <button onClick={handleUpdateEquipment}>Editar Equipo</button>
                                                                </div>
                                                            </div>
                                                        )}


                                                {/* Modal de Confirmación para Eliminar */}
                                                {showDeletePopup && (
                                                    <div className="modal">
                                                        <div className="modal-content">
                                                            <span className="close" onClick={handleCloseDeletePopup}>&times;</span>
                                                            <h3>¿Estás seguro de que deseas eliminar este equipo?</h3>
                                                            <button onClick={async () => {
                                                                await handleDeleteEquipment(equipmentToDelete); // Espera a que se complete la eliminación
                                                                handleCloseDeletePopup(); // Cierra el popup después de eliminar
                                                            }}>
                                                                Confirmar
                                                            </button>
                                                            <button onClick={handleCloseDeletePopup}>Cancelar</button>
                                                        </div>
                                                    </div>
                                                )}

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
                                                            <th>Acciones</th>
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
                                                                <td>
                                                                    <button onClick={() => {
                                                                        // Cambiado el nombre de la función para abrir el popup de edición
                                                                        handleOpenEditEquipmentPopup(equip);
                                                                    }}>Editar</button>

                                                                    <button onClick={() => {
                                                                        setEquipmentToDelete(equip.equipment_ID || equip.id || equip.Equipment_ID);
                                                                        handleOpenDeletePopup();
                                                                    }}>Eliminar</button>
                                                                </td>
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
                                            {/* Botón para crear un nuevo inventario */}
                                            <h3>Crear Inventario:</h3>
                                            <button onClick={handleOpenCreateInventoryPopup}>CREAR</button>

                                            {/* Modal de Crear Inventario */}
                                            {showCreateInventoryPopup && (
                                                <div className="modal">
                                                    <div className="modal-content">
                                                        <span className="close" onClick={handleCloseCreateInventoryPopup}>&times;</span>
                                                        <h3>Crear Nuevo Inventario</h3>
                                                        <input
                                                            type="number"
                                                            value={equipmentID}
                                                            onChange={(e) => setequipmentID(Number(e.target.value))}
                                                            placeholder="ID del Equipo"
                                                        />
                                                        <input
                                                            type="number"
                                                            value={availableQuantity}
                                                            onChange={(e) => setavailableQuantity(Number(e.target.value))}
                                                            placeholder="Cantidad Disponible"
                                                        />
                                                        <input
                                                            type="number"
                                                            value={laboratoryID}
                                                            onChange={(e) => setlaboratoryID(Number(e.target.value))}
                                                            placeholder="ID del Laboratorio"
                                                        />
                                                        <button onClick={() => { handleCreateInventory(equipmentID, availableQuantity, laboratoryID); handleCloseCreateInventoryPopup(); }}>
                                                            CREAR
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Modal de Editar Inventario */}
                                            {editingInventoryId && (
                                                <div className="modal">
                                                    <div className="modal-content">
                                                        <span className="close" onClick={handleCloseEditInventoryPopup}>&times;</span>
                                                        <h3>Editar Inventario</h3>
                                                        <input
                                                            type="number"
                                                            value={editingEquipmentId}
                                                            onChange={(e) => setEditingEquipmentId(Number(e.target.value))}
                                                            placeholder="ID del Equipo"
                                                        />
                                                        <input
                                                            type="number"
                                                            value={editingAvailableQuantity}
                                                            onChange={(e) => setEditingAvailableQuantity(Number(e.target.value))}
                                                            placeholder="Cantidad Disponible"
                                                        />
                                                        <input
                                                            type="number"
                                                            value={editingLaboratoryId}
                                                            onChange={(e) => setEditingLaboratoryId(Number(e.target.value))}
                                                            placeholder="ID del Laboratorio"
                                                        />
                                                        <button onClick={() => { handleUpdateInventory(); handleCloseEditInventoryPopup(); }}>
                                                            GUARDAR CAMBIOS
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                                {/* Modal de Confirmación para Eliminar */}
                                                {showDeleteInventoryPopup && (
                                                    <div className="modal">
                                                        <div className="modal-content">
                                                            <span className="close" onClick={handleCloseDeleteInventoryPopup}>&times;</span>
                                                            <h3>¿Estás seguro de que deseas eliminar este inventario?</h3>
                                                            <button onClick={async () => {
                                                                await handleDeleteEquipment(equipmentToDelete); // Asegúrate de que equipmentToDelete tenga el valor correcto
                                                                handleCloseDeleteInventoryPopup();
                                                            }}>
                                                                Confirmar
                                                            </button>
                                                            <button onClick={handleCloseDeleteInventoryPopup}>Cancelar</button>
                                                        </div>
                                                    </div>
                                                )}
                                            {/* Tabla de inventario existente */}
                                            <h3>Datos Encontrados:</h3>
                                            <table className="styled-table">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Item</th>
                                                        <th>Cantidad Disponible</th>
                                                        <th>Laboratorio</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {inventory.map(item => (
                                                        <tr key={item.inventory_ID}>
                                                            <td>{item.inventory_ID}</td>
                                                            <td>{item.equipment ? item.equipment.equipment_Name : 'N/A'}</td>
                                                            <td>{item.available_quantity}</td>
                                                            <td>{item.laboratory ? item.laboratory.laboratory_Num : 'N/A'}</td>
                                                            <td>
                                                                {/* Botones de Editar y Eliminar */}
                                                                <button onClick={() => {
                                                                    setEditingInventoryId(item.inventory_ID);
                                                                    setEditingEquipmentId(item.equipment_ID); // Cargar el ID del equipo para editar
                                                                    setEditingAvailableQuantity(item.available_quantity);
                                                                    setEditingLaboratoryId(item.laboratory_ID);
                                                                    handleOpenEditInventoryPopup();
                                                                }}>Editar</button>
                                                                <button onClick={() => { setInventoryToDelete(item.inventory_ID); handleOpenDeleteInventoryPopup(); }}>Eliminar</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="spacing"></div> {/* Espaciador */}
                                        </div>
                                    )}

{/* PERMISSION */}
                {activeTable === 'permission' && permissions.length > 0 && (
                    <div>
                        {/* Botón para crear un nuevo permiso */}
                        <h3>Crear Permiso:</h3>
                        <button onClick={handleOpenCreatePermissionPopup}>CREAR</button>

                        {/* Modal de Crear Permiso */}
                        {showCreatePermissionPopup && (
                            <div className="modal">
                                <div className="modal-content">
                                    <span className="close" onClick={handleCloseCreatePermissionPopup}>&times;</span>
                                    <h3>Crear Nuevo Permiso</h3>
                                    <input
                                        type="text"
                                        value={permissionName}
                                        onChange={(e) => setpermissionName(e.target.value)}
                                        placeholder="Nombre del Permiso"
                                    />
                                    <button onClick={() => { 
                                        handleCreatePermission(permissionName); 
                                        handleCloseCreatePermissionPopup(); 
                                    }}>
                                        CREAR
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Modal de Editar Permiso */}
                        {editingPermissionId && (
                            <div className="modal">
                                <div className="modal-content">
                                    <span className="close" onClick={() => { 
                                        handleCloseEditPermissionPopup(); 
                                        setEditingPermissionName(''); // Limpia el campo de nombre de permiso
                                        setEditingPermissionId(null); // Limpia el ID al cerrar el modal
                                    }}>&times;</span>
                                    <h3>Editar Permiso</h3>
                                    <input
                                        type="text"
                                        value={editingPermissionName}
                                        onChange={(e) => setEditingPermissionName(e.target.value)}
                                        placeholder="Nombre del Permiso"
                                    />
                                    <button 
                                        onClick={() => { 
                                            if (editingPermissionId && editingPermissionName) { // Verificar que ambos sean válidos
                                                handleUpdatePermission(editingPermissionId, editingPermissionName); // Asegúrate de pasar ambos
                                                handleCloseEditPermissionPopup(); 
                                                setEditingPermissionId(null); // Resetea el ID para salir del modo edición
                                                setEditingPermissionName(''); // Limpia el campo de nombre de permiso
                                            } else {
                                                console.error("ID del permiso o nombre del permiso no es válido");
                                            }
                                        }}>
                                        GUARDAR CAMBIOS
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Modal de Confirmación para Eliminar */}
                        {showDeletePermissionPopup && (
                            <div className="modal">
                                <div className="modal-content">
                                    <span className="close" onClick={handleCloseDeletePermissionPopup}>&times;</span>
                                    <h3>¿Estás seguro de que deseas eliminar este permiso?</h3>
                                    <button onClick={() => { 
                                        handleDeletePermission(permissionToDelete); 
                                        handleCloseDeletePermissionPopup(); 
                                    }}>
                                        Confirmar
                                    </button>
                                    <button onClick={handleCloseDeletePermissionPopup}>Cancelar</button>
                                </div>
                            </div>
                        )}

                        {/* Tabla de permisos existentes */}
                        <h3>Permisos Existentes:</h3>
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Permiso</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {permissions.map(perm => (
                                    <tr key={perm.permission_ID}>
                                        <td>{perm.permission_ID}</td>
                                        <td>{perm.permissionName || 'N/A'}</td>
                                        <td>
                                            {/* Botones de Editar y Eliminar */}
                                            <button onClick={() => {
                                                setEditingPermissionId(perm.permission_ID); // Establece el ID del permiso a editar
                                                setEditingPermissionName(perm.permissionName || ''); // Asegúrate de que tenga un valor
                                                handleOpenEditPermissionPopup(); // Abre el modal de edición
                                            }}>Editar</button>

                                            <button onClick={() => { 
                                                setPermissionToDelete(perm.permission_ID); 
                                                handleOpenDeletePermissionPopup(); 
                                            }}>Eliminar</button>
                                        </td>
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


 {/* RESERVATION EQUIPMENT*/}   
                                {activeTable === 'reservationequipment' && reservationE.length > 0 && (
                                    <div>
                                        <h3>Crear Reserva de Equipo:</h3>
                                        <button onClick={handleOpenCreateReservationPopup}>CREAR</button>

                                        {/* Modal de Crear Reserva */}
                                        {showCreateReservationPopup && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <span className="close" onClick={handleCloseCreateReservationPopup}>&times;</span>
                                                    <h3>Crear Nueva Reserva</h3>
                                                    <input
                                                        type="number"
                                                        value={equipmentID}
                                                        onChange={(e) => setequipmentID(Number(e.target.value))}
                                                        placeholder="ID del Equipo"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={quantity}
                                                        onChange={(e) => setquantity(Number(e.target.value))}
                                                        placeholder="Cantidad"
                                                    />
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
                                                        type="date"
                                                        value={reservationDate}
                                                        onChange={(e) => setreservationDate(e.target.value)}
                                                    />
                                                    <input
                                                        type="time"
                                                        value={startTime}
                                                        onChange={(e) => setstartTime(e.target.value)}
                                                    />
                                                    <input
                                                        type="time"
                                                        value={endTime}
                                                        onChange={(e) => setendTime(e.target.value)}
                                                    />
                                                    <input
                                                        type="number"
                                                        value={statusRId}
                                                        onChange={(e) => setstatusRId(Number(e.target.value))}
                                                        placeholder="ID del Estado de Reserva"
                                                    />
                                                    <button onClick={() => {
                                                        handleCreateReservationEquipment(equipmentID, quantity, userId, laboratoryID, reservationDate, startTime, endTime, statusRId);
                                                        handleCloseCreateReservationPopup(); // Cerrar el popup después de crear
                                                    }}>
                                                        CREAR
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                      {/* Modal de Editar Reserva de Equipo */}
                                        {editingReservationEquipmentId && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <span className="close" onClick={handleCloseEditReservationEquipmentPopup}>&times;</span>
                                                    <h3>Editar Reserva de Equipo</h3>
                                                    <input
                                                        type="number"
                                                        value={editingEquipmentId}
                                                        onChange={(e) => setEditingEquipmentId(Number(e.target.value))}
                                                        placeholder="ID del Equipo"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={editingQuantity}
                                                        onChange={(e) => setEditingQuantity(Number(e.target.value))}
                                                        placeholder="Cantidad"
                                                    />
                                                    <input
                                                        type="date"
                                                        value={editingReservationDate}
                                                        onChange={(e) => setEditingReservationDate(e.target.value)}
                                                        placeholder="Fecha de Reserva"
                                                    />
                                                    <button onClick={() => {
                                                        handleUpdateReservationEquipment(); // Actualizar la reserva
                                                        handleCloseEditReservationEquipmentPopup(); // Cerrar el modal
                                                    }}>
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
                                                    <button onClick={async () => {
                                                        await handleDeleteReservationEquipment(reservationEquipmentToDelete);
                                                        handleCloseDeleteReservationPopup();
                                                    }}>
                                                        Confirmar
                                                    </button>
                                                    <button onClick={handleCloseDeleteReservationPopup}>Cancelar</button>
                                                </div>
                                            </div>
                                        )}

                                        <h3>Datos Encontrados:</h3>
                                        <table className="styled-table">
                                            <thead>
                                                <tr>
                                                    <th>ID Equipo</th>
                                                    <th>Nombre del Equipo</th>
                                                    <th>Descripción</th>
                                                    <th>Cantidad</th>
                                                    <th>Fecha de Adquisición</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reservationE.map(res => (
                                                    <tr key={res.reservationE_ID}>
                                                        <td>{res.equipment ? res.equipment.equipment_ID : 'N/A'}</td>
                                                        <td>{res.equipment ? res.equipment.equipment_Name : 'N/A'}</td>
                                                        <td>{res.equipment ? res.equipment.description : 'N/A'}</td>
                                                        <td>{res.quantity || 'N/A'}</td>
                                                        <td>{res.equipment ? res.equipment.acquisition_date : 'N/A'}</td>
                                                        <td>
                                                            <button onClick={() => {
                                                                setEditingReservationEquipmentId(res.reservationE_ID);
                                                                setEditingEquipmentId(res.equipment ? res.equipment.equipment_ID : null);
                                                                setEditingQuantity(res.quantity);
                                                                setEditingReservationDate(res.reservation_date);
                                                                setEditingStartTime(res.start_time);
                                                                setEditingEndTime(res.end_time);
                                                                handleOpenEditReservationEquipmentPopup();
                                                            }}>Editar</button>

                                                            <button onClick={() => {
                                                                setReservationEquipmentToDelete(res.reservationE_ID);
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


 {/* STATUS EQUIPMENT*/}  
                                {activeTable === 'statusequipment' && StatusEquipment.length > 0 && (
                                    <div>
                                        {/* Botón para crear un nuevo estado de equipo */}
                                        <h3>Crear Status Equipment:</h3>
                                        <button onClick={handleOpenCreateStatusPopup}>CREAR</button>

                                        {/* Modal de Crear Estado de Equipo */}
                                        {showCreateStatusPopup && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <span className="close" onClick={handleCloseCreateStatusPopup}>&times;</span>
                                                    <h3>Crear Nuevo Estado de Equipo</h3>
                                                    <input
                                                        type="text"
                                                        value={status}
                                                        onChange={(e) => setstatus(e.target.value)}
                                                        placeholder="Estado de Reserva"
                                                    />
                                                    <button onClick={() => { 
                                                        handleCreateStatusEquipment(status); 
                                                        handleCloseCreateStatusPopup(); 
                                                    }}>
                                                        CREAR
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                            {/* Modal de Editar Estado de Equipo */}
                                            {editingStatusId && (
                                                <div className="modal">
                                                    <div className="modal-content">
                                                        <span className="close" onClick={handleCloseEditStatusPopup}>&times;</span>
                                                        <h3>Editar Estado de Equipo</h3>
                                                        <input
                                                            type="text"
                                                            value={editingStatus}
                                                            onChange={(e) => setEditingStatus(e.target.value)}
                                                            placeholder="Estado de Reserva"
                                                        />
                                                        <button onClick={() => { 
                                                            handleUpdateStatusEquipment(editingStatusId, editingStatus); 
                                                            handleCloseEditStatusPopup(); 
                                                        }}>
                                                            GUARDAR CAMBIOS
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                        {/* Modal de Confirmación para Eliminar Estado de Equipo */}
                                        {showDeleteStatusPopup && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <span className="close" onClick={handleCloseDeleteStatusPopup}>&times;</span>
                                                    <h3>¿Estás seguro de que deseas eliminar este estado de equipo?</h3>
                                                    <button onClick={() => { 
                                                        handleDeleteStatusEquipment(statusToDelete); 
                                                        handleCloseDeleteStatusPopup(); 
                                                    }}>
                                                        Confirmar
                                                    </button>
                                                    <button onClick={handleCloseDeleteStatusPopup}>Cancelar</button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Tabla de estados de equipo existentes */}
                                        <h3>Datos Encontrados:</h3>
                                        <table className="styled-table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Estado</th>
                                                    <th>Eliminado</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {StatusEquipment.map(stat => (
                                                    <tr key={stat.statusE_ID}>
                                                        <td>{stat.statusE_ID}</td>
                                                        <td>{stat.status || 'N/A'}</td>
                                                        <td>{stat.isDeleted ? 'Sí' : 'No'}</td>
                                                        <td>
                                                            {/* Botón de Editar */}
                                                            <button onClick={() => {
                                                                setEditingStatusId(stat.statusE_ID);
                                                                setEditingStatus(stat.status || '');
                                                                handleOpenEditStatusPopup();
                                                            }}>Editar</button>

                                                            {/* Botón de Eliminar */}
                                                            <button onClick={() => { 
                                                                setStatusToDelete(stat.statusE_ID); 
                                                                handleOpenDeleteStatusPopup(); 
                                                            }}>
                                                                Eliminar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="spacing"></div> {/* Espaciador */}
                                    </div>
                                )}

 {/* STATUS RESERVATION*/} 
                                {activeTable === 'statusreservation' && StatusReservation.length > 0 && (
                                    <div>
                                        {/* Formulario para crear un nuevo estado de reserva */}
                                        <h3>Crear Estado de Reserva:</h3>
                                        <input
                                            type="text" // Cambiado a texto para aceptar un string
                                            value={statusR} // Cambiado para reflejar el nuevo estado
                                            onChange={(e) => setstatusR(e.target.value)} // Actualiza el estado correspondiente
                                            placeholder="Nombre del Estado de Reserva"
                                        />
                                        <button onClick={() => handleCreateStatusReservation(statusR)}>
                                            CREAR
                                        </button>

                                        {/* Modal de Editar Estado de Reserva */}
                                        {editingStatusReservationId && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <span className="close" onClick={handleCloseEditStatusReservationPopup}>&times;</span>
                                                    <h3>Editar Estado de Reserva</h3>
                                                    <input
                                                        type="text"
                                                        value={editingStatusReservation} // Valor del estado de reserva que se está editando
                                                        onChange={(e) => setEditingStatusReservation(e.target.value)} // Actualiza el valor
                                                        placeholder="Nuevo Nombre del Estado de Reserva"
                                                    />
                                                    <button onClick={() => { handleUpdateStatusReservation(editingStatusReservationId, editingStatusReservation); handleCloseEditStatusReservationPopup(); }}>
                                                        GUARDAR CAMBIOS
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Tabla de estados de reserva existentes */}
                                        <h3>Datos Encontrados:</h3>
                                        <table className="styled-table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Estado</th>
                                                    <th>Eliminado</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {StatusReservation.map(stat => (
                                                    <tr key={stat.statusR_ID}>
                                                        <td>{stat.statusR_ID}</td>
                                                        <td>{stat.statusR || 'N/A'}</td>
                                                        <td>{stat.isDeleted ? 'Sí' : 'No'}</td>
                                                        <td>
                                                            {/* Botones de Editar y Eliminar */}
                                                            <button onClick={() => {
                                                                setEditingStatusReservationId(stat.statusR_ID); // Carga el ID del estado para editar
                                                                setEditingStatusReservation(stat.statusR); // Carga el estado actual
                                                                handleOpenEditStatusReservationPopup(); // Abre el modal de edición
                                                            }}>Editar</button>
                                                            <button onClick={() => handleDeleteStatusReservation(stat.statusR_ID)}>Eliminar</button>
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
                                        {/* Botón para crear un nuevo usuario */}
                                        <h3>Crear Usuario:</h3>
                                        <button onClick={handleOpenCreateUserPopup}>CREAR</button>

                                        {/* Modal de Crear Usuario */}
                                        {showCreateUserPopup && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <span className="close" onClick={handleCloseCreateUserPopup}>&times;</span>
                                                    <h3>Crear Nuevo Usuario</h3>
                                                    <input
                                                        type="text"
                                                        value={firstName}
                                                        onChange={(e) => setfirstName(e.target.value)}
                                                        placeholder="Nombre"
                                                        required
                                                    />
                                                    <input
                                                        type="text"
                                                        value={lastName}
                                                        onChange={(e) => setlastName(e.target.value)}
                                                        placeholder="Apellido"
                                                        required
                                                    />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setemail(e.target.value)}
                                                        placeholder="Email"
                                                        required
                                                    />
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setpassword(e.target.value)}
                                                        placeholder="Contraseña"
                                                        required
                                                    />
                                                    <input
                                                        type="number"
                                                        value={userTypeID}
                                                        onChange={(e) => setuserTypeID(Number(e.target.value))}
                                                        placeholder="ID del Tipo de Usuario"
                                                        required
                                                    />
                                                    <button onClick={() => {
                                                        handleCreateUser(firstName, lastName, email, password, userTypeID);
                                                        handleCloseCreateUserPopup();
                                                    }}>
                                                        CREAR
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Tabla de usuarios existentes */}
                                        <h3>Datos Encontrados:</h3>
                                        <table className="styled-table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Apellido</th>
                                                    <th>Email</th>
                                                    <th>Tipo de Usuario</th>
                                                    <th>Eliminado</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map(user => (
                                                    <tr key={user.user_ID}>
                                                        <td>{user.user_ID}</td>
                                                        <td>{user.first_Name || 'Sin nombre'}</td>
                                                        <td>{user.last_Name || 'Sin apellido'}</td>
                                                        <td>{user.email || 'N/A'}</td>
                                                        <td>{user.user_Type?.userType || 'N/A'}</td>
                                                        <td>{user.isDeleted ? 'Sí' : 'No'}</td>
                                                        <td>
                                                            {/* Botón de Editar */}
                                                            <button onClick={() => {
                                                                setEditingUserId(user.user_ID);
                                                                setfirstName(user.first_Name || '');
                                                                setlastName(user.last_Name || '');
                                                                setemail(user.email || '');
                                                                setpassword(''); // Dejar vacío por motivos de seguridad
                                                                setuserTypeID(user.user_Type?.userTypeID || 0);
                                                                handleOpenEditUserPopup();
                                                            }}>Editar</button>

                                                            {/* Botón de Eliminar con Modal de Confirmación */}
                                                            <button onClick={() => handleOpenDeleteUserPopup(user.user_ID)}>Eliminar</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="spacing"></div> {/* Espaciador */}
                                        {/* Modal de Confirmación para Eliminar Usuario */}
                                        {showDeleteUserPopup && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <span className="close" onClick={handleCloseDeleteUserPopup}>&times;</span>
                                                    <h3>¿Estás seguro de que deseas eliminar este usuario?</h3>
                                                    <button onClick={() => {
                                                        handleDeleteUser(userIdToDelete);
                                                        handleCloseDeleteUserPopup();
                                                    }}>
                                                        Confirmar
                                                    </button>
                                                    <button onClick={handleCloseDeleteUserPopup}>Cancelar</button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Modal de Editar Usuario */}
                                        {editingUserId && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <span className="close" onClick={() => {
                                                        handleCloseEditUserPopup();
                                                        setEditingUserId(null);
                                                    }}>&times;</span>
                                                    <h3>Editar Usuario</h3>
                                                    <input
                                                        type="text"
                                                        value={firstName}
                                                        onChange={(e) => setfirstName(e.target.value)}
                                                        placeholder="Nombre"
                                                        required
                                                    />
                                                    <input
                                                        type="text"
                                                        value={lastName}
                                                        onChange={(e) => setlastName(e.target.value)}
                                                        placeholder="Apellido"
                                                        required
                                                    />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setemail(e.target.value)}
                                                        placeholder="Email"
                                                        required
                                                    />
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setpassword(e.target.value)}
                                                        placeholder="Contraseña"
                                                        required
                                                    />
                                                    <input
                                                        type="number"
                                                        value={userTypeID}
                                                        onChange={(e) => setuserTypeID(Number(e.target.value))}
                                                        placeholder="ID del Tipo de Usuario"
                                                        required
                                                    />
                                                    <button onClick={() => {
                                                        if (editingUserId) {
                                                            handleUpdateUser(editingUserId, firstName, lastName, email, password, userTypeID);
                                                            handleCloseEditUserPopup();
                                                            setEditingUserId(null);
                                                        }
                                                    }}>
                                                        GUARDAR CAMBIOS
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        <div className="spacing"></div> {/* Espaciador */}
                                    </div>
                                )}


 {/* USER PERMISSION*/} 

                            {activeTable === 'userPermission' && userPermissions.length > 0 && (
                                <div>
                                    {/* Botón para crear un nuevo permiso de usuario */}
                                    <h3>Crear Permiso de Usuario:</h3>
                                    <button onClick={handleOpenCreateUserPermissionPopup}>CREAR</button>

                                    {/* Modal de Crear Permiso de Usuario */}
                                    {showCreateUserPermissionPopup && (
                                        <div className="modal">
                                            <div className="modal-content">
                                                <span className="close" onClick={handleCloseCreateUserPermissionPopup}>&times;</span>
                                                <h3>Crear Nuevo Permiso de Usuario</h3>
                                                <input
                                                    type="number"
                                                    value={userId}
                                                    onChange={(e) => setuserId(Number(e.target.value))}
                                                    placeholder="ID del Usuario"
                                                    required
                                                />
                                                <input
                                                    type="number"
                                                    value={permissionId}
                                                    onChange={(e) => setpermissionId(Number(e.target.value))}
                                                    placeholder="ID del Permiso"
                                                    required
                                                />
                                                <button onClick={() => {
                                                    handleCreateUserPermission(userId, permissionId);
                                                    handleCloseCreateUserPermissionPopup();
                                                }}>
                                                    CREAR
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Tabla de permisos de usuario existentes */}
                                    <h3>Datos Encontrados:</h3>
                                    <table className="styled-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tipo de Usuario</th>
                                                <th>Permiso</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userPermissions.map(userPerm => (
                                                <tr key={userPerm.userP_ID}>
                                                    <td>{userPerm.userP_ID}</td>
                                                    <td>{userPerm.user_Type ? userPerm.user_Type.userType : 'N/A'}</td>
                                                    <td>{userPerm.permission ? userPerm.permission.permissionName : 'N/A'}</td>
                                                    <td>
                                                        {/* Botón de Editar */}
                                                        <button onClick={() => {
                                                            setEditingUserPermissionId(userPerm.userP_ID);
                                                            setuserId(userPerm.userId || '');
                                                            setpermissionId(userPerm.permissionId || '');
                                                            handleOpenEditUserPermissionPopup();
                                                        }}>Editar</button>

                                                        {/* Botón de Eliminar con Modal de Confirmación */}
                                                        <button onClick={() => handleOpenDeleteUserPermissionPopup(userPerm.userP_ID)}>Eliminar</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="spacing"></div> {/* Espaciador */}

                                    {/* Modal de Confirmación para Eliminar Permiso de Usuario */}
                                    {showDeleteUserPermissionPopup && (
                                        <div className="modal">
                                            <div className="modal-content">
                                                <span className="close" onClick={handleCloseDeleteUserPermissionPopup}>&times;</span>
                                                <h3>¿Estás seguro de que deseas eliminar este permiso de usuario?</h3>
                                                <button onClick={() => {
                                                    handleDeleteUserPermission(userPermissionIdToDelete);
                                                    handleCloseDeleteUserPermissionPopup();
                                                }}>
                                                    Confirmar
                                                </button>
                                                <button onClick={handleCloseDeleteUserPermissionPopup}>Cancelar</button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Modal de Editar Permiso de Usuario */}
                                    {editingUserPermissionId && (
                                        <div className="modal">
                                            <div className="modal-content">
                                                <span className="close" onClick={() => {
                                                    handleCloseEditUserPermissionPopup();
                                                    setEditingUserPermissionId(null);
                                                }}>&times;</span>
                                                <h3>Editar Permiso de Usuario</h3>
                                                <input
                                                    type="number"
                                                    value={userId}
                                                    onChange={(e) => setuserId(Number(e.target.value))}
                                                    placeholder="ID del Usuario"
                                                    required
                                                />
                                                <input
                                                    type="number"
                                                    value={permissionId}
                                                    onChange={(e) => setpermissionId(Number(e.target.value))}
                                                    placeholder="ID del Permiso"
                                                    required
                                                />
                                                <button onClick={() => {
                                                    if (editingUserPermissionId) {
                                                        handleUpdateUserPermission(editingUserPermissionId, userId, permissionId);
                                                        handleCloseEditUserPermissionPopup();
                                                        setEditingUserPermissionId(null);
                                                    }
                                                }}>
                                                    GUARDAR CAMBIOS
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="spacing"></div> {/* Espaciador */}
                                </div>
                            )}


 {/* USER TYPE*/} 

                            {activeTable === 'userType' && userTypes.length > 0 && (
                                <>
                                    <h3>Crear Tipo de Usuario:</h3>
                                    <input
                                        type="text"
                                        value={userType}
                                        onChange={(e) => setUserType(e.target.value)}
                                        placeholder="Nombre del Tipo de Usuario"
                                    />
                                    <button onClick={() => handleCreateUserType(userType)}>
                                        CREAR
                                    </button>

                                    <h3>Datos Encontrados:</h3>
                                    <table className="styled-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tipo de Usuario</th>
                                                <th>Eliminado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userTypes.map(userType => (
                                                <tr key={userType.user_Type_ID}>
                                                    <td>{userType.user_Type_ID}</td>
                                                    <td>{userType.userType || 'N/A'}</td>
                                                    <td>{userType.isDeleted ? 'Sí' : 'No'}</td>
                                                    <td>
                                                        {/* Botón de Editar */}
                                                        <button onClick={() => {
                                                            setEditingUserTypeId(userType.user_Type_ID);
                                                            setUserType(userType.userType || '');
                                                            handleOpenEditUserTypePopup();
                                                        }}>Editar</button>

                                                        {/* Botón de Eliminar con Modal de Confirmación */}
                                                        <button onClick={() => handleOpenDeleteUserTypePopup(userType.user_Type_ID)}>Eliminar</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="spacing"></div>

                                    {/* Modal de Confirmación para Eliminar Tipo de Usuario */}
                                    {showDeleteUserTypePopup && (
                                        <div className="modal">
                                            <div className="modal-content">
                                                <span className="close" onClick={handleCloseDeleteUserTypePopup}>&times;</span>
                                                <h3>¿Estás seguro de que deseas eliminar este tipo de usuario?</h3>
                                                <button onClick={() => {
                                                    handleDeleteUserType(userTypeIdToDelete);
                                                    handleCloseDeleteUserTypePopup();
                                                }}>
                                                    Confirmar
                                                </button>
                                                <button onClick={handleCloseDeleteUserTypePopup}>Cancelar</button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Modal de Editar Tipo de Usuario */}
                                    {editingUserTypeId && (
                                        <div className="modal">
                                            <div className="modal-content">
                                                <span className="close" onClick={() => {
                                                    handleCloseEditUserTypePopup();
                                                    setEditingUserTypeId(null);
                                                }}>&times;</span>
                                                <h3>Editar Tipo de Usuario</h3>
                                                <input
                                                    type="text"
                                                    value={userType}
                                                    onChange={(e) => setUserType(e.target.value)}
                                                    placeholder="Nombre del Tipo de Usuario"
                                                    required
                                                />
                                                <button onClick={() => {
                                                    if (editingUserTypeId) {
                                                        handleUpdateUserType(editingUserTypeId, userType);
                                                        handleCloseEditUserTypePopup();
                                                        setEditingUserTypeId(null);
                                                    }
                                                }}>
                                                    GUARDAR CAMBIOS
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="spacing"></div>
                                </>
                            )}







                         {/*AQUI TERMINA EL CODIGO REVISAR QUE NO ESTÉ EL ERROR*/} 
                        </>

                    )}
                </div>
            </div>
        </div>
    );
};


export default AdminHome;
