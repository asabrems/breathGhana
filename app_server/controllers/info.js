var mongoose = require('mongoose');
var data1 = mongoose.model('dataa');
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
module.exports.datainfo = function(req, res, callback){
    //-console.log(req.body)
    var info = new data1();
    info.accum = req.body.accum
    if(req.body.accum){
        //console.log("njbsigr"        
        info.save()
        sendJSONresponse(res, 200, {
            "message": "works"

        });  
        
    }
    else{
        sendJSONresponse(res, 200, {
            "message": "does not work"
        }); 
        info.save() 
        sendJSONresponse(res, 200, {
            "message": "saved"
        }); 
        return;
    }
    
   
};