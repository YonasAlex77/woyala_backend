let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PendingTrips = new Schema({
    startingStationName: {type: String, required: true},
    startingLocation: {type: Map, of: Number, required: true},
    destinationStationName: {type: String, required: true},
    destinationLocation: {type: Map, of: Number, required: true},
    passengersRegistered: {type: Number, default: 0, required: true},
    taxiAssigned: {type:Boolean ,default: false, required: true},
    taxiLocation: {type: Map, of: Number, required: false},
    date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('PendingTrips', PendingTrips);
