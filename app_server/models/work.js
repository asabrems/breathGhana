var mongoose =require('mongoose');
var reviewSchema = new mongoose.Schema({
    author: String,
    rating: {type: Number, required: true, min: 0, max: 5},
    reviewText: String,
    createdOn: {type: Date, default: Date.now}
    });
var openingTimeSchema = new mongoose.Schema({
    days: {type: String, required: true},
    opening: String,
    closing: String,
    closed: {type: Boolean, required: true}
    });
var locatSchema = new mongoose.Schema({
        name: {type: String, required: true},
        address: String,
        rating: {type: Number, "default": 0, min: 0, max: 5},
        facilities: [String],
        coords: {type: [Number], index: '2dsphere', required: true},
        //openingTimes: [openingTimeSchema],
        //reviews: [reviewSchema]
        });
var infoSchema = new mongoose.Schema({
        accum: { 
            type: Number, 
            required: true
         },
        spec:{
            type: Number
        }
        });
var useSchema = new mongoose.Schema({
        accum: {
            type: Number,
            required: true
        }
    });
mongoose.model('imoy', locatSchema);
// so in the database, information from the database will display on the page