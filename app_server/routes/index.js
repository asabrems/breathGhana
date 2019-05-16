var express = require('express');
var router = express.Router();
var { connect } = require('mqtt');
var client = connect(process.env.CLOUDMQTT_URL);
var Log = require('../models/log');
var Driver = require('../models/driver');
var { waterfall } = require('async');
var ctrlAuth = require('../controllers/authentication');
var ctrlData = require('../controllers/info.js');
var ctrlLocations = require('../controllers/locations.js');

/* GET home page. */

/* various web application pages*/

router.get('/', ctrlLocations.login);
router.get('/data', ctrlData.datainfo);
router.get('/grapes', ctrlLocations.graph1);
router.get('/dashboard', ctrlAuth.dashboard);

router.post('/', ctrlAuth.login);
router.post('/signup', ctrlAuth.register);

/*sorting data to be plotted*/
router.get('/dailystats', (req, res, next) => {
  Log.aggregate(
    [
      {
        $group: {
          _id: {
            month: { $month: '$time' },
            day: { $dayOfMonth: '$time' },
            passed: '$passed'
          },
          count: { $sum: 1 }
        }
      }
    ],
    /*(err, result) => {
      if (err) return res.send(err);
      return res.json(result);
    }*/
    function(err, result) {
      var data_to_put_as_json = [];
      for (i in result) {
        var doc = result[i];
        var resultObject = {};
        resultObject.label = doc._id.passed;
        (resultObject.value = doc._id.day), doc.count;
        //resultObject.value = doc.count;
        data_to_put_as_json.push(resultObject);
      }
      if (err) return res.send(err);
      return res.json(data_to_put_as_json);
    }
  );
});
/*link to database data sorting for fusion chart*/
//https://javabeat.net/nodejs-fusioncharts-column-chart/
router.get('/charts', (req, res, next) => {
  Log.aggregate(
    [
      {
        $group: {
          _id: {
            passed: '$passed'
          },
          count: { $sum: 1 }
        }
      }
    ],
    function(err, result) {
      var data_to_put_as_json = [];
      for (i in result) {
        var doc = result[i];
        var resultObject = {};
        resultObject.label = doc._id.passed;
        //resultObject.value1 = doc._id.day;
        resultObject.value = doc.count;
        data_to_put_as_json.push(resultObject);
      }
      if (err) return res.send(err);
      return res.json(data_to_put_as_json);
    }
  );
});

/*getting data from the mqtt broker */

client.once('connect', () => {
  client.subscribe('#', (err, granted) => {
    if (err) return console.error(err);
    console.log('connected to ' + granted[0].topic);
  });
});
client.on('error', err => {
  console.error(err);
});

client.on('message', (topic, message) => {
  console.log(`${topic}:${message}`);
  var jsonMsg = {};
  var msg = message.toString();
  try {
    var splitMsg = msg.split(/=|,/);
    jsonMsg[splitMsg[0]] = splitMsg[1];
    jsonMsg[splitMsg[2]] = splitMsg[3];
    jsonMsg[splitMsg[4]] = splitMsg[5];
    jsonMsg[splitMsg[6]] = splitMsg[7];
  } catch {
    console.error('splitting failed');
  }
  console.log(jsonMsg);
  waterfall(
    [
      cb => {
        var newLog = new Log({
          passed: Number(jsonMsg.passed) === 1,
          driver: jsonMsg.driver,
          location: {
            long: jsonMsg.long,
            lat: jsonMsg.lat
          }
        });
        newLog.save((err, log) => {
          if (err) return cb(err);
          return cb(null, log);
        });
      },
      (log, cb) => {
        Driver.findOneAndUpdate(
          { _id: log.driver },
          {
            $push: {
              logs: {
                $each: [log._id],
                $position: 0
              }
            }
          },
          (err, driver) => {
            if (err) return cb(err);
            return cb(null, driver);
          }
        );
      }
    ],
    (err, result) => {
      if (err) return console.error(err);
      console.log(result);
    }
  );
});

module.exports = router;
