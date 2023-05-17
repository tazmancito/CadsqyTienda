CREATE TABLE Roles (
    RolId int NOT NULL AUTO_INCREMENT,
    Nombre varchar(255) NOT NULL,
    Descripcion varchar(255) NOT NULL,
    PRIMARY KEY (RolId)
);

-- Tabla Permisos de Roles de Usuarios

CREATE TABLE Permisos (
    PermisoId int NOT NULL AUTO_INCREMENT,
    RolId int NOT NULL,
    Nombre varchar(255) NOT NULL,
    Descripcion varchar(255) NOT NULL,
    PRIMARY KEY (PermisoId),
    FOREIGN KEY (RolId) REFERENCES Roles(RolId)
);

-- Tabla Usuarios

CREATE TABLE Usuarios (
    UsuarioId int NOT NULL AUTO_INCREMENT,
    RolId int NOT NULL DEFAULT 9161527,
    Nombre varchar(255) NOT NULL,
    UrlAvatar varchar(5000) DEFAULT "avatar",
    Apellido varchar(255) NOT NULL,
    FechaNacimiento varchar(255) NOT NULL,
    correo varchar(255),
    Contrasenia varchar(255) NOT NULL,
    Estado boolean DEFAULT true,

    PRIMARY KEY (UsuarioId),
    FOREIGN KEY (RolId) REFERENCES Roles(RolId)
);

CREATE TABLE Categorias (
  CategoriasId int NOT NULL AUTO_INCREMENT,
  Nombre varchar(255)  NOT NULL,
  CategoriasPadreId int,
  EsPadre BOOLEAN NOT NULL,
  PRIMARY KEY (CategoriasId),
  FOREIGN KEY (CategoriasPadreId) REFERENCES Categorias(CategoriasId)
);

CREATE TABLE Productos (
  ProductosId int NOT NULL AUTO_INCREMENT,
  CategoriasId int NOT NULL,
  nombre varchar(255)  NOT NULL,
  descripcion text NOT NULL,
  img varchar(255)  NOT NULL,
  precio float NOT NULL,
  PRIMARY KEY (ProductosId),
  FOREIGN KEY (CategoriasId) REFERENCES Categorias(CategoriasId)
);

CREATE TABLE Cart (
    CartId INT AUTO_INCREMENT,
    deviceID varchar(255) NOT NULL,
    ProductosId INT NOT NULL,
    cantidad INT NOT NULL,
    PRIMARY KEY (CartId),
    FOREIGN KEY (ProductosId) REFERENCES Productos(ProductosId)
);

INSERT INTO Productos (CategoriasId,nombre, descripcion, img, precio) VALUES 
('1','Sneakers', 'zapatillas', 'https://via.placeholder.com/200x200', '22');

-- modificaciones iniciales

 ALTER TABLE Permisos AUTO_INCREMENT=9161525;
 ALTER TABLE Usuarios AUTO_INCREMENT=9161525;
 ALTER TABLE Roles AUTO_INCREMENT=9161525;

 -- Inserciones iniciales

 INSERT INTO `Roles` (`Nombre`, `Descripcion`) VALUES ('admin', 'Administrador del sistema');
 INSERT INTO `Roles` (`Nombre`, `Descripcion`) VALUES ('gerente', 'Gerente del sistema');
 INSERT INTO `Roles` (`Nombre`, `Descripcion`) VALUES ('usuario', 'Usuario del sistema');

 INSERT INTO `Permisos` (`RolId`, `Nombre`, `Descripcion`) VALUES ('9161525', 'getRoles', 'getRoles');
 INSERT INTO `Permisos` (`RolId`, `Nombre`, `Descripcion`) VALUES ('9161525', 'getRolesById', 'getRolesById');
 INSERT INTO `Permisos` (`RolId`, `Nombre`, `Descripcion`) VALUES ('9161525', 'deleteRoles', 'deleteRoles');

 INSERT INTO `Permisos` (`RolId`, `Nombre`, `Descripcion`) VALUES ('9161526', 'getRoles', 'getRoles');
 INSERT INTO `Permisos` (`RolId`, `Nombre`, `Descripcion`) VALUES ('9161526', 'getRolesById', 'getRolesById');
 INSERT INTO `Permisos` (`RolId`, `Nombre`, `Descripcion`) VALUES ('9161526', 'deleteRoles', 'deleteRoles');

 -- Inserciones iniciales

 INSERT INTO Usuarios (UsuarioId, RolId, Nombre, UrlAvatar, Apellido, FechaNacimiento, correo, Contrasenia, Estado) VALUES
 (9161532, 9161527, 'Jessit', 'avatar', 'Patiño', '1978/07/01', 'draco2287@gmail.com', '$2a$10$Q2jakqF8mw3jUbYPh3WhYepCWVrCqcFGJ4X3WMd5iaLZv8oVv60eO', 1),
 (9161533, 9161527, 'Erik', 'avatar', 'Quiroga', '1978/07/01', 'cads@cadsqy.com', '$2a$10$cLYkWfBJke8SqL.voL.nJuCGwrxHo6TFk0kbyuYvoUzqtS9WTzRea', 1);

-- eliminar tablas 

DROP TABLE Productos;
DROP TABLE Categorias;
DROP TABLE Permisos;
DROP TABLE Usuarios;
DROP Table Roles;


-- buscar productos por Categorias y subCategorias

-- SELECT * 
-- FROM Productos 
-- WHERE CategoriasId IN ( SELECT CategoriasId 
--                         FROM Categorias 
--                         WHERE Categorias.CategoriasPadreId IN (
--                           SELECT CategoriasId 
--                           FROM Categorias 
--                           WHERE Categorias.Nombre = 'Electrónica') ) OR CategoriasId IN (
--                             SELECT CategoriasId 
--                             FROM Categorias 
--                             WHERE Categorias.Nombre = 'Electrónica') 

-- SELECT * FROM `Productos` WHERE nombre like '%palabrabuscada%';

--- SELECT * FROM ((Productos LEFT JOIN Categorias on (Categorias.CategoriasId = Productos.CategoriasId))) WHERE Categorias.nombre = 'ropa';
