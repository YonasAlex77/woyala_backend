const PendingTrips = require('../../../resources/models/Trips/PendingTrips');

const getPendingTrips = (app) => {
    app.post('/getpendingtrips', (req,res)=>{
        const {
            startingLocation, 
            destinationLocation,
            } = req.body;

        console.log(req.body);    
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
                        if(element.passengersRegistered<12){
                            console.log(element);
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

module.exports = {getPendingTrips};