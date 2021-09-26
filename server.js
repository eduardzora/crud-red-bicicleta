const express = require('express');
const bodyParser = require('body-parser');

//create express app
const app = express();

//parse requests of content-type
app.use(bodyParser.urlencoded({extended: true}))

//parse requests of content-type / application/json
app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Connecting to the database
mongoose.connect('mongodb+srv://bicicletas:pI3cJj9hXC@cluster0.4rxom.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
    console.log("could not connect to the database. Exiting now..", err);
    process.exit();
});

//define a simple route
app.get('/', (req, res) =>{
    res.json({"message": "Welcome to red-bicicletas"});
});

// Require bicicleta routes
require('./app/routes/b.routes.js')(app);

//listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
