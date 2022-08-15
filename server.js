//middlewares
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');

//additional utils
const path = require('path');
const {sha256} = require('js-sha256');
const {textFormatter} = require('./utils');





//Database Connection
const dbUrl = "mongodb+srv://yonasalex77:grinding4Life1@cluster0.fuptm.mongodb.net/woyala?retryWrites=true&w=majority";
mongoose.connect(dbUrl, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//App gets Initiated
const app = express();

//Middleware functions to be used
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method')); 
 

//Api Points 
    //Create functions.
        //User
        const {createUser} = require('./api_points/Users/createuser');
            createUser(app);
        //Station
        const {createstation} = require('./api_points/Stations/createstation');
            createstation(app);
    //Get functions.
        //Stations
        const {getstations} = require('./api_points/Stations/getstations');
            getstations(app);
            
    //Passengers
        //Pending Trips
                const {getPendingTrips_Passenger} = require('./api_points/Passengers/Trips/PendingTrips/getPendingTrips');
                    getPendingTrips_Passenger(app);
            //Request functions.
                const {handleNewRequest_Passenger} = require('./api_points/Passengers/Trips/PendingTrips/createPendingTrip');
                    handleNewRequest_Passenger(app);
            //Remove functions.
                const {handleRemoveRequest_Passenger} = require('./api_points/Passengers/Trips/PendingTrips/removePendingRequest');
                    handleRemoveRequest_Passenger(app);

    //Taxi Driver
        //register Active Taxi Driver
                const {registerActive_Taxidriver} = require('./api_points/TaxiDrivers/QueueRegistration/registeractive');
                    registerActive_Taxidriver(app);










const PORT = 4000

app.listen(PORT, 
    ()=>{
        console.log("Server is running on " + PORT);
    })

