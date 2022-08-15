let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

let Stations = new Schema({
    stationName: {type: String, required: true},
    location: {
        type: pointSchema,
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Stations', Stations);