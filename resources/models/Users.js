let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Users = new Schema({
    Name: {type: String, required: true},
    Email: {type: String,  required: true},
    Type: {type: Number, required: true}, //1 - User | 2 - Department Admin | 3 - Company Admin
    Password: {type: String, required: true},
    JoinedDate: {type: Date, required: true}
});

module.exports = mongoose.model('Users', Users);