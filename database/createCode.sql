SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS BoardingRecords;
DROP TABLE IF EXISTS Trains;
DROP TABLE IF EXISTS Routes;
DROP TABLE IF EXISTS TransportStations;
DROP TABLE IF EXISTS Passengers;
DROP TABLE IF EXISTS Tickets;
DROP TABLE IF EXISTS StationRoutes;
DROP TABLE IF EXISTS StationTrains;

SET FOREIGN_KEY_CHECKS = 1;

SET FOREIGN_KEY_CHECKS = 0;

-- Create Passengers table
CREATE TABLE Passengers (
    PassengerID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(45) NOT NULL,
    LastName VARCHAR(45) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Phone VARCHAR(20) UNIQUE NOT NULL,
    DateOfBirth DATE NOT NULL
);

-- Create TransportStations table
CREATE TABLE TransportStations (
    StationID INT AUTO_INCREMENT PRIMARY KEY,
    StationName VARCHAR(100) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    City VARCHAR(50) NOT NULL,
    State VARCHAR(50) NOT NULL,
    Country VARCHAR(50) NOT NULL
);

-- Create Routes table
CREATE TABLE Routes (
    RouteID INT AUTO_INCREMENT PRIMARY KEY,
    RouteName VARCHAR(100) NOT NULL,
    Distance DECIMAL(10,2) NOT NULL,
    EstimatedTravelTime TIME NOT NULL
);

-- Create Trains table
CREATE TABLE Trains (
    TrainID INT AUTO_INCREMENT PRIMARY KEY,
    RouteID INT,
    TrainName VARCHAR(100) NOT NULL,
    TrainType VARCHAR(50) NOT NULL,
    Capacity INT NOT NULL,
    FOREIGN KEY (RouteID) REFERENCES Routes(RouteID) ON DELETE CASCADE
);

-- Create BoardingRecords table
CREATE TABLE BoardingRecords (
    BoardingRecordID INT AUTO_INCREMENT PRIMARY KEY,
    PassengerID INT NOT NULL,
    TrainID INT NOT NULL,
    StationID INT NOT NULL,
    BoardingTime DATETIME NOT NULL,
    FOREIGN KEY (PassengerID) REFERENCES Passengers(PassengerID) ON DELETE CASCADE,
    FOREIGN KEY (TrainID) REFERENCES Trains(TrainID) ON DELETE CASCADE,
    FOREIGN KEY (StationID) REFERENCES TransportStations(StationID) ON DELETE CASCADE
);

-- Create Intersection Tables

CREATE TABLE Tickets (
    TicketID INT AUTO_INCREMENT PRIMARY KEY,
    PassengerID INT NOT NULL,
    RouteID INT NOT NULL,
    FOREIGN KEY (PassengerID) REFERENCES Passengers(PassengerID) ON DELETE CASCADE,
    FOREIGN KEY (RouteID) REFERENCES Routes(RouteID) ON DELETE CASCADE
);

CREATE TABLE StationRoutes (
    PathID INT AUTO_INCREMENT PRIMARY KEY,
    OriginStationID INT NOT NULL,
    DestinationStationID INT NOT NULL,
    RouteID INT NOT NULL,
    FOREIGN KEY (OriginStationID) REFERENCES TransportStations(StationID) ON DELETE CASCADE,
    FOREIGN KEY (DestinationStationID) REFERENCES TransportStations(StationID) ON DELETE CASCADE,
    FOREIGN KEY (RouteID) REFERENCES Routes(RouteID) ON DELETE CASCADE
);

CREATE TABLE StationTrains (
    StationServedID INT AUTO_INCREMENT PRIMARY KEY,
    StationID INT NOT NULL,
    TrainID INT NOT NULL,
    FOREIGN KEY (StationID) REFERENCES TransportStations(StationID) ON DELETE CASCADE,
    FOREIGN KEY (TrainID) REFERENCES Trains(TrainID) ON DELETE CASCADE
);


SET FOREIGN_KEY_CHECKS = 1;

-- test data

INSERT INTO Passengers (FirstName, LastName, Email, Phone, DateOfBirth) VALUES
('Ariana', 'Grande', 'arigoat@gmail.com', '123-123-1234', '1993-06-26'),
('Taylor', 'Swift', 'taytay@gmail.com', '123-456-7890', '1989-12-13'),
('Sabrina', 'Carpenter', 'sabrinac@gmail.com', '123-444-3210', '1999-05-11');

INSERT INTO TransportStations (StationName, Address, City, State, Country) VALUES
('Grand Central', 'SW 200th St.', 'Salem', 'Oregon', 'United States'),
('Union Station', 'NW 206th St.', 'Corvallis', 'Oregon', 'United States'),
('Nine And Three Quarters', 'SE 204th St.', 'Seattle', 'Washington', 'United States');

INSERT INTO Routes (RouteName, Distance, EstimatedTravelTime) VALUES
('Corvallis to Seattle', 200, '02:30:00'),
('Salem to Corvallis', 50, '00:50:00'),
('Seattle to Salem', 180, '01:50:00');

INSERT INTO Trains (RouteID, TrainName, TrainType, Capacity) VALUES
(1, 'Polar Express', 'Bullet Train', 200),
(2, 'Infinity Train', 'Hyperloop', 180),
(3, 'Nine and three-quarters', 'Freight', 220);


INSERT INTO BoardingRecords (PassengerID, TrainID, StationID, BoardingTime) VALUES
(1, 1, 1, '2025-02-06 09:00:00'),
(2, 2, 2, '2025-02-06 06:00:00'),
(3, 3, 3, '2025-02-06 03:00:00');

INSERT INTO Tickets(PassengerID, RouteID) VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO StationRoutes(OriginStationID, DestinationStationID, RouteID) VALUES
(1, 2, 1),
(2, 3, 2),
(3, 1, 3);

INSERT INTO StationTrains(StationID, TrainID) VALUES
(1, 1),
(2, 2),
(3, 3);