var mongoose = require('mongoose');
var gracefulShutdown;
var mqtt = require('mqtt');
var mongodb = require('mongodb');
var mongodbClient = mongodb.MongoClient;
//var data1 = mongoose.model('dataa');
require('./locations');
require('./users');
require('./data1');
require('./work');
var { setupCollection } = require('../routes/index');

//var mongodbURI='mongodb://username:password@server.mongohq.com:port/database'
//var mongodURI= 'mongodb+srv://author:<password>@cluster0-sncnz.mongodb.net/test?retryWrites=true'
var dbURI = 'mongodb://localhost/Loc8r';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}
/*var deviceRoot="asantewaa/init"
var collection,client;*/
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/anychart_db');
mongoose.connection.on(
  'error',
  console.error.bind(console, 'Connection error:')
);

//{var mqtt = require('mqtt'); //includes mqtt server
//var mongodb = require('mongodb'); // includes mongoDB
//var mongodbClient = mongodb.MongoClient; //initialises the mongoDB client
//var mongodbURI = 'mongodb://localhost:27017/local'; //activating the MongoDB port 27017, here local is the name of the database
var deviceRoot = 'asantewaa/init'; //"demo/status/temperature"; //deviceroot is topic name given in arduino code
var collection, client; //initialise collection and client

//mongodbClient.connect(dbURI, setupCollection); //connect the database with collecion

mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app shutdown', function() {
    process.exit(0);
  });
});
// function setupCollection(err, db) {
//     if(err) throw err;
//     collection=db.collection(dataa); //name of the collection in the database
//     client=mqtt.connect({ host: 'm16.cloudmqtt.com', port: 10601 }); //connecting the mqtt server with the MongoDB database

//     client.subscribe(deviceRoot+"+"); //subscribing to the topic name
//     client.on('message', insertEvent); //inserting the event
//     }
//     //function that displays the data in the MongoDataBase
//     function insertEvent(topic,message) {
//     var key=topic.replace(deviceRoot,'');

//     collection.update(
//         { _id:key },
//         { $push: { events: { event: {  value:message, when:new Date() } } } },
//         { upsert:true },

//         function(err,docs) {
//             if(err) {
//                 console.log("Insert fail");// Improve error handling
//             }
//         }

//     );

//     }
//mongodb data
/*mongodbClient.connect(dbURI,setupCollection);

function setupCollection(err,db) {  
  if(err) throw err;
  collection = db.collection("users");
  client=mqtt.createClient(1883,'localhost')
  client.subscribe(deviceRoot+"+")
  client.on('message', insertEvent);
}
function insertEvent(topic,payload) {  
    var key=topic.replace(deviceRoot,'');
    collection.update(  
        { _id:key },
        { $push: { events: { event: { value:payload, when:new Date() } } } },
        { upsert:true },
        function(err,docs) {
        if(err) { console.log("Insert fail"); } // Improve error handling
        }
        )
  }
require('./locations');*/
