const PendingTrips = require('../../../../resources/models/Trips/PendingTrips');

const handleRemoveRequest_Passenger = (app) => {
    app.post('/handleremoverequest_passenger', (req, res)=>{
        const {_id} = req.body;

        PendingTrips.findById(_id)

        .then(
            dbRes=>
            {
                PendingTrips.findByIdAndUpdate(_id,
                    {
                        passengersRegistered: dbRes.passengersRegistered - 1
                    },
                    {
                        returnDocument: 'after'
                    })
                    
                .then(
                    (dbRes)=>{
                        res.json(dbRes)
                    }
                )
            }
        )
    })
}





module.exports = {handleRemoveRequest_Passenger}