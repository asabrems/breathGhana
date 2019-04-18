var mongoose =require('mongoose');
var dataSchema = new mongoose.Schema({
    accum:{type: String}
    });
mongoose.model('dataa', dataSchema);