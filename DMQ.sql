-- Passengers
-- Get all passengers
SELECT * FROM Passengers;


-- Add a passenger
INSERT INTO Passengers (FirstName, LastName, Email, Phone, DateOfBirth) VALUES
(:FirstName, :LastName, :Email, :Phone, :DateOfBirth);

-- Update a passenger
UPDATE Passengers
SET FirstName = :FirstName,
    LastName = :LastName,
    Email = :Email,
    Phone = :Phone,
    DateOfBirth = :DateOfBirth
WHERE PassengerID = :PsngrID;

-- Delete a passenger
DELETE FROM Passengers WHERE PassengerID = :PassengerID;

-- TransportStations
-- Get all stations
SELECT * FROM TransportStations;

-- Add a station
INSERT INTO TransportStations (StationName, Address, City, State, Country) VALUES
(:StationName, :Address, :City, :State, :Country);

-- Update a station
UPDATE TransportStations
SET StationName = :StationName,
    Address = :Address,
    City = :City,
    State = :State,
    Country = :Country
WHERE StationID = :StationID;

-- Delete a station
DELETE FROM TransportStations WHERE StationID = :StationID;

-- Routes
-- Get all routes
SELECT * FROM Routes;

-- Add a route
INSERT INTO Routes (RouteName, Distance, EstimatedTravelTime) VALUES
(:RouteName, :Distance, :EstimatedTravelTime);

-- Update a route
UPDATE Routes
SET RouteName = :RouteName,
    Distance = :Distance,
    EstimatedTravelTime = :EstimatedTravelTime
WHERE RouteID = :RouteID;

-- Delete a route
DELETE FROM Routes WHERE RouteID = :RouteID;

-- Trains
-- Get all trains
SELECT * FROM Trains;

-- Add a train
INSERT INTO Trains (RouteID, TrainName, TrainType, Capacity) VALUES
(:RouteID, :TrainName, :TrainType, :Capacity);

-- Update a train
UPDATE Trains
SET RouteID = :RouteID,
    TrainName = :TrainName,
    TrainType = :TrainType,
    Capacity = :Capacity
WHERE TrainID = :TrainID;

-- Delete a train
DELETE FROM Trains WHERE TrainID = :TrainID;

-- BoardingRecords
-- Get all boarding records
SELECT * FROM BoardingRecords;

-- Add a boarding record
INSERT INTO BoardingRecords (PassengerID, TrainID, StationID, BoardingTime) VALUES
(:PassengerID, :TrainID, :StationID, :BoardingTime);

-- Update a boarding record
UPDATE BoardingRecords
SET PassengerID = :PassengerID,
    TrainID = :TrainID,
    StationID = :StationID,
    BoardingTime = :BoardingTime
WHERE BoardingRecordID = :BoardingRecordID;

-- Delete a boarding record
DELETE FROM BoardingRecords WHERE BoardingRecordID = :BoardingRecordID;

-- Tickets
-- Get all tickets
SELECT tk.TicketID, tk.PassengerID, tk.RouteID FROM Tickets tk
JOIN Passengers p ON p.PassengerID = tk.PassengerID
JOIN Routes r ON r.RouteID = r.RouteID;


-- Add a ticket
INSERT INTO Tickets (PassengerID, RouteID) VALUES
(:PassengerID, :RouteID);

-- Update a ticket
UPDATE Tickets
SET PassengerID = :PassengerID,
    RouteID = :RouteID
WHERE TicketID = :TicketID;

-- Delete a ticket
DELETE FROM Tickets WHERE TicketID = :TicketID;

-- StationRoutes
-- Get all ids related to station routes
SELECT sr.PathID, sr.OriginStationID, sr.DestinationStationID, sr.RouteID FROM StationRoutes sr
JOIN TransportStations tso ON tso.StationID = sr.OriginStationID
JOIN TransportStations tsd ON tsd.StationID = sr.DestinationStationID
JOIN Routes r ON sr.RouteID = r.RouteID;

-- Add a station route
INSERT INTO StationRoutes (OriginStationID, DestinationStationID, RouteID) VALUES
(:OriginStationID, :DestinationStationID, :RouteID);

-- Update a station route
UPDATE StationRoutes
SET OriginStationID = :OriginStationID,
    DestinationStationID = :DestinationStationID,
    RouteID = :RouteID
WHERE PathID = :PathID;

-- Delete a station route
DELETE FROM StationRoutes WHERE PathID = :PathID;

-- StationTrains
-- Get all trains of a station

SELECT st.StationServedID, st.StationID, st.TrainID FROM StationTrains st
JOIN TransportStations ts ON ts.StationID = st.StationID
JOIN Trains t ON t.TrainID = ts.TrainID;

-- Add a train to the station
INSERT INTO StationTrains (StationID, TrainID) VALUES
(:StationID, :TrainID);

-- Update a train at a station
UPDATE StationTrains
SET StationID = :StationID,
    TrainID = :TrainID
WHERE StationServedID = :StationServedID;

-- Delete a train at a station
DELETE FROM StationTrains WHERE StationServedID = :StationServedID;