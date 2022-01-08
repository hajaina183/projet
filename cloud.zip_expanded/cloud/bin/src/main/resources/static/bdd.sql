create table Region (
	id serial primary key,
	nom varchar(50)
);
CREATE SEQUENCE sqRegion
START 1
INCREMENT 1
OWNED BY Region.id;

INSERT INTO Region (nom) VALUES ('Diana');
INSERT INTO Region (nom) VALUES ('Sava');
INSERT INTO Region (nom) VALUES ('Itasy');
INSERT INTO Region (nom) VALUES ('Analamanga');
INSERT INTO Region (nom) VALUES ('Vakinankaratra');
INSERT INTO Region (nom) VALUES ('Bongolava');
INSERT INTO Region (nom) VALUES ('Sofia');
INSERT INTO Region (nom) VALUES ('Boeny');
INSERT INTO Region (nom) VALUES ('Betsiboka');
INSERT INTO Region (nom) VALUES ('Melaky');
INSERT INTO Region (nom) VALUES ('Alaotra-Mangoro');
INSERT INTO Region (nom) VALUES ('Atsinanana');

create table LoginFront (
	id serial primary key,
    idRegion int,
	nom varchar(50),
    mdp varchar(50),
    FOREIGN KEY (idRegion) REFERENCES Region (id)
);


create table LoginPerson (
	id serial primary key,
    email varchar(50),
    mdp varchar(50),
	nom varchar(50),
    age int
);


create table Type (
	id serial primary key,
    intitule varchar(50)
);


create table Signalement (
	id serial primary key,
    idType int,
    idRegion int,
    titre varchar(50),
    image varchar(50),
    longitude float,
    latitude float,
    description varchar(50),
    FOREIGN KEY (idType) REFERENCES Type (id),
    FOREIGN KEY (idRegion) REFERENCES Region (id)

);


create table Notif (
	idSignalement int,
    FOREIGN KEY (idSignalement) REFERENCES Signalement (id)
);