//Maximum travellers

const MAXIMUM_TRAVELLERS = 12;


//Get Closest Station
    //Stations
    const Stations = require('./resources/models/Stations');

    const getClosestStation = (location) => 
        {   
        //Receives location as object version
            const {lat, lng} = location;

            const formattedLocation = {type: "Point", coordinates: [lng, lat]} 

            return Stations.findOne({
                "location": {
                    $near: {
                        $geometry: formattedLocation
                    }
                }
            })

            .then((dbRes)=>{
                return dbRes;    
            })
        }


const stationFormatter = (dbStation) => {
     //Formatting the location for Front-end Use
     let resObj = {
        _id: '',
        stationName: '',
        location :{
            lat: undefined, 
            lng: undefined
        }
    }

    
    //Set the response objects station name
    resObj._id = dbStation._id;
    resObj.stationName = dbStation.stationName
    resObj.location.lng = dbStation.location.coordinates[0];
    resObj.location.lat = dbStation.location.coordinates[1];

    return resObj;
}



//Text Formatter
function textFormatter(text){
    return text.toLowerCase().replace(/\s/g,'')
}




module.exports = {MAXIMUM_TRAVELLERS, getClosestStation, stationFormatter, textFormatter};