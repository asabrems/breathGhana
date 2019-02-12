var express = require('express');
var router = express.Router();
var CtrlMain = require('../controllers/main');
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/other');
/* GET home page. */
//router.get('/', CtrlMain.index);
/* Locations pages */
router.get('/', ctrlOthers.angularApp);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);
/* Other pages */
router.get('/about', ctrlOthers.about);
module.exports = router;
