# Sistema de Gestión de Recursos y Aulas de Laboratorio de Electrónica

El sistema de gestión para el simulador de instrumentos de electrónica, desarrollado en el CADI de Desarrollo de Software Seguro, se centra en mejorar la experiencia educativa y optimizar la administración de recursos en un entorno académico. La plataforma gestiona roles específicos (Estudiante, Profesor y Administrador), y ofrece una interfaz adaptada a las necesidades de cada usuario, incluyendo funcionalidades avanzadas en cuanto a políticas de seguridad y requisitos de autenticación.


Link Netlify (Frontend Desplegado): https://digilabmanagmentsystem.netlify.app/login

En caso de que aparezca error dar clic en:  Back to our site

Link Repositorio FrontEnd: https://github.com/lopezns/FrontEnd
Link Repositorio Backend: https://github.com/Mariana-Pinzon/Electronics-Laboratory-Classroom-and-Resource-Management-System
Link Somee: https://electronicspace.somee.com/swagger/index.html

## 1. Estructura y Roles del Sistema

### Rol de Administrador
El Administrador tiene el acceso más amplio dentro del sistema, con funcionalidades que incluyen:
- **Gestión Completa de Recursos**: Puede consumir todos los endpoints, incluyendo creación, modificación y eliminación de inventarios, permisos, reservas y laboratorios.
- **Mantenimiento de la Seguridad**: Protege los datos y la integridad del sistema, limitando accesos según el rol de cada usuario.

### Rol de Profesor
El Profesor interactúa principalmente para apoyar la educación de los estudiantes, con funcionalidades como:
- **Apoyo Educativo**: Ayuda en el uso de equipos y brinda orientación a los estudiantes.
- **Acceso a Datos**: Permite a los profesores ver información sobre el rendimiento de los estudiantes y sus reservas de equipos.

### Rol de Estudiante
Los Estudiantes son usuarios que interactúan con el sistema para realizar prácticas y actividades de aprendizaje, con funcionalidades como:
- **Reserva de Equipos**: Pueden reservar los equipos necesarios para sus prácticas en el laboratorio.
- **Consulta de Disponibilidad y Visualización de Datos**: Verifica la disponibilidad de implementos y evalúa su progreso en el simulador de instrumentos.

## 2. Funcionalidades de Programación y Seguridad

### 2.1 Autenticación de Usuarios y Registro Seguro
El sistema emplea una autenticación avanzada que asegura que cada usuario acceda según su rol, y el proceso de registro incorpora:
- **Validación de Contraseñas**: La contraseña debe cumplir con requisitos mínimos de seguridad (8 caracteres, al menos 1 número, 1 mayúscula, y 1 carácter especial).
- **Confirmación de Contraseña**: Se agregó un campo de confirmación de contraseña para evitar errores en el registro.
- **Aceptación de Términos y Condiciones**: Incluye un checkbox de aceptación de términos alineado con la ISO 27001. Los usuarios deben revisar las políticas de seguridad y aceptar los términos desde los siguientes enlaces:
    - [Políticas de Seguridad en un Sistema SGSI](https://globalt4e.com/politicas-de-seguridad-en-un-sistema-sgsi)
    - [Políticas de Seguridad de la Información ISO 27001](https://www.normaiso27001.es/a5-politicas-de-seguridad-de-la-informacion/)

### 2.2 Sistema de Registro y Manejo de Roles
El proceso de registro en el sistema asigna roles específicos (estudiante o profesor), gestionados desde el backend:
- **Encriptación de Contraseñas**: Asegura que las contraseñas no sean visibles para otros usuarios.
- **Backend Seguro**: Los endpoints gestionan y protegen la información de cada usuario.

### 2.3 Visualización de Información en el Simulador
En el entorno de Unity, los estudiantes pueden acceder a:
- **Visualización de Datos de Aprendizaje y Jugabilidad**: Se muestran niveles de aprendizaje, gráficas de progreso y tiempos de inicio.
- **Clasificación de Niveles y Progreso**: El simulador divide los niveles de aprendizaje en fases para brindar un análisis detallado.

## 3. Requisitos y Evaluaciones del Sistema

### 3.1 Login (Autenticación de Usuarios)
- **Acceso Seguro**: Sólo permite el acceso a usuarios con credenciales válidas.
- **Manejo de Errores**: Se envían mensajes claros en caso de errores en el login, gestionando credenciales inválidas o campos vacíos.
- **Control de Acceso**: Cada rol tiene permisos específicos para proteger las funcionalidades.

### 3.2 Consulta de Información
- **Carga de Datos desde el Backend**: Filtrados dinámicos que permiten una búsqueda eficiente.
- **Eliminación de Registros**: Con confirmación previa y reflejo instantáneo en la interfaz.

### 3.3 Formularios de Creación y Actualización
- **Validaciones Clave**: Los formularios obligan a que los campos necesarios sean completados.
- **Retroalimentación al Usuario**: Manejo de errores en validaciones fallidas y fallos de conexión.

### 3.4 Publicación de la Aplicación
- **Entorno Accesible**: La aplicación está desplegada en un entorno accesible con instrucciones claras.
- **Documentación**: El repositorio incluye información detallada para acceder y probar la aplicación.

### 3.5 Repositorio con Control de Versiones
- **Historial de Desarrollo Documentado**: Con frecuencia de commits y mensajes claros que reflejan la evolución del sistema.
- **Estructura Coherente**: Se evita realizar cambios masivos sin contexto, permitiendo un mejor seguimiento.

## 4. Funcionalidades Adicionales

### Interfaz y Visualización de Datos
La implementación de Unity permite una visualización detallada del aprendizaje del estudiante, incluyendo:
- **Datos de Jugabilidad y Aprendizaje**: Información sobre el progreso de los estudiantes y categorización de niveles.
- **Filtros Dinámicos en Endpoints**: Facilitan la búsqueda y categorización, mejorando la eficiencia.



