angular.module('cloudMudApp').config([
  '$locationProvider',
  '$routeProvider',
  function config($locationProvider,$routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.when(
      '/view',{
        templateUrl: 'world-view/world-view.template.html'
      }
    ).when(
      '/config',{
        templateUrl: 'world-config/world-config.template.html'
      }
    ).otherwise({redirectTo:'/view'});
  }
]);
