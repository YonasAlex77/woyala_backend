const Stations = require('../../resources/models/Stations');


const createstation = (app) => 
        {
            app.post('/createstation', (req,res)=>{
                const {stationName, location} = req.body;

                latitude = location.lat,
                longitude = location.lng

                const dbLocation = {type: 'Point', coordinates: [longitude, latitude]}
                
                Stations.create({
                    stationName: stationName, 
                    location: dbLocation
                })
                .then(
                    (dbRes)=>{  
                        res.json(1);
                    }
                )  
            })
        }



module.exports =  {createstation};