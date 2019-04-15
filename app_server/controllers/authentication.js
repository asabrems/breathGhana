var passport = require('passport');
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');
var User = mongoose.model('User');


var getAuthor = function(req, res, callback) {
    if (req.payload && req.payload.email) {
        User
            .findOne({ email : req.payload.email })
            .exec(function(err, user) {
                if (!user) {
                    sendJSONresponse(res, 404, {
                        "message": "User not found"
                    });
                    return;
                }else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                callback(req, res, user.name);
            });
        } else {
            sendJSONresponse(res, 404, {
                "message": "User not found"
            });
            return;
        }
};

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
module.exports.register = function(req, res) {
    if(!req.body.name || !req.body.email || !req.body.password) {
       sendJSONresponse(res, 400, {
        "message": "All fields required"
      });
      return;
    }
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);
    user.save(function(err) {
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token" : token,
                msg: "works"
            });
        }
    });
};
module.exports.login = function(req, res) {
    if(!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
         "message": "All fields required"
        });
        return;
    }
    passport.authenticate('local', function(err, user, info){
         var token;
        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        if(user.email == 'charl@gmail.com'){ 
            token = user.generateJwt();

            return res.redirect('/work');
            //res.render('dashboard', { title: 'Dashboard', user: req.user });       
        //     sendJSONresponse(res, 200, {
        //         "token" : token                      
        // });
        } else {
            //sendJSONresponse(res, 401, info);
            return res.redirect('/login');
        } 
    //     if(err){
    //         return next(err);
    //     }
    //     if (!user){
    //         return res.redirect('/login');
    //     }
    //     req.logIn(user, function(err){
    //         if (err){
    //             return next(err);
    //         }
    //         return res.redirect('/work');
    })
     (req, res);
};
module.exports.dashboard= function (req, res) {
    if (!req.user || req.user.status !== 'ENABLED') {
      return res.redirect('/login');
    }
   
    res.render('dashboard', { title: 'Dashboard', user: req.user });
  };