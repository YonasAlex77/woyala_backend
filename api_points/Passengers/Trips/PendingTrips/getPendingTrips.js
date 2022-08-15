const PendingTrips = require('../../../../resources/models/Trips/PendingTrips');
const {MAXIMUM_TRAVELLERS} = require('../../../../Utils');

const getPendingTrips_Passenger = (app) => {
    app.post('/getpendingtrips_passenger', (req,res)=>
        {
            const {
                startingLocation, 
                destinationLocation,
                } = req.body;
            
                //Find Pending Trips
            return PendingTrips.find({
                    startingLocation: startingLocation, 
                    destinationLocation: destinationLocation        
                })

                .then((dbRes)=>{
                    let returnControl = false;
                    if(dbRes.length>0){
                        //For each element of dbRes
                    
                        dbRes.map((element)=>{
                            if(element.passengersRegistered < MAXIMUM_TRAVELLERS)
                                {
                                    res.json(element);
                                    res.end();
                                    returnControl = true;
                                }
                        })
                    }
                    return returnControl;
                })
                .then(
                    (returnControl)=>{
                        if(!returnControl)
                            {
                                res.json(null);
                            }
                    }
                )
        })
}

module.exports = {getPendingTrips_Passenger};