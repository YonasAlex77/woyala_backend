//middlewares
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');

//additional utils
const path = require('path');
const {sha256} = require('js-sha256');
const {textFormatter} = require('./utils');





//Database Connection
const dbUrl = "mongodb+srv://yonasalex77:grinding4Life1@cluster0.fuptm.mongodb.net/woyala?retryWrites=true&w=majority";
mongoose.connect(dbUrl, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//App gets Initiated
const app = express();

//Middleware functions to be used
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method')); 
 

//Api Points 
const {createUser} = require('./api_points/Users/createuser');

createUser(app);















const PORT = 4000

app.listen(PORT, 
    ()=>{
        console.log("Server is running on " + PORT);
    })

