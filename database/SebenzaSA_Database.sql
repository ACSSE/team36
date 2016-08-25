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
  `PersonalID` VARCHAR(15) not null UNIQUE,
	`TypeOfUser` tinyint not null,
  `Password` varchar(255) not null,
  `UserRecommendationRating` integer not null DEFAULT 0,
  `Confirmation` TINYINT(1) NOT NULL DEFAULT 0,
  `ConfirmationDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`UserID`)
);

DROP TABLE IF EXISTS `SPECIALIZATIONS`;
CREATE TABLE `SPECIALIZATIONS` (
	`workTypeID` integer not null auto_increment,
  `WorkType` varchar(50) not null unique,
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

DROP TABLE IF EXISTS `HOMEUSER_LOCATIONS`;
CREATE TABLE `HOMEUSER_LOCATIONS` (
  `locationID` integer not null auto_increment,
  `UserID` INTEGER not null,
  `StreetNumber` varchar(40) not null,
  `Route` varchar(150)not null,
  `Sublocality` varchar(150)not null,
  `Locality` varchar(150) not null,
  `AdministrativeArea` varchar(150) not null,
  PRIMARY KEY (`locationID`),
  FOREIGN KEY (`UserID`) REFERENCES REGISTERED_USER(`UserID`)
);

DROP TABLE IF EXISTS `LOCATIONS`;
CREATE TABLE `LOCATIONS` (
	`locationID` integer not null auto_increment,
  `locationName` varchar(50) not null unique,
  `Coordinates` varchar(50),
  `Region` varchar(50),
  `Province` varchar(50) not NULL,
  `City` varchar(50),
	PRIMARY KEY (`locationID`)
);

DROP TABLE IF EXISTS `AREA_PER_LOCATION`;
CREATE TABLE `AREA_PER_LOCATION` (
  `AreaID` integer not null auto_increment,
  `StreetNumber` varchar(50) not null,
  `Road` varchar(50) not null,
  `AreaName` varchar(50) not null,
  `locationID` integer not null,
  PRIMARY KEY (`AreaID`),
  FOREIGN KEY (`locationID`) REFERENCES LOCATIONS(`locationID`)
);

DROP TABLE IF EXISTS `TRADE_WORKER`;
CREATE TABLE `TRADE_WORKER` (
	`tradeworkerID` integer not null auto_increment,
	`UserID` integer not null unique,
  `DateWorked` DATE not null,
  `Availability` boolean not null,
  `ActiveWorkRequests` integer not null DEFAULT 0,
  `OverallWorkRequests` integer not null DEFAULT 0,
  `WorkRequestsMissed` integer not null DEFAULT 0,
  `WorkRequestsAccepted` integer not null DEFAULT 0,
  `WorkRequestsRejected` integer not null DEFAULT 0,
	PRIMARY KEY (`tradeworkerID`),
	FOREIGN KEY (`UserID`) REFERENCES REGISTERED_USER(`UserID`)
);

DROP TABLE IF EXISTS `LOCATIONS_PER_USER`;
CREATE TABLE `LOCATIONS_PER_USER` (
  `localID` integer not null auto_increment,
  `UserID` integer not null,
  `locationID` integer not null,
  PRIMARY KEY (`localID`),
  FOREIGN KEY (`UserID`) REFERENCES REGISTERED_USER(`UserID`),
  FOREIGN KEY (`locationID`) REFERENCES LOCATIONS(`locationID`)
);

DROP TABLE IF EXISTS `SPECIALIZATIONS_PER_USER`;
CREATE TABLE `SPECIALIZATIONS_PER_USER` (
  `specID` integer not null auto_increment,
  `UserID` integer not null,
  `workTypeID` integer not null,
  PRIMARY KEY (`specID`),
  FOREIGN KEY (`UserID`) REFERENCES REGISTERED_USER(`UserID`),
  FOREIGN KEY (`workTypeID`) REFERENCES SPECIALIZATIONS(`workTypeID`)
);

DROP TABLE IF EXISTS `CONTRACTOR`;
CREATE TABLE `CONTRACTOR` (
  `contractorID` integer not null auto_increment,
  `UserID` integer not null unique,
  `BusinessRegistrationNum` integer not null unique,
  `BusinessVatNum` integer not null unique,
  `BusinessAddress` VARCHAR(50) not null,
  `BusinessName` varchar(40) not null unique,
  `BusinessDescription` varchar(40) not null,
  `BusinessHoursFrom` varchar(40) not null,
  `BusinessHoursTo` varchar(40) not null,
  `VatRegistered` BOOLEAN NOT NULL,
  `Availability` boolean not null,
  `DateWorked` DATE not null,
  `ActiveWorkRequests` integer not null DEFAULT 0,
  `OverallWorkRequests` integer not null DEFAULT 0,
  `WorkRequestsMissed` integer not null DEFAULT 0,
  `WorkRequestsAccepted` integer not null DEFAULT 0,
  `WorkRequestsRejected` integer not null DEFAULT 0,
  PRIMARY KEY (`contractorID`),
  FOREIGN KEY (`UserID`) REFERENCES REGISTERED_USER(`UserID`)
);

DROP TABLE IF EXISTS `HOMEUSER`;
CREATE TABLE `HOMEUSER` (
	`homeuserID` integer not null auto_increment,
  `UserID` integer not null unique,
  `Subscribed` boolean not null,
	PRIMARY KEY (`homeuserID`),
	FOREIGN KEY (`UserID`) REFERENCES REGISTERED_USER(`UserID`)
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

DROP TABLE IF EXISTS `QUOTE_REQUEST`;
CREATE TABLE `QUOTE_REQUEST` (
  `RequestID` integer not null auto_increment,
  `UserID` INTEGER not null,
  `NumberOfWorkersRequested` INTEGER,
  `NumberOfWorkersAccepted` INTEGER DEFAULT 0,
  `workTypeID` integer not null,
  `JobDescription` varchar(150) not null,
  `Address` INTEGER not null,
  `DateInitialised` TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP,
  `JobCommencementDate` date not null,
  `Status` INTEGER(1) not null DEFAULT 0,
  PRIMARY KEY (`RequestID`),
  FOREIGN KEY (`UserID`) REFERENCES REGISTERED_USER(`UserID`),
  FOREIGN KEY (`workTypeID`) REFERENCES SPECIALIZATIONS(`workTypeID`),
  FOREIGN KEY (`Address`) REFERENCES AREA_PER_LOCATION(`AreaID`)
);

DROP TABLE IF EXISTS `QUOTE`;
CREATE TABLE `QUOTE` (
  `QuoteID` integer not null auto_increment,
  `RequestID` INTEGER not null,
  `RequestedUser` INTEGER,
  `Status` INTEGER(1) not null DEFAULT 0,
  `HomeuserResponse` INTEGER(1) not null DEFAULT 0,
  PRIMARY KEY (`QuoteID`),
  FOREIGN KEY (`RequestID`) REFERENCES QUOTE_REQUEST(`RequestID`),
  FOREIGN KEY (`RequestedUser`) REFERENCES REGISTERED_USER(`UserID`)
);

DROP TABLE IF EXISTS `JOB_PER_USER`;
CREATE TABLE `JOB_PER_USER` (
  `JobID` integer not null auto_increment,
  `QuoteID` integer not null unique,
  `JobProceedDate` date not null,
  `AgreedPrice` double not null,
  `EstimatedCompletionDate` date not null,
  `Status` integer(1) not null DEFAULT 0,
  `TradeworkerRequest` integer(1) not null DEFAULT 0,
  `Notifier` integer(1) not null DEFAULT 0,
  PRIMARY KEY (`JobID`),
  FOREIGN KEY (`QuoteID`) REFERENCES QUOTE(`QuoteID`)
);

DROP TABLE IF EXISTS `REASON_FOR_JOB_TERMINATION`;
CREATE TABLE `REASON_FOR_JOB_TERMINATION` (
  `ReasonID` integer not null auto_increment,
  `UserTerminated` integer not null,
  `JobID` integer not null,
  `Reason` VARCHAR(150) not null,
  `DateTerminated` TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reasonID`),
  FOREIGN KEY (`UserTerminated`) REFERENCES REGISTERED_USER(`UserID`),
  FOREIGN KEY (`JobID`) REFERENCES JOB_PER_USER(`JobID`)
);

DROP TABLE IF EXISTS `BOOKMARKED`;
CREATE TABLE `BOOKMARKED` (
  `BookmarkID` integer not null auto_increment,
  `UserSet` INTEGER not null unique,
  `BookmarkedUser` INTEGER not null unique,
  `WorkTypeID` integer not null unique,
  PRIMARY KEY (`BookmarkID`),
  FOREIGN KEY (`UserSet`) REFERENCES REGISTERED_USER(`UserID`),
  FOREIGN KEY (`BookmarkedUser`) REFERENCES REGISTERED_USER(`UserID`),
  FOREIGN KEY (`WorkTypeID`) REFERENCES SPECIALIZATIONS_PER_USER(`specID`)
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


INSERT 	 INTO `REGISTERED_USER` (`Username`, `Email`, `ContactNumber`, `TypeOfUser`, `Password`, `Surname`, `Name` , `Confirmation`, `PersonalID`)
	VALUES	('firstUser', 'user1@email.co.za', '0831231234', 0, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name1', 'surname1',1,'910468784213648'),
			('secondUser', 'user2@email.co.za', '0832342345', 2, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name2', 'surname2',1,'910468784213641'),
			('thirdUser', 'user3@email.co.za', '0832123345', 3, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name3', 'surname3',1,'910468784213642'),
			('fourthUser', 'user4@email.co.za', '0832543673', 3, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name4', 'surname4',1,'910468784213643'),
			('fifthUser', 'user5@email.co.za', '0832345235', 1, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name5', 'surname5',1,'910468784213644'),
			('sixthUser', 'user6@email.co.za', '0832886435', 3, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name6', 'surname6',1,'910468784213645'),
			('seventhUser', 'user7@email.co.za', '0831234675', 3, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name7', 'surname7',1,'910468784213646'),
			('contractor', 'user8@email.co.za', '0837543215', 1, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name8', 'surname8',1,'910468784213647'),
			('homeUser', 'user9@email.co.za', '0831234325', 2, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name9', 'surname9',1,'910468784213649'),
			('TradeWorker', 'user10@email.co.za', '0831212675', 0, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name10', 'surname10',1,'910468784213640'),
      ('TradeWorker1', 'user11@email.co.za', '0831212673', 0, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name11', 'surname11',1,'910468784213611'),
      ('TradeWorker2', 'user12@email.co.za', '0831212671', 0, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name12', 'surname12',1,'910468784213612'),
      ('TradeWorker3', 'user13@email.co.za', '0831212674', 0, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 'name13', 'surname13',1,'910468784213613');

INSERT 	 INTO `LOCATIONS` ( `locationName`, `Coordinates`,`Region`,`Province`,`City`)
	VALUES ('Airdlin','26.0389:28.0638','A','Gauteng','Johannesburg'),
    ('Barbeque Downs', '0:0', 'A','Gauteng','Johannesburg'),
    ('Bloubosrand', '0:0', 'A','Gauteng','Johannesburg'),
    ('Blue Hills', '0:0', 'A','Gauteng','Johannesburg'),
    ('Broadacres', '0:0', 'A','Gauteng','Johannesburg'),
    ('Edenvale', '0:0', 'A','Gauteng','Johannesburg'),
    ('Germiston', '0:0', 'A','Gauteng','Johannesburg'),
    ('Orange Farm', '0:0', 'G','Gauteng','Johannesburg');

INSERT 	 INTO `SPECIALIZATIONS` (`WorkType`, `Description`)
	VALUES	('Painter', 'person who paints'),
			( 'Tiler', 'Person who tiles floors'),
			('Paving', 'Person who paves areas'),
    ('Decking', 'Person who paves areas'),
    ('Plumber', 'Person who fixes plumbing for a living'),
    ('Brick-Layer', 'Person who lays bricks for buildings'),
    ('foundation-Layer', 'Person who lays foundation for buildings'),
			('Tree-Feller', 'Person who removes trees');

INSERT 	 INTO `SPECIALIZATIONS_PER_USER` (`UserID`, `workTypeID`)
  VALUES	(10,1),
          (10,3),
          (10,6),
          (11,2),
          (11,4),
          (12,5),
          (13,8),
          (13,7),
        	(12,6);

INSERT 	 INTO `TRADE_WORKER` (`UserID`, `DateWorked` , `Availability`)
VALUES	(10,'20160801',FALSE),
        (11,'20160801',TRUE),
        (12,'20160702',TRUE),
        (13,'20160801',TRUE);

INSERT INTO `HOMEUSER` (`UserID`,`Subscribed`)
VALUES (9,0);

INSERT 	 INTO `LOCATIONS_PER_USER` (`UserID`, `locationID`)
VALUES	(10,1),
        (10,3),
        (10,6),
        (11,2),
        (11,4),
        (12,5),
        (13,6),
        (13,7),
        (12,6);

INSERT INTO `NOTIFICATION` (`UserID`,`Message`)
    VALUES (9,'Welcome!'),
      (9, 'This is a second notification!');