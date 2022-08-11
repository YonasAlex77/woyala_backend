const PendingTrips = require('../../../resources/models/Trips/PendingTrips');

//Creates a new pending Trip
const createPendingTrip = (req) => {  

    const { startingStationName,
            startingLocation, 
            destinationStationName,
            destinationLocation,   
    } = req.body;

   return PendingTrips.create({
            startingStationName: startingStationName,
            startingLocation: startingLocation,
            destinationStationName: destinationStationName,
            destinationLocation: destinationLocation
        })
        .then(
            ()=>{
                console.log("Created a new trip.");
                return 1;       
            }
        )
}

//Checking if request exists
const checkIfRequestExists = (req) => {
    const {
        startingLocation, 
        destinationLocation,
        } = req.body;

    return PendingTrips.find({
            startingLocation: startingLocation, 
            destinationLocation: destinationLocation        
        })
        .then((dbRes)=>{
            if(dbRes.length!==0){
                //If there is such a trip, return the array find returns.
                return dbRes;
            }
            return;
        })
}


//Adding Passenger Request
const addOnePassengerRegistered = (elementInput) => {
    const {_id, passengersRegistered} = elementInput;
    let incrementedPassengers = passengersRegistered +1;
    
    PendingTrips.findByIdAndUpdate(_id, {
        passengersRegistered: incrementedPassengers
    })
    .then(res=>{
        console.log(res);
    })
}



const handleNewRequest = (app) => 
    {
        app.post('/handlenewrequest', (req,res)=>{
           
            checkIfRequestExists(req)
            .then(
                (res_fun)=>{
                    let foundTrip = [];

                    //If there is a response, 
                    if(res_fun){
                        res_fun.map(
                                (element)=>{
                                    //Assure to get the latest one and you wouldn't need this loop.
                                    if(element.passengersRegistered < 12)
                                        {
                                            foundTrip.push(element);
                                        }
                                }
                        )                    
                    }

                    return foundTrip;
                }
            )
            .then((foundTrip)=>{
                
                if(foundTrip.length===0){
                    createPendingTrip(req);
                    res.json('Created');
                    return;
                }

                addOnePassengerRegistered(foundTrip[0]);  
            })            
        })
    }

module.exports =  {handleNewRequest};