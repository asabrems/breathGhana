var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var driverSchema = new Schema({
  name: String,
  logs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'log'
    }
  ]
});
module.exports = mongoose.model('driver', driverSchema);
