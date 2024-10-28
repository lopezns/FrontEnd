

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TeacherHome.css'; // Asegúrate de que este archivo contenga los estilos correctos
import logoP from '../assets/LOGOPROJECT.png'; // Asegúrate de usar la ruta correcta

const TeacherHome = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeTable, setActiveTable] = useState(null); // Solo una tabla activa
// GET STATUS EQUIPMENT
const [status, setstatus] = useState([]);

const [StatusEquipment, setStatusEquipment] = useState([]);
const [StatusReservation, setStatusReservation] = useState([]);
const [editingEquipmentId, setEditingEquipmentId] = useState(null);


// GET STATUS RESERVATION
const handleOpenEditPopup = (equip) => {
    setEditingEquipmentId(equip.equipmentID); // Asegúrate de que el nombre esté en mayúsculas correctamente
    setEditingEquipmentName(equip.equipment_Name);
    setEditingDescription(equip.description);
    setEditingStatusEId(equip.statusE_ID);
    setEditingAcquisitionDate(equip.acquisition_date);
    setEditingLaboratoryId(equip.laboratory_ID);
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


// Funciones para abrir/cerrar los modales
const handleOpenCreatePermissionPopup = () => setShowCreatePermissionPopup(true);
const handleCloseCreatePermissionPopup = () => setShowCreatePermissionPopup(false);
const handleOpenEditPermissionPopup = () => setEditingPermissionId(true);
const handleCloseEditPermissionPopup = () => setEditingPermissionId(null);
const handleOpenDeletePermissionPopup = () => setShowDeletePermissionPopup(true);
const handleCloseDeletePermissionPopup = () => setShowDeletePermissionPopup(false);

// Función para actualizar permisos (debes implementar la lógica de actualización)


// Función para crear un permiso (debes implementar la lógica de creación)


const handleOpenCreateReservationPopup = () => setShowCreateReservationPopup(true);
const handleCloseCreateReservationPopup = () => setShowCreateReservationPopup(false);
const handleOpenEditReservationPopup = () => {/* lógica para abrir el modal */};
const handleCloseEditReservationPopup = () => {/* lógica para cerrar el modal */};
const handleOpenDeleteReservationPopup = () => setShowDeleteReservationPopup(true);
const handleCloseDeleteReservationPopup = () => setShowDeleteReservationPopup(false);

const [showCreateStatusPopup, setShowCreateStatusPopup] = useState(false);
const [showDeleteStatusPopup, setShowDeleteStatusPopup] = useState(false);
const [statusToDelete, setStatusToDelete] = useState(null);
const [editingStatusId, setEditingStatusId] = useState(null);
const [editingStatus, setEditingStatus] = useState('');

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



const handleOpenEditStatusPopup = () => {
    // Lógica para abrir el modal de edición si es necesario
};


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
//POST 1

//POST 2
    const [equipmentName, setequipmentName] = useState([]);
    const [description, setdescription] = useState([]);
    const [statusE_ID, setstatusE_ID] = useState([]);
    const [acquisitionDate, setacquisitionDate] = useState([]);
    const [laboratory_ID, setlaboratory_ID] = useState([]);
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
                            `https://electronicspace.somee.com/api/Equipment_/${editingEquipmentId}?Equipment_Name=${editingEquipmentName}&Description=${editingDescription}&StatusE_ID=${editingStatusEId}&Acquisition_date=${editingAcquisitionDate}&Laboratory_ID=${editingLaboratoryId}`,
                            null, // No se envía un cuerpo en este PUT request
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
                    if (typeof editingPermissionId !== 'number' || !editingPermissionName) {
                        console.error('ID del permiso o nombre del permiso no es válido');
                        return;
                    }

                    try {
                        const response = await axios.put(
                            `https://electronicspace.somee.com/api/Permission_/${editingPermissionId}?PermissionName=${encodeURIComponent(editingPermissionName)}`,
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
    try {
        const response = await axios.put(
            `https://electronicspace.somee.com/api/User_/${userId}`,
            {
                First_Name: firstName,
                Last_Name: lastName,
                Email: email,
                Password: password,
                User_Type_ID: userTypeId,
            },
            { headers: { accept: 'text/plain' } }
        );
        console.log('Usuario actualizado:', response.data);
        fetchData('user'); // Refresca la lista de usuarios
    } catch (error) {
        console.error('Error actualizando usuario:', error);
    }
};

//ALGO QUE FUNCIONA POR ACÁ

                // Función para abrir el popup de edición de equipos
                const handleOpenEditEquipmentPopup = (equip) => {
                    console.log('Equipo a editar:', equip);

                    if (!equip) {
                        console.error('El objeto equip es undefined');
                        return; // Salir si equip es undefined
                    }

                    setEditingEquipmentId(equip.equipment_ID);
                    setEditingEquipmentName(equip.equipment_Name);
                    setEditingDescription(equip.description);
                    setEditingStatusEId(equip.statusE_ID);
                    setEditingAcquisitionDate(equip.acquisition_date);
                    setEditingLaboratoryId(equip.laboratory_ID);
                    setShowEditPopup(true); // Abre el popup de edición de equipos
                };

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
                    const response = await axios.delete(`https://electronicspace.somee.com/api/Equipment_/${equipment_ID}`, {
                        //timeout: 5000, // 5 segundos de timeout
                    });
                    console.log('Equipo eliminado:', response.data);
                    fetchData('equipments');
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
            const handleDeleteUser = async (user_ID) => {
                try {
                    const response = await axios.delete(`https://electronicspace.somee.com/api/User_/${user_ID}`, {
                        //timeout: 5000, // 5 segundos de timeout
                    });
                    console.log('Usuario Eliminado:', response.data);
                    fetchData('user');
                } catch (error) {
                    console.error('Error eliminando Usuario: ', error);
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

    return (
        <div className={`admin-home ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <header className="header">
                <img src={logoP} alt="Logo Proyecto" className="logoP" />
                <h1>Sistema de Gestión de Recursos y Aulas de Laboratorio</h1>
                <div className="header-buttons">

                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </header>

            <div className="main-container">
                <div className="table-buttons-left">
                    {['laboratory', 'equipments', 'inventory', 'permission', 'reservation','reservationequipment', 'statusequipment','statusreservation', 'user', 'userPermission', 'userType'].map((table) => (
                        <button key={table} onClick={() => handleTableClick(table)}>
                            {table.charAt(0).toUpperCase() + table.slice(1)} <span>{activeTable === table ? '▲' : '▼'}</span>
                        </button>
                    ))}
                </div>

                <div className="table-details-right">
                    {activeTable && (
                        <>
                            <h2>{activeTable.charAt(0).toUpperCase() + activeTable.slice(1)} Details</h2>



{/* LABORATORY */}
                                    {activeTable === 'laboratory' && laboratories.length > 0 && (
                            <div>
                                <h3>Crear Laboratorio:</h3>
                                <button onClick={handleOpenCreatePopup}>CREAR</button>

                                {/* Modal de Crear */}
                                {showCreatePopup && (
                                    <div className="modal">
                                        <div className="modal-content">
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
                                    <div className="modal">
                                        <div className="modal-content">
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
                                    <div className="modal">
                                        <div className="modal-content">
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
                                                    <button onClick={() => {
                                                        // Establecer los valores para editar
                                                        setEditingLaboratoryNum(lab.laboratory_Num);
                                                        setEditingCapacity(lab.capacity);
                                                        setEditingLaboratoryId(lab.laboratory_ID); // Establecer el ID del laboratorio que se está editando
                                                        handleOpenEditPopup(); // Abrir el popup de edición
                                                    }}>
                                                        Editar
                                                    </button>
                                                    <button onClick={() => handleOpenDeletePopup(lab.laboratory_ID)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                    </table>
                                </div>
                            </div>
                        )}


{/* EQUIPMENT */}
                                        
                                {activeTable === 'equipments' && equipments.length > 0 && (
                                    <div>
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
                                                        value={laboratory_ID}
                                                        onChange={(e) => setlaboratory_ID(Number(e.target.value))}
                                                        placeholder="ID del Laboratorio"
                                                    />
                                                    <button onClick={() => { handleCreateEquipment(equipmentName, description, statusE_ID, acquisitionDate, laboratory_ID); handleCloseCreatePopup(); }}>
                                                        CREAR
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Modal de Editar */}
                                        {editingEquipmentId && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <span className="close" onClick={handleCloseEditPopup}>&times;</span>
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
                                                    <button onClick={() => { handleDeleteEquipment(equipmentToDelete); handleCloseDeletePopup(); }}>
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
                                                    <tr key={equip.equipmentID}>
                                                        <td>{equip.equipmentID}</td>
                                                        <td>{equip.equipment_Name || 'N/A'}</td>
                                                        <td>{equip.description || 'N/A'}</td>
                                                        <td>{equip.status_Equipment ? equip.status_Equipment.status : 'N/A'}</td>
                                                        <td>{equip.laboratory ? equip.laboratory.laboratory_Num : 'N/A'}</td>
                                                        <td>
                                                            <button onClick={() => {
                                                                setEditingEquipmentId(equip.equipmentID);
                                                                setEditingEquipmentName(equip.equipment_Name);
                                                                setEditingDescription(equip.description);
                                                                setEditingStatusEId(equip.statusE_ID);
                                                                setEditingAcquisitionDate(equip.acquisition_date);
                                                                setEditingLaboratoryId(equip.laboratory_ID);
                                                                handleOpenEditPopup();
                                                            }}>Editar</button>
                                                            <button onClick={() => { setEquipmentToDelete(equip.equipmentID); handleOpenDeletePopup(); }}>Eliminar</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}


   {/* INVENTORY */}
                {activeTable === 'inventory' && inventory.length > 0 && (
                    <div>
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
                                    <button onClick={() => { handleDeleteInventory(inventoryToDelete); handleCloseDeleteInventoryPopup(); }}>
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
                    </div>
                )}

{/* PERMISSION */}
                                {activeTable === 'permission' && permissions.length > 0 && (
                                    <div>
                                        
                                                                   

                                        {/* Tabla de permisos existentes */}
                                        <h3>Permisos Existentes:</h3>
                                        <table className="styled-table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Permiso</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {permissions.map(perm => (
                                                    <tr key={perm.permission_ID}>
                                                        <td>{perm.permission_ID}</td>
                                                        <td>{perm.permissionName || 'N/A'}</td>
                                                       
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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
                                                        value={laboratory_ID}
                                                        onChange={(e) => setlaboratory_ID(Number(e.target.value))}
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
                                                    <button onClick={() => { handleCreateReservation(userId, laboratory_ID, reservationEquipments, reservationDate, startTime, endTime, statusRId); handleCloseCreateReservationPopup(); }}>
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
                                                    <th>ID de Laboratorio</th>
                                                    <th>Equipos Reservados</th>
                                                    <th>Fecha de Reserva</th>
                                                    <th>Hora de Inicio</th>
                                                    <th>Hora de Fin</th>
                                                    <th>ID de Estado</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reservations.map(res => (
                                                    <tr key={res.reservation_ID}>
                                                        <td>{res.user ? res.user.user_ID : 'N/A'}</td>
                                                        <td>{res.laboratory ? res.laboratory.laboratory_ID : 'N/A'}</td>
                                                        <td>
                                                            {res.reservation_Equipments && res.reservation_Equipments.length > 0
                                                                ? res.reservation_Equipments.map(equipment => equipment.equipment ? equipment.equipment.equipment_Name : 'N/A').join(', ')
                                                                : 'N/A'}
                                                        </td>
                                                        <td>{res.reservation_date || 'N/A'}</td>
                                                        <td>{res.start_time || 'N/A'}</td>
                                                        <td>{res.end_time || 'N/A'}</td>
                                                        <td>{res.status_Reservation ? res.status_Reservation.statusR_ID : 'N/A'}</td>
                                                        <td>
                                                            <button onClick={() => {
                                                                setEditingReservationId(res.reservation_ID);
                                                                setEditingUserId(res.user_ID); // Cargar el ID del usuario para editar
                                                                setEditingLaboratoryId(res.laboratory_ID);
                                                                setEditingReservationEquipments(res.reservation_Equipments[0]?.equipment_ID); // Cargar el ID del equipo para editar
                                                                setEditingReservationDate(res.reservation_date);
                                                                setEditingStartTime(res.start_time);
                                                                setEditingEndTime(res.end_time);
                                                                setEditingStatusRId(res.status_Reservation?.statusR_ID);
                                                                handleOpenEditReservationPopup();
                                                            }}>Editar</button>
                                                            <button onClick={() => { setReservationToDelete(res.reservation_ID); handleOpenDeleteReservationPopup(); }}>Eliminar</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}


 {/* RESERVATION EQUIPMENT*/}   

                                {activeTable === 'reservationequipment' && reservationE.length > 0 && (
                                    <div>
                                        {/* Formulario para crear una nueva reserva de equipo */}
                                        <h3>Crear Reserva de Equipo:</h3>
                                        <input
                                            type="number"
                                            value={equipmentID} // Cambia a equipmentId
                                            onChange={(e) => setequipmentID(Number(e.target.value))} // Cambia a setEquipmentId
                                            placeholder="ID del Equipo"
                                        />
                                        <input
                                            type="number"
                                            value={quantity} // Cambia a quantity
                                            onChange={(e) => setquantity(Number(e.target.value))} // Cambia a setQuantity
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
                                            value={laboratoryID} // Cambia a laboratoryId
                                            onChange={(e) => setlaboratoryID(Number(e.target.value))} // Cambia a setLaboratoryId
                                            placeholder="ID del Laboratorio"
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
                                        <button onClick={() => handleCreateReservationEquipment(equipmentID, quantity, userId, laboratoryID, reservationDate, startTime, endTime, statusRId)}>
                                            CREAR
                                        </button>

                                        {/* Tabla de reservas de equipo existentes */}
                                        <h3>Datos Encontrados:</h3>
                                        <table className="styled-table">
                                            <thead>
                                                <tr>
                                                    <th>ID Equipo</th>
                                                    <th>Cantidad</th>
                                                    <th>ID Usuario</th>
                                                    <th>ID Laboratorio</th>
                                                    <th>Fecha de Reserva</th>
                                                    <th>Hora de Inicio</th>
                                                    <th>Hora de Fin</th>
                                                    <th>ID Estado</th>
                                                    <th>Estado</th>
                                                    <th>Fecha de Adquisición</th>
                                                    <th>Nombre del Equipo</th>
                                                    <th>Descripción</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {reservationE.map(res => (
                                                <tr key={res.reservationE_ID}>
                                                <td>{res.equipment ? res.equipment.equipment_ID : 'N/A'}</td> {/* ID Equipo */}
                                                <td>{res.quantity || 'N/A'}</td> {/* Cantidad */}
                                                <td>{res.user ? res.user.user_ID : 'N/A'}</td> 
                                                <td>{res.equipment && res.equipment.laboratory ? res.equipment.laboratory.laboratory_ID : 'N/A'}</td>
                                                <td>{res.reservation_date || 'N/A'}</td> 
                                                <td>{res.start_time || 'N/A'}</td> 
                                                <td>{res.end_time || 'N/A'}</td> 
                                                <td>{res.equipment && res.equipment.status_Equipment ? res.equipment.status_Equipment.statusE_ID : 'N/A'}</td> {/* ID Estado */}
                                                <td>{res.equipment && res.equipment.status_Equipment ? res.equipment.status_Equipment.status : 'N/A'}</td> {/* Estado */}
                                                <td>{res.equipment ? res.equipment.acquisition_date : 'N/A'}</td> {/* Fecha de Adquisición */}
                                                <td>{res.equipment ? res.equipment.equipment_Name : 'N/A'}</td> {/* Nombre del Equipo */}
                                                <td>{res.equipment ? res.equipment.description : 'N/A'}</td> {/* Descripción */}
                                                <td>
                                                    <button onClick={() => handleDeleteReservationEquipment(res.reservationE_ID)}>Eliminar</button>
                                                </td>
                                                </tr>
                                            ))}
                                            </tbody>

                                        </table>

                                    </div>
                                )}
 {/* STATUS EQUIPMENT*/}  
                                {activeTable === 'statusequipment' && StatusEquipment.length > 0 && (
                                    <div>
                                        
                                        {/* Tabla de estados de equipo existentes */}
                                        <h3>Datos Encontrados:</h3>
                                        <table className="styled-table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Estado</th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                {StatusEquipment.map(stat => (
                                                    <tr key={stat.statusE_ID}>
                                                        <td>{stat.statusE_ID}</td>
                                                        <td>{stat.status || 'N/A'}</td>

         
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

 {/* STATUS RESERVATION*/} 
                                {activeTable === 'statusreservation' && StatusReservation.length > 0 && (
                                    <div>
                                        
                           
                                        {/* Tabla de estados de reserva existentes */}
                                        <h3>Datos Encontrados:</h3>
                                        <table className="styled-table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Estado</th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                {StatusReservation.map(stat => (
                                                    <tr key={stat.statusR_ID}>
                                                        <td>{stat.statusR_ID}</td>
                                                        <td>{stat.statusR || 'N/A'}</td>


                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

 {/* USER*/}     
                                        
                            {activeTable === 'user' && users.length > 0 && (
                                <div>
                                    {/* Formulario para crear un nuevo usuario */}
                                    <h3>Crear Usuario:</h3>
                                    
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
                                    
                                    <button onClick={() => handleCreateUser(firstName, lastName, email, password, userTypeID)}>
                                        CREAR
                                    </button>
                                    
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
                                                    <td>{user.first_Name !== undefined ? user.first_Name : 'Sin nombre'}</td>
                            <td>{user.last_Name !== undefined ? user.last_Name : 'Sin apellido'}</td>

                                                    <td>{user.email || 'N/A'}</td>
                                                    <td>{user.user_Type?.userType || 'N/A'}</td>
                                                    <td>{user.isDeleted ? 'Sí' : 'No'}</td>
                                                    <td>
                                                        {/* Botones de Editar y Eliminar */}
                                                        <button onClick={() => handleDeleteUser(user.user_ID)}>Eliminar</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    
                                    <div className="spacing"></div> {/* Espaciador */}
                                </div>
                            )}


 {/* USER PERMISSION*/} 

                        {activeTable === 'userPermission' && userPermissions.length > 0 && (
                            <>
                    
                                    
                            

                                <div>
                                    <h3>Datos Encontrados:</h3>
                                    <table className="styled-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tipo de Usuario</th>
                                                <th>Permiso</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userPermissions.map(userPerm => (
                                                <tr key={userPerm.userP_ID}>
                                                    <td>{userPerm.userP_ID}</td>
                                                    <td>{userPerm.user_Type ? userPerm.user_Type.userType : 'N/A'}</td>
                                                    <td>{userPerm.permission ? userPerm.permission.permissionName : 'N/A'}</td>

                                                    
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                        <div className="spacing"></div> {/* Espaciador */}
 {/* USER TYPE*/} 

                        {activeTable === 'userType' && userTypes.length > 0 && (
                                <>
                                                                        <h3>Datos Encontrados:</h3>
                                    <table className="styled-table">
                                        
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tipo de Usuario</th>
                                                <th>Eliminado</th> {/* Añadido para mostrar el estado de eliminación */}

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userTypes.map(userType => (
                                                <tr key={userType.user_Type_ID}> {/* Cambiado a 'user_Type_ID' */}
                                                    <td>{userType.user_Type_ID}</td> {/* Cambiado a 'user_Type_ID' */}
                                                    <td>{userType.userType || 'N/A'}</td> {/* Cambiado a 'userType' */}
                                                    <td>{userType.isDeleted ? 'Sí' : 'No'}</td> {/* Añadido para mostrar si está eliminado */}

                                                   
                                                </tr>
                                                
                                            ))}
                                            <div className="spacing"></div> {/* Espaciador */}
                                        </tbody>
                                    </table>
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


export default TeacherHome;
