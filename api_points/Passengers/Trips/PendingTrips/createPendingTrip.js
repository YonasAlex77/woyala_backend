const PendingTrips = require('../../../../resources/models/Trips/PendingTrips');

const {MAXIMUM_TRAVELLERS} = require('../../../../Utils');

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
            (dbRes)=>{
                return dbRes;       
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
    
    return PendingTrips.findByIdAndUpdate(_id, 
            {
                passengersRegistered: incrementedPassengers
            },
            {
                returnDocument: 'after'
            })
            .then((dbRes)=>{
                
                return dbRes;
                
            })
}



const handleNewRequest_Passenger = (app) => 
    {
        app.post('/handlenewrequest_passenger', (req,res)=>{
           
            checkIfRequestExists(req)
            .then(
                (res_fun)=>{
                    let foundTrip = [];

                    //If there is a response, 
                    if(res_fun){
                        res_fun.map(
                                (element)=>{
                                    //Assure to get the latest one and you wouldn't need this loop.
                                    if(element.passengersRegistered < MAXIMUM_TRAVELLERS)
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
                    //Create a pending Trip and Return it.
                    
                    createPendingTrip(req)
                    .then((dbRes)=>{
                        res.json(dbRes);
                    });           
                    return;
                }

                addOnePassengerRegistered(foundTrip[0])
                
                .then((dbRes)=>{
                    res.json(dbRes);
                })  
                return;
            })            
        })
    }

module.exports =  {handleNewRequest_Passenger};