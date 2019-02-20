(function(){
    angular.module('Asantewaa', ['ngRoute']);
    function config ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
    }
    angular
        .module('Asantewaa')
        .config(['$routeProvider', config]);
})();