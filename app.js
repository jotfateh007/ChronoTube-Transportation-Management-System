// App.js
/*
    SETUP
*/
// app.js

// Database
var db = require('./database/db_connector');
var express = require('express');   // We are using the express library for the web server
var app     = express();
const path = require('path');
// app.js - SETUP section

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '/'))) 
// 'public'           // We need to instantiate an express object to interact with the server in our code
PORT        = 8955;                 // Set a port number at the top so it's easy to change in the future


const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/

// Route to serve the transportStations.html file

app.get('/transportStations.html', function(req, res) {  
    let query1 = "SELECT * FROM TransportStations;";
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.render('index', { data: rows, stations: rows }); 
        }
    });
});

// Route to serve the transportStations.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/trains.html', (req, res) => {
    let query1 = "SELECT RouteID FROM Routes;";
    let query2 = "SELECT * FROM Trains;";
    db.pool.query(query1, function(error, routeRows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            db.pool.query(query2, function(error, trainRows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    res.render('trains', {routes: routeRows, trains: trainRows}); 
                }
            });
        };
    });
});

app.get('/boardingRecords.html', (req, res) => {
    let query0 = `SELECT b.BoardingRecordID, b.PassengerID, p.FirstName, p.LastName, b.TrainID, t.TrainName, t.TrainType, b.StationID, ts.StationName, b.BoardingTime FROM BoardingRecords b
    JOIN Passengers p ON p.PassengerID = b.PassengerID
    JOIN Trains t ON t.TrainID = b.TrainID
    JOIN TransportStations ts ON ts.StationID = b.StationID
    ORDER BY b.BoardingRecordID ASC;`;

    const query1 = `SELECT PassengerID, FirstName, LastName FROM Passengers ORDER BY PassengerID ASC`;
    const query2 = `SELECT TrainID, TrainName, TrainType, Capacity FROM Trains ORDER BY TrainID ASC`;
    const query3 = `SELECT StationID, StationName FROM TransportStations ORDER BY StationID ASC`;

    db.pool.query(query0, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            db.pool.query(query1, (err, passengers) => {
            if (err) {
                    console.log(err)
                return res.sendStatus(500)
            }
            db.pool.query(query2, (err, trains) => {
                    if (err) {
                    console.log(err)
                    return res.sendStatus(500)
                    }
                    db.pool.query(query3, (err, stations) => {
                    if (err) {
                            console.log(err)
                            return res.sendStatus(500)
                        }
                        console.log(passengers, trains, stations)
                        res.render('boardingRecords', { data: rows, boardingRecords: rows, passengers: passengers, trains: trains, stations: stations }); 
                    })
            })
            })
        }
    });
});

app.get('/routes.html', (req, res) => {
    let query1 = "SELECT * FROM Routes;";
    
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.render('routes', { data: rows, routes: rows }); 
        }
    });
});

app.get('/stationRoutes.html', (req, res) => {
    let query0 = `SELECT sr.PathID, sr.OriginStationID, tso.StationName AS OriginStationName, sr.DestinationStationID, tsd.StationName AS DestinationStationName, sr.RouteID, r.RouteName FROM StationRoutes sr
    JOIN TransportStations tso ON tso.StationID = sr.OriginStationID
    JOIN TransportStations tsd ON tsd.StationID = sr.DestinationStationID
    JOIN Routes r ON r.RouteID = sr.RouteID
    ORDER BY sr.PathID ASC;`;

    const query1 = `SELECT StationID, StationName FROM TransportStations ORDER BY StationID ASC`;
    const query2 = `SELECT StationID, StationName FROM TransportStations ORDER BY StationID ASC`;
    const query3 = `SELECT RouteID, RouteName FROM Routes ORDER BY RouteID ASC`;

    db.pool.query(query0, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            db.pool.query(query1, (err, startStations) => {
            if (err) {
                    console.log(err)
                return res.sendStatus(500)
            }
            db.pool.query(query2, (err, endStations) => {
                    if (err) {
                    console.log(err)
                    return res.sendStatus(500)
                    }
                    db.pool.query(query3, (err, routes) => {
                    if (err) {
                            console.log(err)
                            return res.sendStatus(500)
                        }
                        res.render('stationRoutes', {data: rows, paths: rows, startStations: startStations, endStations: endStations, routes: routes}); 
                    })
            })
            })
        }
    });
});

app.get('/stationTrains.html', (req, res) => {
    let query0 = `SELECT st.StationServedID, st.StationID, ts.StationName, st.TrainID, t.TrainName FROM StationTrains st
JOIN TransportStations ts ON ts.StationID = st.StationID
JOIN Trains t ON t.TrainID = st.TrainID ORDER BY st.StationServedID ASC;`;

    const query1 = `SELECT StationID, StationName FROM TransportStations ORDER BY StationID ASC`;
    const query2 = `SELECT TrainID, TrainName FROM Trains ORDER BY TrainID ASC`;

    db.pool.query(query0, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            db.pool.query(query1, (err, stations) => {
            if (err) {
                    console.log(err)
                return res.sendStatus(500)
            }
            db.pool.query(query2, (err, trains) => {
                    if (err) {
                    console.log(err)
                    return res.sendStatus(500)
                    }
                    res.render('stationTrains', {data: rows, stationServed: rows, stations: stations, trains: trains}); 
            })
            })
        }
    });
});


app.get('/tickets.html', (req, res) => {
    let query0 = `SELECT t.TicketID, t.PassengerID, p.FirstName, p.LastName, p.Phone, t.RouteID, r.RouteName FROM Tickets t
    JOIN Passengers p ON p.PassengerID = t.PassengerID
    JOIN Routes r ON r.RouteID = t.RouteID
    ORDER BY t.TicketID ASC;`;

    const query1 = `SELECT PassengerID, FirstName, LastName FROM Passengers ORDER BY PassengerID ASC`;
    const query2 = `SELECT RouteID, RouteName FROM Routes ORDER BY RouteID ASC`;

    db.pool.query(query0, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            db.pool.query(query1, (err, passengers) => {
            if (err) {
                    console.log(err)
                return res.sendStatus(500)
            }
            db.pool.query(query2, (err, routes) => {
                    if (err) {
                    console.log(err)
                    return res.sendStatus(500)
                    }
                    console.log(passengers, routes)
                    res.render('tickets', { data: rows, tickets: rows, passengers: passengers, routes: routes}); 
            })
            })
        }
    });
});


app.get('/passengers.html', (req, res) => {
    let query1 = "SELECT * FROM Passengers;";
    
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.render('passengers', { data: rows, passengers: rows}); 
        }
    });
});

// app.js
app.post('/add-passenger-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    const query1 = `INSERT INTO Passengers (FirstName, LastName, Email, Phone, DateOfBirth) VALUES (?, ?, ?, ?, ?);`;

    db.pool.query(query1, [data.FirstName, data.LastName, data.Email, data.Phone, data.DateOfBirth], function(error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to the passengers page
        else {
            res.redirect('/passengers.html');
        }
    });
});

app.delete('/delete-passenger-ajax/', function(req, res, next) {
    let data = req.body;
    let passengerID = parseInt(data.id);

    let deletePassengerQuery = `DELETE FROM Passengers WHERE PassengerID = ?`;

    db.pool.query(deletePassengerQuery, [passengerID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Trigger a redirect to reload the page
            res.sendStatus('204'); // Redirect to root (homepage) after deletion
        }
    });
});

app.put('/put-passenger-ajax', function(req, res, next) {
    let data = req.body;

    let passengerId = parseInt(data.passengerId);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let email = data.email;
    let phone = data.phone;
    let dateOfBirth = data.dateOfBirth;

    let queryUpdatePassenger = `UPDATE Passengers 
                                SET FirstName = ?, LastName = ?, Email = ?, Phone = ?, DateOfBirth = ? 
                                WHERE PassengerID = ?`;

    db.pool.query(queryUpdatePassenger, [firstName, lastName, email, phone, dateOfBirth, passengerId], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            console.log("Passenger updated successfully:", rows);
            res.json({ success: true, updatedPassenger: data });
        }
    });
});

app.post('/add-station-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database
    const query1 = `INSERT INTO TransportStations (StationName, Address, City, State, Country) VALUES (?, ?, ?, ?, ?);`;

    db.pool.query(query1, [data.StationName, data.Address, data.City, data.State, data.Country], function(error, rows, fields) {


        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/transportStations.html');
        }
    })
})

app.put('/put-station-ajax', function(req, res, next) {
    console.log("Received update data:", req.body); // Debug: log incoming request data

    let data = req.body;
    let stationId = parseInt(data.stationId);
    let stationName = data.stationName;
    let address = data.address;
    let city = data.city;
    let state = data.state;
    let country = data.country;

    let queryUpdateStation = `
        UPDATE TransportStations 
        SET StationName = ?, Address = ?, City = ?, State = ?, Country = ? 
        WHERE StationID = ?
    `;

    db.pool.query(queryUpdateStation, [stationName, address, city, state, country, stationId], function(error, result) {
        if (error) {
            console.log("Update error:", error);
            return res.sendStatus(400);
        } else {
            console.log("Station updated successfully. Affected rows:", result.affectedRows);
            // Query the updated record to confirm changes
            db.pool.query(`SELECT * FROM TransportStations WHERE StationID = ?`, [stationId], (err, rows) => {
                if (err) {
                    console.log("Error fetching updated station:", err);
                    return res.sendStatus(500);
                } else {
                    // Return the updated station record
                    res.json({ success: true, updatedStation: rows[0] });
                }
            });
        }
    });
});

app.get('/update-station', (req, res) => {
    db.pool.query(`SELECT * FROM TransportStations`, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.json({ stations: rows }); // Send JSON instead of rendering a view
        }
    });
});



app.delete('/delete-station-ajax/', function(req, res, next) {
    let data = req.body;
    let stationID = parseInt(data.id);

    let deleteStationQuery = `DELETE FROM TransportStations WHERE StationID = ?`;

    db.pool.query(deleteStationQuery, [stationID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Trigger a redirect to reload the page
            res.sendStatus('204'); // Redirect to root (homepage) after deletion
        }
    });
});




app.post('/add-train-form', function(req, res) {
    let data = req.body;

    // Convert RouteID to an integer or NULL
    let routeID = data.RouteID ? parseInt(data.RouteID) : null;

    console.log("Received train data:", data);

    const query1 = `INSERT INTO Trains (RouteID, TrainName, TrainType, Capacity) VALUES (?, ?, ?, ?);`;

    db.pool.query(query1, [routeID, data.TrainName, data.TrainType, data.Capacity], function(error, rows, fields) {
        if (error) {
            console.error("Database error:", error);
            return res.sendStatus(400);
        } 
        
        console.log("Train added successfully:", rows);
        res.redirect('/trains.html');
    });
});

app.get('/update-train', (req, res) => {
    db.pool.query("SELECT * FROM Trains", function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.json({ trains: rows }); // Send JSON instead of rendering a view
        }
    });
});

app.put('/put-train-ajax', function(req, res, next) {
    let data = req.body;
    let trainId = parseInt(data.trainId);
    let routeId = data.RouteID ? parseInt(data.RouteID) : null;
    let trainName = data.trainName;
    let trainType = data.trainType;
    let capacity = parseInt(data.capacity);

    let queryUpdateTrain = `UPDATE Trains
                              SET RouteId = ?, TrainName = ?, TrainType = ?, Capacity = ?
                              WHERE TrainID = ?`;

    db.pool.query(queryUpdateTrain, [ routeId, trainName, trainType, capacity, trainId], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            console.log("Train updated successfully:", rows);
            res.json({ success: true, updatedTrain: data });
        }
    });
});
// delete a train
app.delete('/delete-train-ajax/', function(req, res, next) {
    let data = req.body;
    let trainID = parseInt(data.id);

    let deleteTrainQuery = `DELETE FROM Trains WHERE TrainID = ?`;

    db.pool.query(deleteTrainQuery, [trainID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Trigger a redirect to reload the page
            res.sendStatus('204'); // Redirect to root (homepage) after deletion
        }
    });
});

// Add a new route
app.post('/add-route-form', function(req, res) {
    let data = req.body;

    const query1 = `INSERT INTO Routes (RouteName, Distance, EstimatedTravelTime) VALUES (?, ?, ?);`;

    db.pool.query(query1, [data.RouteName, data.Distance, data.EstimatedTravelTime], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/routes.html');
        }
    });
});

// Update a route
app.put('/put-route-ajax', function(req, res, next) {
    let data = req.body;

    let routeId = parseInt(data.routeId);
    let routeName = data.routeName || null;
    let routeDistance = data.routeDistance || null;
    let estimatedTravelTime = data.estimatedTravelTime || null;

    if (!routeId) {
        return res.status(400).json({ error: "Route ID is required." });
    }

    let queryUpdateRoute = `
        UPDATE Routes 
        SET RouteName = COALESCE(?, RouteName), 
            Distance = COALESCE(?, Distance), 
            EstimatedTravelTime = COALESCE(?, EstimatedTravelTime)
        WHERE RouteID = ?
    `;

    db.pool.query(queryUpdateRoute, [routeName, routeDistance, estimatedTravelTime, routeId], function(error, rows, fields) {
        if (error) {
            console.error("Database error:", error);
            return res.sendStatus(500);
        } 
        console.log("Route updated successfully:", rows);
        res.json({ success: true, updatedRoute: data });
    });
});



// Delete a route
app.delete('/delete-route-ajax', function(req, res, next) { 
    console.log("Delete request received:", req.body);
    let data = req.body;
    let routeID = parseInt(data.id);

    let deleteRouteQuery = `DELETE FROM Routes WHERE RouteID = ?`;

    db.pool.query(deleteRouteQuery, [routeID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204); // No content, successful deletion
        }
    });
});


app.post('/add-boardingRecord-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    if (!data.passengerID || !data.trainID || !data.StationID || !data.boardingTime) {
        console.log("Missing required fields.");
        // return res.status(400).send("All fields are required.");
    }

    // Create the query and run it on the database
    const query1 = `INSERT INTO BoardingRecords (PassengerID, TrainID, StationID, BoardingTime) VALUES (?, ?, ?, ?);`;

    
    db.pool.query(query1, [data.passengerId, data.trainId, data.stationId, data.boardingTime], function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/boardingRecords.html');
        }
    })
})

app.put('/put-boardingRecord-ajax', function(req, res, next) {
    let data = req.body;

    let boardingRecordId = parseInt(data.boardingRecordId);
    let passengerId = parseInt(data.passengerId);
    let trainId = parseInt(data.trainId);
    let stationId = parseInt(data.stationId);
    let newBoardingTime = data.boardingTime

    let queryUpdateBoardingRecord = `UPDATE BoardingRecords 
                              SET PassengerID = ?, TrainID = ?, StationID = ?, BoardingTime = ?
                              WHERE BoardingRecordID = ?`;

    db.pool.query(queryUpdateBoardingRecord, [passengerId, trainId, stationId, newBoardingTime, boardingRecordId], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            console.log("Boarding Record updated successfully:", rows);
            res.json({success: true, updatedBoardingRecord: data });
        }
    });
});

app.get('/update-boardingRecord', (req, res) => {
    const query1 = `SELECT b.BoardingRecordID, b.PassengerID, p.FirstName, p.LastName, b.TrainID, t.TrainName, t.TrainType, b.StationID, ts.StationName, b.BoardingTime FROM BoardingRecords b
    JOIN Passengers p ON p.PassengerID = b.PassengerID
    JOIN Trains t ON t.TrainID = b.TrainID
    JOIN TransportStations ts ON ts.StationID = b.StationID
    ORDER BY b.BoardingRecordID ASC;`;

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.json({boardingRecords: rows }); // Send JSON instead of rendering a view
        }
    });
});



app.delete('/delete-boardingRecord-ajax/', function(req, res, next) {
    let data = req.body;
    let boardingRecordID = parseInt(data.id);

    let deleteBoardingRecordQuery = `DELETE FROM BoardingRecords WHERE BoardingRecordID = ?`;

    db.pool.query(deleteBoardingRecordQuery, [boardingRecordID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Trigger a redirect to reload the page
            res.sendStatus('204'); // Redirect to root (homepage) after deletion
        }
    });
});



app.post('/add-ticket-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    if (!data.passengerID || !data.routeID) {
        console.log("Missing required fields.");
        // return res.status(400).send("All fields are required.");
    }

    // Create the query and run it on the database
    const query1 = `INSERT INTO Tickets (PassengerID, RouteID) VALUES (?, ?);`;

    
    db.pool.query(query1, [data.passengerId, data.routeId], function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Tickets and
        // presents it on the screen
        else
        {
            res.redirect('/tickets.html');
        }
    })
})

app.put('/put-ticket-ajax', function(req, res, next) {
    let data = req.body;

    let ticketId = parseInt(data.ticketId);
    let passengerId = parseInt(data.passengerId);
    let routeId = parseInt(data.routeId);

    let queryUpdateTicket = `UPDATE Tickets 
                              SET PassengerID = ?, RouteID = ?
                              WHERE TicketID = ?`;

    db.pool.query(queryUpdateTicket, [passengerId, routeId, ticketId], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            console.log("Ticket updated successfully:", rows);
            res.json({success: true, updatedTicket: data });
        }
    });
});

app.get('/update-ticket', (req, res) => {
    const query1 = `SELECT t.TicketID, t.PassengerID, p.FirstName, p.LastName, p.Phone, t.RouteID, r.RouteName FROM Tickets t
    JOIN Passengers p ON p.PassengerID = t.PassengerID
    JOIN Routes r ON r.RouteID = t.RouteID
    ORDER BY t.TicketID ASC;`;

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.json({tickets: rows }); // Send JSON instead of rendering a view
        }
    });
});



app.delete('/delete-ticket-ajax/', function(req, res, next) {
    let data = req.body;
    let ticketID = parseInt(data.id);

    let deleteTicketQuery = `DELETE FROM Tickets WHERE TicketID = ?`;

    db.pool.query(deleteTicketQuery, [ticketID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Trigger a redirect to reload the page
            res.sendStatus('204'); // Redirect to root (homepage) after deletion
        }
    });
});



app.post('/add-stationRoute-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    if (!data.startStationId || !data.endStationId) {
        console.log("Missing required fields.");
        // return res.status(400).send("All fields are required.");
    }

    // Create the query and run it on the database
    const query1 = `INSERT INTO StationRoutes (OriginStationID, DestinationStationID, RouteID) VALUES (?, ?, ?);`;

    
    db.pool.query(query1, [data.startStationId, data.endStationId, data.routeId], function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Tickets and
        // presents it on the screen
        else
        {
            res.redirect('/stationRoutes.html');
        }
    })
})

app.put('/put-stationRoute-ajax', function(req, res, next) {
    let data = req.body;

    let pathId = parseInt(data.pathId);
    let startStationId = parseInt(data.startStationId);
    let endStationId = parseInt(data.endStationId);
    let routeId = parseInt(data.routeId);

    let queryUpdateStationRoute = `UPDATE StationRoutes 
                              SET OriginStationID = ?, DestinationStationID = ?, RouteID = ?
                              WHERE PathID = ?`;

    console.log(startStationId, endStationId, routeId, pathId)
    db.pool.query(queryUpdateStationRoute, [startStationId, endStationId, routeId, pathId], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            console.log("Station Route updated successfully:", rows);
            res.json({success: true, updatedStationRoute: data });
        }
    });
});

app.get('/update-stationRoute', (req, res) => {
    let query1 = `SELECT sr.PathID, sr.OriginStationID, tso.StationName AS OriginStationName, sr.DestinationStationID, tsd.StationName AS DestinationStationName, sr.RouteID, r.RouteName FROM StationRoutes sr
    JOIN TransportStations tso ON tso.StationID = sr.OriginStationID
    JOIN TransportStations tsd ON tsd.StationID = sr.DestinationStationID
    JOIN Routes r ON r.RouteID = sr.RouteID
    ORDER BY sr.PathID ASC;`;

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.json({paths: rows }); // Send JSON instead of rendering a view
        }
    });
});



app.delete('/delete-stationRoute-ajax/', function(req, res, next) {
    let data = req.body;
    let pathID = parseInt(data.id);

    let deletePathQuery = `DELETE FROM StationRoutes WHERE PathID = ?`;

    db.pool.query(deletePathQuery, [pathID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Trigger a redirect to reload the page
            res.sendStatus('204'); // Redirect to root (homepage) after deletion
        }
    });
});


app.post('/add-stationTrain-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    if (!data.stationId || !data.trainId) {
        console.log("Missing required fields.");
        // return res.status(400).send("All fields are required.");
    }

    // Create the query and run it on the database
    const query1 = `INSERT INTO StationTrains (StationID, TrainID) VALUES (?, ?);`;

    
    db.pool.query(query1, [data.stationId, data.trainId], function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Tickets and
        // presents it on the screen
        else
        {
            res.redirect('/stationTrains.html');
        }
    })
})

app.put('/put-stationTrain-ajax', function(req, res, next) {
    let data = req.body;

    let stationServedId = parseInt(data.stationServedId);
    let stationId = parseInt(data.stationId);
    let trainId = parseInt(data.trainId);

    let queryUpdateStationTrain = `UPDATE StationTrains 
                              SET StationID = ?, TrainID = ?
                              WHERE StationServedID = ?`;

    console.log(stationId, trainId, stationServedId)
    db.pool.query(queryUpdateStationTrain, [stationId, trainId, stationServedId], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            console.log("Station Train updated successfully:", rows);
            res.json({success: true, updatedStationTrain: data });
        }
    });
});

app.get('/update-stationTrain', (req, res) => {
    let query1 = `SELECT st.StationServedID, st.StationID, ts.StationName, st.TrainID, t.TrainName FROM StationTrains st
JOIN TransportStations ts ON ts.StationID = st.StationID
JOIN Trains t ON t.TrainID = st.TrainID ORDER BY st.StationServedID ASC;`;

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.json({stationServed: rows }); // Send JSON instead of rendering a view
        }
    });
});



app.delete('/delete-stationTrain-ajax/', function(req, res, next) {
    let data = req.body;
    let stationServedID = parseInt(data.id);

    let deletePathQuery = `DELETE FROM StationTrains WHERE StationServedID = ?`;

    db.pool.query(deletePathQuery, [stationServedID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Trigger a redirect to reload the page
            res.sendStatus('204'); // Redirect to root (homepage) after deletion
        }
    });
});




/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on :' + PORT + '; press Ctrl-C to terminate.')
});