/* GET home page */
module.exports.about = function(req, res){
    res.render('index', { title: 'About time' });
};
module.exports.angularApp = function(req, res){
    res.render('layout', { title: 'Breathalyzer' });
};