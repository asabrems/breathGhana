var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
/*var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});*/

var ctrlLocations = require('../controllers/locations');
var ctrlAuth = require('../controllers/authentication');
var ctrlCharts = require('../controllers/charts/chartJS/index.js');
var ctrlData = require('../controllers/info.js');
/* GET home page. */

/* various web application pages*/
//router.get('/', ctrlLocations.homepage);
router.get('/', ctrlLocations.login);
router.get('/data',ctrlData.datainfo);
router.get('/signup',ctrlLocations.signup);
router.get('/work', ctrlLocations.work);
//router.get('/graphs', ctrlCharts.charts);
router.get('/dashboard',ctrlAuth.dashboard);
// router.post('/signup', (req, res) => {
//     console.log(req.body)
//     res.send('hello');
//});
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

module.exports = router;
