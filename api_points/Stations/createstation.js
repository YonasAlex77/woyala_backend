const Stations = require('../../resources/models/Stations');


const createstation = (app) => 
        {
            app.post('/createstation', (req,res)=>{
                const {stationName, location} = req.body;
 
                Stations.create({
                    stationName: stationName, 
                    location: location
                })
                .then(
                    (dbRes)=>{  
                        res.json(1);
                    }
                )         
            })
        }



module.exports =  {createstation};