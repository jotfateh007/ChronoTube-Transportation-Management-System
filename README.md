🚆 ChronoTube Transportation Management System

ChronoTube is a database-driven transportation management system designed to support a large-scale passenger rail network. The system manages the boarding activity of 3,000+ passengers, operating across 30 routes, 50 stations, and 35 trains running daily.

The goal of ChronoTube is to centralize and automate transportation operations by tracking boarding records, ticket transactions, and station-route relationships. In older systems, errors such as overbooking and scheduling delays often led to passenger dissatisfaction. This application improves reliability by monitoring train capacity (up to 200 seats per train) and improving operational efficiency.

By tracking passenger movement between stations and route usage patterns, ChronoTube enables management teams to identify high-demand routes, adjust schedules accordingly, and locate trains efficiently during emergency situations.

🚀 Features

Stores passenger information (name, email, phone number, date of birth)

Stores transport station information (station name, address, city, state, country)

Manages train records including train type, name, capacity, and assigned routes

Manages route data including distance and estimated travel time

Tracks boarding records with timestamps for operational monitoring

Supports ticketing transactions between passengers and routes

Supports many-to-many relationships through intersection tables:

Passenger ↔ Routes (Tickets)

Stations ↔ Routes (StationRoutes)

Stations ↔ Trains (StationTrains)

🛠️ Tech Stack

Backend: Node.js (Express)

Frontend: HTML, CSS, JavaScript

Database: MySQL

⚙️ Getting Started
1. Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Install dependencies
npm install

3. Configure the database connection

Before running the application, update the database credentials inside the database connector file (ex: db-connector.js).

You will need to provide your own:

database host

username

password

database name

4. Initialize the database

Run the schema script in your SQL environment:

DDL.sql


(Optional) You may also run:

DMQ.sql

5. Start the server
npm start


Then open the application in your browser at:

http://localhost:PORT


(Replace PORT with the port configured in the server.)

🙏 Credits

This project follows standard Node.js + SQL development practices, with some implementation structure inspired by publicly available starter templates.