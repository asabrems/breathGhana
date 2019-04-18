var mongoose =require('mongoose');
var dataSchema = new mongoose.Schema({
    accum:{type: Number}
    });
mongoose.model('dataa', dataSchema);