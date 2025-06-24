CREATE TABLE Productos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(150),
    Categoria VARCHAR(50),
    ImagenUrl VARCHAR(200),
    Precio DECIMAL(18,2) NOT NULL,
    Stock INT NOT NULL
);

CREATE TABLE Transacciones (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Fecha DATETIME NOT NULL,
    Tipo VARCHAR(20) NOT NULL,
    ProductoId INT NOT NULL,
    Cantidad INT NOT NULL,
    PrecioUnitario DECIMAL(18,2) NOT NULL,
    PrecioTotal AS (Cantidad * PrecioUnitario) PERSISTED,
    Detalle VARCHAR(255),
    FOREIGN KEY (ProductoId) REFERENCES Productos(Id)
);
