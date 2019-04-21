var express = require('express');
var router = express.Router();
var Driver = require('../models/driver');
/* GET users listing. */
router.get('/:_id', function(req, res, next) {
  Driver.findById(req.params._id)
    .populate({ path: 'logs' })
    .exec((err, driver) => {
      if (err) return res.send(err);
      res.json(driver);
    });
});

module.exports = router;
