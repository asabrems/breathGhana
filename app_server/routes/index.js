var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var { connect } = require('mqtt');
var client = connect(process.env.CLOUDMQTT_URL);
var Fruit = require('../models/Fruit.js');
var Log = require('../models/log');
var Driver = require('../models/driver');
var { waterfall } = require('async');
/*var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});*/

var ctrlLocations = require('../controllers/locations');
var ctrlAuth = require('../controllers/authentication');
var ctrlCharts = require('../controllers/charts/chartJS/index.js');
var ctrlData = require('../controllers/info.js');
var ctrlchart = require('../controllers/chart.js');
/* GET home page. */

/* various web application pages*/
//router.get('/', ctrlLocations.homepage);
router.get('/', ctrlLocations.login);
router.get('/data', ctrlData.datainfo);
router.get('/signup', ctrlLocations.signup);
router.get('/work', ctrlLocations.work);
//router.get('/graphs', ctrlCharts.charts);
router.get('/dashboard', ctrlAuth.dashboard);

//router.post('/signup', ctrlLocations.loglist);
// {
//     const {name, email, password, newpassword}= req.body;
//     let errors=[];
//     if (!name || !email || !password || !newpassword){
//         errors.push({   msg:'please fill in all fields'
//     });
//     }
//     if(password !== newpassword){
//         errors.push({ msg:"Ma guy the password for match" });

//     }if(password.length < 6){
//         errors.push({msg:'password should be at least 6 characters'});
//     }
//     if(errors.length>0){
//         res.render('register',{
//             errors,
//             name,
//             email,
//             password,
//             newpassword
//         });
//     }
//      else{
//         res.send('pass')
//     }
// });

router.post('/', ctrlAuth.login);
router.post('/signup', ctrlAuth.register);
router.get('/chart', ctrlchart.chart);

router.get('/dailystats', (req, res, next) => {
  Log.aggregate(
    {
      $group: {
        _id: {
          month: { $month: '$time' },
          day: { $dayOfMonth: '$time' },
          passed: '$passed'
        },
        count: { $sum: 1 }
      }
    },
    (err, result) => {
      if (err) return res.send(err);
      return res.json(result);
    }
  );
});
router.get('/charts', (req, res, next) => {
  db.log.aggregate(
    [
      {
        $group: {
          _id: {
            //month: { $month: '$time' },
            //day: { $dayOfMonth: '$time' },
            passed: '$passed'
          },
          count: { $sum: 1 }
        }
      }
    ],
    function(err, result) {
      if (err) return res.send(err);
      return res.json(result);
    }
  );
});
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

/* GET page. */

// router.get('/chart', function(req, res, next) {
//   Fruit.find({})
//     .select('name value -_id')
//     .sort({ value: -1 })
//     .limit(5)
//     .exec(function(err, fruits) {
//       if (err) return next(err);
//       // chart JSON data
//       var json = {
//         chart: {
//           type: 'pie',
//           title: 'Top 5 Fruits',
//           data: fruits,
//           container: 'container'
//         }
//       };
//       res.render('index1', {
//         title: 'Anychart NodeJS demo',
//         chartData: JSON.stringify(json)
//       });
//     });
// });

module.exports = router;
