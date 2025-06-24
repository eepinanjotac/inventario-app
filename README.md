Evaluación Técnica de Conocimientos FullStack .NET y Angular
📋 Objetivo
Esta evaluación implementa una solución para la gestión de inventario basada en una arquitectura de microservicios en .NET (backend) y Angular (frontend).
La aplicación soporta:
•	Gestión de productos (crear, editar, eliminar, consultar).
•	Registro de transacciones de inventario (compras y ventas).
•	Filtros dinámicos para búsqueda de productos y transacciones.
•	Validación de stock al realizar transacciones de venta.
________________________________________
⚡️ Requisitos
Backend
•	.NET 8 SDK o versión superior.
•	SQL Server 2022 (local).
•	Visual Studio 2022.
Frontend
•	Angular 16
•	Node.js v16
•	Visual Studio Code 
________________________________________
🚀 Ejecución del Backend
1️⃣ Clonar el proyecto
git clone https://url-de-tu-repositorio.git
2️⃣ Crear la Base de Datos
•	Ejecuta el script SQL ubicado en la raíz del proyecto: Inventario.sql para crear la base de datos y las tablas.
3️⃣ Configurar la Cadena de Conexión
•	Abre appsettings.json en cada microservicio y actualiza la PrincipalConnection para apuntar a tu instancia de SQL Server.
4️⃣ Ejecutar los Microservicios
•	Abre cada proyecto en Visual Studio o con la CLI de .NET:
dotnet run --project Productos.Api
dotnet run --project Transacciones.Api
Por defecto los servicios deberían correr en:
•	Productos: http://localhost: 5087
•	Transacciones: http://localhost: 5270
________________________________________
💻 Ejecución del Frontend
1️⃣ Instalar Dependencias
npm install
2️⃣ Ejecutar la Aplicación
ng serve
La app debería estar disponible en: http://localhost:4200
________________________________________
📑 Evidencias
Aquí debes agregar capturas de pantalla para demostrar la funcionalidad implementada. Por ejemplo:
Listado de Productos y Transacciones (con paginación)
 
 
Crear Producto
 
 
 
Editar Producto
 
 
 
Eliminar Producto
 
 
Crear Transacción
 
 
 
Editar Transacción
 
 
 
Eliminar Transacción
 
 
Filtros Avanzados en Transacciones
 
________________________________________
✅ Criterios de Aceptación Cubiertos
•	Listados dinámicos para productos y transacciones (con paginación).
•	Operaciones de crear, editar y eliminar productos y transacciones.
•	Filtros para búsqueda avanzada (fecha, tipo, producto).
•	Validación de stock para transacciones de venta.
•	Mensajes de éxito y error en todas las operaciones.

