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
 ![image](https://github.com/user-attachments/assets/2977a279-127d-4577-bb7f-796d4f1c3e82)

 ![image](https://github.com/user-attachments/assets/266f74c4-ea9a-43bb-b3b7-a7ea12fe1268)

Crear Producto
 ![image](https://github.com/user-attachments/assets/628073df-665c-497a-9a34-baa9a9efa8cc)

![image](https://github.com/user-attachments/assets/0ab9953d-729e-47c6-8e4f-ddd37ac77834)
 
 ![image](https://github.com/user-attachments/assets/4c70a02e-89fd-48e6-91ec-4170ccc6f25d)

Editar Producto
 ![image](https://github.com/user-attachments/assets/dff4a2ad-2b8a-4f1c-a27d-3c310b6166c6)

 ![image](https://github.com/user-attachments/assets/1ae30cfc-260c-42e3-bba7-2ea8ced32942)

 
Eliminar Producto
 ![image](https://github.com/user-attachments/assets/174e7d73-35be-4107-a516-a10f71b12deb)

 ![image](https://github.com/user-attachments/assets/dd586a0d-b354-4ad1-a073-bedb9f11b859)

Crear Transacción
![image](https://github.com/user-attachments/assets/7cc8d796-2d87-4db2-8e51-80d34f9adb57)
 
![image](https://github.com/user-attachments/assets/2797dfc6-da54-4fcb-8f35-f123ec689373)

![image](https://github.com/user-attachments/assets/909eea5c-4b10-4f18-9e36-403a02b90ce0)
  
Editar Transacción

![image](https://github.com/user-attachments/assets/eb611f29-cf7b-4633-b977-ac050b090fd8)

![image](https://github.com/user-attachments/assets/6f015c21-970b-4aff-ab06-6d7f7b296d9f)

![image](https://github.com/user-attachments/assets/98ab6d5b-159a-4d5f-a920-a6ddf4f5c17d)

Eliminar Transacción
![image](https://github.com/user-attachments/assets/743b6bcf-b2c6-4498-a28b-6a3645b75f42)

![image](https://github.com/user-attachments/assets/e3703fdd-e7eb-4289-b497-bbbd0019566a)

 
Filtros Avanzados en Transacciones
![image](https://github.com/user-attachments/assets/95b5f504-f2fb-4794-9b54-758641d3ec1a)

 
________________________________________
✅ Criterios de Aceptación Cubiertos
•	Listados dinámicos para productos y transacciones (con paginación).
•	Operaciones de crear, editar y eliminar productos y transacciones.
•	Filtros para búsqueda avanzada (fecha, tipo, producto).
•	Validación de stock para transacciones de venta.
•	Mensajes de éxito y error en todas las operaciones.

