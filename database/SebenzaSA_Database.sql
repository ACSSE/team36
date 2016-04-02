DROP DATABASE IF EXISTS `SebenzaSA_Database`;
CREATE DATABASE `SebenzaSA_Database`;
USE `SebenzaSA_Database`;

DROP TABLE IF EXISTS `REGISTERED_USER`;
CREATE TABLE `REGISTERED_USER` (
	`UserID` integer not null auto_increment,
	`Username` varchar(40) not null unique,
	`Email` varchar(40) not null UNIQUE ,
	`Name` varchar(40) not null,
	`Surname` varchar(40) not null,
  `ContactNumber` varchar(15) not null,
	`TypeOfUser` tinyint not null,
  `Password` varchar(255) not null,
	PRIMARY KEY (`UserID`)
);

DROP TABLE IF EXISTS `SPECIALIZATIONS`;
CREATE TABLE `SPECIALIZATIONS` (
	`workTypeID` integer not null auto_increment,
  `WorkType` varchar(15) not null unique,
  `Description` varchar(150) not null,
	PRIMARY KEY (`workTypeID`)
);

DROP TABLE IF EXISTS `LOCATIONS`;
CREATE TABLE `LOCATIONS` (
	`locationID` integer not null auto_increment,
  `locationName` varchar(15) not null unique,
  `Coordinates` varchar(50) not null,
	PRIMARY KEY (`locationID`)
);

DROP TABLE IF EXISTS `TRADE_WORKER`;
CREATE TABLE `TRADE_WORKER` (
	`userID` integer not null auto_increment,
	`Username` varchar(40) not null unique,
	`Locations` varchar(40) not null,
  `WorkType` varchar(15) not null,
  `Availability` boolean not null,
	PRIMARY KEY (`UserID`),
	FOREIGN KEY (`Username`) REFERENCES REGISTERED_USER(`Username`),
	FOREIGN KEY (`WorkType`) REFERENCES SPECIALIZATIONS(`WorkType`)
);

DROP TABLE IF EXISTS `LOCATIONS_PER_USER`;
CREATE TABLE `LOCATIONS_PER_USER` (
  `localID` integer not null auto_increment,
  `Username` varchar(40) not null,
  `locationName` varchar(15) not null,
  PRIMARY KEY (`localID`),
  FOREIGN KEY (`Username`) REFERENCES TRADE_WORKER(`Username`),
  FOREIGN KEY (`locationName`) REFERENCES LOCATIONS(`locationName`)
);

DROP TABLE IF EXISTS `SPECIALIZATIONS_PER_USER`;
CREATE TABLE `SPECIALIZATIONS_PER_USER` (
  `specID` integer not null auto_increment,
  `Username` varchar(40) not null,
  `WorkType` varchar(15) not null,
  PRIMARY KEY (`specID`),
  FOREIGN KEY (`Username`) REFERENCES TRADE_WORKER(`Username`),
  FOREIGN KEY (`WorkType`) REFERENCES SPECIALIZATIONS(`WorkType`)
);

INSERT 	 INTO `REGISTERED_USER` (`Username`, `Email`, `ContactNumber`, `TypeOfUser`, `Password`, `Surname`, `Name`)
	VALUES	('firstUser', 'user1@email.co.za', '0831231234', 0, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name1', 'surname1'),
			('secondUser', 'user2@email.co.za', '0832342345', 2, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name2', 'surname2'),
			('thirdUser', 'user3@email.co.za', '0832123345', 3, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name3', 'surname3'),
			('fourthUser', 'user4@email.co.za', '0832543673', 3, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name4', 'surname4'),
			('fifthUser', 'user5@email.co.za', '0832345235', 1, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name5', 'surname5'),
			('sixthUser', 'user6@email.co.za', '0832886435', 3, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name6', 'surname6'),
			('seventhUser', 'user7@email.co.za', '0831234675', 3, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name7', 'surname7'),
			('contractor', 'user8@email.co.za', '0837543215', 1, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name8', 'surname8'),
			('homeUser', 'user9@email.co.za', '0831234325', 2, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name9', 'surname9'),
			('TradeWorker', 'user10@email.co.za', '0831212675', 0, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name10', 'surname10');



INSERT 	 INTO `LOCATIONS` ( `locationName`, `Coordinates`)
	VALUES	('Edenvale', '0:0'),
			( 'Germiston', '0:0'),
			('Soweto', '0:0'),
			('Benoni', '0:0');

INSERT 	 INTO `SPECIALIZATIONS` (`WorkType`, `Description`)
	VALUES	('Painter', 'person who paints'),
			( 'Tiler', 'Person who tiles floors'),
			('Paver', 'Person who paves areas'),
			('Tree-Feller', 'Person who removes trees');

INSERT 	 INTO `TRADE_WORKER` (`Username`, `Locations`, `WorkType`, `Availability`)
	VALUES	('thirdUser', 'Edenvale', 'Painter', '1'),
			('fourthUser', 'Germiston', 'Tiler', '1'),
			('sixthUser', 'Soweto', 'Paver', '1'),
			('seventhUser', 'Benoni', 'Tree-Feller', '0');

INSERT 	 INTO `SPECIALIZATIONS_PER_USER` (`Username`,`WorkType`)
	VALUES	('thirdUser','Painter'),
			('thirdUser', 'Tiler'),
			('sixthUser', 'Tiler'),
			('seventhUser', 'Tiler'),
			('seventhUser', 'Paver'),
			('seventhUser', 'Tree-Feller');

INSERT 	 INTO `LOCATIONS_PER_USER` (`Username`,`locationName`)
	VALUES	('thirdUser','Edenvale'),
			('thirdUser', 'Germiston'),
			('sixthUser', 'Soweto'),
			('seventhUser', 'Soweto'),
			('seventhUser', 'Germiston'),
			('seventhUser', 'Benoni');