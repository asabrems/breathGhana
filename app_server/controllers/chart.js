var request = require('request');
var Fruit = require('../models/Fruit.js');
var log = require('../models/log');

module.exports.chart = function(req, res, next) {
  log
    .find({ passed })
    //.select('passed')
    .count()
    .limit(5)
    .exec(function(err, log) {
      if (err) return next(err);
      // chart JSON data
      var json = {
        chart: {
          type: 'bar',
          title: 'Top 5 Fruits',
          data: pass,
          container: 'container'
        }
      };
      res.render('index1', {
        title: 'Anychart NodeJS demo',
        chartData: JSON.stringify(json)
      });
    });
};

module.exports.chart = function(req, res, next) {
  Fruit.find({})
    .select('name value -_id')
    .sort({ value: -1 })
    .limit(5)
    .exec(function(err, fruits) {
      if (err) return next(err);
      // chart JSON data
      var json = {
        chart: {
          type: 'pie',
          title: 'Top 5 Fruits',
          data: fruits,
          container: 'container'
        }
      };
      res.render('index1', {
        title: 'Anychart NodeJS demo',
        chartData: JSON.stringify(json)
      });
    });
};
