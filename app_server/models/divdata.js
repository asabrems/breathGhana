var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var drivSchema = new Schema({
  ID: String,
  name: String,
  logs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'logs'
    }
  ]
});
module.exports = mongoose.model('drivdata', drivSchema);
