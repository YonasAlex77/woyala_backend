//Pending Trips
const PendingTrips = require('../../../resources/models/Trips/PendingTrips');

const {getClosestStation, stationFormatter} = require('../../../Utils');



const registerActive_Taxidriver = (app) => {
   
    app.post('/registeractive_taxidriver', 
        ( req, res )=> 
            {
                const {userId, driverLocation} = req.body;
                
                console.log(driverLocation);

                getClosestStation(driverLocation)
                
                .then(
                    (res_fun)=>{
                        const formattedStation = stationFormatter(res_fun);
                        
                        res.json(formattedStation);
                    }
                )
            }
        )
}

module.exports = {registerActive_Taxidriver};

