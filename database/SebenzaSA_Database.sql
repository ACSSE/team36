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
  `Recommendations` integer not null DEFAULT 0,
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

DROP TABLE IF EXISTS `PICTURES_PER_JOB`;
CREATE TABLE `PICTURES_PER_JOB` (
  `PictureID` integer not null auto_increment,
  `JobID` integer not null,
  `UserID` INTEGER NOT NULL,
  `PictureName` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`PictureID`),
  FOREIGN KEY (`UserID`) REFERENCES REGISTERED_USER(`UserID`),
  FOREIGN KEY (`JobID`) REFERENCES JOB_PER_USER(`JobID`)
);

DROP TABLE IF EXISTS `REVIEW_PER_JOB`;
CREATE TABLE `REVIEW_PER_JOB` (
  `ReviewID` integer not null auto_increment,
  `JobID` integer not null,
  `UserID` INTEGER NOT NULL,
  `JobSatisfaction` INTEGER NOT NULL,
  `TradeworkerSatisfaction` INTEGER NOT NULL,
  PRIMARY KEY (`ReviewID`),
  FOREIGN KEY (`UserID`) REFERENCES REGISTERED_USER(`UserID`),
  FOREIGN KEY (`JobID`) REFERENCES JOB_PER_USER(`JobID`)
);

DROP TABLE IF EXISTS `REASON_FOR_DISSATISFACTION`;
CREATE TABLE `REASON_FOR_DISSATISFACTION` (
  `ReasonID` integer not null auto_increment,
  `ReviewID` INTEGER NOT NULL,
  `Explanation` VARCHAR(250) not null,
  `Selection` INTEGER NOT NULL,
  PRIMARY KEY (`ReasonID`),
  FOREIGN KEY (`ReviewID`) REFERENCES REVIEW_PER_JOB(`ReviewID`)
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

SELECT * FROM `REGISTERED_USER`;

INSERT INTO `registered_user` (`UserID`, `Username`, `Email`, `Name`, `Surname`, `ContactNumber`, `PersonalID`, `TypeOfUser`, `Password`, `UserRecommendationRating`, `Confirmation`, `ConfirmationDate`) VALUES
  (1, 'firstUser', 'user1@email.co.za', 'surname1', 'name1', '0831231234', '910468784213648', 0, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 0, 1, '2016-08-28 15:21:55'),
  (2, 'secondUser', 'user2@email.co.za', 'surname2', 'name2', '0832342345', '910468784213641', 2, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 0, 1, '2016-08-28 15:21:55'),
  (3, 'thirdUser', 'user3@email.co.za', 'surname3', 'name3', '0832123345', '910468784213642', 2, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 0, 1, '2016-08-28 15:21:55'),
  (4, 'fourthUser', 'user4@email.co.za', 'surname4', 'name4', '0832543673', '910468784213643', 2, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 0, 1, '2016-08-28 15:21:55'),
  (5, 'fifthUser', 'user5@email.co.za', 'surname5', 'name5', '0832345235', '910468784213644', 1, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 0, 1, '2016-08-28 15:21:55'),
  (6, 'sixthUser', 'user6@email.co.za', 'surname6', 'name6', '0832886435', '910468784213645', 2, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 0, 1, '2016-08-28 15:21:55'),
  (7, 'admin', 'user7@email.co.za', 'surname7', 'name7', '0831234675', '910468784213646', 3, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 0, 1, '2016-08-28 15:21:55'),
  (8, 'contractor', 'user8@email.co.za', 'surname8', 'name8', '0837543215', '910468784213647', 1, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 0, 1, '2016-08-28 15:21:55'),
  (9, 'homeUser', 'user9@email.co.za', 'surname9', 'name9', '0831234325', '910468784213649', 2, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 0, 1, '2016-08-28 15:21:55'),
  (10, 'TradeWorker', 'user10@email.co.za', 'surname10', 'name10', '0831212675', '910468784213640', 0, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 0, 1, '2016-08-28 15:21:55'),
  (11, 'TradeWorker1', 'user11@email.co.za', 'surname11', 'name11', '0831212673', '910468784213611', 0, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 0, 1, '2016-08-28 15:21:55'),
  (12, 'TradeWorker2', 'user12@email.co.za', 'surname12', 'name12', '0831212671', '910468784213612', 0, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 0, 1, '2016-08-28 15:21:55'),
  (13, 'TradeWorker3', 'user13@email.co.za', 'surname13', 'name13', '0831212674', '910468784213613', 0, '$2y$10$20lIJidCeh.z.BGGupMMrOFPtSMmNLLaOOgO1xhr3SxEQsTYKKoGW', 0, 1, '2016-08-28 15:21:55'),
  (14, 'tradeworker5', 'user14@gmail.com', 'Trevor', 'Javeling', '074125123123', '9109275230084', 0, '$2y$10$s32YBiOUAqqxJ1g0jpEB4uo4r7XHilMYiBq8S1Ke4vkKcGB3cxlGW', 0, 1, '2016-08-28 15:22:07'),
  (15, 'tradeworker6', 'user15@gmail.com', 'Bob', 'Faul', '0741253545', '65879453215684', 0, '$2y$10$kaz1W8p1OypNyPrZv6RdDu0UF3K7rFwg0Yt.VYANQ1QPqsQ2YNqf.', 0, 1, '2016-08-28 15:26:37'),
  (17, 'tradeworker7', 'user16@gmail.com', 'Joe', 'Schooling', '0742312341', '910927634643', 0, '$2y$10$vhSz/rlaiDQPRmbDoCBiI.7IAkbqeUnrMyYc9JZ1URiP1NCOB8Z3e', 0, 1, '2016-08-28 15:32:06'),
  (19, 'Tradeworker8', 'user17@gmail.com', 'Steven', 'Cabo', '0741897652', '654879987652', 0, '$2y$10$Z6gU9Yg8f.rTnXJDNT/vzOcm06TsIckh9wIYQGUqe0OjHnNfOPvlG', 0, 1, '2016-08-28 19:21:50'),
  (20, 'Tradeworker9', 'user18@gmail.com', 'Joe', 'Boe', '1232141255', '456879652165', 0, '$2y$10$VOzNfzcuDge5td2ekQIs8OLMFw/zpW77YF9Y9EXlic.VAmADzQuya', 0, 1, '2016-08-28 19:26:43'),
  (21, 'Tradeworker10', 'user19@gmail.com', 'Joe', 'Boe', '1235627257', '76848856773', 0, '$2y$10$z/Rkxg7Vu2lazj8mixZmj.DQePMEH/zhm0FwEws3OtXLZf64ccjva', 0, 1, '2016-08-28 19:32:08'),
  (22, 'Tradeworker11', 'user20@gmail.com', 'Joe', 'Boe', '1235627257', '421351621463', 0, '$2y$10$lU2qOUSLCty0uKSxLxZf2e4TSBj7fM1Au.Ofjdom7psz0o5JyRQda', 0, 1, '2016-08-28 19:37:58'),
  (23, 'Tradeworker12', 'user21@gmail.com', 'Joe', 'Boe', '1235627257', '12441253213', 0, '$2y$10$wqlCiBupeSVDLFlIXvsPqOYHaFy2.C8HxFePFme5Nxx2CfH75zN8y', 0, 1, '2016-08-28 19:42:59'),
  (24, 'Tradeworker14', 'bwcfaul@gmail.com', 'Joe', 'Boe', '1242352123', '5125262373', 0, '$2y$10$X11ewF/hDgFywtzkOEQcke2cDw2mpUKVBqE.yjjeYJ0ZNNXAQfzVe', 0, 1, '2016-08-28 19:46:29');

INSERT INTO `locations` (`locationID`, `locationName`, `Coordinates`, `Region`, `Province`, `City`) VALUES
  (1, 'Airdlin', NULL, NULL, 'GP', 'South Africa'),
  (2, 'Barbeque Downs', NULL, NULL, 'GP', 'South Africa'),
  (3, 'Bloubosrand', NULL, NULL, 'GP', 'South Africa'),
  (4, 'Blue Hills', NULL, NULL, 'GP', 'South Africa'),
  (5, 'Broadacres', NULL, NULL, 'GP', 'South Africa'),
  (6, 'Edenvale', NULL, NULL, 'GP', 'South Africa'),
  (7, 'Germiston', NULL, NULL, 'GP', 'South Africa'),
  (8, 'Orange Farm', NULL, 'G', 'GP', 'South Africa'),
  (9, 'Sandton', NULL, NULL, 'GP', 'South Africa'),
  (10, 'Kempton Park', NULL, NULL, 'GP', 'South Africa'),
  (11, 'Soweto', NULL, NULL, 'GP', 'South Africa'),
  (12, 'Tembisa', NULL, NULL, 'GP', 'South Africa'),
  (13, 'South Africa', NULL, NULL, 'GP', 'South Africa'),
  (14, 'Vereeniging', NULL, NULL, 'GP', 'South Africa'),
  (17, 'Alberton', NULL, NULL, 'GP', 'South Africa'),
  (18, 'Cape Town', NULL, NULL, 'WC', 'South Africa'),
  (21, 'Stellenbosch', NULL, NULL, 'WC', 'South Africa'),
  (22, 'Hermanus', NULL, NULL, 'WC', 'South Africa'),
  (23, 'Paarl', NULL, NULL, 'WC', 'South Africa'),
  (24, 'Langebaan', NULL, NULL, 'WC', 'South Africa'),
  (25, 'Upington', NULL, NULL, 'NC', 'South Africa'),
  (26, 'Postmasburg', NULL, NULL, 'NC', 'South Africa'),
  (27, 'Kimberley', NULL, NULL, 'NC', 'South Africa'),
  (28, 'Port Elizabeth', NULL, NULL, 'EC', 'South Africa'),
  (29, 'Mthatha', NULL, NULL, 'EC', 'South Africa'),
  (30, 'Durban', NULL, NULL, 'KZN', 'South Africa'),
  (31, 'Amanzimtoti', NULL, NULL, 'KZN', 'South Africa'),
  (32, 'Dolphin Coast', NULL, NULL, 'KZN', 'South Africa'),
  (33, 'Bloemfontein', NULL, NULL, 'FS', 'South Africa'),
  (34, 'Bethlehem', NULL, NULL, 'FS', 'South Africa');


INSERT 	 INTO `SPECIALIZATIONS` (`WorkType`, `Description`)
	VALUES	('Painter', 'person who paints'),
			( 'Tiler', 'Person who tiles floors'),
			('Paving', 'Person who paves areas'),
    ('Decking', 'Person who paves areas'),
    ('Plumber', 'Person who fixes plumbing for a living'),
    ('Brick-Layer', 'Person who lays bricks for buildings'),
    ('foundation-Layer', 'Person who lays foundation for buildings'),
			('Tree-Feller', 'Person who removes trees');

INSERT INTO `specializations_per_user` (`specID`, `UserID`, `workTypeID`, `Recommendations`) VALUES
  (1, 10, 1, 0),
  (2, 10, 3, 0),
  (3, 10, 6, 0),
  (4, 11, 2, 0),
  (5, 11, 4, 0),
  (6, 12, 5, 0),
  (7, 13, 8, 0),
  (8, 13, 7, 0),
  (9, 12, 6, 0),
  (10, 14, 6, 0),
  (11, 14, 4, 0),
  (12, 14, 7, 0),
  (13, 15, 1, 0),
  (14, 15, 3, 0),
  (15, 15, 5, 0),
  (18, 17, 2, 0),
  (19, 17, 8, 0),
  (23, 19, 6, 0),
  (24, 19, 4, 0),
  (25, 19, 7, 0),
  (26, 20, 1, 0),
  (27, 20, 3, 0),
  (28, 20, 5, 0),
  (29, 21, 1, 0),
  (30, 21, 3, 0),
  (31, 21, 5, 0),
  (32, 22, 2, 0),
  (33, 22, 8, 0),
  (34, 22, 6, 0),
  (35, 23, 2, 0),
  (36, 23, 8, 0),
  (37, 23, 6, 0),
  (38, 24, 6, 0),
  (39, 24, 4, 0),
  (40, 24, 7, 0);

INSERT INTO `trade_worker` (`tradeworkerID`, `UserID`, `DateWorked`, `Availability`, `ActiveWorkRequests`, `OverallWorkRequests`, `WorkRequestsMissed`, `WorkRequestsAccepted`, `WorkRequestsRejected`) VALUES
  (1, 10, '2016-08-01', 0, 0, 0, 0, 0, 0),
  (2, 11, '2016-08-01', 1, 0, 0, 0, 0, 0),
  (3, 12, '2016-07-02', 1, 0, 0, 0, 0, 0),
  (4, 13, '2016-08-01', 1, 0, 0, 0, 0, 0),
  (5, 14, '2016-08-28', 1, 0, 0, 0, 0, 0),
  (6, 15, '2016-08-28', 0, 0, 0, 0, 0, 0),
  (8, 17, '2016-08-28', 0, 0, 0, 0, 0, 0),
  (10, 19, '2016-08-28', 1, 0, 0, 0, 0, 0),
  (11, 20, '2016-08-28', 1, 0, 0, 0, 0, 0),
  (12, 21, '2016-08-28', 1, 0, 0, 0, 0, 0),
  (13, 22, '2016-08-28', 1, 0, 0, 0, 0, 0),
  (14, 23, '2016-08-28', 1, 0, 0, 0, 0, 0),
  (15, 24, '2016-08-28', 1, 0, 0, 0, 0, 0);

INSERT INTO `HOMEUSER` (`UserID`,`Subscribed`)
VALUES (9,0);

INSERT INTO `locations_per_user` (`localID`, `UserID`, `locationID`) VALUES
  (1, 10, 1),
  (2, 10, 3),
  (3, 10, 6),
  (4, 11, 2),
  (5, 11, 4),
  (6, 12, 5),
  (7, 13, 6),
  (8, 13, 7),
  (9, 12, 6),
  (10, 14, 6),
  (11, 14, 9),
  (12, 14, 10),
  (13, 15, 11),
  (14, 15, 12),
  (15, 15, 13),
  (16, 17, 14),
  (17, 17, 7),
  (18, 17, 17),
  (19, 19, 18),
  (20, 19, 18),
  (21, 19, 21),
  (22, 20, 22),
  (23, 20, 23),
  (24, 20, 24),
  (25, 21, 25),
  (26, 21, 26),
  (27, 21, 27),
  (28, 22, 28),
  (29, 22, 29),
  (30, 23, 30),
  (31, 23, 31),
  (32, 23, 32),
  (33, 24, 33),
  (34, 24, 34);

INSERT INTO `NOTIFICATION` (`UserID`,`Message`)
    VALUES (9,'Welcome!'),
      (9, 'This is a second notification!');

INSERT INTO `area_per_location` (`AreaID`, `StreetNumber`, `Road`, `AreaName`, `locationID`) VALUES
  (1, '14', '15th Avenue', 'Edenvale', 6);

INSERT INTO `quote_request` (`RequestID`, `UserID`, `NumberOfWorkersRequested`, `NumberOfWorkersAccepted`, `workTypeID`, `JobDescription`, `Address`, `DateInitialised`, `JobCommencementDate`, `Status`) VALUES
  (1, 9, 1, 1, 6, 'Hello', 1, '2016-08-30 21:11:37', '2016-09-01', 1),
  (2, 9, 1, 0, 6, 'Please do the following', 1, '2016-08-31 00:24:19', '2016-06-02', 0),
  (3, 9, 1, 0, 6, 'Please do the following', 1, '2016-08-31 00:24:36', '2016-05-16', 0),
  (4, 9, 1, 0, 6, 'Please do the following', 1, '2016-08-31 00:24:47', '2016-04-13', 0),
  (5, 9, 1, 0, 6, 'Please do the following', 1, '2016-08-31 00:24:58', '2016-03-14', 0),
  (6, 9, 1, 0, 6, 'Please do the following', 1, '2016-08-31 00:25:01', '2016-03-14', 0),
  (7, 9, 1, 0, 6, 'Please do the following', 1, '2016-08-31 00:25:18', '2016-10-28', 0),
  (8, 9, 1, 0, 6, 'Please do this', 1, '2016-09-03 13:22:29', '2016-12-02', 0);

INSERT INTO `quote` (`QuoteID`, `RequestID`, `RequestedUser`, `Status`, `HomeuserResponse`) VALUES
  (1, 1, 12, 3, 3),
  (2, 2, 12, 0, 0),
  (3, 3, 12, 0, 0),
  (4, 4, 12, 0, 0),
  (5, 5, 12, 0, 0),
  (6, 6, 12, 0, 0),
  (7, 7, 12, 0, 0),
  (8, 8, 14, 0, 0);

INSERT INTO `job_per_user` (`JobID`, `QuoteID`, `JobProceedDate`, `AgreedPrice`, `EstimatedCompletionDate`, `Status`, `TradeworkerRequest`, `Notifier`) VALUES
  (1, 1, '2016-09-01', 800, '2016-09-06', 0, 0, 0);