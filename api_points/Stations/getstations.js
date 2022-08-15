const Stations = require('../../resources/models/Stations');
const {stationFormatter} = require('../../Utils');

const getstations = (app) => {
    app.get('/getstations', (req, res)=>{
        
        let finalResponse = [];

        Stations.find({})
        .then((dbRes)=>{

            //Formatting the final Response 
            dbRes.forEach((element)=>{
                let formattedStation = stationFormatter(element);
                
                finalResponse.push(formattedStation);
            })

            res.json(finalResponse);
        })
    })
}

module.exports = {getstations}
