var mongoose = require('mongoose');
var data1 = mongoose.model('dataa');
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
module.exports.datainfo = function(req, res, callback){
    //-console.log(req.body)
    if(req.body.accum){
        //console.log("njbsigr")
        var info = new data1();
        info.accum = req.body.accum
        info.save()
        sendJSONresponse(res, 200, {
            "message": "works"

        });  
        
    }
    else if (!req.body.accum){
        sendJSONresponse(res, 200, {
            "message": "does not work"
        });  
        return;
    }
    
   
};