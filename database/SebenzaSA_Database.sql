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
  `UserRecommendationRating` integer not null,
  `Confirmation` TINYINT(1) NOT NULL DEFAULT 0,
  `ConfirmationDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`UserID`)
);

DROP TABLE IF EXISTS `SPECIALIZATIONS`;
CREATE TABLE `SPECIALIZATIONS` (
	`workTypeID` integer not null auto_increment,
  `WorkType` varchar(15) not null unique,
  `Description` varchar(150) not null,
	PRIMARY KEY (`workTypeID`)
);

DROP TABLE IF EXISTS `CONFIRMATIONS`;
CREATE TABLE `CONFIRMATIONS` (
  `ConfirmationID` integer not null auto_increment,
  `UserID` INTEGER not null unique,
  `Key` VARCHAR(255) not null,
  PRIMARY KEY (`ConfirmationID`),
  FOREIGN KEY (`UserID`) REFERENCES REGISTERED_USER(`UserID`)
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

DROP TABLE IF EXISTS `CONTRACTOR`;
CREATE TABLE `CONTRACTOR` (
  `contractorID` integer not null auto_increment,
  `Username` varchar(40) not null unique,
  `BusinessName` varchar(40) not null unique,
  `BusinessDescription` varchar(40) not null,
  `BusinessHours` varchar(40) not null,
  `WorkType` varchar(15) not null,
  `Availability` boolean not null,
  PRIMARY KEY (`contractorID`),
  FOREIGN KEY (`Username`) REFERENCES REGISTERED_USER(`Username`),
  FOREIGN KEY (`WorkType`) REFERENCES SPECIALIZATIONS(`WorkType`)
);

DROP TABLE IF EXISTS `HOMEUSER`;
CREATE TABLE `HOMEUSER` (
	`homeuserID` integer not null auto_increment,
	`Username` varchar(40) not null unique,
  `Subscribed` boolean not null,
	PRIMARY KEY (`homeuserID`),
	FOREIGN KEY (`Username`) REFERENCES REGISTERED_USER(`Username`)
);

DROP TABLE IF EXISTS `QUOTE_PER_USER`;
CREATE TABLE `QUOTE_PER_USER` (
  `QuoteID` integer not null auto_increment,
  `QuoteNumber` integer not null unique,
  `QuotedUser` varchar(40) not null,
  `QuoteProducer` varchar(40) not null,
  `QuoteDescription` varchar(40) not null,
  `DateInitialised` date not null,
  `QuoteProceedDate` date not null,
  `QuotePrice` double not null,
  `QuotedTime` integer not null,
  `JobProceedDate` date not null,
  `Status` boolean not null,
  PRIMARY KEY (`QuoteID`),
  FOREIGN KEY (`QuoteProducer`) REFERENCES REGISTERED_USER(`Username`)
);

DROP TABLE IF EXISTS `JOB_PER_USER`;
CREATE TABLE `JOB_PER_USER` (
  `JobID` integer not null auto_increment,
  `QuoteNumber` integer not null unique,
  `JobProceedDate` date not null,
  `AgreedPrice` double not null,
  `EstimatedCompletionDate` date not null,
  `Status` boolean not null,
  PRIMARY KEY (`JobID`),
  FOREIGN KEY (`QuoteNumber`) REFERENCES QUOTE_PER_USER(`QuoteNumber`)
);

DROP TABLE IF EXISTS `QUOTE_REQUEST`;
CREATE TABLE `QUOTE_REQUEST` (
  `RequestID` integer not null auto_increment,
  `RequestedUser` varchar(40) not null unique,
  `HomeUser` varchar(40) not null unique,
  `DateInitialised` date not null,
  `Status` boolean not null,
  PRIMARY KEY (`RequestID`),
  FOREIGN KEY (`RequestedUser`) REFERENCES REGISTERED_USER(`Username`),
  FOREIGN KEY (`HomeUser`) REFERENCES REGISTERED_USER(`Username`)
);

DROP TABLE IF EXISTS `BOOKMARKED`;
CREATE TABLE `BOOKMARKED` (
  `BookmarkID` integer not null auto_increment,
  `UserSet` varchar(40) not null unique,
  `BookmarkedUser` varchar(40) not null unique,
  `WorkType` varchar(15) not null unique,
  PRIMARY KEY (`BookmarkID`),
  FOREIGN KEY (`UserSet`) REFERENCES REGISTERED_USER(`Username`),
  FOREIGN KEY (`BookmarkedUser`) REFERENCES REGISTERED_USER(`Username`),
  FOREIGN KEY (`WorkType`) REFERENCES SPECIALIZATIONS_PER_USER(`WorkType`)
);

DROP TABLE IF EXISTS `NOTIFICATION`;
CREATE TABLE `NOTIFICATION` (
  `NotificationID` integer not null auto_increment,
  `UserID` integer not null,
  `Message` varchar(60) not null,
  `Pulled` boolean not null DEFAULT false,
  `Pushed` boolean not null DEFAULT false,
  `Expired` boolean not null DEFAULT false,
  PRIMARY KEY (`NotificationID`),
  FOREIGN KEY (`UserID`) REFERENCES REGISTERED_USER(`UserID`)
);


INSERT 	 INTO `REGISTERED_USER` (`Username`, `Email`, `ContactNumber`, `TypeOfUser`, `Password`, `Surname`, `Name` , `Confirmation`)
	VALUES	('firstUser', 'user1@email.co.za', '0831231234', 0, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name1', 'surname1',1),
			('secondUser', 'user2@email.co.za', '0832342345', 2, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name2', 'surname2',1),
			('thirdUser', 'user3@email.co.za', '0832123345', 3, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name3', 'surname3',1),
			('fourthUser', 'user4@email.co.za', '0832543673', 3, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name4', 'surname4',1),
			('fifthUser', 'user5@email.co.za', '0832345235', 1, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name5', 'surname5',1),
			('sixthUser', 'user6@email.co.za', '0832886435', 3, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name6', 'surname6',1),
			('seventhUser', 'user7@email.co.za', '0831234675', 3, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name7', 'surname7',1),
			('contractor', 'user8@email.co.za', '0837543215', 1, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name8', 'surname8',1),
			('homeUser', 'user9@email.co.za', '0831234325', 2, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name9', 'surname9',1),
			('TradeWorker', 'user10@email.co.za', '0831212675', 0, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name10', 'surname10',1);



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

INSERT INTO `NOTIFICATION` (`UserID`,`Message`)
    VALUES (9,'Welcome!'),
      (9, 'This is a second notification!');