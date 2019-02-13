angular.module('loc8rApp', ['ngRoute']);
function config ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.view.html',
            controller: 'homeCtrl',
            //controllerAs: 'vm'
        })
        .otherwise({redirectTo: '/'});
}
angular
    .module('loc8rApp')
    //.service('loc8rData', loc8rData)
    //.service('geolocation', geolocation)
    .config(['$routeProvider', config]);