DROP DATABASE IF EXISTS `SebenzaSA_Database`;
CREATE DATABASE `SebenzaSA_Database`;
USE `SebenzaSA_Database`;

DROP TABLE IF EXISTS `REGISTERED_USER`;
CREATE TABLE `REGISTERED_USER` (
	`UserID` integer not null auto_increment,
	`Username` varchar(40) not null unique,
	`Email` varchar(40) not null,
    `ContactNumber` varchar(15) not null,
	`TypeOfUser` tinyint not null,
    `Password` varchar(255) not null,
	PRIMARY KEY (`UserID`)
);

/*Some data*/
INSERT INTO `REGISTERED_USER` (`Username`, `Email`, `ContactNumber`, `TypeOfUser`, `Password`)
	VALUES	('firstUser', 'user1@email.co.za', '0831231234', 1, 'unhashedPassword1'),
			('secondUser', 'user2@email.co.za', '0832342345', 2, 'unhashedPassword2');