var mongoose = require('mongoose');
var data1 = mongoose.model('dataa');
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
module.exports.datainfo = function(req, res, callback){
    console.log(req.query['accum'])
   

    if(req.query['accum']){
        //console.log("njbsigr")
        var info = new data1();
        info.accum = req.query['accum']
        info.save()
        sendJSONresponse(res, 200, {
            "message": "works"

        });  
        
    }
    else{
        sendJSONresponse(res, 200, {
            "message": "does not work"
        }); 
        
        sendJSONresponse(res, 200, {
            "message": "does not work"
        }); 
        return;
    }
    
   
};

module.exports.working = function(req, res){
    if (req.params && req.params.numbers){
        data1
        .findByAccum(req.params.numbers)
        

    }
}