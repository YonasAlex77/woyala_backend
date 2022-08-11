const Stations = require('../../resources/models/Stations');


const getstations = (app) => {
    app.get('/getstations', (req, res)=>{
        
        Stations.find({})
        
        .then((dbRes)=>{
            res.json(dbRes);
        })
    })
}

module.exports = {getstations}
