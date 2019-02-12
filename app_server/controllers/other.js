/* GET home page */
module.exports.about = function(req, res){
    res.render('index', { title: 'About' });
    };
module.exports.angularApp = function(req, res){
    res.render('layout', { title: 'Loc8r' });
    };