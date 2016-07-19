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
  `Region` varchar(50) not null,
  `Province` varchar(50) not NULL,
  `City` varchar(50) not NULL,
	PRIMARY KEY (`locationID`)
);

DROP TABLE IF EXISTS `TRADE_WORKER`;
CREATE TABLE `TRADE_WORKER` (
	`tradeworkerID` integer not null auto_increment,
	`UserID` integer not null unique,
  `Availability` boolean not null,
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
  `BusinessHours` varchar(40) not null,
  `Availability` boolean not null,
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



INSERT 	 INTO `LOCATIONS` ( `locationName`, `Coordinates`,`Region`,`Province`,`City`)
	VALUES ('Airdlin','26.0389:28.0638','A','Gauteng','Johannesburg'),
    ('Barbeque Downs', '0:0', 'A','Gauteng','Johannesburg'),
    ('Bloubosrand', '0:0', 'A','Gauteng','Johannesburg'),
    ('Blue Hills', '0:0', 'A','Gauteng','Johannesburg'),
    ('Broadacres', '0:0', 'A','Gauteng','Johannesburg'),
    ('Buccleuch', '0:0', 'A','Gauteng','Johannesburg'),
    ('Carlswald', '0:0', 'A','Gauteng','Johannesburg'),
    ('Chartwell', '0:0', 'A','Gauteng','Johannesburg'),
    ('Country View', '0:0', 'A','Gauteng','Johannesburg'),
    ('Crowthorne', '0:0', 'A','Gauteng','Johannesburg'),
    ('Dainfern', '0:0', 'A','Gauteng','Johannesburg'),
    ('Diepsloot', '0:0', 'A','Gauteng','Johannesburg'),
    ('Ebony Park', '0:0', 'A','Gauteng','Johannesburg'),
    ('Erand', '0:0', 'A','Gauteng','Johannesburg'),
    ('Farmall', '0:0', 'A','Gauteng','Johannesburg'),
    ('Glen Austin', '0:0', 'A','Gauteng','Johannesburg'),
    ('Halfway Gardens', '0:0', 'A','Gauteng','Johannesburg'),
    ('Halfway House Estate', '0:0', 'A','Gauteng','Johannesburg'),
    ('Headway Hill', '0:0', 'A','Gauteng','Johannesburg'),
    ('Houtkoppen', '0:0', 'A','Gauteng','Johannesburg'),
    ('Inadan', '0:0', 'A','Gauteng','Johannesburg'),
    ('Ivory Park', '0:0', 'A','Gauteng','Johannesburg'),
    ('Kya Sand', '0:0', 'A','Gauteng','Johannesburg'),
    ('Kya Sands', '0:0', 'A','Gauteng','Johannesburg'),
    ('Kyalami Agricultural Holdings', '0:0', 'A','Gauteng','Johannesburg'),
    ('Kyalami Business Park', '0:0', 'A','Gauteng','Johannesburg'),
    ('Kyalami Estates', '0:0', 'A','Gauteng','Johannesburg'),
    ('Midrand', '0:0', 'A','Gauteng','Johannesburg'),
    ('Midridge Park', '0:0', 'A','Gauteng','Johannesburg'),
    ('Millgate Farm', '0:0', 'A','Gauteng','Johannesburg'),
    ('Nietgedacht', '0:0', 'A','Gauteng','Johannesburg'),
    ('Noordwyk', '0:0', 'A','Gauteng','Johannesburg'),
    ('North Champagne Estates', '0:0', 'A','Gauteng','Johannesburg'),
    ('Paulshof', '0:0', 'A','Gauteng','Johannesburg'),
    ('Plooysville', '0:0', 'A','Gauteng','Johannesburg'),
    ('Rabie Ridge', '0:0', 'A','Gauteng','Johannesburg'),
    ('Randjespark', '0:0', 'A','Gauteng','Johannesburg'),
    ('Salfred', '0:0', 'A','Gauteng','Johannesburg'),
    ('Sunninghill', '0:0', 'A','Gauteng','Johannesburg'),
    ('Sunrella', '0:0', 'A','Gauteng','Johannesburg'),
    ('Trevallyn', '0:0', 'A','Gauteng','Johannesburg'),
    ('Trojan', '0:0', 'A','Gauteng','Johannesburg'),
    ('Vorna Valley', '0:0', 'A','Gauteng','Johannesburg'),
    ('Willaway', '0:0', 'A','Gauteng','Johannesburg'),
    ('Witkoppen', '0:0', 'A','Gauteng','Johannesburg'),
    ('Albertskroon', '0:0', 'B','Gauteng','Johannesburg'),
    ('Albertville', '0:0', 'B','Gauteng','Johannesburg'),
    ('Aldara Park', '0:0', 'B','Gauteng','Johannesburg'),
    ('Amalgam', '0:0', 'B','Gauteng','Johannesburg'),
    ('Auckland Park', '0:0', 'B','Gauteng','Johannesburg'),
    ('Berario', '0:0', 'B','Gauteng','Johannesburg'),
    ('Beverley Gardens', '0:0', 'B','Gauteng','Johannesburg'),
    ('Blackheath', '0:0', 'B','Gauteng','Johannesburg'),
    ('Blairgowrie', '0:0', 'B','Gauteng','Johannesburg'),
    ('Bordeaux', '0:0', 'B','Gauteng','Johannesburg'),
    ('Bosmont', '0:0', 'B','Gauteng','Johannesburg'),
    ('Brixton', '0:0', 'B','Gauteng','Johannesburg'),
    ('Bryanbrink', '0:0', 'B','Gauteng','Johannesburg'),
    ('Bryanston West', '0:0', 'B','Gauteng','Johannesburg'),
    ('Clynton', '0:0', 'B','Gauteng','Johannesburg'),
    ('Country Life Park', '0:0', 'B','Gauteng','Johannesburg'),
    ('Craighall', '0:0', 'B','Gauteng','Johannesburg'),
    ('Craighall Park', '0:0', 'B','Gauteng','Johannesburg'),
    ('Cramerview', '0:0', 'B','Gauteng','Johannesburg'),
    ('Cresta', '0:0', 'B','Gauteng','Johannesburg'),
    ('Crown', '0:0', 'B','Gauteng','Johannesburg'),
    ('Daniel Brink Park', '0:0', 'B','Gauteng','Johannesburg'),
    ('Darrenwood', '0:0', 'B','Gauteng','Johannesburg'),
    ('Dunkeld West', '0:0', 'B','Gauteng','Johannesburg'),
    ('Dunkeld', '0:0', 'B','Gauteng','Johannesburg'),
    ('Emmarentia', '0:0', 'B','Gauteng','Johannesburg'),
    ('Ferndale', '0:0', 'B','Gauteng','Johannesburg'),
    ('Florida Glen', '0:0', 'B','Gauteng','Johannesburg'),
    ('Fontainebleau', '0:0', 'B','Gauteng','Johannesburg'),
    ('Forest Town', '0:0', 'B','Gauteng','Johannesburg'),
    ('Glenadrienne', '0:0', 'B','Gauteng','Johannesburg'),
    ('Gleniffer', '0:0', 'B','Gauteng','Johannesburg'),
    ('Greenside', '0:0', 'B','Gauteng','Johannesburg'),
    ('Greymont', '0:0', 'B','Gauteng','Johannesburg'),
    ('Hurlingham Gardens', '0:0', 'B','Gauteng','Johannesburg'),
    ('Hurlingham', '0:0', 'B','Gauteng','Johannesburg'),
    ('Hyde Park', '0:0', 'B','Gauteng','Johannesburg'),
    ('Jan Hofmeyer', '0:0', 'B','Gauteng','Johannesburg'),
    ('Kensington B', '0:0', 'B','Gauteng','Johannesburg'),
    ('Linden', '0:0', 'B','Gauteng','Johannesburg'),
    ('Lyme Park', '0:0', 'B','Gauteng','Johannesburg'),
    ('Malanshof', '0:0', 'B','Gauteng','Johannesburg'),
    ('Melville', '0:0', 'B','Gauteng','Johannesburg'),
    ('Mill Hill', '0:0', 'B','Gauteng','Johannesburg'),
    ('Newlands', '0:0', 'B','Gauteng','Johannesburg'),
    ('Northcliff', '0:0', 'B','Gauteng','Johannesburg'),
    ('Oerder Park', '0:0', 'B','Gauteng','Johannesburg'),
    ('Osummit', '0:0', 'B','Gauteng','Johannesburg'),
    ('Parkhurst', '0:0', 'B','Gauteng','Johannesburg'),
    ('Parkmore', '0:0', 'B','Gauteng','Johannesburg'),
    ('Parktown North', '0:0', 'B','Gauteng','Johannesburg'),
    ('Praegville', '0:0', 'B','Gauteng','Johannesburg'),
    ('President Ridge', '0:0', 'B','Gauteng','Johannesburg'),
    ('Randburg', '0:0', 'B','Gauteng','Johannesburg'),
    ('Randpark', '0:0', 'B','Gauteng','Johannesburg'),
    ('Randpark Ridge', '0:0', 'B','Gauteng','Johannesburg'),
    ('River Bend', '0:0', 'B','Gauteng','Johannesburg'),
    ('Rosebank', '0:0', 'B','Gauteng','Johannesburg'),
    ('Ruiterhof', '0:0', 'B','Gauteng','Johannesburg'),
    ('Sandhurst', '0:0', 'B','Gauteng','Johannesburg'),
    ('Solridge', '0:0', 'B','Gauteng','Johannesburg'),
    ('Sophiatown', '0:0', 'B','Gauteng','Johannesburg'),
    ('Strijdompark', '0:0', 'B','Gauteng','Johannesburg'),
    ('Vandia Grove', '0:0', 'B','Gauteng','Johannesburg'),
    ('Vrededorp', '0:0', 'B','Gauteng','Johannesburg'),
    ('Westcliff', '0:0', 'B','Gauteng','Johannesburg'),
    ('Willowild', '0:0', 'B','Gauteng','Johannesburg'),
    ('Bromhof', '0:0', 'C','Gauteng','Johannesburg'),
    ('Bush Hill', '0:0', 'C','Gauteng','Johannesburg'),
    ('Constantia Kloof', '0:0', 'C','Gauteng','Johannesburg'),
    ('Douglasdale', '0:0', 'C','Gauteng','Johannesburg'),
    ('Fairland', '0:0', 'C','Gauteng','Johannesburg'),
    ('Florida Hills', '0:0', 'C','Gauteng','Johannesburg'),
    ('Florida', '0:0', 'C','Gauteng','Johannesburg'),
    ('Johannesburg North', '0:0', 'C','Gauteng','Johannesburg'),
    ('Jukskei Park', '0:0', 'C','Gauteng','Johannesburg'),
    ('Northgate', '0:0', 'C','Gauteng','Johannesburg'),
    ('Northriding', '0:0', 'C','Gauteng','Johannesburg'),
    ('Olivedale', '0:0', 'C','Gauteng','Johannesburg'),
    ('Roodepoort', '0:0', 'C','Gauteng','Johannesburg'),
    ('Weltevredenpark', '0:0', 'C','Gauteng','Johannesburg'),
    ('Zandspruit', '0:0', 'C','Gauteng','Johannesburg'),
    ('Diepkloof', '0:0', 'D','Gauteng','Johannesburg'),
    ('Dobsonville', '0:0', 'D','Gauteng','Johannesburg'),
    ('Doornkop', '0:0', 'D','Gauteng','Johannesburg'),
    ('Kliptown', '0:0', 'D','Gauteng','Johannesburg'),
    ('Meadowlands', '0:0', 'D','Gauteng','Johannesburg'),
    ('Noordgesig', '0:0', 'D','Gauteng','Johannesburg'),
    ('Orlando', '0:0', 'D','Gauteng','Johannesburg'),
    ('Phiri', '0:0', 'D','Gauteng','Johannesburg'),
    ('Protea Glen', '0:0', 'D','Gauteng','Johannesburg'),
    ('Soweto', '0:0', 'D','Gauteng','Johannesburg'),
    ('Zola', '0:0', 'D','Gauteng','Johannesburg'),
    ('Abbotsford', '0:0', 'E','Gauteng','Johannesburg'),
    ('Alexandra', '0:0', 'E','Gauteng','Johannesburg'),
    ('Atholhurst', '0:0', 'E','Gauteng','Johannesburg'),
    ('Atholl Gardens', '0:0', 'E','Gauteng','Johannesburg'),
    ('Atholl', '0:0', 'E','Gauteng','Johannesburg'),
    ('Bagleyston', '0:0', 'E','Gauteng','Johannesburg'),
    ('Benmore Gardens', '0:0', 'E','Gauteng','Johannesburg'),
    ('Birdhaven', '0:0', 'E','Gauteng','Johannesburg'),
    ('Birnam', '0:0', 'E','Gauteng','Johannesburg'),
    ('Bramley North', '0:0', 'E','Gauteng','Johannesburg'),
    ('Bramley Park', '0:0', 'E','Gauteng','Johannesburg'),
    ('Bramley', '0:0', 'E','Gauteng','Johannesburg'),
    ('Bruma Lake Flea Market', '0:0', 'E','Gauteng','Johannesburg'),
    ('Bryanston East', '0:0', 'E','Gauteng','Johannesburg'),
    ('Bryanston', '0:0', 'E','Gauteng','Johannesburg'),
    ('Cheltondale', '0:0', 'E','Gauteng','Johannesburg'),
    ('Chislehurston', '0:0', 'E','Gauteng','Johannesburg'),
    ('Cyrildene', '0:0', 'E','Gauteng','Johannesburg'),
    ('Dalecross', '0:0', 'E','Gauteng','Johannesburg'),
    ('Dennehof', '0:0', 'E','Gauteng','Johannesburg'),
    ('Dunhill', '0:0', 'E','Gauteng','Johannesburg'),
    ('Edenburg', '0:0', 'E','Gauteng','Johannesburg'),
    ('Elton Hill', '0:0', 'E','Gauteng','Johannesburg'),
    ('Epsom Downs', '0:0', 'E','Gauteng','Johannesburg'),
    ('Fairway', '0:0', 'E','Gauteng','Johannesburg'),
    ('Fairwood', '0:0', 'E','Gauteng','Johannesburg'),
    ('Fellside', '0:0', 'E','Gauteng','Johannesburg'),
    ('Forbesdale', '0:0', 'E','Gauteng','Johannesburg'),
    ('Fourways', '0:0', 'E','Gauteng','Johannesburg'),
    ('Gallo Manor', '0:0', 'E','Gauteng','Johannesburg'),
    ('The Gardens', '0:0', 'E','Gauteng','Johannesburg'),
    ('Glen Athol', '0:0', 'E','Gauteng','Johannesburg'),
    ('Glenhazel', '0:0', 'E','Gauteng','Johannesburg'),
    ('Gresswold', '0:0', 'E','Gauteng','Johannesburg'),
    ('Hawkins Estate', '0:0', 'E','Gauteng','Johannesburg'),
    ('Highlands North', '0:0', 'E','Gauteng','Johannesburg'),
    ('Houghton Estate', '0:0', 'E','Gauteng','Johannesburg'),
    ('Hurl Park', '0:0', 'E','Gauteng','Johannesburg'),
    ('Illovo', '0:0', 'E','Gauteng','Johannesburg'),
    ('Inanda', '0:0', 'E','Gauteng','Johannesburg'),
    ('Kentview', '0:0', 'E','Gauteng','Johannesburg'),
    ('Kew', '0:0', 'E','Gauteng','Johannesburg'),
    ('Khyber Rock', '0:0', 'E','Gauteng','Johannesburg'),
    ('Killarney', '0:0', 'E','Gauteng','Johannesburg'),
    ('Klevehill Park', '0:0', 'E','Gauteng','Johannesburg'),
    ('Littlefillan', '0:0', 'E','Gauteng','Johannesburg'),
    ('Lone Hill', '0:0', 'E','Gauteng','Johannesburg'),
    ('Magalies', '0:0', 'E','Gauteng','Johannesburg'),
    ('Magaliessig', '0:0', 'E','Gauteng','Johannesburg'),
    ('Marlboro Gardens', '0:0', 'E','Gauteng','Johannesburg'),
    ('Marlboro', '0:0', 'E','Gauteng','Johannesburg'),
    ('Maryvale', '0:0', 'E','Gauteng','Johannesburg'),
    ('Melrose Estate', '0:0', 'E','Gauteng','Johannesburg'),
    ('Melrose North', '0:0', 'E','Gauteng','Johannesburg'),
    ('Melrose', '0:0', 'E','Gauteng','Johannesburg'),
    ('Moodie Hill', '0:0', 'E','Gauteng','Johannesburg'),
    ('Morningside Manor', '0:0', 'E','Gauteng','Johannesburg'),
    ('Morningside', '0:0', 'E','Gauteng','Johannesburg'),
    ('Mountain View', '0:0', 'E','Gauteng','Johannesburg'),
    ('Norscot', '0:0', 'E','Gauteng','Johannesburg'),
    ('Northern Acres', '0:0', 'E','Gauteng','Johannesburg'),
    ('Norwood', '0:0', 'E','Gauteng','Johannesburg'),
    ('Oaklands', '0:0', 'E','Gauteng','Johannesburg'),
    ('Orange Grove', '0:0', 'E','Gauteng','Johannesburg'),
    ('Percelia Estate', '0:0', 'E','Gauteng','Johannesburg'),
    ('Petervale', '0:0', 'E','Gauteng','Johannesburg'),
    ('Raedene Estate', '0:0', 'E','Gauteng','Johannesburg'),
    ('Raumarais Park', '0:0', 'E','Gauteng','Johannesburg'),
    ('River Club', '0:0', 'E','Gauteng','Johannesburg'),
    ('Riviera', '0:0', 'E','Gauteng','Johannesburg'),
    ('Rivonia', '0:0', 'E','Gauteng','Johannesburg'),
    ('Sandton', '0:0', 'E','Gauteng','Johannesburg'),
    ('Savoy Estate', '0:0', 'E','Gauteng','Johannesburg'),
    ('Saxonwold', '0:0', 'E','Gauteng','Johannesburg'),
    ('Simba', '0:0', 'E','Gauteng','Johannesburg'),
    ('Strathavon', '0:0', 'E','Gauteng','Johannesburg'),
    ('Sunningdale Ridge', '0:0', 'E','Gauteng','Johannesburg'),
    ('Sunningdale', '0:0', 'E','Gauteng','Johannesburg'),
    ('Sydenham', '0:0', 'E','Gauteng','Johannesburg'),
    ('Victoria', '0:0', 'E','Gauteng','Johannesburg'),
    ('Wierda Valley', '0:0', 'E','Gauteng','Johannesburg'),
    ('Woodlands', '0:0', 'E','Gauteng','Johannesburg'),
    ('Woodmead', '0:0', 'E','Gauteng','Johannesburg'),
    ('Wynberg', '0:0', 'E','Gauteng','Johannesburg'),
    ('Aeroton', '0:0', 'F','Gauteng','Johannesburg'),
    ('Alan Manor', '0:0', 'F','Gauteng','Johannesburg'),
    ('Aspen Hills', '0:0', 'F','Gauteng','Johannesburg'),
    ('Belgravia', '0:0', 'F','Gauteng','Johannesburg'),
    ('Bellevue East', '0:0', 'F','Gauteng','Johannesburg'),
    ('Bellevue', '0:0', 'F','Gauteng','Johannesburg'),
    ('Benrose', '0:0', 'F','Gauteng','Johannesburg'),
    ('Berea', '0:0', 'F','Gauteng','Johannesburg'),
    ('Bertrams', '0:0', 'F','Gauteng','Johannesburg'),
    ('Braamfontein', '0:0', 'F','Gauteng','Johannesburg'),
    ('Braamfontein Werf', '0:0', 'F','Gauteng','Johannesburg'),
    ('Chrisville', '0:0', 'F','Gauteng','Johannesburg'),
    ('City and Suburban', '0:0', 'F','Gauteng','Johannesburg'),
    ('City Deep', '0:0', 'F','Gauteng','Johannesburg'),
    ('City West-Denver', '0:0', 'F','Gauteng','Johannesburg'),
    ('Crown Gardens', '0:0', 'F','Gauteng','Johannesburg'),
    ('Crown North', '0:0', 'F','Gauteng','Johannesburg'),
    ('Doornfontein', '0:0', 'F','Gauteng','Johannesburg'),
    ('Droste Park', '0:0', 'F','Gauteng','Johannesburg'),
    ('Eagles Nest', '0:0', 'F','Gauteng','Johannesburg'),
    ('Eastcliff', '0:0', 'F','Gauteng','Johannesburg'),
    ('Elandspark', '0:0', 'F','Gauteng','Johannesburg'),
    ('Elcedes', '0:0', 'F','Gauteng','Johannesburg'),
    ('Electron', '0:0', 'F','Gauteng','Johannesburg'),
    ('Elladoone', '0:0', 'F','Gauteng','Johannesburg'),
    ('Evans Park', '0:0', 'F','Gauteng','Johannesburg'),
    ('Fairview', '0:0', 'F','Gauteng','Johannesburg'),
    ('Ferreirasdorp', '0:0', 'F','Gauteng','Johannesburg'),
    ('Fordsburg', '0:0', 'F','Gauteng','Johannesburg'),
    ('Forest Hill', '0:0', 'F','Gauteng','Johannesburg'),
    ('Framton', '0:0', 'F','Gauteng','Johannesburg'),
    ('The Gables', '0:0', 'F','Gauteng','Johannesburg'),
    ('Gillview', '0:0', 'F','Gauteng','Johannesburg'),
    ('Glenanda', '0:0', 'F','Gauteng','Johannesburg'),
    ('Glenesk', '0:0', 'F','Gauteng','Johannesburg'),
    ('Glenvista', '0:0', 'F','Gauteng','Johannesburg'),
    ('Haddon', '0:0', 'F','Gauteng','Johannesburg'),
    ('Heriotdale', '0:0', 'F','Gauteng','Johannesburg'),
    ('Highlands', '0:0', 'F','Gauteng','Johannesburg'),
    ('The Hill', '0:0', 'F','Gauteng','Johannesburg'),
    ('Hillbrow', '0:0', 'F','Gauteng','Johannesburg'),
    ('Jeppestown', '0:0', 'F','Gauteng','Johannesburg'),
    ('Jeppestown South', '0:0', 'F','Gauteng','Johannesburg'),
    ('Johannesburg South', '0:0', 'F','Gauteng','Johannesburg'),
    ('Joubert Park', '0:0', 'F','Gauteng','Johannesburg'),
    ('Judith\'s Paarl', '0:0', 'F','Gauteng','Johannesburg'),
    ('Kenilworth', '0:0', 'F','Gauteng','Johannesburg'),
    ('Kensington', '0:0', 'F','Gauteng','Johannesburg'),
    ('Kibler Park', '0:0', 'F','Gauteng','Johannesburg'),
    ('Klipriviersberg', '0:0', 'F','Gauteng','Johannesburg'),
    ('La Rochelle', '0:0', 'F','Gauteng','Johannesburg'),
    ('Lake View Estate', '0:0', 'F','Gauteng','Johannesburg'),
    ('Liefde en Vrede', '0:0', 'F','Gauteng','Johannesburg'),
    ('Lindberg Park', '0:0', 'F','Gauteng','Johannesburg'),
    ('Linmeyer', '0:0', 'F','Gauteng','Johannesburg'),
    ('Lorentzville', '0:0', 'F','Gauteng','Johannesburg'),
    ('Malvern', '0:0', 'F','Gauteng','Johannesburg'),
    ('Marshalls', '0:0', 'F','Gauteng','Johannesburg'),
    ('Marshalltown', '0:0', 'F','Gauteng','Johannesburg'),
    ('Mayfair', '0:0', 'F','Gauteng','Johannesburg'),
    ('Mayfield Park', '0:0', 'F','Gauteng','Johannesburg'),
    ('Meredale', '0:0', 'F','Gauteng','Johannesburg'),
    ('Milpark', '0:0', 'F','Gauteng','Johannesburg'),
    ('Moffat View', '0:0', 'F','Gauteng','Johannesburg'),
    ('Mondeor', '0:0', 'F','Gauteng','Johannesburg'),
    ('Mulbarton', '0:0', 'F','Gauteng','Johannesburg'),
    ('Nasrec', '0:0', 'F','Gauteng','Johannesburg'),
    ('New Centre', '0:0', 'F','Gauteng','Johannesburg'),
    ('New Doornfontein', '0:0', 'F','Gauteng','Johannesburg'),
    ('Newtown', '0:0', 'F','Gauteng','Johannesburg'),
    ('North Doornfontein', '0:0', 'F','Gauteng','Johannesburg'),
    ('Oakdene', '0:0', 'F','Gauteng','Johannesburg'),
    ('Observatory', '0:0', 'F','Gauteng','Johannesburg'),
    ('Ophirton', '0:0', 'F','Gauteng','Johannesburg'),
    ('Ormonde', '0:0', 'F','Gauteng','Johannesburg'),
    ('Pageview', '0:0', 'F','Gauteng','Johannesburg'),
    ('Park Central', '0:0', 'F','Gauteng','Johannesburg'),
    ('Parktown', '0:0', 'F','Gauteng','Johannesburg'),
    ('Patlynn', '0:0', 'F','Gauteng','Johannesburg'),
    ('Prolecon', '0:0', 'F','Gauteng','Johannesburg'),
    ('Randview', '0:0', 'F','Gauteng','Johannesburg'),
    ('Regency', '0:0', 'F','Gauteng','Johannesburg'),
    ('Regents Park Estate', '0:0', 'F','Gauteng','Johannesburg'),
    ('Regents Park', '0:0', 'F','Gauteng','Johannesburg'),
    ('Reuven', '0:0', 'F','Gauteng','Johannesburg'),
    ('Rewlatch', '0:0', 'F','Gauteng','Johannesburg'),
    ('Reynolds View', '0:0', 'F','Gauteng','Johannesburg'),
    ('Ridgeway', '0:0', 'F','Gauteng','Johannesburg'),
    ('Riepen Park', '0:0', 'F','Gauteng','Johannesburg'),
    ('Risana', '0:0', 'F','Gauteng','Johannesburg'),
    ('Rispark', '0:0', 'F','Gauteng','Johannesburg'),
    ('Robertsham', '0:0', 'F','Gauteng','Johannesburg'),
    ('Roseacre', '0:0', 'F','Gauteng','Johannesburg'),
    ('Rosettenville', '0:0', 'F','Gauteng','Johannesburg'),
    ('Salisbury Claims', '0:0', 'F','Gauteng','Johannesburg'),
    ('Selby', '0:0', 'F','Gauteng','Johannesburg'),
    ('South Hills', '0:0', 'F','Gauteng','Johannesburg'),
    ('Southdale', '0:0', 'F','Gauteng','Johannesburg'),
    ('Southfork', '0:0', 'F','Gauteng','Johannesburg'),
    ('Southgate', '0:0', 'F','Gauteng','Johannesburg'),
    ('Spes Bona', '0:0', 'F','Gauteng','Johannesburg'),
    ('Springfield', '0:0', 'F','Gauteng','Johannesburg'),
    ('Stafford', '0:0', 'F','Gauteng','Johannesburg'),
    ('Steeledale', '0:0', 'F','Gauteng','Johannesburg'),
    ('Suideroord', '0:0', 'F','Gauteng','Johannesburg'),
    ('Theta', '0:0', 'F','Gauteng','Johannesburg'),
    ('Towerby', '0:0', 'F','Gauteng','Johannesburg'),
    ('Townsview', '0:0', 'F','Gauteng','Johannesburg'),
    ('Troyeville', '0:0', 'F','Gauteng','Johannesburg'),
    ('Tulisa Park', '0:0', 'F','Gauteng','Johannesburg'),
    ('Turf Club', '0:0', 'F','Gauteng','Johannesburg'),
    ('Turffontein', '0:0', 'F','Gauteng','Johannesburg'),
    ('Village Main', '0:0', 'F','Gauteng','Johannesburg'),
    ('Yeoville', '0:0', 'F','Gauteng','Johannesburg'),
    ('Ennerdale', '0:0', 'G','Gauteng','Johannesburg'),
    ('Lawley', '0:0', 'G','Gauteng','Johannesburg'),
    ('Lenasia', '0:0', 'G','Gauteng','Johannesburg'),
    ('Orange Farm', '0:0', 'G','Gauteng','Johannesburg');


INSERT 	 INTO `SPECIALIZATIONS` (`WorkType`, `Description`)
	VALUES	('Painter', 'person who paints'),
			( 'Tiler', 'Person who tiles floors'),
			('Paver', 'Person who paves areas'),
			('Tree-Feller', 'Person who removes trees');

INSERT INTO `NOTIFICATION` (`UserID`,`Message`)
    VALUES (9,'Welcome!'),
      (9, 'This is a second notification!');