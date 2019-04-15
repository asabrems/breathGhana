var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://getting-mean-loc8r.herokuapp.com";
}
/* GET 'home' page */
module.exports.login = function(req, res){
    res.render('login', { 
        title: 'Login page'
        
    });
};
module.exports.graphs = function(req, res){
    res.render('charts', { 
        title: 'field data'
        
    });
};

//         }
//     //var requestOptions, path, locationid, postdata;
//     //locationid = req.params.locationid;
//     path = "/api/login" ;
//     postdata = {
//         email: req.body.email,
//         //rating: parseInt(req.body.rating, 10),
//         //reviewText: req.body.review
//     };
//     requestOptions = {
//         url : apiOptions.server + path,
//         method : "POST",
//         json : postdata
//     };
//     // if (!postdata.email) //|| !postdata.rating || !postdata.reviewText) 
//     //     {
//     //     res.redirect('/signup');
//     // } else 
//     {
//     request(
//         requestOptions,
//         function(err, response, body) {
//             if (response.statusCode === 201) {
//             res.redirect('/signup' );
//         } else {
//             _showError(req, res, response.statusCode);
//         }
//     }
//     );
// }

module.exports.signup = function(req, res) {
    res.render('location-review-form', {
        title: 'signing up',
        pageHeader: {
            title: 'Sign up page',
            
        },
    });
};
module.exports.work = function(req, res){
    res.render('location-info', { 
        title: 'work oo'
        
    });
};



module.exports.homepage = function(req, res){
    res.render('locations-list', {
        title: 'the Safety of the citizen matters',
        pageHeader: {
            title: 'breathGhana',
            strapline: 'the Safety of the citizen matters'
        },
        sidebar: 'here again'
    });
}    
    // const {name, email, password, newpassword}= req.body;
    // let errors=[];
    // if (!name || !email || !password || !newpassword){
    //     errors.push({   msg:'please fill in all fields'});
    //     }
        // if(password !== newpassword){
        // errors.push({ msg:"Ma guy the password for match" });
                    
        // }if(password.length < 6){
        //     errors.push({msg:'password should be at least 6 characters'});
        //     }
        // if(errors.length>0){
        //     res.render('register',{errors,name, email, password, newpassword});
        //     }
 
