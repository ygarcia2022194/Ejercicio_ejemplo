Drop database if exists GuateDigital;
Create DataBase GuateDigital;
Use GuateDigital;

Create table Categoria(
	CodigoCategoria int not null auto_increment,
    Nombre varchar(100) not null,
    primary key PK_codigoCategoria(CodigoCategoria)
);

Create table Producto(
	CodigoProducto int not null auto_increment,
    Nombre varchar(100) not null,
    CodigoCategoria int not null,
    primary key PK_codigoProducto(CodigoProducto),
    constraint FK_Codigo_Categoria foreign key (codigoCategoria)
		references Categoria(CodigoCategoria)
);

SELECT C.Nombre 
FROM Venta V
INNER JOIN Producto P on P.CodigoProducto = V.CodigoProducto
INNER JOIN Categoria C on P.CodigoCategoria = C.CodigoCategoria
ORDER BY V.Fecha desc
