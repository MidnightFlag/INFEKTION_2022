// Express //
var express = require('express');
var app = express(); // Utilisation d’un routeur Express pour traiter les URL

// Body Parser //
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Mongoose //
var mongoose = require('mongoose');
var urlConnectionDB = "mongodb://groot_api:gr004pif0rT3st@mongodb-groot.alwaysdata.net:27017/groot_todoapi"; // API - DB Connection
mongoose.connect(urlConnectionDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', function () { console.log("Connection Database OK"); });

var tasksSchema = mongoose.Schema({title: String, category: String, description: String, date: String, time: String   });
var tasks = mongoose.model('le-forestier_merieau', tasksSchema);

var router = require('./routes.js')(express, tasks);
app.use(router);  // Démarrage du serveur

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
    console.log("Le serveur écoute sur le port "+app.get('port'));
});