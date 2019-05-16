var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var logdaSchema = new Schema({
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'drivdata'
  },
  location: {
    long: Number,
    lat: Number
  },
  passed: Boolean,
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('logsdata', logdaSchema);
