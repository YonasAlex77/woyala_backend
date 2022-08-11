let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Stations = new Schema({
    stationName: {type: String, required: true},
    location: {type: Map, of: Number, required: true}
});

module.exports = mongoose.model('Stations', Stations);
