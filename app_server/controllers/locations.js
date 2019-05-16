var request = require('request');
var apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://getting-mean-loc8r.herokuapp.com';
}
/* GET 'home' page */
module.exports.login = function(req, res) {
  res.render('login', {
    title: 'Login page'
  });
};
module.exports.graphs = function(req, res) {
  res.render('charts', {
    title: 'field data'
  });
};

module.exports.signup = function(req, res) {
  res.render('location-review-form', {
    title: 'signing up',
    pageHeader: {
      title: 'Sign up page'
    }
  });
};
module.exports.work = function(req, res) {
  res.render('location-info', {
    title: 'work oo'
  });
};
var graph = function(req, res) {
  res.render('fusion', {
    title: 'My first chart using FusionCharts Suite XT',
    data: responseBody
  });
};

module.exports.graph1 = function(req, res) {
  res.render('fusion', {
    title: 'My first chart using FusionCharts Suite XT'
    //data: responseBody
  });
};
module.exports.grape = function(req, res) {
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
      if (err) return res.send(err);
      return res.json(result);
    }
  );
};

module.exports.homepage = function(req, res) {
  res.render('locations-list', {
    title: 'the Safety of the citizen matters',
    pageHeader: {
      title: 'breathGhana',
      strapline: 'the Safety of the citizen matters'
    },
    sidebar: 'here again'
  });
};
